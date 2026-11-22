import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatStudyType, type Trial } from "@/lib/api/trials";
import { TrialStatusBadge } from "./TrialStatusBadge";

export function TrialResultCard({ trial }: { trial: Trial }) {
  return (
    <article className="card-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <TrialStatusBadge status={trial.status} />
        <span className="font-mono text-xs text-muted-foreground">{trial.nct_id}</span>
      </div>
      <h3 className="mt-3 text-lg leading-snug font-semibold text-navy">{trial.title}</h3>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[2fr_1fr]">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Conditions</dt>
          <dd className="mt-1">{trial.conditions.length ? trial.conditions.join(", ") : "Not listed"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Study type</dt>
          <dd className="mt-1">{formatStudyType(trial.study_type)}</dd>
        </div>
      </dl>
      <div className="mt-5">
        <Link to="/trials/$nctId" params={{ nctId: trial.nct_id }} className="btn btn-outline text-sm">
          View Trial Details <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
