export const RULER_ZOOMS = ["auto", 10, 20, 50, 100] as const;

export type RulerZoom = (typeof RULER_ZOOMS)[number];

const NICE_MULTIPLIERS = [1, 2, 2.5, 5] as const;

/**
 * Round a positive value up to a friendly ruler range (1, 2, 2.5, or 5 times
 * a power of ten). A zero or invalid length falls back to a 10 cm ruler.
 */
export function niceRulerRange(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 10;
  }

  const magnitude = 10 ** Math.floor(Math.log10(value));

  for (const multiple of NICE_MULTIPLIERS) {
    const candidate = multiple * magnitude;
    if (value <= candidate * (1 + 1e-12)) {
      return candidate;
    }
  }

  return 10 * magnitude;
}

/** Pick a range with a little breathing room after the current length. */
export function getAutoRange(lengthCm: number): number {
  if (!Number.isFinite(lengthCm) || lengthCm <= 0) {
    return 10;
  }

  return niceRulerRange(lengthCm * 1.05);
}

export interface RulerWindow {
  start: number;
  end: number;
  width: number;
}

/**
 * Auto mode starts at zero. A manual zoom keeps its width and pans to keep the
 * current length in view, which makes small-scale inspection useful.
 */
export function getRulerWindow(
  lengthCm: number,
  zoom: RulerZoom,
): RulerWindow {
  const safeLength =
    Number.isFinite(lengthCm) && lengthCm > 0 ? lengthCm : 0;
  const width = zoom === "auto" ? getAutoRange(safeLength) : zoom;
  let start = 0;

  if (zoom !== "auto" && safeLength > width * 0.85) {
    start = Math.max(0, safeLength - width * 0.75);
  }

  return {
    start,
    end: start + width,
    width,
  };
}

/** Position of the current length between the window edges, from 0 to 1. */
export function getMarkerFraction(
  lengthCm: number,
  start: number,
  end: number,
): number {
  const width = end - start;

  if (
    !Number.isFinite(lengthCm) ||
    !Number.isFinite(width) ||
    width <= 0
  ) {
    return 0;
  }

  return Math.min(1, Math.max(0, (lengthCm - start) / width));
}

/**
 * Pick the smallest tick step that keeps ticks at least `minPx` apart. This
 * keeps the ruler legible from a 1 cm close-up to a long 1,000 m scale.
 */
export function chooseTickStep(
  pxPerUnit: number,
  minPx: number,
  steps: readonly number[],
): number {
  if (!Number.isFinite(pxPerUnit) || pxPerUnit <= 0) {
    return steps[steps.length - 1] ?? 1;
  }

  return (
    steps.find((step) => step * pxPerUnit >= minPx) ??
    steps[steps.length - 1] ??
    1
  );
}
