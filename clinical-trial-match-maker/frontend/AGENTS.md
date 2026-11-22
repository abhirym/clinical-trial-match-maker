<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All trial HTTP calls go through src/lib/api/trials.ts; it uses the FastAPI backend when VITE_CTMM_API_BASE_URL is set, otherwise ClinicalTrials.gov v2 directly — keeps one swap point and never fabricates data.
- Keep loopback API configuration development-only; production must receive a public HTTPS VITE_CTMM_API_BASE_URL at build time so hosted visitors are not directed to their own computers.
- Eligibility assessment (src/lib/eligibility-assessment.ts, src/components/future) is types/design only and must stay out of live pages until real matching exists.
