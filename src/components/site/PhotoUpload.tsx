import { useRef, useState } from "react";
import { uploadImage, type UploadKind } from "@/lib/upload";

type Props = {
  value?: string;
  onChange: (next: string | undefined) => void;
  kind: UploadKind;
  label?: string;
  /** Visual aspect ratio of the picker thumbnail. */
  aspect?: "square" | "wide" | "portrait";
  className?: string;
};

const ASPECT_CLS: Record<NonNullable<Props["aspect"]>, string> = {
  square: "aspect-square",
  wide: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
};

export function PhotoUpload({
  value,
  onChange,
  kind,
  label,
  aspect = "square",
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const dataUrl = await uploadImage(file, kind);
      onChange(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="mb-1.5 block text-[11px] text-muted-foreground">{label}</p>
      )}
      <div
        className={`group relative ${ASPECT_CLS[aspect]} overflow-hidden rounded-xl border border-dashed border-hairline bg-background transition-colors hover:border-foreground/40`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {loading ? "Uploading…" : "Click to upload"}
            </span>
            <span className="text-[10px] text-muted-foreground/70">
              PNG · JPG · up to 15MB
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          aria-label={label ?? "Upload photo"}
        />

        {value && (
          <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-full items-center justify-between gap-2 bg-background/85 px-3 py-2 backdrop-blur transition-transform group-hover:translate-y-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-[11px] text-foreground hover:text-accent"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="text-[11px] text-muted-foreground hover:text-destructive"
            >
              Remove
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[11px] text-destructive">{error}</p>
      )}
    </div>
  );
}

/** Compact avatar uploader — circular, for inline use. */
export function AvatarUpload({
  value,
  onChange,
  initials,
}: {
  value?: string;
  onChange: (next: string | undefined) => void;
  initials: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setLoading(true);
    try {
      const dataUrl = await uploadImage(file, "avatar");
      onChange(dataUrl);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-20 w-20 overflow-hidden rounded-full border border-hairline bg-surface"
      >
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-2xl text-muted-foreground">
            {initials || "+"}
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-background/70 text-[10px] uppercase tracking-[0.18em] text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {loading ? "…" : value ? "Change" : "Upload"}
        </span>
      </button>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-left text-xs text-foreground hover:text-accent"
        >
          {value ? "Replace photo" : "Upload profile photo"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-left text-[11px] text-muted-foreground hover:text-destructive"
          >
            Remove
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
