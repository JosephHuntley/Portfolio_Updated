"""
Resize, compress, and convert images to WebP for the blog.

Usage:
    python scripts/optimize-images.py path/to/image.png
    python scripts/optimize-images.py path/to/raw-images --out public/blog/guardfall-attack

Run against a single file or a whole folder. Output filenames match the
input (same stem, .webp extension). Never upscales — if an image is
already smaller than --max-width, it's just recompressed.

Defaults: 1600px max width, quality 80 — good for in-article images.
For cover images (rendered at 400x250 in the blog cards), use:
    python scripts/optimize-images.py cover.jpg --max-width 800
"""
import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

VALID_EXTS = {".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp"}


def optimize(src: Path, out_dir: Path, max_width: int, quality: int) -> None:
    with Image.open(src) as im:
        original_bytes = src.stat().st_size

        if im.mode == "P":
            im = im.convert("RGBA")

        if im.width > max_width:
            ratio = max_width / im.width
            im = im.resize((max_width, round(im.height * ratio)), Image.LANCZOS)

        out_dir.mkdir(parents=True, exist_ok=True)
        dest = out_dir / f"{src.stem}.webp"
        im.save(dest, "webp", quality=quality, method=6)

    new_bytes = dest.stat().st_size
    pct = 100 * (1 - new_bytes / original_bytes)
    print(
        f"{src.name} -> {dest.name}  "
        f"{original_bytes // 1024}KB -> {new_bytes // 1024}KB  "
        f"({pct:.0f}% smaller)"
    )


def main():
    parser = argparse.ArgumentParser(description="Resize/compress/convert blog images to WebP")
    parser.add_argument("input", type=Path, help="Image file or folder of images")
    parser.add_argument("--out", type=Path, default=None, help="Output folder (default: same as input)")
    parser.add_argument("--max-width", type=int, default=1600, help="Max width in px (default 1600)")
    parser.add_argument("--quality", type=int, default=80, help="WebP quality 0-100 (default 80)")
    args = parser.parse_args()

    if not args.input.exists():
        sys.exit(f"No such file or folder: {args.input}")

    out_dir = args.out or (args.input if args.input.is_dir() else args.input.parent)

    if args.input.is_dir():
        files = sorted(p for p in args.input.iterdir() if p.suffix.lower() in VALID_EXTS)
        if not files:
            sys.exit(f"No images found in {args.input}")
        for f in files:
            optimize(f, out_dir, args.max_width, args.quality)
    else:
        if args.input.suffix.lower() not in VALID_EXTS:
            sys.exit(f"Unsupported file type: {args.input.suffix}")
        optimize(args.input, out_dir, args.max_width, args.quality)


if __name__ == "__main__":
    main()