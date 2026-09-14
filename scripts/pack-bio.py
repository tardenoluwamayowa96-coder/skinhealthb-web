#!/usr/bin/env python3
"""Pack Weleda / lavera packshots onto 900×1200 ivory canvas."""

from __future__ import annotations

import os
import sys

sys.path.insert(0, "/workspace/scripts")
from importlib.machinery import SourceFileLoader

pack = SourceFileLoader("pack", "/workspace/scripts/pack-rayon-dm2.py").load_module()

JOBS = [
    # dest, kind att|src, file, box, pad
    ("weleda-skin-food.jpg", "att", "IMG-20260911-WA0091.jpg", (0.900, 0.50, 0.955, 0.78), 0.09),
    ("weleda-granatapfel.jpg", "src", "sZbcj.jpg", (0.22, 0.00, 0.78, 0.78), 0.09),
    ("lavera-hydro.jpg", "src", "OLAYZ.jpg", (0.08, 0.00, 0.92, 1.00), 0.08),
    ("lavera-basis.jpg", "src", "ISMh6.jpg", (0.32, 0.02, 0.68, 0.98), 0.10),
]


def main() -> None:
    os.makedirs(pack.DST, exist_ok=True)
    for dest, kind, src, box, pad in JOBS:
        im = pack.open_att(src) if kind == "att" else pack.open_src(src)
        im = pack.crop_px(im, *box)
        canvas = pack.to_canvas(im, pad=pad)
        out = os.path.join(pack.DST, dest)
        canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{dest:32} {canvas.size} {os.path.getsize(out):7d} B")


if __name__ == "__main__":
    main()
