import { Link } from "@tanstack/react-router";
import { Home, Info, Search, ShieldCheck } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/trials", label: "Find Trials", icon: Search, exact: false },
  { to: "/how-it-works", label: "How It Works", icon: Info, exact: true },
  { to: "/privacy", label: "Privacy", icon: ShieldCheck, exact: true },
] as const;

export function MobileTabBar() {
  return (
    <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 text-[0.7rem] font-medium text-muted-foreground"
              activeProps={{ className: "text-teal", "aria-current": "page" }}
            >
              <Icon size={22} aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
