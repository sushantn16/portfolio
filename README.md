# iamsushant.dev

My personal site: who I am, what I work on, and a CV. Photos live separately on
[Stilllight](https://sushantn16.github.io/Stilllight/).

Built with Astro and Tailwind CSS. It ships no client-side JavaScript.

## Things to try

- `curl iamsushant.dev/cv.txt` returns the CV as plain text.
- Print the page (or save it as a PDF) and you get a two-page CV.
- View the page source.
- `/llms.txt` is a Markdown summary for AI assistants ([llmstxt.org](https://llmstxt.org)), from the same data.

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

## Writing

Posts are Markdown files in [`src/content/writing/`](src/content/writing/). Set `draft: true` in the front matter
to keep a post out of the build; drafts still show in `npm run dev`. Each post gets its own page, an entry in
`/rss.xml` and `/sitemap.xml`, and BlogPosting structured data. Clicking a post title morphs it into the
article heading, using cross-document view transitions, which are CSS only.

Opened in a browser, `/rss.xml` is styled by `public/rss.css`. That's CSS rather than XSLT: Chrome 155 still runs XSLT,
but it puts a red "being removed" banner on the page. CSS can't make links in XML clickable, so the feed carries a few
XHTML-namespaced elements (an intro and "Read the post" links). Browsers render those as HTML; feed readers ignore them.

## SEO

Every page has a canonical URL, Open Graph tags and one JSON-LD graph: a `Person` (role, employer, universities,
skills, languages, profiles), the `WebSite`, and a `BlogPosting` on posts. `robots.txt` points to the sitemap.
After launch: verify the domain in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, and link
the site from LinkedIn, GitHub and the project READMEs.

## Editing

All copy lives in [`src/data/profile.ts`](src/data/profile.ts): about, experience, skills, projects,
writing and interests. The page, the printed CV, `/cv.txt` and `/llms.txt` all read from it.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check, then a static build into dist/
npm run preview
```

The social preview card is `public/og.png`. Its source is the `/og` page: to regenerate it, open
that page at a 1200×630 viewport and save a screenshot over the file.

## Deploying

Hosted on Cloudflare Workers as static assets ([`wrangler.jsonc`](wrangler.jsonc)); no Worker code runs.
Workers Builds is connected to this repo, so every push to `main` runs `npm run build` and `npx wrangler deploy`.
The `Build` workflow in GitHub Actions only checks pull requests.

[`public/_headers`](public/_headers) caches the fingerprinted `/_astro/` files for a year and sets a strict
Content-Security-Policy (`script-src 'none'`: the site has no scripts). Cloudflare's JavaScript-based Web
Analytics would break that promise, so traffic numbers come from Cloudflare's server-side analytics.

One-time setup:

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → `sushantn16/portfolio`.
   Build command `npm run build`, deploy command `npx wrangler deploy`, production branch `main`.
2. The Worker → **Settings → Domains & Routes → Add → Custom domain** → `iamsushant.dev`. Cloudflare creates
   the DNS record and the certificate. Add `www.iamsushant.dev` too if you want it, with a redirect rule to the apex.

## License

Code: MIT. The words on the site are mine.
