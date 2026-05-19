import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

const TEMPLATES = [
  {
    name: "Editorial",
    tone: "Noir · Serif",
    desc: "Magazine-grade headings, generous whitespace, soft accents.",
  },
  {
    name: "Minimal",
    tone: "Ivory · Sans",
    desc: "Whitespace-first, almost nothing on the page — on purpose.",
  },
  {
    name: "Cinematic",
    tone: "Ember · Glow",
    desc: "Deep contrast, soft warm glow, theatrical hero.",
  },
  {
    name: "Studio",
    tone: "Mono · Grid",
    desc: "Built for designers. Image-led. Restrained type.",
  },
  {
    name: "Engineer",
    tone: "Terminal · Mono",
    desc: "Codebase aesthetic. Project-heavy. Minimal chrome.",
  },
  {
    name: "Atelier",
    tone: "Stone · Serif",
    desc: "Quiet luxury. Slow scroll. For senior craftspeople.",
  },
];

function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative bg-hero">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Templates
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-6xl leading-[1.05] md:text-7xl">
            Six templates.
            <br />
            <span className="italic text-accent">All hand-crafted.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Quality over quantity. Every template is opinionated, designed in
            full, and ready to ship.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t, i) => (
            <Link
              to="/builder"
              key={t.name}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-8 transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-20 grid-bg" />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {t.tone}
                </p>
                <h3 className="mt-3 font-display text-4xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>

                <div className="mt-8 aspect-[4/3] overflow-hidden rounded-xl border border-hairline">
                  <MiniPreview variant={i} />
                </div>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-accent">Use this template →</span>
                  <span className="text-muted-foreground">Free</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MiniPreview({ variant }: { variant: number }) {
  const palettes = [
    { bg: "bg-background", text: "text-foreground", muted: "bg-surface" },
    { bg: "bg-[oklch(0.96_0.005_270)]", text: "text-[oklch(0.18_0.012_270)]", muted: "bg-white" },
    { bg: "bg-[oklch(0.16_0.03_30)]", text: "text-[oklch(0.95_0.02_60)]", muted: "bg-[oklch(0.22_0.05_30)]" },
    { bg: "bg-[oklch(0.18_0.005_270)]", text: "text-foreground", muted: "bg-[oklch(0.22_0.008_270)]" },
    { bg: "bg-[oklch(0.14_0.005_140)]", text: "text-[oklch(0.85_0.18_140)]", muted: "bg-[oklch(0.18_0.01_140)]" },
    { bg: "bg-[oklch(0.92_0.01_60)]", text: "text-[oklch(0.25_0.02_60)]", muted: "bg-[oklch(0.96_0.01_60)]" },
  ];
  const p = palettes[variant % palettes.length];
  return (
    <div className={`h-full w-full ${p.bg} ${p.text} p-5`}>
      <div className="font-display text-2xl leading-tight">Aria Wynn</div>
      <div className="mt-0.5 text-[10px] opacity-70">Product Designer</div>
      <div className="mt-3 h-px w-full opacity-20 bg-current" />
      <div className="mt-3 space-y-1.5">
        <div className={`h-2 w-3/4 rounded-sm ${p.muted}`} />
        <div className={`h-2 w-2/3 rounded-sm ${p.muted}`} />
        <div className={`h-2 w-1/2 rounded-sm ${p.muted}`} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <div className={`h-10 rounded-md ${p.muted}`} />
        <div className={`h-10 rounded-md ${p.muted}`} />
      </div>
    </div>
  );
}
