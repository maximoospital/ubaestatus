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
});

const bentoCardSchema = z.discriminatedUnion("type", [
  // 1. hero-stat  — full-width hero (situacion)
  z.object({
    id: z.string(),
    type: z.literal("hero-stat"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    num: z.string(),
    label: z.string(),
    modal: modalSchema,
  }),
  // 2. date-event — upcoming event (actividades)
  z.object({
    id: z.string(),
    type: z.literal("date-event"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    date: z.string(),
    dateLabel: z.string(),
    dateSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 3. stat-pills  — stat + pill tags (materias)
  z.object({
    id: z.string(),
    type: z.literal("stat-pills"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    num: z.string(),
    label: z.string(),
    pills: z.array(pillSchema),
    modal: modalSchema,
  }),
  // 4. category-pills — category name + focus + pills (por-que)
  z.object({
    id: z.string(),
    type: z.literal("category-pills"),
    color: z.enum(["teal", "coral", "none"]),
    categoryName: z.string(),
    categoryFocus: z.string().optional(),
    pills: z.array(pillSchema),
    modal: modalSchema,
  }),
  // 5. icon-list — heading + icon rows + subtext (que-podemos)
  z.object({
    id: z.string(),
    type: z.literal("icon-list"),
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
  // 6. text-block  — big text + sub (y-estudio, habia-plata)
  z.object({
    id: z.string(),
    type: z.literal("text-block"),
    color: z.enum(["teal", "coral", "none"]),
    tag: z.string().optional(),
    textBig: z.string(),
    textSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 7. stat-tagged — tag label + big num + label (agencia)
  z.object({
    id: z.string(),
    type: z.literal("stat-tagged"),
    color: z.enum(["teal", "coral", "none"]),
    tag: z.string(),
    num: z.string(),
    label: z.string(),
    modal: modalSchema,
  }),
  // 8. quote-block — italic quote lines + sub (ley)
  z.object({
    id: z.string(),
    type: z.literal("quote-block"),
    color: z.enum(["teal", "coral", "none"]),
    quoteLines: z.array(z.string()),
    quoteSub: z.string().optional(),
    modal: modalSchema,
  }),
  // 9. eyebrow-stat — eyebrow + num + label (conicet, extension, salarios, recibo)
  z.object({
    id: z.string(),
    type: z.literal("eyebrow-stat"),
    color: z.enum(["teal", "coral", "none"]),
    eyebrow: z.string().optional(),
    num: z.string(),
    label: z.string(),
    modal: modalSchema,
  }),
  // 10. bar-chart  — bar chart (presupuesto)
  z.object({
    id: z.string(),
    type: z.literal("bar-chart"),
    color: z.enum(["teal", "coral", "none"]),
    chartTitle: z.string(),
    chartBadge: z.string().optional(),
    bars: z.array(
      z.object({
        year: z.string(),
        value: z.number(),
        heightPx: z.number(),
        gradientFrom: z.string(),
        gradientTo: z.string(),
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
      timer: z.enum(["active", "paused"]).default("active"),
      date: z.string().optional(),
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
