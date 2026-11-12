import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sign In — CTMM" },
      { name: "description", content: "Accounts are not available in this version of CTMM." },
      { property: "og:title", content: "Sign In — CTMM" },
      { property: "og:description", content: "Accounts are not available yet." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Sign in" title="Accounts aren't available yet">
        You can search trials and read eligibility criteria without an account. We don't collect personal information in this version.
      </PageHeader>
      <div className="mx-auto max-w-3xl px-4 sm:px-6"><Link to="/trials" className="btn btn-primary">Find Clinical Trials</Link></div>
    </>
  ),
});
