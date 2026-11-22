import { describe, expect, it } from "vitest";
import { parseEligibility } from "./eligibility-text";

describe("parseEligibility", () => {
  it("splits inclusion/exclusion and keeps criterion wording verbatim", () => {
    const b = parseEligibility("Inclusion Criteria:\n\n* Age ≥ 18 years\n* ECOG 0-1\n\nExclusion Criteria:\n\n* Prior anti-PD-1 therapy");
    expect(b.map((x) => x.heading)).toEqual(["Inclusion Criteria", "Exclusion Criteria"]);
    expect(b[0]!.items.map((i) => i.text)).toEqual(["Age ≥ 18 years", "ECOG 0-1"]);
    expect(b[1]!.items[0]!.text).toBe("Prior anti-PD-1 therapy");
  });
});
