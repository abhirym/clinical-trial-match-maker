import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact — CTMM" },
      { name: "description", content: "How to reach the CTMM team." },
      { property: "og:title", content: "Contact — CTMM" },
      { property: "og:description", content: "How to reach the CTMM team." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" />
      <Prose>
        <p>Contact details for the CTMM team will be listed here soon.</p>
        <p>For questions about a specific study, use the contact information on that study's ClinicalTrials.gov record — the study team is the right source for eligibility questions. For medical concerns, speak with your healthcare provider.</p>
      </Prose>
    </>
  ),
});
