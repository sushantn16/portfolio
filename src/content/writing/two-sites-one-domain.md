---
title: Two sites, one domain, and a page transition with no JavaScript
description: How my portfolio and my photo gallery became one site while staying two repos.
date: 2026-10-19
draft: true
---

I have two small projects: this portfolio and Stilllight, a photo gallery that publishes itself. They live in separate repos on purpose. They have different jobs, different code and different deploys.

But I wanted them to feel like one site: the same type, the same navigation, and moving between them shouldn't feel like leaving.

## Same origin is the trick

Browsers can animate between two pages with cross-document view transitions, and there's no JavaScript involved. One rule matters here: both pages have to be on the same origin. A subdomain like `photos.iamsushant.dev` is a different origin, so the gallery moved to `iamsushant.dev/photos`.

Both sites run on Cloudflare Workers as static files. The portfolio owns `iamsushant.dev` as a custom domain. A route, `iamsushant.dev/photos*`, sends those paths to the gallery's Worker instead. Routes run before the custom-domain Worker, so every other path still reaches the portfolio.

## The CSS

Each site opts in to transitions and names the elements it shares:

```css
@view-transition {
  navigation: auto;
}

.site-bar { view-transition-name: site-bar; }
.nav-indicator { view-transition-name: nav-indicator; }
```

When an element has the same name on both pages, the browser animates it from where it was to where it is now. So the top bar stays still, the line under the active tab slides from "About" to "Photos", and the "Photography" heading on the portfolio grows into the gallery's title. Everything else cross-fades.

I checked it on the live site with Chrome's `pageswap` event, which tells the old page whether a view transition will run. It runs in both directions.

## What tripped me up

- **The files have to sit at the same path as the URL.** A Worker that only serves static files looks up the full path, `/photos/_astro/…`. So the gallery builds into `site/photos/`, not into the root of its output folder.
- **CORS has to match exactly.** The gallery loads its photo list from Cloudflare R2. Every origin that serves the page has to be listed exactly, with the scheme and without a trailing slash. When one was missing, the browser's preflight got a 403 and the page said "Network error".
- **Redirects can't match on the hostname.** The old subdomain redirects with a `_redirects` rule for `/`. That's only safe because the main domain never sends `/` to the gallery's Worker.
- **Separate repos mean duplicated chrome.** The top bar exists in both codebases, with the same markup, sizes and names. If one changes and the other doesn't, the bar jumps during the transition. A comment in each file points to the other.

## Was it worth it?

For two small sites, yes. Visitors get one place to explore, and I keep two projects I can change on their own. The portfolio still ships no JavaScript at all. The gallery needs a little, to load the photos.
