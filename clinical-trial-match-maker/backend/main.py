from fastapi import FastAPI, HTTPException, Query
import httpx

app = FastAPI(title="Clinical Trial Match Maker API")

# ClinicalTrials.gov API endpoint
CLINICAL_TRIALS_API = "https://clinicaltrials.gov/api/v2/studies"

@app.get("/")
def root():
    return {"message": "Clinical Trial Match Maker API is running!"}

@app.get("/api/trials")
def search_trials(condition: str = Query(
    default="melanoma",
    min_length=1,
    description="Condition to search for, such as melanoma",
), page_size: int = Query(
    default=5,
    ge=1,
    le=100,
    description="Number of studies to return (1-100)",
), page_token: str = Query(
    default="",
    description="Token for retrieving the next page of results",
)):
    condition = condition.strip()

    if not condition:
        raise HTTPException(
            status_code=422,
            detail="Condition cannot be empty or whitespace."
        )

    # Prepare the search parameters
    params = {
        "query.cond": condition,
        "pageSize": page_size,
    }

    if page_token:
        params["pageToken"] = page_token

    try:
        # Send a request to ClinicalTrials.gov
        response = httpx.get(
            CLINICAL_TRIALS_API,
            params=params,
            timeout=20.0,
        )

        # Raise an error if the external API returns an error
        response.raise_for_status()

        # Convert the response into Python dictionaries
        data = response.json()

    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code =502,
            detail="Unable to retrieve trials from ClinicalTrials.gov.",
        ) from exc

    studies = data.get("studies", [])
    results = []

    for study in studies:
        protocol = study.get("protocolSection", {})

        identification = protocol.get("identificationModule", {})
        status = protocol.get("statusModule", {})
        conditions_module = protocol.get("conditionsModule", {})
        design = protocol.get("designModule", {})
        eligibility = protocol.get("eligibilityModule", {})

        results.append({
            "nct_id": identification.get("nctId"),
            "title": identification.get("briefTitle"),
            "status": status.get("overallStatus"),
            "conditions": conditions_module.get("conditions", []),
            "study_type": design.get("studyType"),
            "eligibility_criteria": eligibility.get(
                "eligibilityCriteria"
            ),
            "source": "ClinicalTrials.gov",
        })

    return {
        "condition": condition,
        "count": len(results),
        "page_size": page_size,
        "next_page_token": data.get("nextPageToken"),
        "trials": results,
    }