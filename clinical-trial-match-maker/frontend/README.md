# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## CTMM FastAPI connection

All trial requests are centralized in `src/lib/api/trials.ts`. Set the public
browser variable `VITE_CTMM_API_BASE_URL` to the API origin, without `/api/trials`.
`.env.development` currently uses the supplied `http://127.0.0.1:8000` address.
This works only when the browser and FastAPI run on the same computer; the
Lovable sandbox cannot reach a service on your computer at that address.

For hosted CTMM, expose FastAPI at a publicly reachable **HTTPS** origin (a
deployment or HTTPS tunnel), set `VITE_CTMM_API_BASE_URL` to that origin in the
production build environment, and rebuild/redeploy. No production API origin
has been supplied yet. Without the variable, CTMM uses ClinicalTrials.gov
directly; with it, backend failures are shown rather than silently falling back.

Search requests use:

```text
GET /api/trials?condition=melanoma&page_size=10
GET /api/trials?condition=melanoma&page_size=10&page_token=<next_page_token>
```

The response must contain `condition`, `count`, `page_size`, `next_page_token`
(string or null), and `trials`. Each trial has `nct_id`, `title`, `status`,
`conditions`, `study_type`, `eligibility_criteria` (string or null), and `source`.
Study details still come from ClinicalTrials.gov because no backend detail
endpoint has been provided. Do not change published eligibility text.

### FastAPI CORS

Add this to your existing FastAPI application (not to CTMM):

```python
from fastapi.middleware.cors import CORSMiddleware

# Wrapping the complete app gives unhandled error responses CORS headers too.
app = CORSMiddleware(
    app=app,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "https://id-preview--3866e1db-b464-5112-831c-76553a5bf84d.lovable.app",
        # Add the exact published CTMM origin once available.
    ],
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Accept", "Content-Type"],
)
```

These requests do not send cookies or authorization headers. If that changes,
explicitly allow the new headers and retain exact allowed origins; never reflect
arbitrary origins with credentials. Origins include scheme and port but no path
or trailing slash. Add each actual preview/published origin you use.

Check your running backend from your own computer:

```sh
curl -i 'http://127.0.0.1:8000/api/trials?condition=melanoma&page_size=10' \
  -H 'Origin: https://id-preview--3866e1db-b464-5112-831c-76553a5bf84d.lovable.app'
```

Expect HTTP 200, the response shape above, and an
`Access-Control-Allow-Origin` header matching the request origin. A successful
curl alone does not prove browser CORS works. An HTTPS hosted page calling local
HTTP may also encounter browser mixed-content/local-network restrictions; use
a public HTTPS API origin for reliable hosted access.
