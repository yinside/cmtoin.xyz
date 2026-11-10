import type { ReactNode } from "react";

interface CalculatorWorkspaceProps {
  calculator: ReactNode;
  sidebar: ReactNode;
}

export function CalculatorWorkspace({
  calculator,
  sidebar,
}: CalculatorWorkspaceProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_390px]">
      <div className="min-w-0">{calculator}</div>
      <div className="min-w-0">{sidebar}</div>
    </div>
  );
}
