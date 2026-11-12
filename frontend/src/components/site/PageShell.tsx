import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 pb-8 sm:px-6">
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-teal uppercase">{eyebrow}</p>}
      <h1 className="mt-2 text-4xl font-semibold text-navy sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-6 px-4 leading-relaxed sm:px-6 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy">{children}</div>;
}
