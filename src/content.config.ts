import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pillSchema = z.object({
  text: z.string(),
  color: z.enum(["teal", "coral", "none"]).optional(),
});

const modalSchema = z.object({
  category: z.string(),
  title: z.string(),
  body: z.string(),
  source: z.string().optional(),
  media: z.string().optional(),
  cta: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  ctas: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    )
    .optional(),
});

const bentoCardSchema = z.discriminatedUnion("type", [
  // 1. stat — number/value highlight, with optional eyebrow, tag, or pills
  z.object({
    id: z.string(),
    type: z.literal("stat"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    tag: z.string().optional(),
    num: z.string(),
    label: z.string(),
    pills: z.array(pillSchema).optional(),
    modal: modalSchema,
  }),
  // 2. date — upcoming event with a prominent date
  z.object({
    id: z.string(),
    type: z.literal("date"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    date: z.string(),
    dateLabel: z.string(),
    dateSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 3. text — big text copy with optional tag and subtitle
  z.object({
    id: z.string(),
    type: z.literal("text"),
    color: z.enum(["teal", "coral", "none"]),
    tag: z.string().optional(),
    textBig: z.string(),
    textSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 4. quote — italic quote lines with optional subtitle
  z.object({
    id: z.string(),
    type: z.literal("quote"),
    color: z.enum(["teal", "coral", "none"]),
    quoteLines: z.array(z.string()),
    quoteSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 5. list — heading + icon/text rows + optional subtext
  z.object({
    id: z.string(),
    type: z.literal("list"),
    color: z.enum(["teal", "coral", "none"]),
    heading: z.string(),
    items: z.array(
      z.object({
        icon: z.string(),
        text: z.string(),
      })
    ),
    subtext: z.string().optional(),
    modal: modalSchema,
  }),
  // 6. chart — bar chart with title and optional badge
  z.object({
    id: z.string(),
    type: z.literal("chart"),
    color: z.enum(["teal", "coral", "none"]),
    chartTitle: z.string(),
    chartBadge: z.string().optional(),
    bars: z.array(
      z.object({
        year: z.string(),
        value: z.number(),
        heightPx: z.number(),
        color: z.string(),
        opacity: z.number().optional(),
      })
    ),
    modal: modalSchema,
  }),
]);

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
      title: z.string(),
      shareUrl: z.string(),
      shareText: z.string(),
    }),
    hero: z.object({
      subtitle: z.string(),
      timer1: z.enum(["active", "paused"]).default("active"),
      date1: z.string().optional(),
      label1: z.string().optional(),
      mode1: z.enum(["countup", "countdown"]).default("countup"),
      timer2: z.enum(["active", "paused"]).default("active"),
      date2: z.string().optional(),
      label2: z.string().optional(),
      mode2: z.enum(["countup", "countdown"]).default("countup"),
      timer3: z.enum(["active", "paused"]).default("active"),
      date3: z.string().optional(),
      label3: z.string().optional(),
      mode3: z.enum(["countup", "countdown"]).default("countup"),
    }),
    bento: z
      .object({
        cards: z.array(bentoCardSchema),
      })
      .optional(),
    accordion: z.any().optional(),
    calendar: z.any().optional(),
    action: z.any().optional(),
    contact: z.any().optional(),
  }),
});

export const collections = { content };
