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
  ctas?: { label: string; url: string }[];
}

export interface BarDatum {
  year: string;
  value: number;
  heightPx: number;
  color: string;
  opacity?: number;
}

export type CardColor = "teal" | "coral" | "none";

export interface StatCard {
  id: string;
  type: "stat";
  color: CardColor;
  eyebrow?: string;
  tag?: string;
  num: string;
  label: string;
  pills?: Pill[];
  modal: Modal;
}

export interface TextCard {
  id: string;
  type: "text";
  color: CardColor;
  tag?: string;
  textBig: string;
  textSub?: string;
  modal: Modal;
}

export interface DateCard {
  id: string;
  type: "date";
  color: CardColor;
  eyebrow?: string;
  date: string;
  dateLabel: string;
  dateSub?: string;
  modal: Modal;
}

export interface QuoteCard {
  id: string;
  type: "quote";
  color: CardColor;
  quoteLines: string[];
  quoteSub?: string;
  modal: Modal;
}

export interface ListCard {
  id: string;
  type: "list";
  color: CardColor;
  heading: string;
  items: { icon: string; text: string }[];
  subtext?: string;
  modal: Modal;
}

export interface ChartCard {
  id: string;
  type: "chart";
  color: CardColor;
  chartTitle: string;
  chartBadge?: string;
  bars: BarDatum[];
  modal: Modal;
}

export type BentoCard =
  | StatCard
  | TextCard
  | DateCard
  | QuoteCard
  | ListCard
  | ChartCard;
