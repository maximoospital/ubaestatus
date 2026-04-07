// tipos de bento para el generador

export interface Pill {
  text: string;
  color?: "teal" | "coral" | "none";
}

export interface Modal {
  category: string;
  title: string;
  body: string;
  source?: string;
  media?: string;
  cta?: { label: string; url: string };
}

export interface BarDatum {
  year: string;
  value: number;
  heightPx: number;
  gradientFrom: string;
  gradientTo: string;
  opacity?: number;
}

export type CardColor = "teal" | "coral" | "none";

export interface HeroStatCard {
  id: string;
  type: "hero-stat";
  color: CardColor;
  eyebrow?: string;
  num: string;
  label: string;
  modal: Modal;
}

export interface DateEventCard {
  id: string;
  type: "date-event";
  color: CardColor;
  eyebrow?: string;
  date: string;
  dateLabel: string;
  dateSub?: string;
  modal: Modal;
}

export interface StatPillsCard {
  id: string;
  type: "stat-pills";
  color: CardColor;
  eyebrow?: string;
  num: string;
  label: string;
  pills: Pill[];
  modal: Modal;
}

export interface CategoryPillsCard {
  id: string;
  type: "category-pills";
  color: CardColor;
  categoryName: string;
  categoryFocus?: string;
  pills: Pill[];
  modal: Modal;
}

export interface IconListCard {
  id: string;
  type: "icon-list";
  color: CardColor;
  heading: string;
  items: { icon: string; text: string }[];
  subtext?: string;
  modal: Modal;
}

export interface TextBlockCard {
  id: string;
  type: "text-block";
  color: CardColor;
  tag?: string;
  textBig: string;
  textSub?: string;
  modal: Modal;
}

export interface StatTaggedCard {
  id: string;
  type: "stat-tagged";
  color: CardColor;
  tag: string;
  num: string;
  label: string;
  modal: Modal;
}

export interface QuoteBlockCard {
  id: string;
  type: "quote-block";
  color: CardColor;
  quoteLines: string[];
  quoteSub?: string;
  modal: Modal;
}

export interface EyebrowStatCard {
  id: string;
  type: "eyebrow-stat";
  color: CardColor;
  eyebrow?: string;
  num: string;
  label: string;
  modal: Modal;
}

export interface BarChartCard {
  id: string;
  type: "bar-chart";
  color: CardColor;
  chartTitle: string;
  chartBadge?: string;
  bars: BarDatum[];
  modal: Modal;
}

export type BentoCard =
  | HeroStatCard
  | DateEventCard
  | StatPillsCard
  | CategoryPillsCard
  | IconListCard
  | TextBlockCard
  | StatTaggedCard
  | QuoteBlockCard
  | EyebrowStatCard
  | BarChartCard;
