import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

/** Published posts, newest first. Drafts are included only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function readingTime(body = ''): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Shared by the list and the article so the title can morph between them. */
export const transitionName = (post: Post) => `post-${post.id}`;

export const postDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
