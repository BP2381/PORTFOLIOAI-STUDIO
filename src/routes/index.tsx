import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PortfolioPreviewCard } from "@/components/site/PortfolioPreviewCard";
import { ResumePreviewCard } from "@/components/site/ResumePreviewCard";
import { SAMPLE_PORTFOLIO } from "@/lib/portfolio-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <LivePreviewSection />
      <ResumeSection />
      <AISection />
      <TemplatesGrid />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24 md:pt-32">
        <div className="anim-fade flex justify-center">
          <a
            href="#ai"
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            New · AI-powered editorial templates
            <span className="text-foreground/60">→</span>
          </a>
        </div>

        <h1 className="anim-fade-up mx-auto mt-7 max-w-4xl text-center font-display text-6xl leading-[1.02] tracking-tight md:text-8xl">
          Build a portfolio that
          <br />
          <span className="italic text-accent">gets you hired.</span>
        </h1>

        <p className="anim-fade-up mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
          PortfolioAI generates a premium portfolio site and ATS-ready resume
          from a few details. Designed to feel handcrafted. Built to ship in
          minutes.
        </p>

        <div className="anim-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/builder"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-glow transition-transform hover:scale-[1.02]"
          >
            Start building free
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/90 hover:border-foreground/40"
          >
            Browse templates
          </Link>
        </div>

        {/* Floating mockups */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="relative">
            <div className="absolute -left-6 top-10 hidden w-64 -rotate-[3deg] md:block anim-floaty">
              <ResumePreviewCard data={SAMPLE_PORTFOLIO} />
            </div>
            <div className="mx-auto max-w-3xl">
              <BrowserMock data={SAMPLE_PORTFOLIO} />
            </div>
            <div className="absolute -right-6 top-20 hidden w-80 rotate-[2deg] md:block anim-floaty">
              <PortfolioPreviewCard data={SAMPLE_PORTFOLIO} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserMock({ data }: { data: typeof SAMPLE_PORTFOLIO }) {
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-elegant">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.62_0.22_25)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_78)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.62_0.16_150)]" />
        <div className="ml-3 flex-1 rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
          {data.website}
        </div>
      </div>
      <div className="grid gap-10 p-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio · {data.location}
          </p>
          <h2 className="mt-3 font-display text-5xl leading-[1.05]">
            {data.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{data.title}</p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/85">
            {data.bio}
          </p>
          <div className="mt-6 flex gap-3">
            <span className="rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background">
              View work
            </span>
            <span className="rounded-full border border-border px-3.5 py-1.5 text-xs">
              Contact
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {data.projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-hairline bg-surface p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{p.name}</p>
                <span className="font-mono text-[10px] text-accent">↗</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {p.tech}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const FEATURES = [
  {
    title: "AI Writing Studio",
    body: "Rewrites your bio, summaries, and project blurbs into crisp, hire-worthy prose.",
  },
  {
    title: "ATS-ready Resumes",
    body: "Beautiful PDFs that parse perfectly inside every applicant tracking system.",
  },
  {
    title: "Editorial Templates",
    body: "Hand-crafted layouts inspired by Linear, Stripe, and Apple — never templated.",
  },
  {
    title: "Live Split-Screen",
    body: "Edit on the left, watch a polished portfolio render in real time on the right.",
  },
  {
    title: "Theme System",
    body: "Switch palettes, type, and density — your site stays balanced and intentional.",
  },
  {
    title: "Publish in one click",
    body: "Get a custom subdomain like you.portfolioai.dev or attach your own domain.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-32">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          What's inside
        </p>
        <h2 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
          Everything you need to look hireable.
        </h2>
        <p className="mt-5 text-lg text-muted-foreground">
          Six well-considered tools — not a kitchen sink. Built so design,
          content, and code stay out of your way.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-background p-8">
            <p className="font-display text-2xl">{f.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LivePreviewSection() {
  return (
    <section className="relative bg-surface/40 py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Live editing
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05]">
            Type on the left.
            <br />
            <span className="italic text-accent">Magic on the right.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            A split-screen builder with calm animation. No drag, no drop, no
            chaos — just a clean form that produces an editorial portfolio.
          </p>
          <Link
            to="/builder"
            className="mt-8 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Open the builder →
          </Link>
        </div>
        <div className="relative">
          <BrowserMock data={SAMPLE_PORTFOLIO} />
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <div className="mx-auto max-w-sm rotate-[-2deg] anim-floaty">
            <ResumePreviewCard data={SAMPLE_PORTFOLIO} />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Resume Studio
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05]">
            Resumes that
            <br /> <span className="italic text-accent">make it past the bots.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            We export a single-page PDF tuned for ATS parsers — and beautiful
            enough to print and hand over.
          </p>
          <Link
            to="/resume"
            className="mt-8 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground/40"
          >
            See the resume →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="relative overflow-hidden bg-surface/40 py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            AI Assistant
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05]">
            Write like a senior.
            <br />
            <span className="italic text-accent">Without trying.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Drop in your raw thoughts. Our AI rewrites them into confident,
            recruiter-friendly prose — instantly.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-hairline bg-background p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              You wrote
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              "i know java and made small projects"
            </p>
          </div>
          <div className="flex justify-center text-accent">↓</div>
          <div className="rounded-2xl border border-accent/30 bg-background p-5 shadow-glow">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              AI rewrote
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Proficient in Java development with hands-on experience designing
              real-world applications and shipping production-grade,
              problem-solving projects from concept to deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const TEMPLATES = [
  { name: "Editorial", desc: "Magazine inspired, serif headings.", tone: "Noir" },
  { name: "Minimal", desc: "Whitespace-first, ultra-clean.", tone: "Ivory" },
  { name: "Cinematic", desc: "Deep contrast, soft glow.", tone: "Ember" },
  { name: "Studio", desc: "For designers and creatives.", tone: "Mono" },
];

function TemplatesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="flex items-end justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Templates
          </p>
          <h2 className="mt-4 font-display text-5xl">
            A small library of <em className="italic text-accent">great</em> ones.
          </h2>
        </div>
        <Link to="/templates" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
          See all →
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-12">
        {TEMPLATES.map((t, i) => (
          <div
            key={t.name}
            className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-8 transition-transform hover:-translate-y-1 ${
              i === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"
            }`}
            style={{ minHeight: i === 0 ? 420 : 200 }}
          >
            <div className="absolute inset-0 opacity-30 grid-bg" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t.tone}
                </p>
                <h3 className="mt-2 font-display text-4xl">{t.name}</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  {t.desc}
                </p>
              </div>
              <Link
                to="/builder"
                className="mt-6 inline-flex w-fit items-center gap-1 text-sm text-accent"
              >
                Use template →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="font-display text-6xl leading-[1.02] md:text-7xl">
          Your next role
          <br />
          <span className="italic text-accent">starts with a great page.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Free to start. No credit card. Ship in minutes.
        </p>
        <Link
          to="/builder"
          className="mt-10 inline-flex rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-glow"
        >
          Build your portfolio →
        </Link>
      </div>
    </section>
  );
}
