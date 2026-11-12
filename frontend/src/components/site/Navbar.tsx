import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/trials", label: "Find Trials" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/privacy", label: "Privacy & Safety" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-navy" aria-label="CTMM home">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="7" cy="8" r="3" className="fill-teal" />
        <circle cx="21" cy="7" r="2.5" className="fill-navy" />
        <circle cx="14" cy="20" r="3.5" className="fill-teal" />
        <path d="M7 8 L21 7 L14 20 Z" className="stroke-teal" fill="none" strokeWidth="1.3" opacity=".5" />
      </svg>
      CTMM
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-navy" activeProps={{ className: "text-navy" }} activeOptions={{ exact: true }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/sign-in" className="btn btn-ghost text-sm">Sign In</Link>
          <Link to="/trials" className="btn btn-primary text-sm">Find Clinical Trials</Link>
        </div>
        <Link to="/sign-in" className="btn btn-ghost text-sm md:hidden">Sign In</Link>
      </nav>
    </header>
  );
}
