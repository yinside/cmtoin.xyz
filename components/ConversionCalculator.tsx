"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  ArrowDownUp,
  Check,
  Copy,
  Eraser,
  Info,
  Ruler,
} from "lucide-react";
import {
  convertLength,
  formatDecimal,
  formatEditableNumber,
  getFormula,
  getPresets,
  LENGTH_UNITS,
  type LengthUnitId,
} from "@/lib/conversions";
import { parsePositiveNumber } from "@/lib/number-input";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface ConversionCalculatorProps {
  from: LengthUnitId;
  to: LengthUnitId;
  initialValue?: string;
  presets?: Partial<Record<LengthUnitId, number[]>>;
  id?: string;
  className?: string;
  title?: string;
  description?: string;
}

function valueForSwap(value: number): string {
  const rounded = formatEditableNumber(value, 6);
  if (Number(rounded) === 0 && value > 0) {
    return formatEditableNumber(value, 12);
  }
  return rounded;
}

export function ConversionCalculator({
  from,
  to,
  initialValue = "10",
  presets,
  id = "calculator",
  className = "",
  title,
  description,
}: ConversionCalculatorProps) {
  const [pair, setPair] = useState<{ from: LengthUnitId; to: LengthUnitId }>({
    from,
    to,
  });
  const [rawValue, setRawValue] = useState(initialValue);
  const { copyState, copy, reset: resetCopyState } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();

  const inputId = `${id}-input-${generatedId}`;
  const helpId = `${id}-help-${generatedId}`;
  const errorId = `${id}-error-${generatedId}`;
  const headingId = `${id}-heading-${generatedId}`;

  const fromUnit = LENGTH_UNITS[pair.from];
  const toUnit = LENGTH_UNITS[pair.to];
  const formula = getFormula(pair.from, pair.to);

  const parsed = useMemo(() => parsePositiveNumber(rawValue), [rawValue]);
  const converted = useMemo(
    () =>
      parsed.value === null
        ? null
        : convertLength(parsed.value, pair.from, pair.to),
    [parsed.value, pair.from, pair.to],
  );

  const isOutOfRange = converted !== null && !Number.isFinite(converted);
  const displayValue =
    converted === null || isOutOfRange ? null : formatDecimal(converted, 4);
  const presetValues = useMemo(
    () => getPresets(pair.from, presets),
    [presets, pair.from],
  );

  const copyText = useMemo(() => {
    if (converted === null || !Number.isFinite(converted)) {
      return null;
    }
    const value =
      displayValue?.startsWith("<") ?? false
        ? formatEditableNumber(converted, 10)
        : displayValue;
    return `${value} ${toUnit.symbol}`;
  }, [converted, displayValue, toUnit.symbol]);

  const summary =
    parsed.value !== null && displayValue !== null && !isOutOfRange
      ? `${formatDecimal(parsed.value, 4)} ${
          parsed.value === 1 ? fromUnit.singular : fromUnit.name.toLowerCase()
        } equals ${displayValue} ${
          converted === 1 ? toUnit.singular : toUnit.name.toLowerCase()
        }.`
      : null;

  const handleCopy = useCallback(() => {
    if (copyText) {
      void copy(copyText);
    }
  }, [copy, copyText]);

  const handleClear = useCallback(() => {
    setRawValue("");
    resetCopyState();
    inputRef.current?.focus();
  }, [resetCopyState]);

  const handleSwap = useCallback(() => {
    setPair((current) => ({ from: current.to, to: current.from }));
    if (converted !== null && Number.isFinite(converted)) {
      setRawValue(valueForSwap(converted));
    }
    resetCopyState();
  }, [converted, resetCopyState]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRawValue(event.target.value);
      if (copyState !== "idle") {
        resetCopyState();
      }
    },
    [copyState, resetCopyState],
  );

  const handlePreset = useCallback(
    (value: number) => {
      setRawValue(formatEditableNumber(value, 6));
      resetCopyState();
      inputRef.current?.focus();
    },
    [resetCopyState],
  );

  const cardTitle =
    title ?? `${fromUnit.name} to ${toUnit.name} Converter`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 ${className}`}
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-lift sm:p-4">
        <div className="rounded-[1.35rem] border border-slate-100 bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand-700">
                <Ruler className="h-3 w-3" aria-hidden="true" />
                {fromUnit.symbol.toUpperCase()} → {toUnit.symbol.toUpperCase()}
              </div>
              <h2
                id={headingId}
                className="mt-3 text-balance text-lg font-semibold tracking-[-0.02em] text-navy sm:text-xl"
              >
                {cardTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description ?? "Enter a value for an instant, accurate result."}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor={inputId}
                className="text-sm font-semibold text-slate-700"
              >
                {fromUnit.name}{" "}
                <span className="font-normal text-slate-500">
                  ({fromUnit.symbol})
                </span>
              </label>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={rawValue.length === 0}
              >
                <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
                Clear
              </button>
            </div>

            <div className="relative mt-2">
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="done"
                value={rawValue}
                onChange={handleInputChange}
                aria-invalid={parsed.error ? true : undefined}
                aria-describedby={`${helpId}${parsed.error ? ` ${errorId}` : ""}`}
                placeholder="Enter a value"
                className={`h-16 w-full rounded-xl border bg-slate-50/80 pl-4 pr-16 text-[1.7rem] font-semibold tabular-nums tracking-[-0.02em] text-navy outline-none transition-colors placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 sm:text-[1.9rem] ${
                  parsed.error
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200"
                }`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                  {fromUnit.symbol}
                </span>
              </span>
            </div>

            <p id={helpId} className="mt-2 text-xs text-slate-500">
              Decimals and zero are supported. Results use four decimal places.
            </p>
            {parsed.error ? (
              <p
                id={errorId}
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {parsed.error}
              </p>
            ) : null}

            <div className="mt-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-slate-500">
                Common values ({fromUnit.symbol})
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {presetValues.map((preset) => {
                  const isActive = parsed.value === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePreset(preset)}
                      aria-pressed={isActive}
                      aria-label={`Use ${formatDecimal(preset, 4)} ${fromUnit.symbol}`}
                      className={`min-w-10 rounded-lg border px-2.5 py-1.5 text-xs font-medium tabular-nums transition-colors ${
                        isActive
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                      }`}
                    >
                      {formatDecimal(preset, 4)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative my-5 flex items-center justify-center">
            <div
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-200"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={handleSwap}
              className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              aria-label={`Swap direction: convert ${toUnit.name.toLowerCase()} to ${fromUnit.name.toLowerCase()}`}
              title="Swap conversion direction"
            >
              <ArrowDownUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-brand-50/90 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-700">
                Result
              </p>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!copyText}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {copyState === "copied" ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {copyState === "copied" ? "Copied" : "Copy"}
              </button>
            </div>

            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-1.5 flex flex-wrap items-baseline gap-x-2 break-words text-[2rem] font-bold leading-[1.15] tracking-[-0.035em] text-navy tabular-nums sm:text-[2.6rem]"
            >
              {displayValue ?? (
                <span
                  className={`text-2xl font-semibold sm:text-3xl ${
                    isOutOfRange ? "text-red-500" : "text-slate-500"
                  }`}
                >
                  {isOutOfRange ? "Out of range" : "Enter a value"}
                </span>
              )}
              {displayValue ? (
                <span className="text-base font-semibold tracking-normal text-brand-700 sm:text-lg">
                  {toUnit.symbol}
                </span>
              ) : null}
            </p>

            <p className="mt-1.5 min-h-5 text-sm text-slate-600">
              {isOutOfRange
                ? "That number is too large for this converter. Try a smaller value."
                : summary ??
                  (parsed.error
                    ? "Fix the value above to see a result."
                    : "The converted value will appear here.")}
            </p>

            <p className="mt-2 text-[0.7rem] leading-5 text-brand-700">
              {toUnit.name} · shown to 4 decimal places, trailing zeros removed
            </p>

            {copyState === "error" ? (
              <p role="alert" className="mt-1 text-xs text-red-600">
                Copying is not available in this browser. Select the result
                manually.
              </p>
            ) : null}
            <span className="sr-only" aria-live="polite">
              {copyState === "copied"
                ? "Result copied to clipboard."
                : copyState === "error"
                  ? "Copy failed."
                  : ""}
            </span>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3">
            <Info
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
              aria-hidden="true"
            />
            <p className="text-xs leading-5 text-slate-600">
              <span className="font-semibold text-slate-700">Formula:</span>{" "}
              <span className="tabular-nums">{formula.equation}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
