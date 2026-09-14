#!/usr/bin/env python3
"""Pack photographed vitamins, Balea creme douche, Tesori, deodorant onto 900×1200 ivory."""

from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageOps

ATT = "/workspace/attachments"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
W, H = 900, 1200


def crop_frac(im: Image.Image, box: tuple[float, float, float, float]) -> Image.Image:
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
    im = ImageEnhance.Contrast(im).enhance(1.06)
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


# dest, source, crop (l,t,r,b), pad
JOBS: list[tuple[str, str, tuple[float, float, float, float], float]] = [
    # Vitamines — tubes posés
    ("altapharma-vitamin-c.jpg", "IMG-20260911-WA0115.jpg", (0.30, 0.05, 0.70, 0.66), 0.10),
    ("altapharma-multivitamin.jpg", "IMG-20260911-WA0116.jpg", (0.30, 0.05, 0.70, 0.66), 0.10),
    ("altapharma-multi-mineral.jpg", "IMG-20260911-WA0117.jpg", (0.30, 0.05, 0.70, 0.66), 0.10),
    ("altapharma-magnesium.jpg", "IMG-20260911-WA0119.jpg", (0.30, 0.08, 0.70, 0.68), 0.10),
    # Vitamines — tenus en main
    ("altapharma-vitamin-b12.jpg", "IMG-20260911-WA0118.jpg", (0.28, 0.10, 0.72, 0.66), 0.10),
    ("mivolis-multivitamin.jpg", "IMG-20260911-WA0122.jpg", (0.34, 0.14, 0.66, 0.64), 0.10),
    ("mivolis-multimineral.jpg", "IMG-20260911-WA0123.jpg", (0.36, 0.16, 0.66, 0.72), 0.10),
    ("mivolis-eisen-vitc.jpg", "IMG-20260911-WA0124.jpg", (0.36, 0.10, 0.68, 0.68), 0.10),
    # Balea crèmes douche
    ("balea-mandel-magnolie.jpg", "IMG-20260911-WA0129.jpg", (0.30, 0.12, 0.70, 0.68), 0.08),
    ("balea-sensitive-aloe.jpg", "IMG-20260911-WA0131.jpg", (0.32, 0.18, 0.68, 0.82), 0.08),
    ("balea-pure-softness.jpg", "IMG-20260911-WA0132.jpg", (0.28, 0.08, 0.74, 0.68), 0.08),
    ("balea-vanille-kokos.jpg", "IMG-20260911-WA0133.jpg", (0.30, 0.10, 0.72, 0.68), 0.08),
    ("balea-buttermilk-lemon.jpg", "IMG-20260911-WA0134.jpg", (0.30, 0.10, 0.74, 0.68), 0.08),
    ("balea-milch-honig.jpg", "IMG-20260911-WA0135.jpg", (0.30, 0.08, 0.72, 0.68), 0.08),
    ("balea-sweet-embrace.jpg", "IMG-20260911-WA0136.jpg", (0.22, 0.06, 0.78, 0.78), 0.08),
    # Tesori
    ("tesori-hammam-peeling.jpg", "IMG-20260911-WA0127.jpg", (0.10, 0.28, 0.90, 0.74), 0.08),
    ("tesori-hammam-douche.jpg", "IMG-20260911-WA0139.jpg", (0.26, 0.05, 0.68, 0.82), 0.08),
    # Déo
    ("balea-deo-sensitive.jpg", "IMG-20260911-WA0125.jpg", (0.50, 0.16, 0.82, 0.70), 0.10),
    # Savons crème
    ("balea-seife-milch-honig.jpg", "IMG-20260911-WA0126.jpg", (0.18, 0.36, 0.82, 0.56), 0.10),
    ("balea-seife-sensitive.jpg", "IMG-20260911-WA0128.jpg", (0.14, 0.42, 0.86, 0.595), 0.10),
]


def main() -> None:
    for dest, src, box, pad in JOBS:
        path = os.path.join(ATT, src)
        if not os.path.exists(path):
            print(f"MISSING {path}")
            continue
        im = crop_frac(Image.open(path), box)
        canvas = to_canvas(im, pad=pad)
        encode(canvas, dest)
    print(f"packed {len(JOBS)}")


if __name__ == "__main__":
    main()
