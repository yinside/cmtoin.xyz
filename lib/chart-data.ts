import { cmToInches, formatDecimal } from "@/lib/conversions";

export const CM_TO_INCHES_PREVIEW = [
  1, 5, 10, 20, 50, 100, 150, 170, 180, 190, 200,
] as const;

export interface CmInchRow {
  cm: number;
  inches: string;
  inchesNumber: number;
}

export function getCmInchRows(start: number, end: number): CmInchRow[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const cm = start + index;
    const inchesNumber = cmToInches(cm);
    return {
      cm,
      inches: formatDecimal(inchesNumber, 4),
      inchesNumber,
    };
  });
}

export interface ChartRange {
  id: string;
  start: number;
  end: number;
  label: string;
}

export const CHART_RANGES: ChartRange[] = [
  { id: "cm-1-50", start: 1, end: 50, label: "1–50 cm" },
  { id: "cm-51-100", start: 51, end: 100, label: "51–100 cm" },
  { id: "cm-101-150", start: 101, end: 150, label: "101–150 cm" },
  { id: "cm-151-200", start: 151, end: 200, label: "151–200 cm" },
  { id: "cm-201-250", start: 201, end: 250, label: "201–250 cm" },
  { id: "cm-251-300", start: 251, end: 300, label: "251–300 cm" },
];

export function getChartRows(range: ChartRange): CmInchRow[] {
  return getCmInchRows(range.start, range.end);
}
