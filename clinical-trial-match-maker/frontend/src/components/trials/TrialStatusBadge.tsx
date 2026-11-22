const styles: Record<string, string> = {
  RECRUITING: "bg-success-soft text-success",
  NOT_YET_RECRUITING: "bg-teal-soft text-accent-foreground",
  ENROLLING_BY_INVITATION: "bg-teal-soft text-accent-foreground",
  ACTIVE_NOT_RECRUITING: "bg-warning-soft text-warning",
  SUSPENDED: "bg-warning-soft text-warning",
};

export function formatStatus(s: string) {
  const t = s.replace(/_/g, " ").toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function TrialStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] ?? "bg-neutral-soft text-muted-foreground"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      <span className="sr-only">Recruitment status: </span>
      {formatStatus(status)}
    </span>
  );
}
