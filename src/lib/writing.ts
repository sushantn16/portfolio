import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'writing'>;

/** Published posts, newest first. Drafts are included only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  // Same-day posts need a tie-breaker, or their order (and the home page's top three) can change between builds.
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id));
}

export function readingTime(body = ''): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** When a post last changed, for the sitemap and dateModified. */
export const lastModified = (post: Post): Date => post.data.updated ?? post.data.date;

/** Shared by the list and the article so the title can morph between them. */
export const transitionName = (post: Post) => `post-${post.id}`;

export const postDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
