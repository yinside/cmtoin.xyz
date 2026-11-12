"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Ruler } from "lucide-react";
import { formatDecimal } from "@/lib/conversions";
import {
  chooseTickStep,
  getMarkerFraction,
  getRulerWindow,
  RULER_ZOOMS,
  type RulerZoom,
} from "@/lib/ruler";

interface ConversionRulerProps {
  lengthCm: number;
  valueLabel: string | null;
  resultLabel: string | null;
  active: boolean;
  onValueChange: (centimeters: number) => void;
}

const RULER_HEIGHT = 160;
const RULER_TOP = 80;
const RULER_LEFT = 52;
const RULER_RIGHT_PADDING = 12;

const INDUSTRIAL = {
  border: "#334155",
  topBand: "#0F172A",
  bottomBand: "#1E293B",
  divider: "#334155",
  cmLabel: "#FBBF24",
  inLabel: "#CBD5E1",
  tickMinor: "#64748B",
  tickMajor: "#94A3B8",
  tickLabel: "#E2E8F0",
  cmText: "#F8FAFC",
  inchText: "#E2E8F0",
  marker: "#F97316",
  markerFill: "#FFF7ED",
} as const;

const CM_TICK_STEPS = [
  0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500,
  1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000,
] as const;

const CM_LABEL_STEPS = [
  0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000,
  10000, 20000, 50000, 100000, 200000,
] as const;

const INCH_TICK_STEPS = [
  0.0625, 0.125, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000,
  2000, 5000,
] as const;

const INCH_LABEL_STEPS = [
  0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000,
] as const;

function formatTickLabel(value: number, step: number, unit: "cm" | "in") {
  const maximumFractionDigits =
    step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  const text = new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    useGrouping: true,
  }).format(value);

  return unit === "in" ? `${text}"` : text;
}

interface Tick {
  key: string;
  value: number;
  isLabel: boolean;
  isMajor: boolean;
}

function buildTicks(
  start: number,
  end: number,
  step: number,
  labelStep: number,
): Tick[] {
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    !Number.isFinite(step) ||
    step <= 0 ||
    end <= start
  ) {
    return [];
  }

  let tickStep = step;
  let labelEvery = Math.max(1, Math.round(labelStep / step));

  // Safety valve for extremely large lengths: never render thousands of ticks.
  if ((end - start) / tickStep > 220) {
    while ((end - start) / tickStep > 220) {
      tickStep *= 2;
    }
    labelEvery = Math.max(
      labelEvery,
      Math.round((end - start) / tickStep / 8),
    );
  }

  const firstIndex = Math.ceil(start / tickStep - 1e-9);
  const lastIndex = Math.floor(end / tickStep + 1e-9);

  if (!Number.isFinite(firstIndex) || !Number.isFinite(lastIndex)) {
    return [];
  }

  const labelInterval = tickStep * labelEvery;
  const ticks: Tick[] = [];

  for (let index = firstIndex; index <= lastIndex; index += 1) {
    const rawValue = index * tickStep;
    const value = Math.abs(rawValue) < 1e-9 ? 0 : rawValue;
    const isLabel =
      Math.abs(value / labelInterval - Math.round(value / labelInterval)) <
      1e-6;

    ticks.push({
      key: value.toFixed(6),
      value,
      isLabel,
      isMajor: Math.abs(value - Math.round(value)) < 1e-6,
    });
  }

  return ticks;
}

export function ConversionRuler({
  lengthCm,
  valueLabel,
  resultLabel,
  active,
  onValueChange,
}: ConversionRulerProps) {
  const [zoom, setZoom] = useState<RulerZoom>("auto");
  const [width, setWidth] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const frozenWindowRef = useRef<ReturnType<typeof getRulerWindow> | null>(
    null,
  );
  const rawId = useId();
  const baseId = `ruler-${rawId.replaceAll(":", "")}`;
  const titleId = `${baseId}-title`;
  const clipId = `${baseId}-clip`;

  const safeLength = Number.isFinite(lengthCm) ? lengthCm : 0;
  const computedWindow = getRulerWindow(safeLength, zoom);
  const scaleWindow =
    isSliding && frozenWindowRef.current
      ? frozenWindowRef.current
      : computedWindow;
  const rangeLabel = `${formatDecimal(scaleWindow.start, 2)}–${formatDecimal(
    scaleWindow.end,
    2,
  )} cm`;
  const markerFraction = getMarkerFraction(
    safeLength,
    scaleWindow.start,
    scaleWindow.end,
  );

  const clampedLength = Math.min(
    scaleWindow.end,
    Math.max(scaleWindow.start, safeLength),
  );
  const sliderStep =
    scaleWindow.width <= 2
      ? 0.01
      : scaleWindow.width <= 20
        ? 0.1
        : scaleWindow.width <= 100
          ? 0.5
          : 1;

  const rulerWidth = Math.max(0, width - RULER_LEFT - RULER_RIGHT_PADDING);
  const pxPerCm = rulerWidth > 0 ? rulerWidth / scaleWindow.width : 0;
  const pxPerInch = pxPerCm * 2.54;

  const cmTickStep = chooseTickStep(pxPerCm, 5.5, CM_TICK_STEPS);
  const cmLabelStep = chooseTickStep(pxPerCm, 46, CM_LABEL_STEPS);
  const inchTickStep = chooseTickStep(pxPerInch, 5.5, INCH_TICK_STEPS);
  const inchLabelStep = chooseTickStep(pxPerInch, 46, INCH_LABEL_STEPS);

  const cmTicks = useMemo(
    () =>
      buildTicks(
        scaleWindow.start,
        scaleWindow.end,
        cmTickStep,
        cmLabelStep,
      ),
    [scaleWindow.start, scaleWindow.end, cmTickStep, cmLabelStep],
  );

  const inchTicks = useMemo(
    () =>
      buildTicks(
        scaleWindow.start / 2.54,
        scaleWindow.end / 2.54,
        inchTickStep,
        inchLabelStep,
      ),
    [scaleWindow.start, scaleWindow.end, inchTickStep, inchLabelStep],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setWidth(element.clientWidth);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const beginSlide = () => {
    frozenWindowRef.current = getRulerWindow(safeLength, zoom);
    setIsSliding(true);
  };

  const endSlide = () => {
    setIsSliding(false);
    frozenWindowRef.current = null;
  };

  const markerX =
    rulerWidth > 0
      ? RULER_LEFT + markerFraction * rulerWidth
      : RULER_LEFT;

  const cmTickX = (value: number) =>
    RULER_LEFT +
    ((value - scaleWindow.start) / scaleWindow.width) * rulerWidth;
  const inchTickX = (valueInches: number) =>
    RULER_LEFT +
    ((valueInches - scaleWindow.start / 2.54) /
      (scaleWindow.width / 2.54)) *
      rulerWidth;

  const labelAnchor = (x: number) => {
    if (x <= RULER_LEFT + 16) return "start";
    if (x >= width - RULER_RIGHT_PADDING - 16) return "end";
    return "middle";
  };

  const ariaLabel =
    active && valueLabel && resultLabel
      ? `Centimeter and inch ruler showing ${valueLabel} equals ${resultLabel}, on a scale from ${rangeLabel}.`
      : `Centimeter and inch ruler from ${rangeLabel}. Enter a value to place a marker.`;

  return (
    <figure
      className="mt-4 rounded-2xl border border-t-2 border-slate-700 border-t-amber-500/80 bg-slate-900 p-3.5 shadow-sm select-none sm:p-4"
      aria-labelledby={titleId}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Ruler
              className="h-3.5 w-3.5 text-amber-400"
              aria-hidden="true"
            />
            <p
              id={titleId}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-amber-400"
            >
              Visual scale
            </p>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-100">
            {active && valueLabel && resultLabel
              ? `${valueLabel} = ${resultLabel}`
              : "Enter a value to place it on the ruler"}
          </p>
          <p className="mt-0.5 text-[0.65rem] leading-5 text-slate-400">
            Drag the ruler or use arrow keys to set a value.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-slate-400">
            Zoom
          </span>
          <div
            role="group"
            aria-label="Ruler zoom"
            className="inline-flex rounded-lg border border-slate-700 bg-slate-950 p-0.5"
          >
            {RULER_ZOOMS.map((option) => {
              const selected = zoom === option;
              const label = option === "auto" ? "Auto" : `${option}`;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setZoom(option)}
                  aria-pressed={selected}
                  aria-label={
                    option === "auto"
                      ? "Automatically fit the scale"
                      : `Show a ${option} centimeter window`
                  }
                  className={`min-h-7 rounded-md px-2 py-1 text-[0.68rem] font-semibold transition-colors focus-visible:outline-amber-400 ${
                    selected
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative mt-3 h-[160px] overflow-hidden rounded-xl border border-slate-700 bg-slate-950 focus-within:ring-2 focus-within:ring-amber-400/80 focus-within:ring-offset-2 focus-within:ring-offset-slate-900"
      >
        {width > 0 ? (
          <svg
            role="img"
            aria-label={ariaLabel}
            width={width}
            height={RULER_HEIGHT}
            viewBox={`0 0 ${width} ${RULER_HEIGHT}`}
            className="pointer-events-none block font-sans tabular-nums"
          >
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y="0"
                  width={width}
                  height={RULER_HEIGHT}
                  rx="11"
                />
              </clipPath>
            </defs>

            <g clipPath={`url(#${clipId})`}>
              <rect
                x="0"
                y="0"
                width={width}
                height={RULER_TOP}
                fill={INDUSTRIAL.topBand}
              />
              <rect
                x="0"
                y={RULER_TOP}
                width={width}
                height={RULER_HEIGHT - RULER_TOP}
                fill={INDUSTRIAL.bottomBand}
              />

              {active ? (
                <rect
                  x={RULER_LEFT}
                  y="0"
                  width={Math.max(0, markerX - RULER_LEFT)}
                  height={RULER_HEIGHT}
                  fill={INDUSTRIAL.marker}
                  opacity="0.07"
                />
              ) : null}

              {active ? (
                <>
                  <line
                    x1={markerX}
                    y1="7"
                    x2={markerX}
                    y2={RULER_HEIGHT - 7}
                    stroke={INDUSTRIAL.marker}
                    strokeWidth="2"
                  />
                  <circle
                    cx={markerX}
                    cy="8"
                    r="4.5"
                    fill={INDUSTRIAL.markerFill}
                    stroke={INDUSTRIAL.marker}
                    strokeWidth="2"
                  />
                </>
              ) : null}

              <text
                x="14"
                y="47"
                fontSize="13"
                fontWeight="700"
                fill={INDUSTRIAL.cmLabel}
                letterSpacing="1"
              >
                CM
              </text>

              {cmTicks.map((tick) => {
                const x = cmTickX(tick.value);
                const height = tick.isLabel ? 16 : tick.isMajor ? 10 : 5;

                return (
                  <g key={`cm-${tick.key}`}>
                    <line
                      x1={x}
                      y1={RULER_TOP}
                      x2={x}
                      y2={RULER_TOP - height}
                      stroke={tick.isLabel ? INDUSTRIAL.tickLabel : tick.isMajor ? INDUSTRIAL.tickMajor : INDUSTRIAL.tickMinor}
                      strokeWidth="1"
                    />
                    {tick.isLabel ? (
                      <text
                        x={x}
                        y="47"
                        textAnchor={labelAnchor(x)}
                        fontSize="11"
                        fontWeight="600"
                        fill={INDUSTRIAL.cmText}
                      >
                        {formatTickLabel(tick.value, cmLabelStep, "cm")}
                      </text>
                    ) : null}
                  </g>
                );
              })}

              <line
                x1="0"
                y1={RULER_TOP}
                x2={width}
                y2={RULER_TOP}
                stroke={INDUSTRIAL.divider}
                strokeWidth="1"
              />

              <text
                x="14"
                y="128"
                fontSize="13"
                fontWeight="700"
                fill={INDUSTRIAL.inLabel}
                letterSpacing="1"
              >
                IN
              </text>

              {inchTicks.map((tick) => {
                const x = inchTickX(tick.value);
                const height = tick.isLabel ? 16 : tick.isMajor ? 10 : 5;

                return (
                  <g key={`in-${tick.key}`}>
                    <line
                      x1={x}
                      y1={RULER_TOP}
                      x2={x}
                      y2={RULER_TOP + height}
                      stroke={tick.isLabel ? INDUSTRIAL.tickLabel : tick.isMajor ? INDUSTRIAL.tickMajor : INDUSTRIAL.tickMinor}
                      strokeWidth="1"
                    />
                    {tick.isLabel ? (
                      <text
                        x={x}
                        y="129"
                        textAnchor={labelAnchor(x)}
                        fontSize="10.5"
                        fontWeight="600"
                        fill={INDUSTRIAL.inchText}
                      >
                        {formatTickLabel(
                          tick.value,
                          inchLabelStep,
                          "in",
                        )}
                      </text>
                    ) : null}
                  </g>
                );
              })}

            </g>

            <rect
              x="0.5"
              y="0.5"
              width={Math.max(0, width - 1)}
              height={RULER_HEIGHT - 1}
              rx="11"
              fill="none"
              stroke={INDUSTRIAL.border}
            />
          </svg>
        ) : null}

        <input
          type="range"
          min={scaleWindow.start}
          max={scaleWindow.end}
          step={sliderStep}
          value={clampedLength}
          onChange={(event) =>
            onValueChange(Number(event.currentTarget.value))
          }
          onPointerDown={beginSlide}
          onPointerUp={endSlide}
          onPointerCancel={endSlide}
          onLostPointerCapture={endSlide}
          onBlur={endSlide}
          aria-label="Set the length with the centimeter and inch ruler"
          aria-valuetext={`${formatDecimal(clampedLength, 2)} centimeters, ${formatDecimal(clampedLength / 2.54, 2)} inches`}
          className="absolute inset-y-0 left-[52px] right-[12px] z-10 h-full w-auto cursor-ew-resize touch-none appearance-none bg-transparent p-0 opacity-0 focus-visible:outline-none"
          title="Drag to set a value"
        />
      </div>

      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[0.65rem] leading-5 text-slate-400">
        <span>Drag to set · Scale: {rangeLabel}</span>
        <span>1 in = 2.54 cm</span>
      </figcaption>
      <span className="sr-only">
        {active && valueLabel && resultLabel
          ? `Marker at ${valueLabel}, which equals ${resultLabel}.`
          : "The ruler will mark the converted length once you enter a value."}
      </span>
    </figure>
  );
}
