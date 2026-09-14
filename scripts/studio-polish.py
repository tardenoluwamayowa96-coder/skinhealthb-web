#!/usr/bin/env python3
"""Studio-polish every ivory packshot: tight crop, fill the 3:4 frame, soft shadow.

Skips shots that already fill the frame (official packshots, previously polished
tubes) so we never double-process a gradient background.
"""

from __future__ import annotations

import glob
import os
from collections import deque

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

SRC = "/workspace/public/products"
IVORY = (251, 248, 241)
IVORY_NP = np.array(IVORY, dtype=np.int16)
W, H = 900, 1200
# fill this fraction of the canvas (padding around the product)
TARGET_PAD = 0.055
# already occupies this much of one axis → leave it
SKIP_DIM = 0.78


def dist_np(arr: np.ndarray) -> np.ndarray:
    return np.abs(arr.astype(np.int16) - IVORY_NP).sum(axis=2)


def is_flat_ivory(arr: np.ndarray) -> bool:
    """True when the canvas is a flat ivory studio, not a photo or gradient."""
    h, w = arr.shape[:2]
    corners = [
        arr[2, 2],
        arr[2, w - 3],
        arr[h - 3, 2],
        arr[h - 3, w - 3],
    ]
    if max(int(np.abs(c.astype(np.int16) - IVORY_NP).sum()) for c in corners) > 14:
        return False
    top = arr[:12].mean(axis=(0, 1))
    bot = arr[-12:].mean(axis=(0, 1))
    if int(np.abs(top.astype(np.int16) - bot.astype(np.int16)).sum()) > 18:
        return False
    return True


def product_bbox(arr: np.ndarray) -> tuple[int, int, int, int] | None:
    h, w = arr.shape[:2]
    color_fg = dist_np(arr) > 16
    gray = arr.mean(axis=2)
    dx = np.abs(np.diff(gray, axis=1, prepend=gray[:, :1]))
    dy = np.abs(np.diff(gray, axis=0, prepend=gray[:1, :]))
    edges = (dx + dy) > 11
    fg = color_fg | edges
    fg[:8, :] = False
    fg[-8:, :] = False
    fg[:, :8] = False
    fg[:, -8:] = False
    ys, xs = np.where(fg)
    if len(xs) < 40:
        return None
    pad = 10
    x0 = max(0, int(xs.min()) - pad)
    y0 = max(0, int(ys.min()) - pad)
    x1 = min(w, int(xs.max()) + pad + 1)
    y1 = min(h, int(ys.max()) + pad + 1)
    return x0, y0, x1, y1


def flood_bg(barrier: np.ndarray) -> np.ndarray:
    """Flood-fill False cells from the border. barrier True = wall (product edge)."""
    h, w = barrier.shape
    seen = np.zeros((h, w), dtype=np.uint8)
    q: deque[tuple[int, int]] = deque()

    def push(y: int, x: int) -> None:
        if y < 0 or x < 0 or y >= h or x >= w:
            return
        if seen[y, x] or barrier[y, x]:
            return
        seen[y, x] = 1
        q.append((y, x))

    for x in range(w):
        push(0, x)
        push(h - 1, x)
    for y in range(h):
        push(y, 0)
        push(y, w - 1)
    while q:
        y, x = q.popleft()
        push(y - 1, x)
        push(y + 1, x)
        push(y, x - 1)
        push(y, x + 1)
    return seen  # 1 = background


def product_alpha(crop: np.ndarray) -> Image.Image:
    """Soft alpha of the product inside a cropped rectangle (keeps white bottles)."""
    color_fg = dist_np(crop) > 14
    gray = crop.mean(axis=2)
    dx = np.abs(np.diff(gray, axis=1, prepend=gray[:, :1]))
    dy = np.abs(np.diff(gray, axis=0, prepend=gray[:1, :]))
    edges = (dx + dy) > 10
    wall = color_fg | edges
    # close small silhouette gaps so flood fill cannot leak into the bottle
    wall_im = Image.fromarray(wall.astype(np.uint8) * 255, mode="L")
    wall_im = wall_im.filter(ImageFilter.MaxFilter(5))
    wall_closed = np.array(wall_im) > 0
    bg = flood_bg(wall_closed)
    fg = 1 - bg
    alpha = Image.fromarray((fg * 255).astype(np.uint8), mode="L")
    return alpha.filter(ImageFilter.GaussianBlur(1.2))


def gradient_bg() -> Image.Image:
    base = Image.new("RGB", (W, H), IVORY)
    overlay = Image.new("RGB", (W, H), (236, 226, 208))
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for y in range(H):
        t = y / (H - 1)
        draw.line([(0, y), (W, y)], fill=int(16 + 72 * (t**1.35)))
    base = Image.composite(overlay, base, mask)
    spot = Image.new("L", (W, H), 0)
    sd = ImageDraw.Draw(spot)
    cx, cy, rx, ry = W // 2, int(H * 0.42), int(W * 0.55), int(H * 0.48)
    sd.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=70)
    spot = spot.filter(ImageFilter.GaussianBlur(90))
    light = Image.new("RGB", (W, H), (255, 252, 246))
    return Image.composite(light, base, spot)


def polish_array(arr: np.ndarray) -> Image.Image | None:
    if not is_flat_ivory(arr):
        return None
    box = product_bbox(arr)
    if box is None:
        return None
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    if max(bw / W, bh / H) >= SKIP_DIM:
        return None
    product = Image.fromarray(arr[y0:y1, x0:x1]).convert("RGB")
    alpha = product_alpha(arr[y0:y1, x0:x1])

    product = ImageEnhance.Contrast(product).enhance(1.10)
    product = ImageEnhance.Color(product).enhance(1.08)
    product = ImageEnhance.Brightness(product).enhance(1.02)
    product = product.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=2))

    max_w, max_h = int(W * (1 - 2 * TARGET_PAD)), int(H * (1 - 2 * TARGET_PAD))
    fitted = product.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    alpha_f = alpha.resize(fitted.size, Image.Resampling.BILINEAR)

    rgba = fitted.convert("RGBA")
    rgba.putalpha(alpha_f)

    canvas = gradient_bg().convert("RGBA")
    px = (W - fitted.width) // 2
    py = (H - fitted.height) // 2 + 10

    sh = Image.new("L", (W, H), 0)
    sh.paste(alpha_f, (px, py + 26))
    sh = sh.filter(ImageFilter.GaussianBlur(26))
    sh = ImageEnhance.Brightness(sh).enhance(0.50)
    shadow_col = Image.new("RGBA", (W, H), (40, 32, 22, 0))
    canvas = Image.alpha_composite(canvas, Image.merge("RGBA", (*shadow_col.split()[:3], sh)))

    ell = Image.new("L", (W, H), 0)
    ed = ImageDraw.Draw(ell)
    ey = py + fitted.height - 6
    ew = int(fitted.width * 0.50)
    ed.ellipse((W // 2 - ew, ey - 20, W // 2 + ew, ey + 20), fill=85)
    ell = ell.filter(ImageFilter.GaussianBlur(16))
    canvas = Image.alpha_composite(canvas, Image.merge("RGBA", (*shadow_col.split()[:3], ell)))

    canvas.paste(rgba, (px, py), rgba)
    return canvas.convert("RGB")


def encode_variants(im: Image.Image, jpeg_path: str) -> None:
    """Write JPEG + WebP + AVIF (full) and 450×600 thumbs."""
    base, _ = os.path.splitext(jpeg_path)
    im.save(jpeg_path, "JPEG", quality=88, optimize=True, progressive=True, subsampling=2)
    im.save(base + ".webp", "WEBP", quality=72, method=6)
    im.save(base + ".avif", "AVIF", quality=50)
    thumb = im.copy()
    thumb.thumbnail((450, 600), Image.Resampling.LANCZOS)
    thumb.save(base + "-thumb.jpg", "JPEG", quality=74, optimize=True, progressive=True)
    thumb.save(base + "-thumb.webp", "WEBP", quality=70, method=6)
    thumb.save(base + "-thumb.avif", "AVIF", quality=48)


def main() -> None:
    only = os.environ.get("POLISH_ONLY")
    names = [only] if only else [
        os.path.basename(p)
        for p in sorted(glob.glob(os.path.join(SRC, "*.jpg")))
        if not p.endswith("-thumb.jpg")
    ]
    did = skip = fail = 0
    for name in names:
        path = os.path.join(SRC, name)
        if not os.path.exists(path):
            print(f"missing {name}")
            fail += 1
            continue
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
        arr = np.array(im)
        out = polish_array(arr)
        if out is None:
            skip += 1
            print(f"skip  {name}")
            continue
        encode_variants(out, path)
        did += 1
        print(f"ok    {name:36} {out.size} {os.path.getsize(path):7d} B")
    print(f"\npolished {did}  skipped {skip}  failed {fail}")


if __name__ == "__main__":
    main()
