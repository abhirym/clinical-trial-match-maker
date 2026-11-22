import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, FileText, MessageSquareText } from "lucide-react";
import { ConditionSearchForm } from "@/components/trials/ConditionSearchForm";
import { HowItWorksCards } from "@/components/site/HowItWorksCards";
import { ResearchNetwork } from "@/components/site/ResearchNetwork";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "CTMM — Find Clinical Trials. Understand Your Options." },
      { name: "description", content: "Explore clinical studies relevant to your condition and understand the eligibility requirements researchers publish." },
      { property: "og:title", content: "CTMM — Find Clinical Trials. Understand Your Options." },
      { property: "og:description", content: "Patient-centered clinical trial discovery with transparent, published eligibility criteria." },
    ],
  }),
  component: Index,
});

const principles = [
  { icon: FileText, t: "Transparent Criteria", d: "Review the eligibility requirements published by study organizers." },
  { icon: MessageSquareText, t: "Clear Explanations", d: "Understand why a trial appeared in your search and which details may require further review." },
  { icon: Eye, t: "Patient Control", d: "Review information before it is used in any future personalized matching workflow." },
];

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-24">
        <div>
          <h1 className="text-4xl leading-[1.1] font-semibold text-navy sm:text-5xl lg:text-6xl">Find Clinical Trials. Understand Your Options.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Explore clinical studies relevant to your condition and understand the requirements researchers use to determine eligibility.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#search" className="btn btn-primary">Find Clinical Trials</a>
            <Link to="/how-it-works" className="btn btn-outline">How It Works</Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md"><ResearchNetwork /></div>
      </section>

      <p className="mx-auto max-w-6xl px-4 text-center font-display text-lg text-navy sm:px-6">Clear information. Transparent criteria. More informed conversations.</p>

      <section id="search" aria-labelledby="search-heading" className="mx-auto mt-12 max-w-5xl scroll-mt-24 px-4 sm:px-6">
        <div className="card-surface p-6 sm:p-10">
          <h2 id="search-heading" className="text-2xl font-semibold text-navy sm:text-3xl">Start Exploring Clinical Trials</h2>
          <p className="mt-2 mb-6 text-muted-foreground">Begin with a condition. You can refine your search later.</p>
          <ConditionSearchForm />
        </div>
      </section>

      <section aria-labelledby="how-heading" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <h2 id="how-heading" className="mb-8 text-3xl font-semibold text-navy">How It Works</h2>
        <HowItWorksCards />
      </section>

      <section aria-labelledby="trust-heading" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <h2 id="trust-heading" className="mb-8 text-3xl font-semibold text-navy">Research Information You Can Understand</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map(({ icon: Icon, t, d }) => (
            <div key={t} className="border-t-2 border-teal pt-5">
              <Icon size={22} className="text-teal" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Personalized matching is not available yet and has not been clinically validated.</p>
      </section>
    </>
  );
}
