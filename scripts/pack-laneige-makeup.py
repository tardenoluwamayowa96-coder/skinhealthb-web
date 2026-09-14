#!/usr/bin/env python3
"""Pack Laneige + makeup stills onto 900×1200 ivory."""

from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageOps

SRC = "/workspace/artifacts/searched_images"
DST = "/workspace/public/products"
IVORY = (243, 240, 232)
W, H = 900, 1200


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


def crop_frac(im: Image.Image, box: tuple[float, float, float, float] | None) -> Image.Image:
    if not box:
        return im
    l, t, r, b = box
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def to_canvas(im: Image.Image, pad: float = 0.10) -> Image.Image:
    im = flatten(im)
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im = ImageEnhance.Color(im).enhance(1.03)
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
    print(f"{dest_name:42} {im.size} {os.path.getsize(full):7d} B")


JOBS = [
    ("laneige-lip-sleeping-mask.jpg", "AjQCt.jpg", (0.02, 0.12, 0.98, 0.92), 0.08),
    ("laneige-lip-glowy-balm.jpg", "U10DA.jpg", (0.38, 0.18, 0.62, 0.86), 0.12),
    ("laneige-water-sleeping-mask.jpg", "710Xm.jpg", (0.32, 0.22, 0.68, 0.82), 0.10),
    ("laneige-cream-skin.jpg", "zCWnS.jpg", (0.28, 0.28, 0.52, 0.92), 0.10),
    ("tirtir-mask-fit-40n.jpg", "HPohm.jpg", (0.22, 0.08, 0.82, 0.96), 0.08),
    ("romand-juicy-figfig.jpg", "yz2sp.jpg", (0.28, 0.18, 0.72, 0.86), 0.10),
]

for dest, src, box, pad in JOBS:
    path = os.path.join(SRC, src)
    im = Image.open(path)
    encode(to_canvas(crop_frac(im, box), pad), dest)
