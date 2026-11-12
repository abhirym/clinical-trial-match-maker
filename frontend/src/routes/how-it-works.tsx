import { createFileRoute, Link } from "@tanstack/react-router";
import { HowItWorksCards } from "@/components/site/HowItWorksCards";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "How It Works — CTMM" },
      { name: "description", content: "How CTMM helps you search clinical trials and read published eligibility criteria." },
      { property: "og:title", content: "How It Works — CTMM" },
      { property: "og:description", content: "Search by condition, explore studies, and understand eligibility requirements." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="How it works" title="From a condition to a clearer conversation">
        CTMM shows study information published on ClinicalTrials.gov so you can prepare questions for your care team or a study team.
      </PageHeader>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <HowItWorksCards />
        <Link to="/trials" className="btn btn-primary mt-10">Find Clinical Trials</Link>
      </div>
    </>
  ),
});
