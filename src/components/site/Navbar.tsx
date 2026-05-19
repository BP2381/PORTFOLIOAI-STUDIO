import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-md bg-accent" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background" />
            <div className="absolute inset-[6px] rounded-sm bg-accent" />
          </div>
          <span className="font-display text-xl tracking-tight">PortfolioAI</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link>
          <Link to="/builder" className="hover:text-foreground transition-colors">Builder</Link>
          <Link to="/resume" className="hover:text-foreground transition-colors">Resume</Link>
          <a href="/#features" className="hover:text-foreground transition-colors">Features</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/builder"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Start building
          </Link>
        </div>
      </div>
    </header>
  );
}
