#!/usr/bin/env python3
"""Compress Skinhealthb public images into JPEG + WebP + AVIF (full + thumb).

Re-running is safe: JPEG is kept if recompression is larger; AVIF is skipped
when it does not beat the matching WebP.
"""

from __future__ import annotations

import glob
import os
import sys

from PIL import Image, ImageOps

PUBLIC = "/workspace/public"
PRODUCTS = os.path.join(PUBLIC, "products")


def prepare(path: str) -> Image.Image:
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode != "RGB":
        im = im.convert("RGB")
    return im


def fit(im: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = im.size
    scale = min(max_w / w, max_h / h, 1.0)
    if scale >= 1:
        return im
    return im.resize(
        (max(1, int(w * scale)), max(1, int(h * scale))),
        Image.Resampling.LANCZOS,
    )


def save_jpeg(im: Image.Image, path: str, quality: int) -> None:
    im.save(
        path,
        "JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        subsampling=2,
    )


def save_webp(im: Image.Image, path: str, quality: int) -> None:
    im.save(path, "WEBP", quality=quality, method=6)


def save_avif(im: Image.Image, path: str, quality: int) -> None:
    im.save(path, "AVIF", quality=quality)


def keep_smaller_jpeg(im: Image.Image, path: str, quality: int) -> int:
    tmp = path + ".tmp"
    save_jpeg(im, tmp, quality)
    if os.path.exists(path) and os.path.getsize(tmp) >= os.path.getsize(path):
        os.remove(tmp)
    else:
        os.replace(tmp, path)
    return os.path.getsize(path)


def write_avif(im: Image.Image, path: str, quality: int) -> int:
    save_avif(im, path, quality)
    return os.path.getsize(path)


def kb(n: int) -> str:
    return f"{n / 1024:6.1f} KB"


def avif_from_jpeg(jpeg_path: str, quality: int) -> int:
    """Encode AVIF from an already-sized JPEG. Does not touch JPEG/WebP."""
    webp_path = os.path.splitext(jpeg_path)[0] + ".webp"
    avif_path = os.path.splitext(jpeg_path)[0] + ".avif"
    im = prepare(jpeg_path)
    return write_avif(im, avif_path, quality)


def encode_set(
    im: Image.Image,
    jpeg_path: str,
    q_jpg: int,
    q_webp: int,
    q_avif: int,
) -> tuple[int, int, int]:
    base, _ = os.path.splitext(jpeg_path)
    webp_path = base + ".webp"
    avif_path = base + ".avif"
    j = keep_smaller_jpeg(im, jpeg_path, q_jpg)
    save_webp(im, webp_path, q_webp)
    w = os.path.getsize(webp_path)
    a = write_avif(im, avif_path, q_avif)
    return j, w, a


def avif_only() -> None:
    rows: list[str] = []
    pairs = [
        (os.path.join(PUBLIC, "hero.jpg"), 50),
        (os.path.join(PUBLIC, "hero-sm.jpg"), 48),
    ]
    for src in sorted(glob.glob(os.path.join(PRODUCTS, "*.jpg"))):
        q = 48 if src.endswith("-thumb.jpg") else 50
        pairs.append((src, q))

    tot = 0
    tot_w = 0
    for jpeg_path, q in pairs:
        a = avif_from_jpeg(jpeg_path, q)
        w = os.path.getsize(os.path.splitext(jpeg_path)[0] + ".webp")
        tot += a
        tot_w += w
        name = os.path.basename(jpeg_path).replace(".jpg", "")
        rows.append(f"{name:34} webp {kb(w)}  avif {kb(a)}")
    print("\n".join(rows))
    print(f"\nwebp {kb(tot_w)} | avif {kb(tot)}")


def full() -> None:
    rows: list[str] = []
    hero = prepare(os.path.join(PUBLIC, "hero.jpg"))
    hj, hw, ha = encode_set(
        fit(hero, 1600, 900),
        os.path.join(PUBLIC, "hero.jpg"),
        78,
        72,
        50,
    )
    sj, sw, sa = encode_set(
        fit(hero, 800, 450),
        os.path.join(PUBLIC, "hero-sm.jpg"),
        76,
        70,
        48,
    )
    rows.append(
        f"hero      jpg {kb(hj)}  webp {kb(hw)}  avif {kb(ha)}  | sm jpg {kb(sj)} webp {kb(sw)} avif {kb(sa)}"
    )

    og_path = os.path.join(PUBLIC, "og.jpg")
    keep_smaller_jpeg(fit(prepare(og_path), 1200, 630), og_path, 80)
    rows.append(f"og.jpg    {kb(os.path.getsize(og_path))}  (JPEG only — partages sociaux)")

    tot_j = tot_w = tot_a = tot_tw = tot_ta = 0
    for src in sorted(glob.glob(os.path.join(PRODUCTS, "*.jpg"))):
        if src.endswith("-thumb.jpg"):
            continue
        name = os.path.splitext(os.path.basename(src))[0]
        im = prepare(src)
        j, w, a = encode_set(fit(im, 900, 1200), src, 78, 72, 50)
        thumb = os.path.join(PRODUCTS, f"{name}-thumb.jpg")
        tj, tw, ta = encode_set(fit(im, 450, 600), thumb, 74, 70, 48)
        tot_j += j
        tot_w += w
        tot_a += a
        tot_tw += tw
        tot_ta += ta
        rows.append(
            f"{name:28} jpg {kb(j)}  webp {kb(w)}  avif {kb(a)}  thumb-avif {kb(ta)}"
        )

    print("\n".join(rows))
    print(
        f"\nproducts full  jpeg {kb(tot_j)} | webp {kb(tot_w)} | avif {kb(tot_a)}"
        f"\nproducts thumb webp {kb(tot_tw)} | avif {kb(tot_ta)}"
    )


if __name__ == "__main__":
    if "--full" in sys.argv:
        full()
    else:
        avif_only()
