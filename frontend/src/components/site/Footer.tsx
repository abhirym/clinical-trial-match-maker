import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar";

export const DISCLAIMER =
  "CTMM is an informational clinical trial discovery tool. Search results do not establish eligibility or recommend treatment. Confirm study details and eligibility with the study team.";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card pb-16 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3 text-sm">
            <li><Link to="/about" className="text-navy hover:text-teal">About CTMM</Link></li>
            <li><Link to="/trials" className="text-navy hover:text-teal">Find Trials</Link></li>
            <li><Link to="/privacy" className="text-navy hover:text-teal">Privacy & Safety</Link></li>
            <li><Link to="/contact" className="text-navy hover:text-teal">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          Study information is sourced from{" "}
          <a href="https://clinicaltrials.gov" target="_blank" rel="noreferrer" className="underline hover:text-navy">ClinicalTrials.gov</a>, a service of the U.S. National Library of Medicine. CTMM is not affiliated with or endorsed by ClinicalTrials.gov.
        </p>
      </div>
    </footer>
  );
}
