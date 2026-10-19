// `curl iamsushant.dev/cv.txt`: the same CV as the page, for people who live in a terminal.
import type { APIRoute } from 'astro';
import { about, education, languages, profile, projects, skills, work } from '../data/profile';

const WIDTH = 76;

function wrap(text: string, indent: number, first = indent): string {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const pad = lines.length === 0 ? first : indent;
    if (line && pad + line.length + 1 + word.length > WIDTH) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  lines.push(line);
  return lines.map((l, i) => ' '.repeat(i === 0 ? first : indent) + l).join('\n');
}

const heading = (title: string) => `\n${title.toUpperCase()}\n${'─'.repeat(title.length)}\n`;
const years = (start: string, end: string) => (start === end ? start : `${start} – ${end}`);
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const GET: APIRoute = () => {
  const out: string[] = [];

  out.push(
    `${profile.name.toUpperCase()}`,
    `${profile.role} · ${profile.location}`,
    profile.email,
    [bare(profile.linkedin), bare(profile.github), bare(profile.url)].join(' · '),
  );

  out.push(heading('About'), about.map((p) => wrap(p, 0)).join('\n\n'));

  out.push(heading('Experience'));
  for (const job of work) {
    const when = years(job.start, job.end).padEnd(13);
    out.push(`${when}${job.role}, ${job.company} (${job.place})`);
    if (job.previously) out.push(`${' '.repeat(13)}previously ${job.previously}`);
    for (const h of job.highlights) out.push(wrap(h, 15).replace(/^ {15}/, `${' '.repeat(13)}- `));
    out.push(`${' '.repeat(13)}[${job.stack.join(', ')}]`, '');
  }

  out.push(heading('Skills'));
  for (const s of [...skills, { group: 'Languages', items: languages }]) {
    out.push(wrap(s.items.join(', '), 13).replace(/^ {13}/, s.group.padEnd(13)));
  }

  out.push(heading('Projects'));
  for (const p of projects) {
    out.push(`${p.name} (${p.year})  ${p.href}`, wrap(p.summary, 2), '');
  }

  out.push(heading('Education'));
  for (const e of education) out.push(`${e.year.padEnd(13)}${e.degree}, ${e.school}`);

  out.push('', '--', `Generated from the same data as ${bare(profile.url)}.`, `Say hello: ${profile.email}`, '');

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
