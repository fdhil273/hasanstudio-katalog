"""Bikin og.jpg 1200x630 dari 1 foto + teks brand. Jalankan: python make_og.py"""
import io
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Foto asli Hasan Studio (hasil build_assets.py). Ganti nama file kalau mau foto lain.
SRC = "assets/foto/wedding-02.webp"
OUT = "og.jpg"
W, H = 1200, 630

if SRC.startswith("http"):
    req = urllib.request.Request(SRC, headers={"User-Agent": "Mozilla/5.0"})
    img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert("RGB")
else:
    img = Image.open(SRC).convert("RGB")

# cover-crop ke 1200x630
scale = max(W / img.width, H / img.height)
img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
left = (img.width - W) // 2
top = (img.height - H) // 2
img = img.crop((left, top, left + W, top + H))

# gradient gelap di bawah biar teks kebaca
grad = Image.new("L", (1, H))
for y in range(H):
    t = max(0.0, (y - H * 0.30) / (H * 0.70))
    grad.putpixel((0, y), int(235 * t ** 1.25))
overlay = Image.new("RGB", (W, H), (12, 10, 9))
img = Image.composite(overlay, img, grad.resize((W, H)))

d = ImageDraw.Draw(img)
bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 74)
mid = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 30)
small = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 26)

d.text((64, 380), "Hasan Studio", font=bold, fill=(255, 255, 255))
d.text((66, 476), "Jasa Fotografi Sidoarjo — Wisuda, Akad & Foto Produk UMKM", font=mid, fill=(226, 222, 216))
d.text((66, 528), "Mulai Rp 150.000  ·  File via Google Drive  ·  Gratis transport 5 KM", font=small, fill=(160, 156, 150))

img.save(OUT, "JPEG", quality=86, optimize=True, progressive=True)
print("saved", OUT, img.size)
