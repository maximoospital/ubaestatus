import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from 'astro/zod' 

const content = defineCollection({
  loader: glob({
    base: "./src/content",
    pattern: "**/*.md",
  }),
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
      author: z.string(),
      copyright: z.string(),
      image: z.string().optional(),
    }),
    header: z.object({
      title: z.string()
    })
  }),
});

export const collections = { content };