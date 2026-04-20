import { defineCollection, z } from 'astro:content';

const activity = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['talk', 'keynote', 'paper', 'release', 'project']),
    date: z.date(),
    venue: z.string(),
    speaker: z.string().optional(),
    url: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    date: z.date(),
    doi: z.string().optional(),
    fulltext: z.string().url().optional(),
    badge: z.string().optional(),
    abstract: z.string(),
  }),
});

export const collections = { activity, publications };
