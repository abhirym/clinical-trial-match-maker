import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("trial service routing", () => {
  it("uses the configured FastAPI origin and backend pagination parameters", async () => {
    vi.stubEnv("VITE_CTMM_API_BASE_URL", " http://127.0.0.1:8000/// ");
    vi.resetModules();
    const response = { condition: "melanoma", count: 0, page_size: 10, next_page_token: "next", trials: [] };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(response)));
    vi.stubGlobal("fetch", fetchMock);
    const { searchTrials } = await import("./trials");
    expect(await searchTrials({ condition: "melanoma", pageToken: "a+b/=" })).toEqual(response);
    const url = new URL(fetchMock.mock.calls[0]?.[0]);
    expect(url.origin).toBe("http://127.0.0.1:8000");
    expect(url.pathname).toBe("/api/trials");
    expect(Object.fromEntries(url.searchParams)).toEqual({ condition: "melanoma", page_size: "10", page_token: "a+b/=" });
  });

  it("uses ClinicalTrials.gov only when no backend is configured", async () => {
    vi.stubEnv("VITE_CTMM_API_BASE_URL", "");
    vi.resetModules();
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ studies: [], totalCount: 0 })));
    vi.stubGlobal("fetch", fetchMock);
    const { searchTrials } = await import("./trials");
    await searchTrials({ condition: "asthma" });
    const url = new URL(fetchMock.mock.calls[0]?.[0]);
    expect(url.origin).toBe("https://clinicaltrials.gov");
    expect(url.pathname).toBe("/api/v2/studies");
    expect(url.searchParams.get("query.cond")).toBe("asthma");
  });

  it("reports an unreachable backend without silently changing data sources", async () => {
    vi.stubEnv("VITE_CTMM_API_BASE_URL", "http://127.0.0.1:8000");
    vi.resetModules();
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);
    const { searchTrials, ApiError } = await import("./trials");
    await expect(searchTrials({ condition: "melanoma" })).rejects.toBeInstanceOf(ApiError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});