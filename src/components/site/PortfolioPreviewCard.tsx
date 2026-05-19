import type { PortfolioData } from "@/lib/portfolio-store";

export function PortfolioPreviewCard({ data }: { data: PortfolioData }) {
  const skills = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);

  const initials = data.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div className="glass rounded-2xl p-6 shadow-elegant">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio · Live preview
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight">
            {data.name || "Your name"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.title || "Your headline"}
          </p>
        </div>
        {data.avatar ? (
          <img
            src={data.avatar}
            alt=""
            className="h-12 w-12 rounded-full border border-hairline object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {initials}
          </div>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-foreground/85">
        {data.bio}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {data.projects.length > 0 && (
        <div className="mt-6 border-t border-hairline pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Selected Work
          </p>
          <div className="mt-3 space-y-3">
            {data.projects.slice(0, 2).map((p) => (
              <div key={p.id} className="flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.description}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-accent">↗</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
