import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About CTMM — Clinical Trial Match Maker" },
      { name: "description", content: "CTMM is an early-stage, patient-centered clinical trial discovery tool." },
      { property: "og:title", content: "About CTMM" },
      { property: "og:description", content: "A patient-centered clinical trial discovery tool." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="About" title="About CTMM" />
      <Prose>
        <p>Clinical Trial Match Maker (CTMM) is an early-stage tool that makes public clinical trial information easier to navigate. It presents study listings from ClinicalTrials.gov clearly and keeps published eligibility criteria intact.</p>
        <p>CTMM is informational only. It does not diagnose, recommend treatment, or determine eligibility.</p>
      </Prose>
    </>
  ),
});
