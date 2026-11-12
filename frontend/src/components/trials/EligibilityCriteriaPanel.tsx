import { ShieldAlert } from "lucide-react";
import { parseEligibility } from "@/lib/eligibility-text";

export function StudyTeamCallout() {
  return (
    <div className="flex gap-3 rounded-lg border border-teal/30 bg-teal-soft p-4 text-sm text-accent-foreground" role="note">
      <ShieldAlert size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
      <p className="font-semibold">Only the study team can confirm whether you qualify for this trial.</p>
    </div>
  );
}

export function EligibilityCriteriaPanel({ criteria }: { criteria: string | null }) {
  const blocks = criteria ? parseEligibility(criteria) : [];
  return (
    <section aria-labelledby="eligibility-heading" className="card-surface p-6 sm:p-8">
      <h2 id="eligibility-heading" className="text-2xl font-semibold text-navy">Eligibility Criteria</h2>
      <p className="mt-2 text-sm text-muted-foreground">Shown as published by the study organizers. Formatting has been adjusted for readability; wording has not been changed.</p>
      <div className="mt-5"><StudyTeamCallout /></div>
      {blocks.length === 0 ? (
        <p className="mt-6 text-muted-foreground">The source record does not include eligibility criteria. Check the original record or contact the study team.</p>
      ) : (
        <div className="mt-6 space-y-8">
          {blocks.map((b, i) => (
            <div key={i}>
              {b.heading && <h3 className="mb-3 border-b pb-2 text-lg font-semibold text-navy">{b.heading}</h3>}
              {b.paragraphs.map((p, j) => <p key={j} className="mb-2 leading-relaxed">{p}</p>)}
              {b.items.length > 0 && (
                <ul className="space-y-2">
                  {b.items.map((it, j) => (
                    <li key={j} className={`flex gap-3 leading-relaxed ${it.level ? "ml-6 text-[0.95rem]" : ""}`}>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
