---
title: A portfolio with no JavaScript that loads in under a second
description: What I measured while rebuilding this site, what broke, and how I fixed it.
date: 2026-10-19
draft: true
---

I rebuilt this site with one rule: it ships no JavaScript to your browser. Everything you see, including the motion, is HTML and CSS. It's built with Astro and Tailwind, and I built it with Claude Code in an afternoon. Most of what I learned came from measuring, not from writing code.

Every number below comes from Chrome's mobile emulation, with the CPU slowed 4× on a Slow 4G connection.

## The stylesheet was the slowest thing on the page

The first version scored a Largest Contentful Paint of 1,453 ms. The trace showed why: the browser waited for a separate stylesheet before it painted anything. The whole stylesheet is about 5 kB gzipped, so I inlined it into the HTML.

LCP dropped to 825 ms.

## Then the text started jumping

Inlining the CSS meant text now painted before the web fonts arrived, and Cumulative Layout Shift went from 0 to 0.13, over Google's "good" limit of 0.1.

The fonts already had metric-matched fallbacks. Astro's Fonts API generates them with `size-adjust`. But "metric-matched" means *on average*. I measured the hero paragraph in both fonts: on a phone it wrapped to 3 lines in the real font and 4 in the fallback, a 28 px jump that pushed the whole page down.

Two fixes:

- I set widths in `rem` instead of `ch`. A `ch` is the width of a zero *in the current font*, so a `ch`-based width changes when the font does.
- On small screens the paragraph reserves four lines with `min-height: 4lh`.

CLS went to 0.02.

## The minifier quietly broke my animations

Sections rise into view as you scroll, and a thin bar at the top tracks your progress. Both use scroll-driven animations, which are pure CSS. Neither worked in the production build.

I had written this:

```css
animation: grow linear both;
animation-timeline: scroll(root);
```

The minifier merged it into a single shorthand, `animation: linear both grow scroll(root)`. The spec doesn't allow a timeline inside the `animation` shorthand, so Chrome threw away the whole declaration. Writing every property out separately (`animation-name`, `animation-timing-function`, `animation-fill-mode`, `animation-timeline`) fixed it.

## A half-faded section is a contrast bug

Lighthouse flagged low-contrast text that looked fine to me. The section sitting right at the bottom of the first screen was halfway through its fade-in, and it stays that way until you scroll. Now sections rise without fading, so text is always readable.

## Small things I enjoyed

- **Print the page and you get a CV.** The print stylesheet drops the motion and the navigation and stacks each section.
- **`curl iamsushant.dev/cv.txt`** returns the same CV as plain text.
- **`/llms.txt`** gives AI assistants a clean Markdown summary instead of asking them to scrape the page.

All three are generated from one data file, so they can't drift apart.

## What I'd tell myself at the start

Measure first. Every real problem here came from a trace or an audit, and none of them showed up when I just looked at the page on my fast laptop.
