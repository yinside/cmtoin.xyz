import test from "node:test";
import assert from "node:assert/strict";

import {
  cmToFeet,
  cmToFeetAndInches,
  cmToInches,
  convertLength,
  formatDecimal,
  formatEditableNumber,
  getFormula,
  getPresets,
  inchesToCm,
  LENGTH_UNITS,
} from "../lib/conversions.ts";
import { CHART_RANGES, getCmInchRows } from "../lib/chart-data.ts";
import { parsePositiveNumber } from "../lib/number-input.ts";

const closeTo = (actual, expected, tolerance = 1e-10) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
};

test("exact unit definitions", () => {
  assert.equal(LENGTH_UNITS.in.meters, 0.0254);
  assert.equal(LENGTH_UNITS.ft.meters, 0.3048);
  assert.equal(LENGTH_UNITS.cm.meters, 0.01);
  assert.equal(LENGTH_UNITS.mm.meters, 0.001);
  assert.equal(LENGTH_UNITS.m.meters, 1);
});

test("centimeters and inches use the exact 2.54 factor", () => {
  assert.equal(cmToInches(2.54), 1);
  assert.equal(inchesToCm(1), 2.54);
  assert.equal(convertLength(1, "in", "cm"), 2.54);
  closeTo(convertLength(1, "cm", "in"), 1 / 2.54);

  closeTo(cmToInches(10), 3.937007874015748);
  closeTo(cmToInches(180), 70.86614173228347);
  closeTo(convertLength(180, "cm", "in"), 70.86614173228347);
});

test("feet, millimeters, and meters use exact factors", () => {
  assert.equal(cmToFeet(30.48), 1);
  assert.equal(convertLength(30.48, "cm", "ft"), 1);
  assert.equal(convertLength(1, "ft", "cm"), 30.48);
  assert.equal(convertLength(25.4, "mm", "in"), 1);
  assert.equal(convertLength(1, "in", "mm"), 25.4);
  assert.equal(convertLength(0.3048, "m", "ft"), 1);
  assert.equal(convertLength(1, "ft", "m"), 0.3048);

  closeTo(convertLength(100, "mm", "in"), 3.937007874015748);
  closeTo(convertLength(10, "m", "ft"), 32.80839895013123);
  closeTo(convertLength(1, "m", "ft"), 3.280839895013123);
});

test("round trips preserve the original value", () => {
  for (const value of [0, 0.0001, 1, 2.54, 10, 180, 12345.6789]) {
    closeTo(
      convertLength(convertLength(value, "cm", "in"), "in", "cm"),
      value,
      1e-9,
    );
    closeTo(
      convertLength(convertLength(value, "cm", "ft"), "ft", "cm"),
      value,
      1e-9,
    );
    closeTo(
      convertLength(convertLength(value, "mm", "in"), "in", "mm"),
      value,
      1e-9,
    );
  }
});

test("formatDecimal rounds to four places and trims trailing zeros", () => {
  assert.equal(formatDecimal(3.937007874, 4), "3.937");
  assert.equal(formatDecimal(70.86614173228347, 4), "70.8661");
  assert.equal(formatDecimal(39.37007874015748, 4), "39.3701");
  assert.equal(formatDecimal(1, 4), "1");
  assert.equal(formatDecimal(1.5, 4), "1.5");
  assert.equal(formatDecimal(0, 4), "0");
  assert.equal(formatDecimal(1000, 0), "1,000");
  assert.equal(formatDecimal(0.00005, 4), "0.0001");
  assert.equal(formatDecimal(0.000001, 4), "< 0.0001");
  assert.equal(formatDecimal(Number.NaN), "—");
});

test("formatEditableNumber produces input-safe values", () => {
  assert.equal(
    formatEditableNumber(70.86614173228347, 6),
    "70.866142",
  );
  assert.equal(formatEditableNumber(3.937007874, 6), "3.937008");
  assert.equal(formatEditableNumber(12, 6), "12");
  assert.equal(formatEditableNumber(0.1 + 0.2, 6), "0.3");
});

test("cmToFeetAndInches matches the documented 180 cm example", () => {
  const result = cmToFeetAndInches(180);
  assert.equal(result.feet, 5);
  assert.equal(result.inchesDisplay, "10.87");
  assert.equal(result.display, "5 ft 10.87 in");
  closeTo(result.totalInches, 70.86614173228347);
});

test("height conversions for common values", () => {
  assert.equal(cmToFeetAndInches(150).display, "4 ft 11.06 in");
  assert.equal(cmToFeetAndInches(152).display, "4 ft 11.84 in");
  assert.equal(cmToFeetAndInches(160).display, "5 ft 2.99 in");
  assert.equal(cmToFeetAndInches(170).display, "5 ft 6.93 in");
  assert.equal(cmToFeetAndInches(190).display, "6 ft 2.8 in");
  assert.equal(cmToFeetAndInches(200).display, "6 ft 6.74 in");
  assert.equal(cmToFeetAndInches(0).display, "0 ft 0 in");
  assert.equal(cmToFeetAndInches(152.4).display, "5 ft 0 in");
  assert.equal(cmToFeetAndInches(182.88).display, "6 ft 0 in");
});

test("height conversion carries 12 rounded inches into a foot", () => {
  const result = cmToFeetAndInches(182.87);
  assert.equal(result.feet, 6);
  assert.equal(result.inchesDisplay, "0");
  assert.equal(result.display, "6 ft 0 in");
});

test("formula text for supported pairs", () => {
  assert.equal(
    getFormula("cm", "in").equation,
    "inches = centimeters ÷ 2.54",
  );
  assert.equal(
    getFormula("in", "cm").equation,
    "centimeters = inches × 2.54",
  );
  assert.equal(getFormula("cm", "ft").equation, "feet = centimeters ÷ 30.48");
  assert.equal(getFormula("mm", "in").equation, "inches = millimeters ÷ 25.4");
  assert.equal(getFormula("m", "ft").equation, "feet = meters ÷ 0.3048");
});

test("centimeter presets include every required value", () => {
  assert.deepEqual(getPresets("cm"), [
    1, 5, 10, 15, 20, 50, 100, 150, 170, 180, 190, 200,
  ]);
});

test("positive number parser handles valid and invalid input", () => {
  assert.deepEqual(parsePositiveNumber(""), { value: null, error: null });
  assert.deepEqual(parsePositiveNumber("0"), { value: 0, error: null });
  assert.deepEqual(parsePositiveNumber("2.54"), {
    value: 2.54,
    error: null,
  });
  assert.deepEqual(parsePositiveNumber("001.5"), {
    value: 1.5,
    error: null,
  });
  assert.deepEqual(parsePositiveNumber("1."), { value: 1, error: null });
  assert.equal(parsePositiveNumber(".").error !== null, true);
  assert.equal(parsePositiveNumber("-1").error !== null, true);
  assert.equal(parsePositiveNumber("1,000").error !== null, true);
  assert.equal(parsePositiveNumber("1e3").error !== null, true);
  assert.equal(parsePositiveNumber("abc").error !== null, true);
  assert.equal(parsePositiveNumber("9".repeat(400)).error !== null, true);
});

test("full chart covers every whole centimeter from 1 to 300", () => {
  const totalRows = CHART_RANGES.reduce(
    (total, range) => total + getCmInchRows(range.start, range.end).length,
    0,
  );
  assert.equal(totalRows, 300);

  const rows = getCmInchRows(1, 300);
  assert.equal(rows.length, 300);
  assert.equal(rows[0].cm, 1);
  assert.equal(rows[0].inches, "0.3937");
  assert.equal(rows[179].cm, 180);
  assert.equal(rows[179].inches, "70.8661");
  assert.equal(rows[299].cm, 300);
  assert.equal(rows[299].inches, "118.1102");
});

test("preview chart values are accurate", () => {
  const rows = getCmInchRows(1, 200);
  const byCm = new Map(rows.map((row) => [row.cm, row.inches]));
  assert.equal(byCm.get(1), "0.3937");
  assert.equal(byCm.get(10), "3.937");
  assert.equal(byCm.get(100), "39.3701");
  assert.equal(byCm.get(150), "59.0551");
  assert.equal(byCm.get(180), "70.8661");
  assert.equal(byCm.get(200), "78.7402");
});
