import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Last real change, if later than `date` (e.g. published long after the work). Feeds the sitemap and dateModified. */
    updated: z.coerce.date().optional(),
    /** Where the post first appeared, if it was cross-posted. */
    linkedin: z.url().optional(),
    /** Drafts render in `astro dev` but are left out of the build. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
