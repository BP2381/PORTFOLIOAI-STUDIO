import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { usePortfolio } from "@/lib/portfolio-store";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  const { data, hydrated } = usePortfolio();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center text-muted-foreground">
          Loading…
        </div>
      </div>
    );
  }

  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="no-print">
        <Navbar />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="no-print mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Resume Studio
            </p>
            <h1 className="mt-3 font-display text-5xl">ATS-ready · single page</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/builder" className="rounded-full border border-border px-4 py-2 text-sm hover:border-foreground/40">
              ← Back to builder
            </Link>
            <button
              onClick={() => window.print()}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background shadow-glow"
            >
              Download PDF
            </button>
          </div>
        </div>

        <div className="print-area mx-auto max-w-[820px] rounded-xl bg-white p-12 text-[oklch(0.18_0.012_270)] shadow-elegant">
          <header className="flex items-start gap-5 border-b border-black/10 pb-5">
            {data.avatar && (
              <img
                src={data.avatar}
                alt=""
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-3xl font-semibold tracking-tight">{data.name || "Your name"}</h2>
              <p className="mt-1 text-sm text-black/70">{data.title}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-black/60">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
                {data.website && <span>{data.website}</span>}
                {data.github && <span>{data.github}</span>}
                {data.linkedin && <span>{data.linkedin}</span>}
              </div>
            </div>
          </header>

          {data.summary && (
            <Block label="Summary">
              <p className="text-[13px] leading-relaxed text-black/85">{data.summary}</p>
            </Block>
          )}

          {data.experience.length > 0 && (
            <Block label="Experience">
              <div className="space-y-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-[13px] font-semibold">{e.role} — {e.company}</p>
                      <p className="text-[11px] text-black/55">{e.period}</p>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-black/80">{e.description}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.projects.length > 0 && (
            <Block label="Projects">
              <div className="space-y-4">
                {data.projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-[13px] font-semibold">{p.name}</p>
                      {p.link && <p className="text-[11px] text-black/55">{p.link}</p>}
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-black/80">{p.description}</p>
                    {p.tech && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-black/55">{p.tech}</p>
                    )}
                  </div>
                ))}
              </div>
            </Block>
          )}

          {data.education.length > 0 && (
            <Block label="Education">
              <div className="space-y-3">
                {data.education.map((ed) => (
                  <div key={ed.id} className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[13px] font-semibold">{ed.school}</p>
                      <p className="text-[12px] text-black/70">{ed.degree}</p>
                    </div>
                    <p className="text-[11px] text-black/55">{ed.period}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {skills.length > 0 && (
            <Block label="Skills">
              <p className="text-[12.5px] leading-relaxed text-black/85">
                {skills.join(" · ")}
              </p>
            </Block>
          )}
        </div>
      </div>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </section>
  );
}
