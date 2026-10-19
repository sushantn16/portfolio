// Every indexable page. Small enough to write by hand instead of adding an integration.
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/writing';

export const GET: APIRoute = async ({ site }) => {
  const base = site!;
  const posts = await getPosts();
  const day = (d: Date) => d.toISOString().slice(0, 10);

  const pages = [
    { loc: new URL('/', base).href, lastmod: day(new Date()) },
    { loc: new URL('/writing/', base).href, lastmod: posts[0] ? day(posts[0].data.date) : day(new Date()) },
    // Served by the separate Stilllight Worker on the same domain.
    { loc: new URL('/photos/', base).href, lastmod: day(new Date()) },
    ...posts.map((p) => ({ loc: new URL(`/writing/${p.id}/`, base).href, lastmod: day(p.data.date) })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
