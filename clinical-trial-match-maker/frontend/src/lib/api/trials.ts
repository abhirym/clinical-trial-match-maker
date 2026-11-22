import { API_BASE_URL, CTGOV_API, DEFAULT_PAGE_SIZE } from "./config";

export interface Trial {
  nct_id: string;
  title: string;
  status: string;
  conditions: string[];
  study_type: string;
  eligibility_criteria: string | null;
  source: string;
}

export interface TrialSearchResponse {
  condition: string;
  count: number;
  page_size: number;
  next_page_token: string | null;
  trials: Trial[];
}

export interface TrialSearchParams {
  condition: string;
  pageSize?: number;
  pageToken?: string | null;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function getJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: "application/json" } });
  } catch {
    throw new ApiError("We couldn't reach the trial data service. Check your connection and try again.");
  }
  if (res.status === 404) throw new ApiError("Not found", 404);
  if (!res.ok) throw new ApiError(`The trial data service returned an error (${res.status}).`, res.status);
  return (await res.json()) as T;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function mapCtgovStudy(study: any): Trial {
  const p = study?.protocolSection ?? {};
  const id = p.identificationModule ?? {};
  return {
    nct_id: id.nctId ?? "",
    title: id.officialTitle || id.briefTitle || "Untitled study",
    status: p.statusModule?.overallStatus ?? "UNKNOWN",
    conditions: p.conditionsModule?.conditions ?? [],
    study_type: p.designModule?.studyType ?? "UNKNOWN",
    eligibility_criteria: p.eligibilityModule?.eligibilityCriteria ?? null,
    source: "ClinicalTrials.gov",
  };
}

export async function searchTrials({ condition, pageSize = DEFAULT_PAGE_SIZE, pageToken }: TrialSearchParams): Promise<TrialSearchResponse> {
  if (API_BASE_URL) {
    const q = new URLSearchParams({ condition, page_size: String(pageSize) });
    if (pageToken) q.set("page_token", pageToken);
    return getJson<TrialSearchResponse>(`${API_BASE_URL}/api/trials?${q}`);
  }
  const q = new URLSearchParams({ "query.cond": condition, pageSize: String(pageSize), countTotal: "true", format: "json" });
  if (pageToken) q.set("pageToken", pageToken);
  const data = await getJson<any>(`${CTGOV_API}/studies?${q}`);
  const trials = (data.studies ?? []).map(mapCtgovStudy);
  return {
    condition,
    count: typeof data.totalCount === "number" ? data.totalCount : trials.length,
    page_size: pageSize,
    next_page_token: data.nextPageToken ?? null,
    trials,
  };
}

/** Single study lookup. Uses the public ClinicalTrials.gov record (the backend has no detail endpoint yet). */
export async function getTrial(nctId: string): Promise<Trial | null> {
  try {
    const data = await getJson<any>(`${CTGOV_API}/studies/${encodeURIComponent(nctId)}?format=json`);
    return mapCtgovStudy(data);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export const ctgovRecordUrl = (nctId: string) => `https://clinicaltrials.gov/study/${nctId}`;

export function formatStudyType(t: string) {
  const map: Record<string, string> = { INTERVENTIONAL: "Interventional", OBSERVATIONAL: "Observational", EXPANDED_ACCESS: "Expanded access" };
  return map[t] ?? (t ? t.charAt(0) + t.slice(1).toLowerCase().replace(/_/g, " ") : "Not specified");
}
