// /llms.txt (llmstxt.org): a Markdown summary for AI assistants and agents, built from
// the same data as the page so the two can't disagree.
import type { APIRoute } from 'astro';
import { about, beliefs, education, interests, languages, profile, projects, skills, work } from '../data/profile';
import { getPosts } from '../lib/writing';

const years = (start: string, end: string) => (start === end ? start : `${start} – ${end}`);
const asOf = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date());

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const md: string[] = [
    `# ${profile.name}`,
    '',
    `> ${profile.description}`,
    '',
    ...about.flatMap((p) => [p, '']),
    `This summary is generated from the same data as ${profile.url} and is current as of ${asOf}.`,
    '',
    '## Experience',
    '',
  ];

  for (const job of work) {
    const previously = job.previously ? `; previously ${job.previously}` : '';
    md.push(`- **${job.role}, ${job.company}** (${years(job.start, job.end)}, ${job.place}${previously})`);
    for (const h of job.highlights) md.push(`  - ${h}`);
  }
  md.push('', '## Education', '');
  for (const e of education) md.push(`- ${e.degree}, ${e.school} (${e.year})`);

  md.push('', '## Skills', '');
  for (const s of [...skills, { group: 'Languages', items: languages }]) md.push(`- ${s.group}: ${s.items.join(', ')}`);

  md.push('', '## Projects', '');
  for (const p of projects) md.push(`- [${p.name}](${p.href}) (${p.year}): ${p.summary}`);

  md.push('', '## Writing', '');
  for (const p of posts) {
    const url = new URL(`/writing/${p.id}/`, profile.url);
    md.push(`- [${p.data.title}](${url}) (${p.data.date.toISOString().slice(0, 10)}): ${p.data.description}`);
  }

  md.push('', '## What I believe', '');
  for (const b of beliefs) md.push(`- "${b.text}"${b.credit ? ` (borrowed from ${b.credit})` : ''}`);

  md.push(
    '',
    '## Contact',
    '',
    `- Email: ${profile.email}`,
    `- [LinkedIn](${profile.linkedin})`,
    `- [GitHub](${profile.github})`,
    `- [Plain-text CV](${new URL('/cv.txt', profile.url)})`,
    '',
    '## Optional',
    '',
    ...interests.map((i) => (i.link ? `- [${i.title}](${new URL(i.link.href, profile.url)}): ${i.body}` : `- ${i.title}: ${i.body}`)),
    '',
  );

  return new Response(md.join('\n'), {
    // Static hosts serve .txt as text/plain whatever this says; the body is Markdown either way.
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
