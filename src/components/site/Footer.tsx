import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-md bg-accent" />
                <div className="absolute inset-[3px] rounded-[5px] bg-background" />
                <div className="absolute inset-[6px] rounded-sm bg-accent" />
              </div>
              <span className="font-display text-xl">PortfolioAI</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The premium AI-powered platform for portfolios and resumes that get
              you hired.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Product
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/builder" className="hover:text-accent transition-colors">Builder</Link></li>
              <li><Link to="/templates" className="hover:text-accent transition-colors">Templates</Link></li>
              <li><Link to="/resume" className="hover:text-accent transition-colors">Resume</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Company
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="/#features" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="/#ai" className="hover:text-accent transition-colors">AI</a></li>
              <li><a href="/#testimonials" className="hover:text-accent transition-colors">Reviews</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} PortfolioAI. Crafted with care.</p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Build · Design · Ship
          </p>
        </div>
      </div>
    </footer>
  );
}
