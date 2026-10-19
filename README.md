# iamsushant.dev

My personal site: who I am, what I work on, and a CV. Photos live separately on
[Stilllight](https://sushantn16.github.io/Stilllight/).

Built with Astro and Tailwind CSS. It ships no client-side JavaScript.

## Things to try

- `curl iamsushant.dev/cv.txt` returns the CV as plain text.
- Print the page (or save it as a PDF) and you get a two-page CV.
- View the page source.

## Performance

Measured on a local build with Chrome's mobile emulation (4× CPU slowdown, Slow 4G):
LCP 873 ms, CLS 0.02. Lighthouse scores 100 for accessibility, best practices and SEO.

What keeps it fast:

- **No JavaScript.** Motion is CSS only. The hero fades in, sections rise as they scroll into view
  (`animation-timeline: view()`), and a progress hairline is driven by `scroll()`. Browsers without
  scroll-driven animations just show the content, and `prefers-reduced-motion` turns all of it off.
- **The CSS is inlined.** It's about 5 kB gzipped, so a separate stylesheet would cost more as a
  render-blocking request than it saves in caching.
- **Fonts are self-hosted** through Astro's Fonts API: Latin subset only, no italics, and the two
  above-the-fold faces preloaded. Each face gets a metric-matched fallback (`size-adjust`), so text barely moves when
  the real font arrives.
- **Stable layout.** Widths are in `rem` rather than `ch`, which changes with the font. On phones the
  intro paragraph reserves four lines, because the fallback font wraps it one line longer.

## Editing

All copy lives in [`src/data/profile.ts`](src/data/profile.ts): about, experience, skills, projects,
writing and interests. The page, the printed CV and `/cv.txt` all read from it.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check, then a static build into dist/
npm run preview
```

The social preview card is `public/og.png`. Its source is the `/og` page: to regenerate it, open
that page at a 1200×630 viewport and save a screenshot over the file.

## Deploying

`.github/workflows/deploy.yml` builds every pull request and deploys `main` to GitHub Pages.

One-time setup for the custom domain:

1. Repository **Settings → Pages → Source**: GitHub Actions.
2. At the registrar, point the domain at GitHub Pages: `A` records for the apex to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a `CNAME`
   for `www` to `sushantn16.github.io`. On Cloudflare, set these records to DNS only (grey cloud),
   so that GitHub can issue the certificate.
3. **Settings → Pages → Custom domain**: `iamsushant.dev`, then tick **Enforce HTTPS** once the
   certificate is ready. `.dev` domains only work over HTTPS.

## License

Code: MIT. The words on the site are mine.
