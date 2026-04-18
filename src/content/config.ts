import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['paper', 'talk', 'keynote', 'release', 'project', 'tutorial']),
    venue: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    fulltext: z.string().url().optional(),
    abstract: z.string().optional(),
    description: z.string().optional(),
    badge: z.string().optional(),
  }),
});

export const collections = { news, publications };
