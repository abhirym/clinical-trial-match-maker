import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Loader2, SearchX } from "lucide-react";
import { z } from "zod";
import { ConditionSearchForm } from "@/components/trials/ConditionSearchForm";
import { TrialResultCard } from "@/components/trials/TrialResultCard";
import { searchTrials } from "@/lib/api/trials";
import { DEFAULT_PAGE_SIZE, dataSourceLabel } from "@/lib/api/config";

export const Route = createFileRoute("/trials/")({
  validateSearch: z.object({ condition: z.string().optional() }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Find Clinical Trials — CTMM" },
      { name: "description", content: "Search ClinicalTrials.gov studies by condition and review recruitment status and study type." },
      { property: "og:title", content: "Find Clinical Trials — CTMM" },
      { property: "og:description", content: "Search clinical studies by condition." },
    ],
  }),
  component: TrialsPage,
});

function TrialsPage() {
  const { condition } = Route.useSearch();
  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-navy sm:text-4xl">{condition ? <>Trials for “{condition}”</> : "Find Clinical Trials"}</h1>
      <div className="card-surface mt-6 p-5">
        <ConditionSearchForm key={condition} initialCondition={condition} compact />
      </div>
      {condition ? <Results condition={condition} /> : <p className="mt-8 text-muted-foreground">Enter a condition above to see studies listed on ClinicalTrials.gov.</p>}
    </div>
  );
}

function Results({ condition }: { condition: string }) {
  const q = useInfiniteQuery({
    queryKey: ["trials", condition],
    queryFn: ({ pageParam }) => searchTrials({ condition, pageSize: DEFAULT_PAGE_SIZE, pageToken: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.next_page_token ?? undefined,
    retry: 1,
  });

  if (q.isPending)
    return (
      <div className="mt-10 flex items-center gap-3 text-muted-foreground" role="status">
        <Loader2 className="animate-spin" size={20} aria-hidden="true" /> Searching studies…
      </div>
    );

  if (q.isError)
    return (
      <div className="card-surface mt-8 p-6" role="alert">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 shrink-0 text-destructive" size={20} aria-hidden="true" />
          <div>
            <h2 className="font-sans text-base font-semibold text-navy">We couldn't load trials</h2>
            <p className="mt-1 text-sm text-muted-foreground">{q.error.message}</p>
            <button className="btn btn-outline mt-4 text-sm" onClick={() => q.refetch()}>Try again</button>
          </div>
        </div>
      </div>
    );

  const trials = q.data.pages.flatMap((p) => p.trials);
  const total = q.data.pages[0]?.count ?? 0;

  if (trials.length === 0)
    return (
      <div className="card-surface mt-8 p-8 text-center">
        <SearchX className="mx-auto text-muted-foreground" size={28} aria-hidden="true" />
        <h2 className="mt-3 font-sans text-lg font-semibold text-navy">No studies found</h2>
        <p className="mt-1 text-muted-foreground">Try a broader term or a different spelling of the condition.</p>
      </div>
    );

  return (
    <section className="mt-8" aria-label="Search results">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-navy">{total.toLocaleString()}</span> studies found · showing {trials.length}
        </p>
        <p className="text-xs text-muted-foreground">Source: {dataSourceLabel}</p>
      </div>
      <p className="mb-5 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
        Appearing here does not mean you are eligible. A “Recruiting” status reflects the published record and does not guarantee enrollment is available.
      </p>
      <ul className="space-y-4">
        {trials.map((t) => <li key={t.nct_id}><TrialResultCard trial={t} /></li>)}
      </ul>
      {q.hasNextPage && (
        <div className="mt-8 text-center">
          <button className="btn btn-outline" onClick={() => q.fetchNextPage()} disabled={q.isFetchingNextPage}>
            {q.isFetchingNextPage ? <><Loader2 className="animate-spin" size={16} aria-hidden="true" /> Loading…</> : "Load more studies"}
          </button>
          {q.isFetchNextPageError && <p className="mt-2 text-sm text-destructive" role="alert">Couldn't load more. Please try again.</p>}
        </div>
      )}
    </section>
  );
}
