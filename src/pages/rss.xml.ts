// A plain RSS 2.0 feed, written by hand to avoid a dependency for ~30 lines of XML.
//
// Opened in a browser it is styled by /rss.css. That's CSS, not XSLT: Chrome is removing
// XSLT and already shows a warning banner on pages that use it. CSS can't make links in
// XML clickable, so the feed also carries a few XHTML elements under their own namespace.
// Browsers render those as HTML; feed readers ignore elements they don't know.
import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { getPosts, postDate } from '../lib/writing';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL(profile.url);
  const feedUrl = new URL('/rss.xml', base).href;
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const link = new URL(`/writing/${post.id}/`, base).href;
      return `    <item>
      <h:p class="date">${escape(postDate.format(post.data.date))}</h:p>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escape(post.data.description)}</description>
      <h:a class="read" href="${link}">Read the post →</h:a>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss.css" type="text/css"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:h="http://www.w3.org/1999/xhtml">
  <channel>
    <h:header class="intro">
      <h:p class="eyebrow">RSS feed</h:p>
      <h:h1>Writing by ${escape(profile.name)}</h:h1>
      <h:p class="lede">This is a feed. Paste its address into a feed reader and new posts come to you:</h:p>
      <h:code>${feedUrl}</h:code>
      <h:p class="links"><h:a href="${base.href}">← Back to the site</h:a> · <h:a href="https://aboutfeeds.com">What is a feed?</h:a></h:p>
    </h:header>
    <title>${escape(profile.name)}</title>
    <link>${base.href}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escape(profile.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
