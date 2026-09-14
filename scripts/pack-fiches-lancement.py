#!/usr/bin/env python3
"""Pack launch-fiche packshots onto 900×1200 ivory + JPEG/WebP/AVIF/thumbs."""

from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageOps

SEARCH = "/workspace/artifacts/searched_images"
DM = "/workspace/artifacts/official_dm"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
W, H = 900, 1200


def crop_frac(im: Image.Image, box: tuple[float, float, float, float] | None) -> Image.Image:
    if not box:
        return im
    l, t, r, b = box
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def flatten(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if im.mode == "P":
        im = im.convert("RGBA")
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, IVORY)
        bg.paste(im, mask=im.split()[-1])
        return bg
    if im.mode != "RGB":
        return im.convert("RGB")
    return im


def to_canvas(im: Image.Image, pad: float = 0.08) -> Image.Image:
    im = flatten(im)
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im = ImageEnhance.Color(im).enhance(1.04)
    max_w, max_h = int(W * (1 - 2 * pad)), int(H * (1 - 2 * pad))
    fitted = im.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (W, H), IVORY)
    canvas.paste(fitted, ((W - fitted.width) // 2, (H - fitted.height) // 2))
    return canvas


def encode(im: Image.Image, dest_name: str) -> None:
    os.makedirs(DST, exist_ok=True)
    base = os.path.splitext(dest_name)[0]
    full = os.path.join(DST, f"{base}.jpg")
    thumb = os.path.join(DST, f"{base}-thumb.jpg")
    im.save(full, "JPEG", quality=88, optimize=True, progressive=True)
    im.save(os.path.join(DST, f"{base}.webp"), "WEBP", quality=72, method=6)
    im.save(os.path.join(DST, f"{base}.avif"), "AVIF", quality=50)
    t = im.copy()
    t.thumbnail((450, 600), Image.Resampling.LANCZOS)
    t.save(thumb, "JPEG", quality=74, optimize=True, progressive=True)
    t.save(os.path.join(DST, f"{base}-thumb.webp"), "WEBP", quality=70, method=6)
    t.save(os.path.join(DST, f"{base}-thumb.avif"), "AVIF", quality=48)
    print(f"{dest_name:36} {im.size} {os.path.getsize(full):7d} B")


# dest, source, crop (l,t,r,b) or None, pad
JOBS: list[tuple[str, str, tuple[float, float, float, float] | None, float]] = [
    ("lrp-anthelios-uvmune.jpg", f"{SEARCH}/oAJei.jpg", (0.40, 0.08, 0.58, 0.96), 0.12),
    ("medicube-pdrn-exosome.jpg", f"{SEARCH}/og67X.jpg", (0.32, 0.04, 0.68, 0.96), 0.10),
    ("tiam-b3-source.jpg", f"{SEARCH}/5gqo7.jpg", (0.38, 0.02, 0.62, 0.78), 0.10),
    ("avene-eau-thermale.jpg", f"{SEARCH}/fbydu.jpg", (0.28, 0.02, 0.72, 0.98), 0.10),
    ("svr-sebiaclear-serum.jpg", f"{SEARCH}/WpWHu.jpg", (0.38, 0.04, 0.62, 0.96), 0.10),
    ("mixa-panthenol-comfort.jpg", f"{SEARCH}/23PXT.jpg", (0.22, 0.00, 0.78, 1.00), 0.08),
    ("vaseline-advanced-repair.jpg", f"{SEARCH}/6WWdD.jpg", (0.36, 0.04, 0.64, 0.96), 0.10),
    ("evoluderm-soin-hydratant.jpg", f"{SEARCH}/Wgtb4.jpg", (0.36, 0.00, 0.64, 0.78), 0.10),
    ("althea-345-relief.jpg", f"{SEARCH}/exLvZ.jpg", (0.36, 0.02, 0.64, 0.98), 0.10),
    ("dove-beauty-bar.jpg", f"{DM}/dove-bar.png", None, 0.10),
]


def main() -> None:
    for dest, src, box, pad in JOBS:
        if not os.path.exists(src):
            print(f"MISSING {src}")
            continue
        im = crop_frac(Image.open(src), box)
        canvas = to_canvas(im, pad=pad)
        encode(canvas, dest)
    print(f"packed {len(JOBS)}")


if __name__ == "__main__":
    main()
