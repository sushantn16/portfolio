---
title: Four Astro bugs that failed without an error
description: A click that did nothing, a dev server that served the wrong app, a React error on every visit and a footer that moved. None of them threw.
date: 2026-09-24
draft: false
---

Most of my work at Kleinanzeigen is in Astro apps with React islands. The page is server-rendered HTML, and React attaches to a few interactive parts after load. It's a good model. It also opens a gap between what you see and what works, and the hardest bugs I hit this autumn lived in that gap. None of them threw an error at the point where things went wrong.

## 1. A click before hydration does nothing, and reports success

Our end-to-end suite came back green with one flaky test in each of three lanes. It was the same test every time, and a single retry was hiding it. The error said a settings link was missing from the navigation, which was misleading for a test whose whole job is checking which settings links each user type sees.

The navigation is server-rendered, so its links are visible long before React attaches. The test waited for a link to be visible, then clicked a menu group to open its submenu. That group is a `<button>` with no `href` and no form. All its behaviour lives in a React click handler. A click that lands before hydration does nothing, and Playwright logs it as done. The submenu never appears, and the next assertion fails on something else.

The island hydrates on `client:idle`, so the window depends on how busy the browser is. On a CI runner with eight workers in a CPU-limited pod, it can be as wide as it likes. On the page I measured, one of six islands was still not hydrated when the navigation link became visible.

The fix is to wait for the island, not the markup. An `<astro-island>` element carries an `ssr` attribute until it hydrates and drops it afterwards:

```ts
await expect(page.locator("astro-island:has(nav)[ssr]")).toHaveCount(0);
```

The helper that opens a group now also counts the navigation links before and after the click. It clicks again only while the count still matches the collapsed state, because an unconditional retry would close a submenu that had opened. All three lanes went to zero flaky tests.

**Visible is not ready.** On server-rendered markup, `toBeVisible` proves the HTML arrived. It says nothing about whether the JavaScript behind it is wired up.

## 2. A stale dev server shows a working page that isn't one

Another run reported 79 failures across specs that had nothing to do with each other. Each one read like an ordinary bug: an element not found, a wrong URL, a login that seemed to reject valid test accounts. I treated them as separate problems and diagnosed one of them wrongly twice.

They had one cause. The local dev server had been running for hours, and Vite's module graph had gone bad. Server rendering still worked, so every page returned a 200 with correct-looking HTML. But every client module request came back as a 504, so no island hydrated. I only saw it after attaching a `console` listener in a throwaway spec:

```
Failed to load resource: the server responded with a status of 504 ()
[astro-island] Error hydrating …/MenuListItem.tsx
TypeError: Failed to fetch dynamically imported module
```

An app that hasn't hydrated still looks like an app. It has content and a title, and nothing returns a 500. So one infrastructure failure turned up as dozens of failures that looked like code bugs, and each one invited a code explanation.

The fix was a restart. Two things made it harder than it should have been. The dev command runs as a background daemon, and Playwright reuses an existing server locally, so a broken server survived every test run until I stopped it explicitly.

What cracked it was stashing my changes and running the same specs on an unmodified `main`. 72 of the 79 failures reproduced, which proved they weren't mine before I knew what they were. When a change seems to break many unrelated tests, do that first.

The check from bug 1 also covers this one. If the navigation island still has its `ssr` attribute, the test fails once, at setup, with a message that names the cause.

## 3. A lazy import caused React error 421 on every visit

On a public profile page, React error #421 made up 87% of everything our error tracker caught that week: 1,202 of 1,374 errors, from 971 users. The message is "This Suspense boundary received an update before it finished hydrating". The history pointed to the day the pagination component became a `lazy()` import to save bytes.

The visible effect was small. React threw away the server-rendered pagination and rendered it again on the client, so it blinked at the bottom of the list. But the error drowned out every other signal in the tracker.

Two things that are each fine on their own caused it:

1. The pagination sits in a `<Suspense>` boundary around the lazy component, and it is server-rendered on first paint whenever the profile has listings. During hydration the chunk hasn't loaded, so that boundary stays dehydrated.
2. Right after mount, an effect writes the initial data into a nanostore. `useStore` is built on `useSyncExternalStore`, so that write re-renders the page synchronously and sends new props into the boundary that is still dehydrated. React can't hydrate at sync priority, so it throws #421 and falls back to client rendering.

The fix React's message suggests, `startTransition`, doesn't help, because updates from `useSyncExternalStore` are always synchronous. What helped was a static import. The lazy split hadn't saved anything anyway: on any profile with listings, the browser fetched the chunk right after hydration. Locally the error went from 10 of 10 page loads to 0 of 10, with the pagination still server-rendered.

**Don't `lazy()` something that renders on first paint inside an island that writes to a store after mount.** Lazy is safe for things that aren't in the server output: closed modals, tabs that aren't the default, content revealed by a click.

## 4. A footer that moved when the page filled in

Our real-user monitoring showed poor layout shift, above 0.25, on four pages of the seller portal. The cause wasn't in any of those pages. It was in the shared layout.

The content area was `flex-1` in a full-height column, with the footer after it. On first paint the page is short, so the footer sits inside the viewport. Then content arrives: older micro-frontends render into an empty element, and some data is fetched on the client. The content pushes the footer down, and that counts as one big shift.

The fix is one class change: `min-h-full flex-none` instead of `flex-1`. The content area is always at least one viewport tall, so the footer always starts below the fold.

A month after it shipped, the real-user numbers for the four pages had all moved from poor to good:

| Page | CLS before | CLS a month later |
|---|---:|---:|
| Statistics | 0.718 | 0.012 |
| Upgrade to PRO | 0.692 | 0.003 |
| Bookings | 0.588 | 0.031 |
| Invoices | 0.577 | 0.019 |

Each figure covers one day of sampled visits, between about 50 and 200 page loads per page, so the exact values are noisy. The size of the drop isn't. The ads list didn't move (0.465, then 0.480), as expected: its own list shifts as it loads, and that page is being replaced anyway.

Adding only `min-h-full` looks right but breaks. An explicit `min-height` replaces a flex item's default minimum, which is its content size. Combined with `flex-1`'s zero basis and the default `flex-shrink: 1`, the content area shrinks to exactly one viewport, and the footer paints on top of longer content. On one page it sat at 844 px, over 4,443 px of content. `flex-none` stops the shrinking.

The trade-off is that on short pages you scroll to reach the footer. A side effect: the footer's copyright line had often been counted as the page's largest paint, so expect the reported LCP to go up once the real content is counted instead.

## What they have in common

Each bug produced a page that looked correct: server-rendered HTML that wasn't interactive yet, a working-looking app with no JavaScript behind it, a component that rendered twice, a footer in a sensible place that moved a moment later. The error, where there was one, showed up somewhere else.

What I do now:

- **Wait for hydration, not visibility.** `astro-island[ssr]` is the cheapest signal there is.
- **Listen to the browser console in tests.** The answer to the 79 failures was in there the whole time.
- **Rerun on `main` before debugging a pile of unrelated failures.**
- **Treat `lazy()` on server-rendered content as a risk, not a free saving.**
- **Measure layout shift on the slowest page, not the fastest one.** The shared layout was the bug, but it only showed on pages that filled in late.
