#!/usr/bin/env python3
"""Pack dm-shelf packshots onto 900×1200 ivory canvas."""

from __future__ import annotations

import os

from PIL import Image, ImageOps, ImageEnhance

ATT = "/workspace/attachments"
SEARCHED = "/workspace/artifacts/searched_images"
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


def open_src(name: str) -> Image.Image:
    return Image.open(os.path.join(SEARCHED, name))


# dest, source, kind(att|src), box, pad
JOBS = [
    ("elf-thirst-toner.jpg", "IMG-20260911-WA0095.jpg", "att", (0.000, 0.30, 0.135, 0.78), 0.09),
    ("elf-thirst-drops.jpg", "1Q8Aw.jpg", "src", (0.28, 0.02, 0.72, 0.98), 0.10),
    ("inao-feel-pure.jpg", "hfp8M.jpg", "src", (0.36, 0.08, 0.64, 0.95), 0.09),
    ("inao-fine-time.jpg", "IMG-20260911-WA0095.jpg", "att", (0.458, 0.28, 0.535, 0.78), 0.09),
    ("inao-clean-crush.jpg", "IMG-20260911-WA0095.jpg", "att", (0.535, 0.27, 0.670, 0.78), 0.07),
    ("inao-hydra-soul.jpg", "WHSKl.jpg", "src", (0.56, 0.12, 0.73, 0.42), 0.10),
    ("nerds-azelaic.jpg", "tzWYa.jpg", "src", (0.775, 0.32, 0.885, 0.80), 0.10),
    ("nerds-peptide.jpg", "tzWYa.jpg", "src", (0.325, 0.16, 0.460, 0.56), 0.10),
    ("acnemy-zitcalm-serum.jpg", "IMG-20260911-WA0084.jpg", "att", (0.325, 0.20, 0.475, 0.68), 0.07),
    ("acnemy-zitcalm-creme.jpg", "IMG-20260911-WA0084.jpg", "att", (0.475, 0.18, 0.625, 0.68), 0.07),
    ("acnemy-zitcontrol-spf.jpg", "IMG-20260911-WA0084.jpg", "att", (0.615, 0.12, 0.785, 0.70), 0.07),
    ("no-daily-mist.jpg", "IMG-20260911-WA0096.jpg", "att", (0.155, 0.36, 0.275, 0.72), 0.09),
    ("no-hypercalm.jpg", "IMG-20260911-WA0096.jpg", "att", (0.300, 0.32, 0.415, 0.74), 0.09),
    ("no-calming.jpg", "IMG-20260911-WA0096.jpg", "att", (0.480, 0.32, 0.595, 0.74), 0.08),
    ("no-hypershield.jpg", "IMG-20260911-WA0096.jpg", "att", (0.585, 0.32, 0.720, 0.74), 0.08),
    ("gg-power-peptides.jpg", "xp6Ey.jpg", "src", (0.32, 0.04, 0.68, 0.98), 0.08),
    ("gg-ha5.jpg", "IMG-20260911-WA0091.jpg", "att", (0.200, 0.16, 0.310, 0.48), 0.09),
    ("hautsache-barriere.jpg", "IMG-20260911-WA0091.jpg", "att", (0.575, 0.16, 0.655, 0.50), 0.09),
    ("loreal-laser.jpg", "IMG-20260911-WA0100.jpg", "att", (0.000, 0.06, 0.125, 0.38), 0.09),
    ("loreal-filler.jpg", "IMG-20260911-WA0100.jpg", "att", (0.000, 0.52, 0.145, 0.82), 0.09),
    ("neutrogena-collagen.jpg", "IMG-20260911-WA0100.jpg", "att", (0.615, 0.52, 0.760, 0.82), 0.09),
    ("neutrogena-retinol.jpg", "IMG-20260911-WA0100.jpg", "att", (0.880, 0.00, 0.998, 0.38), 0.09),
    ("garnier-wonder-tint.jpg", "IMG-20260911-WA0092.jpg", "att", (0.480, 0.28, 0.600, 0.62), 0.09),
    ("garnier-glow-booster.jpg", "IMG-20260911-WA0092.jpg", "att", (0.000, 0.28, 0.145, 0.62), 0.08),
    ("garnier-fructis-aloe.jpg", "IMG-20260911-WA0077.jpg", "att", (0.275, 0.28, 0.400, 0.72), 0.08),
    ("herbal-fiji.jpg", "IMG-20260911-WA0073.jpg", "att", (0.095, 0.28, 0.235, 0.78), 0.08),
    ("dejan-mask.jpg", "IMG-20260911-WA0071.jpg", "att", (0.490, 0.22, 0.615, 0.78), 0.08),
    ("dejan-oil.jpg", "IMG-20260911-WA0071.jpg", "att", (0.615, 0.42, 0.760, 0.68), 0.10),
    ("balea-med-panthenol.jpg", "IMG-20260911-WA0090.jpg", "att", (0.38, 0.16, 0.62, 0.42), 0.08),
]


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    for dest, src, kind, box, pad in JOBS:
        im = open_att(src) if kind == "att" else open_src(src)
        im = crop_px(im, *box)
        canvas = to_canvas(im, pad=pad)
        out = os.path.join(DST, dest)
        canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{dest:32} {canvas.size} {os.path.getsize(out):7d} B")


if __name__ == "__main__":
    main()
