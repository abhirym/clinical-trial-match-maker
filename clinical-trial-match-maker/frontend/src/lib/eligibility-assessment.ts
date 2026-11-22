/**
 * FUTURE FEATURE — types only. No matching logic exists yet and nothing in the
 * live flow renders these. Results are per-criterion; there is intentionally
 * no overall yes/no eligibility verdict.
 */
export type CriterionStatus = "met" | "potential_mismatch" | "unknown";

export interface CriterionAssessment {
  criterion: string; // published text, verbatim
  kind: "inclusion" | "exclusion";
  status: CriterionStatus;
  patientInformation: string[]; // facts the patient reviewed and approved
  reasoning: string;
  missingInformation?: string[];
}

export interface TrialAssessment {
  nct_id: string;
  assessments: CriterionAssessment[];
  generatedAt: string;
}
