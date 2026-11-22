import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { EligibilityCriteriaPanel } from "@/components/trials/EligibilityCriteriaPanel";
import { TrialStatusBadge } from "@/components/trials/TrialStatusBadge";
import { ctgovRecordUrl, formatStudyType, getTrial } from "@/lib/api/trials";

export const Route = createFileRoute("/trials/$nctId")({
  head: ({ params }) => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: `${params.nctId} — Trial Details — CTMM` },
      { name: "description", content: `Study details and published eligibility criteria for ${params.nctId}.` },
      { property: "og:title", content: `${params.nctId} — Trial Details — CTMM` },
      { property: "og:description", content: `Published eligibility criteria for ${params.nctId}.` },
    ],
  }),
  component: TrialDetail,
});

function TrialDetail() {
  const { nctId } = Route.useParams();
  const router = useRouter();
  const q = useQuery({ queryKey: ["trial", nctId], queryFn: () => getTrial(nctId), retry: 1 });

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <button onClick={() => router.history.back()} className="btn btn-ghost -ml-3 text-sm">
        <ArrowLeft size={16} aria-hidden="true" /> Back to results
      </button>

      {q.isPending && (
        <div className="mt-10 flex items-center gap-3 text-muted-foreground" role="status">
          <Loader2 className="animate-spin" size={20} aria-hidden="true" /> Loading study…
        </div>
      )}
      {q.isError && (
        <div className="card-surface mt-6 flex gap-3 p-6" role="alert">
          <AlertCircle className="mt-0.5 shrink-0 text-destructive" size={20} aria-hidden="true" />
          <div>
            <p className="font-semibold text-navy">We couldn't load this study</p>
            <p className="mt-1 text-sm text-muted-foreground">{q.error.message}</p>
            <button className="btn btn-outline mt-4 text-sm" onClick={() => q.refetch()}>Try again</button>
          </div>
        </div>
      )}
      {q.isSuccess && !q.data && (
        <div className="card-surface mt-6 p-6">
          <p className="font-semibold text-navy">No study found for {nctId}</p>
          <Link to="/trials" className="btn btn-outline mt-4 text-sm">Search trials</Link>
        </div>
      )}
      {q.data && (
        <>
          <header className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <TrialStatusBadge status={q.data.status} />
              <span className="font-mono text-sm text-muted-foreground">{q.data.nct_id}</span>
            </div>
            <h1 className="mt-4 text-2xl leading-snug font-semibold text-navy sm:text-3xl">{q.data.title}</h1>
          </header>
          <dl className="card-surface mt-6 grid gap-5 p-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Conditions</dt>
              <dd className="mt-1">{q.data.conditions.join(", ") || "Not listed"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Study type</dt>
              <dd className="mt-1">{formatStudyType(q.data.study_type)}</dd>
            </div>
            <div className="sm:col-span-3">
              <a href={ctgovRecordUrl(q.data.nct_id)} target="_blank" rel="noreferrer" className="btn btn-primary text-sm">
                View original record on ClinicalTrials.gov <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </dl>
          <div className="mt-8"><EligibilityCriteriaPanel criteria={q.data.eligibility_criteria} /></div>
        </>
      )}
    </div>
  );
}
