"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import styles from "./activity-heatmap-utils/activity-heatmap.module.css";

export interface ActivityDay { date: string; count: number; level: number }
export interface ActivityHeatmapProps {
  days: ActivityDay[]; label: string; period: string;
  unit?: { one: string; other: string }; thresholds?: [number, number, number];
  weekStartsOn?: 0 | 1; selectedDate?: string | null; onSelectDate?: (date: string) => void;
  actions?: ReactNode; locale?: string; className?: string;
}
type Model = { start: number; length: number; lead: number; weeks: number; total: number; counts: number[]; levels: number[]; thresholds: [number, number, number]; months: { col: number; label: string }[]; perLevel: number[] };
const DAY = 86400000;
const isoTime = (date: string) => Date.parse(`${date}T00:00:00Z`);
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);
const plural = (count: number, unit: { one: string; other: string }) => count === 1 ? unit.one : unit.other;

function makeModel(days: ActivityDay[], weekStartsOn: 0 | 1, thresholds: [number, number, number] | undefined, locale: string): Model {
  const valid = days.map((day) => isoTime(day.date)).filter(Number.isFinite);
  const start = valid.length ? Math.min(...valid) : isoTime("2025-01-01");
  const length = valid.length ? Math.round((Math.max(...valid) - start) / DAY) + 1 : 0;
  const counts = new Array<number>(length).fill(0);
  const levels = new Array<number>(length).fill(0);
  days.forEach((day) => { const index = Math.round((isoTime(day.date) - start) / DAY); if (index >= 0 && index < length) { counts[index] += Math.max(0, day.count); levels[index] = day.level; } });
  const lead = (new Date(start).getUTCDay() - weekStartsOn + 7) % 7;
  const weeks = Math.ceil((lead + length) / 7);
  const formatter = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  const months: Model["months"] = [];
  for (let i = 0; i < length; i++) { const date = new Date(start + i * DAY); if (i === 0 || date.getUTCDate() === 1) months.push({ col: Math.floor((lead + i) / 7), label: formatter.format(date) }); }
  if (months.length > 1 && months[1].col - months[0].col < 3) months.shift();
  const perLevel = [0, 0, 0, 0, 0]; levels.forEach((level) => perLevel[level]++);
  return { start, length, lead, weeks, total: counts.reduce((a, b) => a + b, 0), counts, levels, thresholds: thresholds ?? [1, 3, 6], months, perLevel };
}

export function ActivityHeatmap({ days, label, period, unit = { one: "contribution", other: "contributions" }, thresholds, weekStartsOn = 0, selectedDate = null, onSelectDate, actions, locale = "en-US", className }: ActivityHeatmapProps) {
  const reduced = useReducedMotion() ?? false;
  const id = useId();
  const model = useMemo(() => makeModel(days, weekStartsOn, thresholds, locale), [days, weekStartsOn, thresholds, locale]);
  const rootRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(plotRef, { once: true, amount: .3 });
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [tip, setTip] = useState<{ index: number; x: number; y: number; above: boolean } | null>(null);
  const tipIndex = tip?.index;
  const tipRef = useRef<HTMLDivElement>(null);
  const reveal = inView || reduced;
  const selectedIndex = selectedDate ? Math.round((isoTime(selectedDate) - model.start) / DAY) : -1;
  const selected = selectedIndex >= 0 && selectedIndex < model.length;
  const tabIndex = selected ? selectedIndex : Math.max(0, model.length - 1);
  const formats = useMemo(() => ({ long: new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }), short: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }), number: new Intl.NumberFormat(locale), weekday: new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }) }), [locale]);
  const showTip = (index: number, element: HTMLElement) => { const box = element.getBoundingClientRect(); setActiveCell(index); setTip({ index, x: box.left + box.width / 2, y: box.top, above: true }); };
  useLayoutEffect(() => {
    if (tipIndex === undefined) return;
    const place = () => {
      const cell = gridRef.current?.querySelector<HTMLElement>(`[data-index="${tipIndex}"]`);
      const bubble = tipRef.current;
      if (!cell || !bubble) return;
      const box = cell.getBoundingClientRect();
      const size = bubble.getBoundingClientRect();
      const left = Math.max(8, Math.min(box.left + box.width / 2 - size.width / 2, window.innerWidth - size.width - 8));
      const above = box.top >= size.height + 8;
      setTip((current) => current ? { ...current, x: left, y: above ? box.top - size.height - 8 : box.bottom + 8, above } : current);
    };
    place();
    const scroller = rootRef.current?.querySelector(`.${styles.scroller}`);
    const clearActive = () => setActiveCell(null);
    window.addEventListener("resize", place);
    scroller?.addEventListener("scroll", place);
    scroller?.addEventListener("scroll", clearActive);
    return () => { window.removeEventListener("resize", place); scroller?.removeEventListener("scroll", place); scroller?.removeEventListener("scroll", clearActive); };
  }, [tipIndex]);
  useLayoutEffect(() => {
    const scroller = rootRef.current?.querySelector<HTMLElement>(`.${styles.scroller}`);
    if (!scroller) return;
    const scrollEnd = () => { scroller.scrollLeft = scroller.scrollWidth; };
    scrollEnd();
    document.fonts?.ready.then(scrollEnd);
    window.addEventListener("resize", scrollEnd);
    return () => window.removeEventListener("resize", scrollEnd);
  }, [model.weeks]);
  useLayoutEffect(() => {
    const outside = (event: globalThis.PointerEvent) => { if (gridRef.current && !gridRef.current.contains(event.target as Node)) { setActiveCell(null); setTip(null); } };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const moveFocus = (index: number) => gridRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.focus();
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => { const index = Number((event.target as HTMLElement).dataset.index); if (!Number.isFinite(index)) return; const moves: Record<string, number> = { ArrowUp: index - 1, ArrowDown: index + 1, ArrowLeft: index - 7, ArrowRight: index + 7, Home: 0, End: model.length - 1 }; if (event.key in moves) { event.preventDefault(); moveFocus(Math.min(Math.max(moves[event.key], 0), model.length - 1)); } else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelectDate?.(iso(model.start + index * DAY)); } else if (event.key === "Escape") setTip(null); };
  const cells = Array.from({ length: 7 }, (_, row) => <div key={row} role="row" className={styles.row}>{Array.from({ length: model.weeks }, (_, col) => { const index = col * 7 + row - model.lead; if (index < 0 || index >= model.length) return <span key={col} className={styles.cell} data-empty aria-hidden="true" />; const date = new Date(model.start + index * DAY); const count = model.counts[index]; return <span key={col} role="gridcell" tabIndex={index === tabIndex ? 0 : -1} className={styles.cell} data-index={index} data-active={activeCell === index || undefined} data-level={model.levels[index]} aria-selected={onSelectDate ? index === selectedIndex : undefined} aria-label={`${count ? formats.number.format(count) : "No"} ${plural(count, unit)}, ${formats.long.format(date)}`} onPointerEnter={(event: PointerEvent<HTMLSpanElement>) => { if (event.pointerType === "mouse") showTip(index, event.currentTarget); }} onPointerDown={(event: PointerEvent<HTMLSpanElement>) => { if (event.pointerType !== "mouse") showTip(index, event.currentTarget); }} onClick={() => onSelectDate?.(iso(date.getTime()))} />; })}</div>);
  const ranges = [`no ${unit.other}`, `1-${model.thresholds[0]} ${unit.other}`, `${model.thresholds[0] + 1}-${model.thresholds[1]} ${unit.other}`, `${model.thresholds[1] + 1}-${model.thresholds[2]} ${unit.other}`, `${model.thresholds[2] + 1}+ ${unit.other}`];
  const caption = highlight === null ? "" : `${formats.number.format(model.perLevel[highlight])} ${model.perLevel[highlight] === 1 ? "day" : "days"} with ${ranges[highlight]}`;
  return <div ref={rootRef} className={[styles.root, className].filter(Boolean).join(" ")} onPointerLeave={(event) => { if (event.pointerType === "mouse") { setActiveCell(null); setTip(null); } }}>
    <div className={styles.header}><p className={styles.summary}><span className={styles.total}>{formats.number.format(model.total)} {plural(model.total, unit)}</span> <span className={styles.period}>in {period}</span><span className={styles.srOnly} role="status">{formats.number.format(model.total)} {plural(model.total, unit)} in {period}</span></p>{actions && <div className={styles.actions}>{actions}</div>}</div>
     <div className={styles.scroller}><div className={styles.canvas} style={{ "--weeks": model.weeks } as CSSProperties}><div className={styles.months} aria-hidden="true">{model.months.map((month, index) => <span key={`${month.col}-${index}`} className={styles.month} style={{ "--col": month.col } as CSSProperties}>{month.label}</span>)}</div><div className={styles.weekdays} aria-hidden="true">{Array.from({ length: 7 }, (_, row) => <span key={row} className={styles.weekday}>{row % 2 ? formats.weekday.format(new Date((3 + (row + weekStartsOn) % 7) * DAY)) : ""}</span>)}</div><div ref={plotRef} className={styles.plot}><div ref={gridRef} role="grid" aria-label={label} aria-readonly="true" aria-describedby={`${id}-legend`} className={styles.grid} data-reveal={reveal ? "revealing" : "hidden"} data-highlight={highlight ?? undefined} onKeyDown={onKeyDown}>{cells}</div></div></div></div>
    <div className={styles.legend}><span id={`${id}-legend`} className={styles.srOnly}>Darker squares mean more {unit.other}. Levels: {ranges.join(", ")}.</span><span className={styles.caption} aria-live="polite">{caption}</span><span className={styles.scale}><span className={styles.legendText}>Less</span><span className={styles.swatches} role="group" aria-label="Highlight days by level">{[0, 1, 2, 3, 4].map((level) => <button key={level} type="button" className={styles.swatch} data-level={level} aria-pressed={highlight === level} aria-label={`Highlight days with ${ranges[level]}`} onClick={() => setHighlight(highlight === level ? null : level)} onFocus={() => setHighlight(level)} onBlur={() => setHighlight(null)} />)}</span><span className={styles.legendText}>More</span></span></div>
     {typeof document !== "undefined" && createPortal(<AnimatePresence>{tip && <motion.div ref={tipRef} className={styles.tip} style={{ left: tip.x, top: tip.y }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? .1 : .18 }} aria-hidden="true"><div className={styles.bubble}><span className={styles.tipPrimary}>{model.counts[tip.index] ? `${formats.number.format(model.counts[tip.index])} ${plural(model.counts[tip.index], unit)}` : `No ${unit.other}`}</span><span className={styles.tipSecondary}>{formats.long.format(new Date(model.start + tip.index * DAY))}</span></div></motion.div>}</AnimatePresence>, document.body)}
  </div>;
}
export default ActivityHeatmap;
