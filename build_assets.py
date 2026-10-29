"""Bangun aset web dari folder portofolio mentah.
Jalankan: python build_assets.py
Sumber : E:/porto_hasanstudio
Tujuan : assets/foto/*.webp, assets/video/*.mp4 + poster
"""
import os
import subprocess
from PIL import Image, ImageOps

SRC = r"E:/porto_hasanstudio"
OUT_FOTO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "foto")
OUT_VIDEO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "video")
MAX_SISI = 1400
KUALITAS = 82

os.makedirs(OUT_FOTO, exist_ok=True)
os.makedirs(OUT_VIDEO, exist_ok=True)


def daftar(folder):
    hasil = []
    for akar, _, berkas in os.walk(folder):
        for b in berkas:
            if b.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                hasil.append(os.path.join(akar, b))
    return sorted(hasil)


def proses_foto(path, nama):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail((MAX_SISI, MAX_SISI), Image.LANCZOS)
    tujuan = os.path.join(OUT_FOTO, nama + ".webp")
    im.save(tujuan, "WEBP", quality=KUALITAS, method=6)
    return tujuan, im.size


foto_wedding = [p for p in daftar(SRC) if os.sep + "magzine" + os.sep not in p]
foto_magazine = [p for p in daftar(SRC) if os.sep + "magzine" + os.sep in p]

print("FOTO")
for i, p in enumerate(foto_wedding, 1):
    tujuan, ukuran = proses_foto(p, f"wedding-{i:02d}")
    print(f"  {ukuran[0]}x{ukuran[1]}  {os.path.getsize(tujuan)//1024:4d}KB  {os.path.basename(tujuan)}")
for i, p in enumerate(foto_magazine, 1):
    tujuan, ukuran = proses_foto(p, f"magazine-{i:02d}")
    print(f"  {ukuran[0]}x{ukuran[1]}  {os.path.getsize(tujuan)//1024:4d}KB  {os.path.basename(tujuan)}")

print("VIDEO")
for i, p in enumerate(sorted(f for f in os.listdir(SRC) if f.lower().endswith(".mp4")), 1):
    asal = os.path.join(SRC, p)
    keluar = os.path.join(OUT_VIDEO, f"video-{i}.mp4")
    poster = os.path.join(OUT_FOTO, f"video-{i}-poster.jpg")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", asal,
                    "-c:v", "libx264", "-crf", "30", "-preset", "slow",
                    "-vf", "scale=720:-2", "-c:a", "aac", "-b:a", "96k",
                    "-movflags", "+faststart", keluar], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "2", "-i", keluar,
                    "-frames:v", "1", "-q:v", "4", poster], check=True)
    print(f"  {os.path.getsize(asal)//1024//1024}MB -> {os.path.getsize(keluar)//1024//1024}MB  {os.path.basename(keluar)}")

total = sum(os.path.getsize(os.path.join(d, f)) for d in (OUT_FOTO, OUT_VIDEO) for f in os.listdir(d))
print(f"TOTAL aset: {total/1024/1024:.2f} MB")
