/**
 * Length conversion engine.
 *
 * Every unit is defined by its exact relationship to the meter. Converting
 * through a single base unit keeps cross-unit math consistent and makes it
 * straightforward to add new units later.
 *
 * Exact reference values:
 *   1 inch  = 0.0254 meters (2.54 centimeters)
 *   1 foot  = 0.3048 meters (30.48 centimeters)
 */

export type LengthUnitId = "cm" | "in" | "ft" | "mm" | "m";

export interface LengthUnit {
  id: LengthUnitId;
  name: string;
  singular: string;
  symbol: string;
  meters: number;
}

export const LENGTH_UNITS: Record<LengthUnitId, LengthUnit> = {
  cm: {
    id: "cm",
    name: "Centimeters",
    singular: "centimeter",
    symbol: "cm",
    meters: 0.01,
  },
  in: {
    id: "in",
    name: "Inches",
    singular: "inch",
    symbol: "in",
    meters: 0.0254,
  },
  ft: {
    id: "ft",
    name: "Feet",
    singular: "foot",
    symbol: "ft",
    meters: 0.3048,
  },
  mm: {
    id: "mm",
    name: "Millimeters",
    singular: "millimeter",
    symbol: "mm",
    meters: 0.001,
  },
  m: {
    id: "m",
    name: "Meters",
    singular: "meter",
    symbol: "m",
    meters: 1,
  },
};

export const CM_PER_INCH = 2.54;
export const CM_PER_FOOT = 30.48;
export const MM_PER_INCH = 25.4;
export const METERS_PER_FOOT = 0.3048;

/** Convert any supported length unit into another using the exact factors. */
export function convertLength(
  value: number,
  from: LengthUnitId,
  to: LengthUnitId,
): number {
  if (!Number.isFinite(value)) {
    return Number.NaN;
  }
  return (value * LENGTH_UNITS[from].meters) / LENGTH_UNITS[to].meters;
}

/** The multiplicative factor for a given conversion pair. */
export function conversionFactor(from: LengthUnitId, to: LengthUnitId): number {
  return LENGTH_UNITS[from].meters / LENGTH_UNITS[to].meters;
}

export function cmToInches(centimeters: number): number {
  return centimeters / CM_PER_INCH;
}

export function inchesToCm(inches: number): number {
  return inches * CM_PER_INCH;
}

export function cmToFeet(centimeters: number): number {
  return centimeters / CM_PER_FOOT;
}

export function feetToCm(feet: number): number {
  return feet * CM_PER_FOOT;
}

/** Format a result for reading. Rounds to `maxDecimals` and trims trailing zeros. */
export function formatDecimal(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) {
    return "—";
  }

  if (value !== 0) {
    const roundingThreshold = 0.5 * 10 ** -maxDecimals;
    if (Math.abs(value) < roundingThreshold) {
      return `< ${formatDecimal(10 ** -maxDecimals, maxDecimals)}`;
    }
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(value);
}

/**
 * Format a number for an editable input: no grouping separators, up to
 * `maxDecimals` decimal places, trailing zeros removed.
 */
export function formatEditableNumber(value: number, maxDecimals = 6): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  const rounded = Number(value.toFixed(maxDecimals));
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxDecimals,
    useGrouping: false,
  }).format(rounded);
}

export interface FeetInchesResult {
  centimeters: number;
  totalInches: number;
  feet: number;
  inches: number;
  inchesDisplay: string;
  display: string;
}

/**
 * Convert centimeters to whole feet plus the remaining inches, rounded to
 * two decimal places. Handles the case where inches round up to 12.
 */
export function cmToFeetAndInches(centimeters: number): FeetInchesResult {
  const totalInches = centimeters / CM_PER_INCH;
  let feet = Math.floor(totalInches / 12);
  let inches = totalInches - feet * 12;

  const roundedInches = Math.round(inches * 100) / 100;
  if (roundedInches >= 12) {
    feet += 1;
    inches = 0;
  } else {
    inches = roundedInches;
  }

  const inchesDisplay = formatDecimal(inches, 2);

  return {
    centimeters,
    totalInches,
    feet,
    inches,
    inchesDisplay,
    display: `${formatDecimal(feet, 0)} ft ${inchesDisplay} in`,
  };
}

export interface FormulaInfo {
  equation: string;
  description: string;
}

const PAIR_FORMULAS: Record<string, FormulaInfo> = {
  "cm:in": {
    equation: "inches = centimeters ÷ 2.54",
    description: "One inch is exactly 2.54 centimeters, so divide by 2.54.",
  },
  "in:cm": {
    equation: "centimeters = inches × 2.54",
    description: "One inch is exactly 2.54 centimeters, so multiply by 2.54.",
  },
  "cm:ft": {
    equation: "feet = centimeters ÷ 30.48",
    description: "One foot is 30.48 centimeters, so divide by 30.48.",
  },
  "ft:cm": {
    equation: "centimeters = feet × 30.48",
    description: "One foot is 30.48 centimeters, so multiply by 30.48.",
  },
  "mm:in": {
    equation: "inches = millimeters ÷ 25.4",
    description: "One inch is exactly 25.4 millimeters, so divide by 25.4.",
  },
  "in:mm": {
    equation: "millimeters = inches × 25.4",
    description: "One inch is exactly 25.4 millimeters, so multiply by 25.4.",
  },
  "m:ft": {
    equation: "feet = meters ÷ 0.3048",
    description: "One foot is exactly 0.3048 meters, so divide by 0.3048.",
  },
  "ft:m": {
    equation: "meters = feet × 0.3048",
    description: "One foot is exactly 0.3048 meters, so multiply by 0.3048.",
  },
};

export function getFormula(
  from: LengthUnitId,
  to: LengthUnitId,
): FormulaInfo {
  return (
    PAIR_FORMULAS[`${from}:${to}`] ?? {
      equation: `${LENGTH_UNITS[to].symbol} = ${LENGTH_UNITS[from].symbol} × ${formatDecimal(
        conversionFactor(from, to),
        8,
      )}`,
      description: "Multiply by the conversion factor shown above.",
    }
  );
}

export const DEFAULT_PRESETS: Record<LengthUnitId, number[]> = {
  cm: [1, 5, 10, 15, 20, 50, 100, 150, 170, 180, 190, 200],
  in: [1, 2, 5, 10, 12, 20, 30, 36, 50, 100],
  ft: [1, 2, 3, 4, 5, 6, 8, 10],
  mm: [1, 5, 10, 25, 50, 100, 250, 500, 1000],
  m: [1, 2, 3, 5, 10, 20, 50, 100],
};

/** Presets for a conversion pair, based on the unit being entered. */
export function getPresets(
  from: LengthUnitId,
  overrides?: Partial<Record<LengthUnitId, number[]>>,
): number[] {
  return overrides?.[from] ?? DEFAULT_PRESETS[from];
}
