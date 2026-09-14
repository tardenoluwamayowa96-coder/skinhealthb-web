#!/usr/bin/env python3
"""Pack drugstore packshots onto 900×1200 ivory canvas."""

from __future__ import annotations

import os

from PIL import Image, ImageOps

SEARCHED = "/workspace/artifacts/searched_images"
OFFICIAL = "/workspace/artifacts/official"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
W, H = 900, 1200


def crop_frac(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def to_canvas(im: Image.Image, pad: float = 0.10) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if im.mode != "RGB":
        im = im.convert("RGB")
    max_w, max_h = int(W * (1 - 2 * pad)), int(H * (1 - 2 * pad))
    fitted = im.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (W, H), IVORY)
    canvas.paste(fitted, ((W - fitted.width) // 2, (H - fitted.height) // 2))
    return canvas


def open_src(kind: str, name: str) -> Image.Image:
    root = OFFICIAL if kind == "official" else SEARCHED
    return Image.open(os.path.join(root, name))


# kind, src, dest, box (l,t,r,b), pad
JOBS = [
    ("official", "biooil-fr3.jpg", "bi-oil-125.jpg", (0.00, 0.05, 0.38, 0.95), 0.08),
    ("searched", "6s9SE.jpg", "vaseline-original-250.jpg", (0.34, 0.04, 0.66, 0.96), 0.10),
    ("searched", "qzY2l.jpg", "vaseline-cocoa-400.jpg", (0.28, 0.02, 0.72, 0.98), 0.08),
    ("official", "vaseline-men-cooling.jpg", "vaseline-men-cooling.jpg", (0.08, 0.02, 0.92, 0.98), 0.08),
    ("official", "mixa-lait.jpg", "mixa-lait-reparateur.jpg", (0.02, 0.02, 0.98, 0.98), 0.08),
    ("official", "mixa-cica-obf.jpg", "mixa-cica-400.jpg", (0.12, 0.04, 0.88, 0.96), 0.08),
    ("official", "mixa-douche.jpg", "mixa-creme-douche.jpg", (0.04, 0.02, 0.96, 0.98), 0.08),
    ("official", "mixa-bebe-gel.jpg", "mixa-gel-bebe.jpg", (0.08, 0.02, 0.92, 0.98), 0.08),
    ("searched", "Y89dU.jpg", "balea-soft-creme.jpg", (0.32, 0.02, 0.68, 0.98), 0.08),
    ("official", "balea-mandel.jpg", "balea-mandel.jpg", (0.18, 0.04, 0.82, 0.96), 0.08),
    ("searched", "UNxLO.jpg", "balea-med-ph.jpg", (0.52, 0.02, 0.78, 0.98), 0.08),
    ("official", "garnier-olive-250.jpg", "garnier-olive.jpg", (0.08, 0.02, 0.92, 0.98), 0.08),
    ("official", "garnier-avocat-600.jpg", "garnier-avocat.jpg", (0.22, 0.04, 0.78, 0.96), 0.08),
    ("official", "garnier-miel-300.jpg", "garnier-miel.jpg", (0.02, 0.02, 0.98, 0.98), 0.08),
    ("official", "evoluderm-argan-obf.jpg", "evoluderm-argan.jpg", (0.04, 0.02, 0.96, 0.98), 0.08),
    ("official", "evoluderm-karite.jpg", "evoluderm-karite.jpg", (0.08, 0.02, 0.92, 0.98), 0.08),
    ("searched", "OA9Pq.jpg", "rossmann-vit-c.jpg", (0.74, 0.04, 0.995, 0.96), 0.10),
    ("searched", "y26zO.jpg", "rossmann-magnesium.jpg", (0.34, 0.02, 0.66, 0.98), 0.10),
    ("searched", "OA9Pq.jpg", "rossmann-multi.jpg", (0.49, 0.04, 0.75, 0.96), 0.10),
    ("searched", "OA9Pq.jpg", "rossmann-calcium.jpg", (0.00, 0.04, 0.26, 0.96), 0.10),
]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    for kind, src_name, dest_name, box, pad in JOBS:
        im = open_src(kind, src_name)
        im = crop_frac(im, *box)
        canvas = to_canvas(im, pad=pad)
        out = os.path.join(DST, dest_name)
        canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{dest_name:36} {canvas.size} {os.path.getsize(out):7d} B")


if __name__ == "__main__":
    main()
