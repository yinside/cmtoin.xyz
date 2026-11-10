export interface ParsedNumberInput {
  value: number | null;
  error: string | null;
}

/**
 * Parse a user-entered length value. Only non-negative finite decimals are
 * accepted. The field is intentionally text-based so users can type values
 * like "1." or "0.5" without the browser reformatting or scrolling the page.
 */
export function parsePositiveNumber(raw: string): ParsedNumberInput {
  const trimmed = raw.trim();

  if (trimmed === "") {
    return { value: null, error: null };
  }

  if (trimmed === "." || !/^\d*\.?\d*$/.test(trimmed)) {
    return {
      value: null,
      error: "Enter a number using digits and a decimal point.",
    };
  }

  const value = Number(trimmed);

  if (!Number.isFinite(value)) {
    return {
      value: null,
      error: "That number is too large to convert.",
    };
  }

  if (value < 0) {
    return {
      value: null,
      error: "Enter zero or a positive number.",
    };
  }

  return { value, error: null };
}
