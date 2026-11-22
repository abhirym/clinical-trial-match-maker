import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageShell";
import { DISCLAIMER } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy & Safety — CTMM" },
      { name: "description", content: "What CTMM does and does not do with your information, and the limits of search results." },
      { property: "og:title", content: "Privacy & Safety — CTMM" },
      { property: "og:description", content: "How CTMM approaches privacy and safety." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Privacy & Safety" title="What this version does — and doesn't do" />
      <Prose>
        <h2>Information we ask for</h2>
        <p>This version only asks for a condition to search. It does not have patient accounts, does not accept medical document uploads, and does not store your searches in a patient profile.</p>
        <p>Your search term is sent to the trial data service (ClinicalTrials.gov, or the CTMM backend when configured) to retrieve public study listings.</p>
        <h2>What results mean</h2>
        <p>{DISCLAIMER}</p>
        <p>CTMM is not a medical provider or diagnostic system and does not determine eligibility. Only the study team can confirm whether you qualify.</p>
        <h2>Future personalized matching</h2>
        <p>A future version may help compare your information with published criteria, criterion by criterion. It is not available today, has not been clinically validated, and would let you review any information before it is used.</p>
      </Prose>
    </>
  ),
});
