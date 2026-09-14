#!/usr/bin/env python3
"""Fit official dm.de / brand packshots onto 900×1200 ivory canvas."""

from __future__ import annotations

import os

from PIL import Image, ImageOps, ImageEnhance

DM = "/workspace/artifacts/official_dm"
OFF = "/workspace/artifacts/official"
DST = "/workspace/public/products"
IVORY = (251, 248, 241)
W, H = 900, 1200

# dest jpg (no path), source path, pad
JOBS: list[tuple[str, str, float]] = [
    # Allemagne — hautsache
    ("hautsache-barriere.jpg", f"{DM}/hautsache-barriere.png", 0.06),
    ("hautsache-feucht.jpg", f"{DM}/hautsache-feucht.png", 0.06),
    ("hautsache-retinal.jpg", f"{DM}/hautsache-retinal.png", 0.06),
    ("hautsache-tagescreme.jpg", f"{DM}/hautsache-tagescreme.png", 0.06),
    # Allemagne — Nø
    ("no-daily-mist.jpg", f"{DM}/no-daily-mist.png", 0.05),
    ("no-hypercalm.jpg", f"{DM}/no-hypercalm.png", 0.05),
    ("no-calming.jpg", f"{DM}/no-calming.png", 0.05),
    ("no-hypershield.jpg", f"{DM}/no-hypershield.png", 0.05),
    ("no-allin-serum.jpg", f"{DM}/no-allin-serum.png", 0.05),
    # Allemagne — INAO
    ("inao-feel-pure.jpg", f"{DM}/inao-feel-pure.png", 0.07),
    ("inao-clean-crush.jpg", f"{DM}/inao-clean-crush.png", 0.07),
    ("inao-hydra-soul.jpg", f"{DM}/inao-hydra-soul.png", 0.07),
    ("inao-fine-time.jpg", f"{DM}/inao-fine-time.png", 0.07),
    # Allemagne — Balea MED
    ("balea-med-panthenol.jpg", f"{DM}/balea-med-panthenol.png", 0.07),
    ("balea-med-cremeol.jpg", f"{DM}/balea-med-cremeol.png", 0.07),
    ("balea-med-urea.jpg", f"{DM}/balea-med-urea.png", 0.07),
    # Allemagne — sebamed / Dejan
    ("sebamed-clear-foam.jpg", f"{DM}/sebamed-clear-foam.png", 0.07),
    ("dejan-mask.jpg", f"{DM}/dejan-mask.png", 0.07),
    ("dejan-shampoo.jpg", f"{DM}/dejan-shampoo.png", 0.07),
    # Espagne — Acnemy
    ("acnemy-zitclean.jpg", f"{DM}/acnemy-zitclean.png", 0.04),
    ("acnemy-zitcalm-creme.jpg", f"{DM}/acnemy-zitcalm-creme.png", 0.04),
    ("acnemy-zitcalm-serum.jpg", f"{OFF}/acnemy-zitcalm-serum.jpg", 0.05),
    ("acnemy-zitcontrol-spf.jpg", f"{OFF}/acnemy-zitcontrol-spf.jpg", 0.05),
    ("acnemy-postzit.jpg", f"{OFF}/acnemy-postzit.jpg", 0.05),
    # Autres — Mixa / nerds / G&G / e.l.f. / Neutrogena / Garnier / Weleda / lavera
    ("mixa-niacinamide.jpg", f"{DM}/mixa-niacinamide.png", 0.06),
    ("nerds-azelaic.jpg", f"{DM}/nerds-azelaic.png", 0.06),
    ("nerds-peptide.jpg", f"{DM}/nerds-peptide.png", 0.06),
    ("gg-ha5.jpg", f"{DM}/gg-ha5.png", 0.06),
    ("gg-stress.jpg", f"{DM}/gg-stress.png", 0.06),
    ("gg-porefectly.jpg", f"{OFF}/gg-porefectly.jpg", 0.06),
    ("gg-bbomb.jpg", f"{OFF}/gg-bbomb.jpg", 0.06),
    ("gg-apad.jpg", f"{OFF}/gg-apad.jpg", 0.06),
    ("gg-power-peptides.jpg", f"{OFF}/gg-peptides.jpg", 0.06),
    ("elf-eye-cream.jpg", f"{DM}/elf-eye-cream.png", 0.06),
    ("elf-thirst-toner.jpg", f"{OFF}/elf-thirst-toner.jpg", 0.06),
    ("neutrogena-collagen.jpg", f"{DM}/neutrogena-collagen.png", 0.06),
    ("neutrogena-retinol.jpg", f"{DM}/neutrogena-retinol.png", 0.06),
    ("neutrogena-hydro-boost.jpg", f"{OFF}/neutrogena-hydro-boost.jpg", 0.06),
    ("garnier-glow-booster.jpg", f"{DM}/garnier-glow-booster.png", 0.07),
    ("garnier-wonder-tint.jpg", f"{DM}/garnier-wonder-tint.png", 0.07),
    ("garnier-fructis-aloe.jpg", f"{OFF}/garnier-fructis-aloe.jpg", 0.07),
    ("weleda-granatapfel.jpg", f"{DM}/weleda-granatapfel.png", 0.06),
    ("weleda-skin-food.jpg", f"{OFF}/weleda-skin-food.jpg", 0.06),
    ("lavera-basis.jpg", f"{DM}/lavera-basis.png", 0.07),
    ("mixa-cica-creme.jpg", f"{DM}/mixa-cica-creme.png", 0.06),
    ("garnier-fructis-coco.jpg", f"{DM}/garnier-fructis-coco.png", 0.07),
    ("garnier-vitc-serum.jpg", f"{DM}/garnier-vitc-serum.png", 0.07),
    ("garnier-vitc-spf.jpg", f"{DM}/garnier-vitc-spf.png", 0.07),
    ("loreal-laser.jpg", f"{DM}/loreal-laser.png", 0.07),
    ("loreal-filler.jpg", f"{DM}/loreal-filler.png", 0.07),
    ("herbal-fiji.jpg", f"{DM}/herbal-fiji.png", 0.07),
    ("herbal-aloe.jpg", f"{DM}/herbal-aloe.png", 0.07),
    ("herbal-argan.jpg", f"{DM}/herbal-argan.png", 0.07),
    ("lavera-hydro.jpg", "/workspace/artifacts/searched_images/OLAYZ.jpg", 0.08),
]


def to_canvas(im: Image.Image, pad: float = 0.06) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, IVORY)
        bg.paste(im, mask=im.split()[-1])
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im = ImageEnhance.Color(im).enhance(1.03)
    max_w, max_h = int(W * (1 - 2 * pad)), int(H * (1 - 2 * pad))
    fitted = im.copy()
    fitted.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (W, H), IVORY)
    canvas.paste(fitted, ((W - fitted.width) // 2, (H - fitted.height) // 2))
    return canvas


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    n = 0
    for dest, src, pad in JOBS:
        if not os.path.exists(src):
            print(f"MISSING {src}")
            continue
        canvas = to_canvas(Image.open(src), pad=pad)
        out = os.path.join(DST, dest)
        canvas.save(out, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"{dest:32} {canvas.size} {os.path.getsize(out):7d} B  <- {os.path.basename(src)}")
        n += 1
    print(f"packed {n}/{len(JOBS)}")


if __name__ == "__main__":
    main()
