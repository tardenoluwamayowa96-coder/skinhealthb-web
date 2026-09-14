#!/usr/bin/env python3
"""Fit official packshots onto 900×1200 ivory canvas for Skinhealthb."""

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


# src dir is "official" or "searched"
JOBS = [
    ("searched", "QH1Ny.jpg", "skin1004-cleansing-oil.jpg", (0.28, 0.04, 0.72, 0.96), 0.10),
    ("official", "skin1004-sun.jpg", "skin1004-hyalu-cica-sun.jpg", (0.02, 0.02, 0.98, 0.98), 0.08),
    ("searched", "vLbqY.jpg", "boje-glow-deep.jpg", (0.18, 0.02, 0.82, 0.98), 0.08),
    ("searched", "q0AZ3.jpg", "goodal-vita-c.jpg", (0.02, 0.04, 0.50, 0.96), 0.10),
    ("searched", "0u1su.jpg", "somebymi-miracle-serum.jpg", (0.32, 0.12, 0.68, 0.92), 0.10),
    ("searched", "tu7S1.jpg", "manyo-cleansing-oil.jpg", (0.32, 0.02, 0.68, 0.98), 0.08),
    ("searched", "sUmGo.jpg", "haruharu-black-rice-toner.jpg", (0.30, 0.12, 0.70, 0.92), 0.10),
    ("searched", "u5eOh.jpg", "purito-soft-sun.jpg", (0.38, 0.10, 0.62, 0.78), 0.08),
    ("searched", "wjftl.jpg", "romand-juicy-tint.jpg", (0.28, 0.08, 0.72, 0.92), 0.08),
    ("official", "cosrx-bha.jpg", "cosrx-bha-liquid.jpg", (0.08, 0.02, 0.92, 0.98), 0.06),
    ("official", "biodance-box.jpg", "biodance-collagen-mask.jpg", (0.12, 0.08, 0.88, 0.92), 0.08),
    ("searched", "30VjI.jpg", "torriden-dive-in.jpg", (0.16, 0.10, 0.84, 0.90), 0.08),
    ("searched", "U8q9w.jpg", "numbuzin-no5.jpg", (0.48, 0.08, 0.98, 0.92), 0.08),
    ("searched", "0jlnR.jpg", "iunik-beta-glucan.jpg", (0.32, 0.08, 0.68, 0.92), 0.08),
]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    for src_kind, src_name, dest_name, box, pad in JOBS:
        root = OFFICIAL if src_kind == "official" else SEARCHED
        src = os.path.join(root, src_name)
        im = Image.open(src)
        im = crop_frac(im, *box)
        canvas = to_canvas(im, pad=pad)
        out = os.path.join(DST, dest_name)
        canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{dest_name:36} {canvas.size} {os.path.getsize(out):6d} B")


if __name__ == "__main__":
    main()
