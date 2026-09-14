#!/usr/bin/env python3
"""Pack official K-beauty stills onto 900×1200 ivory."""

from __future__ import annotations

import os

from PIL import Image, ImageEnhance, ImageOps

ATT = "/workspace/attachments"
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


# dest, source id, crop (l,t,r,b), pad
JOBS: list[tuple[str, str, tuple[float, float, float, float], float]] = [
    ("k-secret-seoul-foam.jpg", "0EBFAFAD-30BD-4EF0-8BBB-940661E79ABF", (0.34, 0.06, 0.66, 0.94), 0.12),
    ("k-secret-seoul-capsule.jpg", "C4E0C22F-C914-40D2-B47D-CA8A7DD32B99", (0.28, 0.28, 0.72, 0.78), 0.12),
    ("k-secret-seoul-eye.jpg", "6AF71092-7C6D-496F-BF9A-593AA51B9D2F", (0.38, 0.06, 0.62, 0.94), 0.12),
    ("axis-y-physical-sun.jpg", "FA80EC8C-6F24-4298-9374-83B146D57AA3", (0.34, 0.08, 0.66, 0.94), 0.10),
    ("round-lab-pine-cica.jpg", "17EC9D98-D0D1-4C5D-BC55-E203542D5C46", (0.08, 0.08, 0.92, 0.94), 0.08),
    ("aestura-atobarrier-365.jpg", "C0539A0F-3080-44BA-BC8B-782047998B72", (0.42, 0.32, 0.58, 0.64), 0.16),
    ("skin1004-toning-toner.jpg", "A51FE03C-97C7-4F87-82C6-6CB98113A700", (0.30, 0.06, 0.70, 0.94), 0.10),
    ("boje-dynasty-cream.jpg", "4C5A03B1-2FE6-48BE-AF75-5420E2DF99D5", (0.38, 0.40, 0.80, 0.96), 0.12),
    ("boje-apricot-peeling.jpg", "CC2EEE5F-9497-430F-AD5A-92AE8A8830E3", (0.32, 0.08, 0.68, 0.94), 0.10),
    ("celimax-noni-cream.jpg", "AF6616F1-C4E4-4C92-B16F-9B90ABCF5209", (0.38, 0.06, 0.62, 0.94), 0.12),
    ("boje-ginseng-essence.jpg", "B72783CB-E852-4E9D-8DE1-7DC9396012B7", (0.32, 0.10, 0.68, 0.92), 0.10),
    ("medicube-triple-collagen.jpg", "1BA54345-68DC-4DC5-A8D6-128A9C216494", (0.18, 0.14, 0.82, 0.94), 0.08),
    ("anua-azelaic-hyaluron.jpg", "2A3C3294-01F3-49DE-A8F7-F484D60108E0", (0.32, 0.06, 0.68, 0.96), 0.10),
    ("medicube-red-acne-peel.jpg", "5E44B739-9E8D-4D16-9595-1A3DD23796E5", (0.08, 0.10, 0.92, 0.92), 0.08),
    ("skin1004-tone-foam.jpg", "02273C97-DF15-43A6-B947-6FE54EB057CB", (0.32, 0.06, 0.68, 0.96), 0.10),
    ("skin1004-tea-trica.jpg", "8932CA5E-C7B0-4D1B-BF63-BF7934C6274E", (0.28, 0.06, 0.72, 0.96), 0.10),
    ("medicube-pdrn-capsule.jpg", "D7C14573-D105-409B-972B-346A253D6BDB", (0.10, 0.42, 0.58, 0.96), 0.10),
    ("k-secret-seoul-serum.jpg", "8B05D450-F986-4574-8A33-67BA96098245", (0.34, 0.06, 0.62, 0.50), 0.12),
    ("anua-zero-cast-sun.jpg", "0D806BD5-1530-49DA-A03F-0722531B25E3", (0.34, 0.06, 0.66, 0.96), 0.10),
    ("skin1004-probio-cica.jpg", "F3F82AC9-CEC3-437C-AEA6-218A4CA091F3", (0.08, 0.10, 0.92, 0.94), 0.08),
]


def main() -> None:
    for dest, src, crop, pad in JOBS:
        im = Image.open(os.path.join(ATT, src))
        encode(to_canvas(crop_frac(im, crop), pad), dest)


if __name__ == "__main__":
    main()
