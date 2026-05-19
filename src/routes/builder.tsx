import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  usePortfolio,
  uid,
  type PortfolioData,
} from "@/lib/portfolio-store";
import { aiRewrite } from "@/lib/ai.functions";
import { useServerFn } from "@tanstack/react-start";
import { AvatarUpload, PhotoUpload } from "@/components/site/PhotoUpload";

export const Route = createFileRoute("/builder")({
  component: BuilderPage,
});

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function BuilderPage() {
  const { data, setData, hydrated } = usePortfolio();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center text-muted-foreground">
          Loading your workspace…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Builder
            </p>
            <h1 className="mt-3 font-display text-5xl">Your portfolio, live.</h1>
          </div>
          <div className="flex gap-2">
            <Link
              to="/resume"
              className="rounded-full border border-border px-4 py-2 text-sm hover:border-foreground/40"
            >
              Open resume →
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
          <Editor data={data} setData={setData} />
          <LivePreview data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Editor({
  data,
  setData,
}: {
  data: PortfolioData;
  setData: (d: PortfolioData) => void;
}) {
  return (
    <div className="space-y-8 rounded-2xl border border-hairline bg-surface/40 p-6">
      <Section title="Profile photo">
        <AvatarUpload
          value={data.avatar}
          onChange={(v) => setData({ ...data, avatar: v })}
          initials={initialsOf(data.name) || "+"}
        />
      </Section>


      <Section title="Identity">
        <Field label="Full name">
          <input
            className={inputCls}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </Field>
        <Field label="Headline">
          <input
            className={inputCls}
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Location">
            <input
              className={inputCls}
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </Field>
          <Field label="Subdomain">
            <input
              className={inputCls}
              value={data.website}
              onChange={(e) => setData({ ...data, website: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email">
            <input
              className={inputCls}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputCls}
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="GitHub">
            <input
              className={inputCls}
              value={data.github}
              onChange={(e) => setData({ ...data, github: e.target.value })}
            />
          </Field>
          <Field label="LinkedIn">
            <input
              className={inputCls}
              value={data.linkedin}
              onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Bio">
        <AIField
          mode="bio"
          value={data.bio}
          onChange={(v) => setData({ ...data, bio: v })}
          rows={3}
        />
      </Section>

      <Section title="Professional summary">
        <AIField
          mode="summary"
          value={data.summary}
          onChange={(v) => setData({ ...data, summary: v })}
          rows={4}
        />
      </Section>

      <Section title="Skills">
        <AIField
          mode="skills"
          value={data.skills}
          onChange={(v) => setData({ ...data, skills: v })}
          rows={2}
          placeholder="comma-separated"
        />
      </Section>

      <Section title="Hero background (optional)">
        <PhotoUpload
          value={data.hero}
          onChange={(v) => setData({ ...data, hero: v })}
          kind="hero"
          aspect="wide"
        />
      </Section>

      <Section title="Projects">

        <div className="space-y-3">
          {data.projects.map((p, i) => (
            <div key={p.id} className="rounded-xl border border-hairline bg-background p-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputCls}
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => {
                    const next = [...data.projects];
                    next[i] = { ...p, name: e.target.value };
                    setData({ ...data, projects: next });
                  }}
                />
                <input
                  className={inputCls}
                  placeholder="Link"
                  value={p.link}
                  onChange={(e) => {
                    const next = [...data.projects];
                    next[i] = { ...p, link: e.target.value };
                    setData({ ...data, projects: next });
                  }}
                />
              </div>
              <div className="mt-3">
                <AIField
                  mode="project"
                  value={p.description}
                  onChange={(v) => {
                    const next = [...data.projects];
                    next[i] = { ...p, description: v };
                    setData({ ...data, projects: next });
                  }}
                  rows={2}
                  placeholder="What is it, who is it for, what's impressive?"
                />
              </div>
              <input
                className={`${inputCls} mt-3`}
                placeholder="Stack (React · Postgres · ...)"
                value={p.tech}
                onChange={(e) => {
                  const next = [...data.projects];
                  next[i] = { ...p, tech: e.target.value };
                  setData({ ...data, projects: next });
                }}
              />
              <div className="mt-3">
                <PhotoUpload
                  label="Project image (optional)"
                  value={p.image}
                  onChange={(v) => {
                    const next = [...data.projects];
                    next[i] = { ...p, image: v };
                    setData({ ...data, projects: next });
                  }}
                  kind="project"
                  aspect="wide"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  className="text-xs text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      projects: data.projects.filter((x) => x.id !== p.id),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            className="w-full rounded-xl border border-dashed border-hairline px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            onClick={() =>
              setData({
                ...data,
                projects: [
                  ...data.projects,
                  { id: uid(), name: "", description: "", tech: "", link: "" },
                ],
              })
            }
          >
            + Add project
          </button>
        </div>
      </Section>

      <Section title="Experience">
        <div className="space-y-3">
          {data.experience.map((e, i) => (
            <div key={e.id} className="rounded-xl border border-hairline bg-background p-4">
              <div className="grid grid-cols-2 gap-3">
                <input className={inputCls} placeholder="Role" value={e.role}
                  onChange={(ev) => {
                    const next = [...data.experience];
                    next[i] = { ...e, role: ev.target.value };
                    setData({ ...data, experience: next });
                  }}
                />
                <input className={inputCls} placeholder="Company" value={e.company}
                  onChange={(ev) => {
                    const next = [...data.experience];
                    next[i] = { ...e, company: ev.target.value };
                    setData({ ...data, experience: next });
                  }}
                />
              </div>
              <input className={`${inputCls} mt-3`} placeholder="2023 — Present" value={e.period}
                onChange={(ev) => {
                  const next = [...data.experience];
                  next[i] = { ...e, period: ev.target.value };
                  setData({ ...data, experience: next });
                }}
              />
              <div className="mt-3">
                <AIField
                  mode="experience"
                  value={e.description}
                  onChange={(v) => {
                    const next = [...data.experience];
                    next[i] = { ...e, description: v };
                    setData({ ...data, experience: next });
                  }}
                  rows={2}
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  className="text-xs text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      experience: data.experience.filter((x) => x.id !== e.id),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            className="w-full rounded-xl border border-dashed border-hairline px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            onClick={() =>
              setData({
                ...data,
                experience: [
                  ...data.experience,
                  { id: uid(), role: "", company: "", period: "", description: "" },
                ],
              })
            }
          >
            + Add experience
          </button>
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-3">
          {data.education.map((ed, i) => (
            <div key={ed.id} className="rounded-xl border border-hairline bg-background p-4">
              <input className={inputCls} placeholder="School" value={ed.school}
                onChange={(e) => {
                  const next = [...data.education];
                  next[i] = { ...ed, school: e.target.value };
                  setData({ ...data, education: next });
                }}
              />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <input className={inputCls} placeholder="Degree" value={ed.degree}
                  onChange={(e) => {
                    const next = [...data.education];
                    next[i] = { ...ed, degree: e.target.value };
                    setData({ ...data, education: next });
                  }}
                />
                <input className={inputCls} placeholder="2022 — 2026" value={ed.period}
                  onChange={(e) => {
                    const next = [...data.education];
                    next[i] = { ...ed, period: e.target.value };
                    setData({ ...data, education: next });
                  }}
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  className="text-xs text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    setData({
                      ...data,
                      education: data.education.filter((x) => x.id !== ed.id),
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            className="w-full rounded-xl border border-dashed border-hairline px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            onClick={() =>
              setData({
                ...data,
                education: [
                  ...data.education,
                  { id: uid(), school: "", degree: "", period: "" },
                ],
              })
            }
          >
            + Add education
          </button>
        </div>
      </Section>

      <Section title="Theme">
        <div className="flex gap-2">
          {(["noir", "ivory", "ember"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setData({ ...data, theme: t })}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.18em] ${
                data.theme === t
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-hairline text-muted-foreground hover:border-foreground/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-hairline bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent/60";

function AIField({
  mode,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  mode: "bio" | "summary" | "project" | "skills" | "experience";
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const rewrite = useServerFn(aiRewrite);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!value.trim()) {
      setError("Write something first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await rewrite({ data: { mode, text: value } });
      if (res.error) setError(res.error);
      onChange(res.text);
    } catch (e) {
      console.error(e);
      setError("Couldn't reach AI right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <textarea
        className={`${inputCls} resize-none pr-24`}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={run}
        disabled={loading}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "…" : "✦ AI rewrite"}
      </button>
      {error && (
        <p className="mt-1 text-[11px] text-destructive">{error}</p>
      )}
    </div>
  );
}

function LivePreview({ data }: { data: PortfolioData }) {
  const skills = data.skills.split(",").map((s) => s.trim()).filter(Boolean);

  const themeStyle = {
    noir: { bg: "bg-background", panel: "bg-surface", accent: "text-accent" },
    ivory: { bg: "bg-[oklch(0.96_0.005_270)]", panel: "bg-white", accent: "text-[oklch(0.45_0.18_25)]" },
    ember: { bg: "bg-[oklch(0.16_0.03_30)]", panel: "bg-[oklch(0.2_0.04_30)]", accent: "text-[oklch(0.78_0.18_50)]" },
  }[data.theme];

  const ivory = data.theme === "ivory";

  return (
    <div className="sticky top-24 self-start">
      <div className="overflow-hidden rounded-2xl border border-hairline shadow-elegant">
        <div className="flex items-center gap-2 border-b border-hairline bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.62_0.22_25)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_78)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.62_0.16_150)]" />
          <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
            {data.website || "yourname.portfolioai.dev"}
          </div>
        </div>

        <div className={`${themeStyle.bg} ${ivory ? "text-[oklch(0.18_0.012_270)]" : "text-foreground"}`}>
          {data.hero && (
            <div className="relative h-44 w-full overflow-hidden">
              <img src={data.hero} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            </div>
          )}
          <div className="p-10">
            <div className="flex items-start gap-5">
              {data.avatar && (
                <img
                  src={data.avatar}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-full border border-hairline object-cover"
                />
              )}
              <div className="min-w-0">
                <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${ivory ? "text-black/50" : "text-muted-foreground"}`}>
                  Portfolio{data.location ? ` · ${data.location}` : ""}
                </p>
                <h2 className="mt-2 font-display text-5xl leading-[1.05]">
                  {data.name || "Your name"}
                </h2>
                <p className={`mt-1 text-sm ${ivory ? "text-black/60" : "text-muted-foreground"}`}>
                  {data.title || "Your headline"}
                </p>
              </div>
            </div>

            <p className={`mt-6 max-w-xl text-[15px] leading-relaxed ${ivory ? "text-black/80" : "text-foreground/85"}`}>
              {data.bio || "Your bio will appear here. Use the AI rewrite to polish it."}
            </p>


          {skills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${
                    ivory
                      ? "border-black/10 bg-black/5 text-black/70"
                      : "border-hairline bg-surface text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${ivory ? "text-black/50" : "text-muted-foreground"}`}>
              Selected work
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.projects.map((p) => (
                <div
                  key={p.id}
                  className={`overflow-hidden rounded-xl border ${
                    ivory ? "border-black/10 bg-white" : `border-hairline ${themeStyle.panel}`
                  }`}
                >
                  {p.image && (
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img src={p.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{p.name || "Untitled"}</p>
                      <span className={`font-mono text-[10px] ${themeStyle.accent}`}>↗</span>
                    </div>
                    <p className={`mt-1 text-xs ${ivory ? "text-black/60" : "text-muted-foreground"}`}>
                      {p.description}
                    </p>
                    <p className={`mt-3 font-mono text-[10px] uppercase tracking-[0.18em] ${ivory ? "text-black/50" : "text-muted-foreground"}`}>
                      {p.tech}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {data.experience.length > 0 && (
            <div className="mt-10">
              <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${ivory ? "text-black/50" : "text-muted-foreground"}`}>
                Experience
              </p>
              <div className="mt-4 space-y-3">
                {data.experience.map((e) => (
                  <div key={e.id} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                    <div>
                      <p className="text-sm font-medium">{e.role} · {e.company}</p>
                      <p className={`text-xs ${ivory ? "text-black/60" : "text-muted-foreground"}`}>{e.description}</p>
                    </div>
                    <p className={`shrink-0 font-mono text-[10px] ${ivory ? "text-black/50" : "text-muted-foreground"}`}>
                      {e.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
