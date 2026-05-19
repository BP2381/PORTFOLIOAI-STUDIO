import type { PortfolioData } from "@/lib/portfolio-store";

export function ResumePreviewCard({ data }: { data: PortfolioData }) {
  return (
    <div className="rounded-xl bg-[oklch(0.98_0_0)] p-6 text-[oklch(0.18_0.012_270)] shadow-glow">
      <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-3">
        <div className="flex items-center gap-3">
          {data.avatar && (
            <img
              src={data.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {data.name || "Your name"}
            </p>
            <p className="text-[11px] text-black/60">
              {data.title || "Your headline"}
            </p>
          </div>
        </div>
        <div className="text-right text-[10px] text-black/60">
          {data.email && <p>{data.email}</p>}
          {data.location && <p>{data.location}</p>}
        </div>
      </div>

      {data.summary && (
        <div className="mt-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/50">
            Summary
          </p>
          <p className="mt-1 text-[11px] leading-snug text-black/80">
            {data.summary}
          </p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mt-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/50">
            Experience
          </p>
          {data.experience.slice(0, 1).map((e) => (
            <div key={e.id} className="mt-1">
              <div className="flex justify-between text-[11px]">
                <p className="font-semibold">{e.role} · {e.company}</p>
                <p className="text-black/50">{e.period}</p>
              </div>
              <p className="text-[10px] text-black/70">{e.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div className="mt-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/50">
            Skills
          </p>
          <p className="mt-1 text-[10px] text-black/70">{data.skills}</p>
        </div>
      )}
    </div>
  );
}
