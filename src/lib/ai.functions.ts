import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  mode: z.enum(["bio", "summary", "project", "skills", "experience"]),
  text: z.string().min(1).max(4000),
  context: z.string().max(2000).optional(),
});

const PROMPTS: Record<z.infer<typeof inputSchema>["mode"], string> = {
  bio: "Rewrite the user's bio into a confident, 2-3 sentence personal introduction. Editorial tone, no buzzwords, no emojis. Plain prose only.",
  summary:
    "Rewrite into a strong professional summary for a resume. 3-4 sentences, ATS-friendly, focused on impact and skills. Plain prose only.",
  project:
    "Rewrite into a crisp, results-oriented project description. 1-2 sentences. Lead with impact, mention stack subtly. Plain prose only.",
  skills:
    "Take the raw skills and return a clean, comma-separated, deduplicated list ordered by relevance. No prose, just the list.",
  experience:
    "Rewrite into one strong resume bullet line: action verb, scope, measurable impact. Plain prose, no bullet symbols.",
};

export const aiRewrite = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { text: data.text, error: "AI is not configured." };
    }

    const system = PROMPTS[data.mode];
    const userMessage = data.context
      ? `Context: ${data.context}\n\nText: ${data.text}`
      : data.text;

    try {
      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: system },
              { role: "user", content: userMessage },
            ],
          }),
        },
      );

      if (res.status === 429) {
        return { text: data.text, error: "Rate limit reached. Try again shortly." };
      }
      if (res.status === 402) {
        return { text: data.text, error: "AI credits exhausted. Add credits in Workspace settings." };
      }
      if (!res.ok) {
        return { text: data.text, error: `AI error (${res.status}).` };
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const out = json.choices?.[0]?.message?.content?.trim() ?? data.text;
      return { text: out, error: null };
    } catch (err) {
      console.error("aiRewrite failed", err);
      return { text: data.text, error: "AI service unavailable." };
    }
  });
