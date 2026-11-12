// FUTURE FEATURE — not used in any page. Preview of the criterion-level layout.
import type { CriterionAssessment, CriterionStatus } from "@/lib/eligibility-assessment";

const label: Record<CriterionStatus, { text: string; cls: string }> = {
  met: { text: "Appears met", cls: "bg-success-soft text-success" },
  potential_mismatch: { text: "Potential mismatch", cls: "bg-warning-soft text-warning" },
  unknown: { text: "Unknown", cls: "bg-neutral-soft text-muted-foreground" },
};

export function CriterionAssessmentItem({ a }: { a: CriterionAssessment }) {
  const s = label[a.status];
  return (
    <li className="card-surface p-4">
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}>{s.text}</span>
      <p className="mt-2 font-medium">{a.criterion}</p>
      <dl className="mt-3 space-y-2 text-sm">
        <div><dt className="font-semibold">Your information</dt><dd className="text-muted-foreground">{a.patientInformation.join("; ") || "None provided"}</dd></div>
        <div><dt className="font-semibold">Reasoning</dt><dd className="text-muted-foreground">{a.reasoning}</dd></div>
        {a.missingInformation?.length ? (
          <div><dt className="font-semibold">Missing information</dt><dd className="text-muted-foreground">{a.missingInformation.join("; ")}</dd></div>
        ) : null}
      </dl>
    </li>
  );
}
