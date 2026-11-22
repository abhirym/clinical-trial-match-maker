import { Info } from "lucide-react";

const steps = [
  { t: "Tell Us What You're Looking For", d: "Search by medical condition to discover relevant clinical studies." },
  { t: "Explore the Research", d: "Review trial descriptions, recruitment status, locations when available, and published eligibility criteria." },
  { t: "Understand the Requirements", d: "Examine eligibility criteria and identify information you may need to discuss with a research team." },
];

export function HowItWorksCards() {
  return (
    <>
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} className="card-surface p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft font-display text-lg font-semibold text-accent-foreground" aria-hidden="true">{i + 1}</span>
            <h3 className="mt-4 text-lg font-semibold text-navy">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
        <Info size={16} className="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
        Appearing in search results does not mean someone is eligible for a study.
      </p>
    </>
  );
}
