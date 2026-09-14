#!/usr/bin/env python3
"""Pack dm-shelf wave 3 packshots onto 900×1200 ivory canvas."""

from __future__ import annotations

import os

from PIL import Image, ImageOps, ImageEnhance

ATT = "/workspace/attachments"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
W, H = 900, 1200


def crop_px(im: Image.Image, l: float, t: float, r: float, b: float) -> Image.Image:
    w, h = im.size
    return im.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def to_canvas(im: Image.Image, pad: float = 0.10) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if im.mode != "RGB":
        im = im.convert("RGB")
    im = ImageEnhance.Contrast(im).enhance(1.07)
    im = ImageEnhance.Color(im).enhance(1.05)
    max_w, max_h = int(W * (1 - 2 * pad)), int(H * (1 - 2 * pad))
    fitted = im.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (W, H), IVORY)
    canvas.paste(fitted, ((W - fitted.width) // 2, (H - fitted.height) // 2))
    return canvas


def open_att(name: str) -> Image.Image:
    return Image.open(os.path.join(ATT, name))


JOBS = [
    ("elf-eye-cream.jpg", "IMG-20260911-WA0095.jpg", (0.238, 0.54, 0.318, 0.76), 0.10),
    ("gg-porefectly.jpg", "IMG-20260911-WA0091.jpg", (0.122, 0.15, 0.198, 0.50), 0.08),
    ("gg-bbomb.jpg", "IMG-20260911-WA0091.jpg", (0.182, 0.15, 0.258, 0.50), 0.08),
    ("gg-stress.jpg", "IMG-20260911-WA0091.jpg", (0.248, 0.15, 0.328, 0.50), 0.08),
    ("gg-apad.jpg", "IMG-20260911-WA0091.jpg", (0.318, 0.15, 0.400, 0.50), 0.08),
    ("hautsache-feucht.jpg", "IMG-20260911-WA0091.jpg", (0.648, 0.16, 0.702, 0.50), 0.09),
    ("hautsache-retinal.jpg", "IMG-20260911-WA0091.jpg", (0.775, 0.16, 0.850, 0.50), 0.09),
    ("hautsache-tagescreme.jpg", "IMG-20260911-WA0091.jpg", (0.805, 0.16, 0.862, 0.50), 0.09),
    ("no-allin-serum.jpg", "IMG-20260911-WA0096.jpg", (0.748, 0.32, 0.822, 0.74), 0.08),
    ("nivea-q10.jpg", "IMG-20260911-WA0099.jpg", (0.478, 0.00, 0.585, 0.225), 0.08),
    ("sebamed-clear-foam.jpg", "IMG-20260911-WA0097.jpg", (0.478, 0.06, 0.585, 0.42), 0.08),
    ("sos-antipickel.jpg", "IMG-20260911-WA0097.jpg", (0.400, 0.54, 0.520, 0.88), 0.08),
    ("garnier-vitc-serum.jpg", "IMG-20260911-WA0092.jpg", (0.175, 0.28, 0.325, 0.60), 0.08),
    ("garnier-vitc-spf.jpg", "IMG-20260911-WA0092.jpg", (0.375, 0.28, 0.490, 0.60), 0.08),
    ("loreal-vitc-glow.jpg", "IMG-20260911-WA0100.jpg", (0.498, 0.50, 0.605, 0.82), 0.08),
    ("loreal-age-perfect.jpg", "IMG-20260911-WA0098.jpg", (0.318, 0.48, 0.425, 0.82), 0.08),
    ("balea-med-cremeol.jpg", "IMG-20260911-WA0090.jpg", (0.000, 0.10, 0.230, 0.50), 0.08),
    ("herbal-aloe.jpg", "IMG-20260911-WA0073.jpg", (0.445, 0.28, 0.555, 0.76), 0.08),
    ("herbal-argan.jpg", "IMG-20260911-WA0073.jpg", (0.615, 0.28, 0.725, 0.76), 0.08),
    ("dejan-shampoo.jpg", "IMG-20260911-WA0071.jpg", (0.275, 0.20, 0.430, 0.76), 0.08),
]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    for dest, src, box, pad in JOBS:
        im = crop_px(open_att(src), *box)
        canvas = to_canvas(im, pad=pad)
        out = os.path.join(DST, dest)
        canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{dest:32} {canvas.size} {os.path.getsize(out):7d} B")


if __name__ == "__main__":
    main()
