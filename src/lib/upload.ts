/**
 * Image upload utility.
 *
 * Today: returns a base64 data URL stored in localStorage with the portfolio.
 * Tomorrow: swap the body of `uploadImage` to push to Firebase Storage
 * (or any provider) and return the public URL — the rest of the app stays the same.
 */

export type UploadKind = "avatar" | "hero" | "project";

const MAX_DIMENSION = {
  avatar: 512,
  hero: 1920,
  project: 1600,
} as const;

const QUALITY = 0.86;

export async function uploadImage(file: File, kind: UploadKind): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }
  if (file.size > 15 * 1024 * 1024) {
    throw new Error("Image is too large (max 15MB).");
  }
  const bitmap = await loadBitmap(file);
  const max = MAX_DIMENSION[kind];
  const { canvas } = drawScaled(bitmap, max);
  return canvas.toDataURL("image/jpeg", QUALITY);
}

async function loadBitmap(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    await img.decode();
    return img;
  } finally {
    // Revoke after a tick to let decode finish in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function drawScaled(img: HTMLImageElement, maxSize: number) {
  const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.round(img.width * ratio);
  const h = Math.round(img.height * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, w, h);
  return { canvas, w, h };
}
