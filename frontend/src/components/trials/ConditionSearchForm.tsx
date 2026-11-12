import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export function ConditionSearchForm({ initialCondition = "", compact = false }: { initialCondition?: string | undefined; compact?: boolean }) {
  const navigate = useNavigate();
  const [condition, setCondition] = useState(initialCondition);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      role="search"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const c = condition.trim();
        if (!c) return setError("Please enter a condition to search.");
        setError("");
        navigate({ to: "/trials", search: { condition: c } });
      }}
      className={compact ? "flex flex-col gap-3 sm:flex-row sm:items-end" : "grid gap-4 md:grid-cols-[2fr_1.2fr_auto] md:items-end"}
    >
      <div className="flex-1">
        <label htmlFor="condition" className="mb-1.5 block text-sm font-semibold text-navy">Condition</label>
        <input id="condition" className="field" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Enter a condition, such as melanoma" aria-invalid={!!error} aria-describedby={error ? "condition-error" : undefined} autoComplete="off" />
        {error && <p id="condition-error" className="mt-1.5 text-sm text-destructive">{error}</p>}
      </div>
      {!compact && (
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-navy">
            Location <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input id="location" className="field" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or region" aria-describedby="location-note" />
          <p id="location-note" className="mt-1.5 text-xs text-muted-foreground">Location filtering isn't available yet.</p>
        </div>
      )}
      <button type="submit" className={`btn btn-primary ${compact ? "" : "md:mb-6"}`}>
        <Search size={18} aria-hidden="true" /> Search Trials
      </button>
    </form>
  );
}
