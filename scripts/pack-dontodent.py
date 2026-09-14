#!/usr/bin/env python3
"""Pack Dontodent packshots onto a 900×1200 studio canvas.

Background is flood-filled from the corners (so white tubes stay intact),
then composited over warm ivory with a soft contact shadow. No sharpening —
labels stay readable.
"""

from __future__ import annotations

import os
from collections import deque

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

SEARCHED = "/workspace/artifacts/searched_images"
OFFICIAL = "/workspace/artifacts/official"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
WARM = (245, 238, 226)
W, H = 900, 1200


def crop_frac(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def manhattan(a, b) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def cutout(im: Image.Image, thresh: int = 26) -> Image.Image:
    """RGBA cutout: flood-fill near-corner color from the edges → transparent."""
    rgb = ImageOps.exif_transpose(im).convert("RGB")
    w, h = rgb.size
    pix = rgb.load()
    seed = pix[2, 2]
    seen = bytearray(w * h)
    q = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if seen[i]:
            return
        if manhattan(pix[x, y], seed) > thresh:
            return
        seen[i] = 1
        q.append((x, y))

    for x in range(0, w, 4):
        push(x, 0)
        push(x, h - 1)
    for y in range(0, h, 4):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        if x:
            push(x - 1, y)
        if x + 1 < w:
            push(x + 1, y)
        if y:
            push(x, y - 1)
        if y + 1 < h:
            push(x, y + 1)

    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                ap[x, y] = 0
    # 1px feather so edges aren't crispy
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
    rgba = rgb.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba


def studio_bg() -> Image.Image:
    base = Image.new("RGB", (W, H), IVORY)
    wash = Image.new("RGB", (W, H), WARM)
    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)
    for y in range(H):
        t = y / (H - 1)
        d.line([(0, y), (W, y)], fill=int(10 + 42 * (t**1.35)))
    bg = Image.composite(wash, base, mask)
    spot = Image.new("L", (W, H), 0)
    ImageDraw.Draw(spot).ellipse(
        (int(W * 0.10), int(H * 0.06), int(W * 0.90), int(H * 0.70)), fill=48
    )
    spot = spot.filter(ImageFilter.GaussianBlur(72))
    light = Image.new("RGB", (W, H), (255, 252, 247))
    return Image.composite(light, bg, spot).convert("RGBA")


def to_canvas(im: Image.Image, pad: float = 0.06) -> Image.Image:
    rgba = cutout(im)
    rgb = Image.merge("RGB", rgba.split()[:3])
    rgb = ImageEnhance.Color(rgb).enhance(1.07)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.04)
    rgba = Image.merge("RGBA", (*rgb.split(), rgba.split()[-1]))

    max_w, max_h = int(W * (1 - 2 * pad)), int(H * (1 - 2 * pad))
    fitted = rgba.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    # small sources (Amazon crops) — fill the card
    up = min(max_w / fitted.width, max_h / fitted.height)
    if up > 1.04:
        fitted = fitted.resize(
            (int(fitted.width * up), int(fitted.height * up)),
            Image.Resampling.LANCZOS,
        )

    canvas = studio_bg()
    px = (W - fitted.width) // 2
    py = (H - fitted.height) // 2 + 10

    # shadow from the real silhouette
    sh = Image.new("L", (W, H), 0)
    sh.paste(fitted.split()[-1], (px, py + 22))
    sh = sh.filter(ImageFilter.GaussianBlur(24))
    sh = ImageEnhance.Brightness(sh).enhance(0.42)
    brown = Image.new("RGBA", (W, H), (48, 38, 28, 0))
    canvas = Image.alpha_composite(canvas, Image.merge("RGBA", (*brown.split()[:3], sh)))

    canvas.paste(fitted, (px, py), fitted)
    return canvas.convert("RGB")


def open_src(kind: str, name: str) -> Image.Image:
    root = OFFICIAL if kind == "official" else SEARCHED
    return Image.open(os.path.join(root, name))


JOBS = [
    ("official", "dontodent-paste.png", "dontodent-dentifrice.jpg", (0.18, 0.00, 0.82, 1.00), 0.05),
    ("official", "dontodent-mw-obf.jpg", "dontodent-bain-bouche.jpg", (0.18, 0.01, 0.82, 0.99), 0.05),
    ("official", "dontodent-floss-obf.jpg", "dontodent-pique-dents.jpg", (0.14, 0.00, 0.86, 1.00), 0.045),
    ("searched", "TZGa4.jpg", "dontodent-sensitive.jpg", (0.36, 0.00, 0.64, 0.76), 0.05),
    ("official", "dontodent-paste2-obf.jpg", "dontodent-brilliant.jpg", (0.055, 0.06, 0.265, 0.94), 0.05),
    ("official", "dontodent-mw2-obf.jpg", "dontodent-bain-sensitive.jpg", (0.12, 0.00, 0.88, 1.00), 0.045),
]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    for kind, src_name, dest_name, box, pad in JOBS:
        im = open_src(kind, src_name)
        im = crop_frac(im, *box)
        canvas = to_canvas(im, pad=pad)
        out = os.path.join(DST, dest_name)
        canvas.save(out, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"{dest_name:36} {canvas.size} {os.path.getsize(out):7d} B")


if __name__ == "__main__":
    main()
