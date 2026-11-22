/**
 * Base URL of the CTMM FastAPI backend (e.g. "https://api.example.org").
 * Set VITE_CTMM_API_BASE_URL to route searches through the backend.
 * When unset, the app queries the public ClinicalTrials.gov v2 API directly
 * and maps responses to the same shape the backend returns.
 */
export const API_BASE_URL: string = (import.meta.env['VITE_CTMM_API_BASE_URL'] ?? "").trim().replace(/\/+$/, "");

export const CTGOV_API = "https://clinicaltrials.gov/api/v2";
export const DEFAULT_PAGE_SIZE = 10;

export const dataSourceLabel = API_BASE_URL ? "CTMM backend (ClinicalTrials.gov)" : "ClinicalTrials.gov public API";
