import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    interest: z.string().optional(),
    affiliation: z.string().optional(),
    affiliationShort: z.string().optional(),
    order: z.number(),
    featured: z.boolean().default(false),
    portrait: z.string().optional(),
    website: z.string().url().optional(),
  }),
});

const linkItem = z.object({
  title: z.string(),
  meta: z.string(),
  href: z.string(),
});

const meetings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/meetings" }),
  schema: z.object({
    no: z.string(),
    title: z.string(),
    date: z.string(),
    venue: z.string(),
    status: z.enum(["upcoming", "past"]).default("past"),
    description: z.string().optional(),
    format: z.string().optional(),
    attendance: z.number().optional(),
    open: z.boolean().default(false),
    image: z
      .object({
        src: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
    speaker: z
      .object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
      })
      .optional(),
    writing: z.array(linkItem).default([]),
    fieldNews: z.array(linkItem).default([]),
    industryNews: z.array(linkItem).default([]),
    questions: z.array(z.string()).default([]),
    poll: z
      .object({
        q: z.string(),
        results: z.array(z.object({ label: z.string(), n: z.number() })),
      })
      .optional(),
    tools: z.array(linkItem).default([]),
  }),
});

const newsCategory = z.enum(["Preprints", "Press", "Substack", "Datasets"]);

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    blurb: z.string(),
    source: z.string(),
    category: newsCategory,
    href: z.string(),
    filedAt: z.coerce.date(),
  }),
});

export const collections = { team, meetings, news };
