import type { ReactNode } from "react";

interface GuideBodyProps {
  children: ReactNode;
  aside: ReactNode;
}

export function GuideBody({ children, aside }: GuideBodyProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-16">
      <article className="min-w-0">{children}</article>
      <aside className="space-y-4 lg:sticky lg:top-24">{aside}</aside>
    </div>
  );
}
