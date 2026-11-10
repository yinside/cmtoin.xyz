import type { ReactNode } from "react";

export interface ConversionTableColumn {
  header: string;
  align?: "left" | "right" | "center";
  className?: string;
}

export interface ConversionTableRow {
  key: string;
  cells: ReactNode[];
  highlight?: boolean;
}

interface ConversionTableProps {
  columns: ConversionTableColumn[];
  rows: ConversionTableRow[];
  caption: string;
  dense?: boolean;
  rowHeader?: boolean;
  footnote?: string;
  className?: string;
}

const alignmentClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
} as const;

export function ConversionTable({
  columns,
  rows,
  caption,
  dense = false,
  rowHeader = true,
  footnote,
  className = "",
}: ConversionTableProps) {
  const cellPadding = dense ? "px-3 py-2 sm:px-4" : "px-4 py-3.5 sm:px-6";

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {columns.map((column) => (
                  <th
                    key={column.header}
                    scope="col"
                    className={`${cellPadding} ${
                      alignmentClass[column.align ?? "left"]
                    } text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 ${
                      column.className ?? ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => {
                const background = row.highlight
                  ? "bg-brand-50/80"
                  : rowIndex % 2 === 1
                    ? "bg-slate-50/50"
                    : "bg-white";

                return (
                  <tr
                    key={row.key}
                    className={`border-b border-slate-100 last:border-b-0 transition-colors hover:bg-brand-50/60 ${background}`}
                  >
                    {row.cells.map((cell, cellIndex) => {
                      const column = columns[cellIndex];
                      const align = alignmentClass[column?.align ?? "left"];
                      const isRowHeader = rowHeader && cellIndex === 0;

                      if (isRowHeader) {
                        return (
                          <th
                            key={`${row.key}-${cellIndex}`}
                            scope="row"
                            className={`${cellPadding} ${align} font-medium tabular-nums text-slate-700`}
                          >
                            {cell}
                          </th>
                        );
                      }

                      return (
                        <td
                          key={`${row.key}-${cellIndex}`}
                          className={`${cellPadding} ${align} tabular-nums text-slate-600`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {footnote ? (
        <p className="mt-3 text-xs leading-5 text-slate-500">{footnote}</p>
      ) : null}
    </div>
  );
}
