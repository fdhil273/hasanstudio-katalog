let dataGaleriAktif = [];
let indexLightboxSekarang = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Pasang info profil, logo, nomor WA (+62 852-5771-7309), & link Google Maps
    // Judul halaman diatur statis di index.html (<title>) — jangan ditimpa JS
    document.getElementById("brand-name").textContent = profilFotografer.namaUsaha;
    if (document.getElementById("footer-brand")) {
        document.getElementById("footer-brand").textContent = profilFotografer.namaUsaha;
    }
    if (profilFotografer.fileLogo) {
        if (document.getElementById("tab-favicon")) document.getElementById("tab-favicon").href = profilFotografer.fileLogo;
        if (document.getElementById("brand-logo")) document.getElementById("brand-logo").src = profilFotografer.fileLogo;
        if (document.getElementById("footer-logo")) document.getElementById("footer-logo").src = profilFotografer.fileLogo;
    }

    document.getElementById("lokasi-teks").textContent = profilFotografer.areaLayanan;
    document.getElementById("hero-desc").textContent = profilFotografer.deskripsiSingkat;
    document.getElementById("alamat-lengkap").textContent = profilFotografer.alamatLengkap;
    document.getElementById("hero-maps-btn").href = profilFotografer.linkGoogleMaps;
    document.getElementById("maps-direct-link").href = profilFotografer.linkGoogleMaps;
    document.getElementById("maps-iframe").src = profilFotografer.koordinatMapsEmbed;
    
    if (document.getElementById("teks-no-wa") && profilFotografer.nomorWATampil) {
        document.getElementById("teks-no-wa").textContent = profilFotografer.nomorWATampil;
    }
    document.getElementById("floating-wa").href = `https://wa.me/${profilFotografer.nomorWA}?text=${encodeURIComponent("Halo " + profilFotografer.namaPemilik + ", saya mau tanya info jadwal foto.")}`;

    renderGaleri("semua");
    renderFormOptions();
    renderKomentar();

    // Tanggal acara tidak boleh tanggal lampau
    const inputTanggal = document.getElementById("tanggal-acara");
    if (inputTanggal) inputTanggal.min = new Date().toISOString().split("T")[0];
});

// Fungsi Tombol Geser Kanan/Kiri untuk Galeri & Paket
function geserSlider(idContainer, jarakPx) {
    const el = document.getElementById(idContainer);
    el.scrollBy({ left: jarakPx, behavior: 'smooth' });
}

// 1. Render Galeri Foto (Bisa Digeser & Klik Lightbox)
function renderGaleri(kategoriFilter) {
    const container = document.getElementById("galeri-slider");
    container.innerHTML = "";

    dataGaleriAktif = kategoriFilter === "semua"
        ? daftarPortofolio
        : daftarPortofolio.filter(item => item.kategori === kategoriFilter);

    document.getElementById("jumlah-foto").textContent = dataGaleriAktif.length;

    dataGaleriAktif.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "foto-item snap-start shrink-0 w-64 sm:w-72 cursor-pointer group relative overflow-hidden rounded-xl bg-stone-200 aspect-[4/3] border border-stone-200";
        card.onclick = () => bukaLightbox(idx);
        const badge = item.video ? `
                <span class="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path d="M8 5v14l11-7z"/></svg> Video
                </span>` : "";
        card.innerHTML = `
            <img src="${item.url}" alt="${item.judul} — Hasan Studio Sidoarjo" loading="lazy" decoding="async" class="w-full h-full object-cover">
            ${badge}
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-3.5">
                <span class="text-[10px] uppercase tracking-wider text-stone-300">${item.ket}</span>
                <p class="text-white text-xs font-semibold">${item.judul}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterFoto(kategori, tombolKlik) {
    document.querySelectorAll(".btn-filter").forEach(btn => {
        btn.className = "btn-filter text-xs px-3 py-1.5 rounded-md bg-stone-200/70 text-stone-700 hover:bg-stone-200 font-medium";
    });
    tombolKlik.className = "btn-filter active text-xs px-3 py-1.5 rounded-md bg-stone-900 text-white font-medium";
    renderGaleri(kategori);
}

// Fitur Lightbox (Perbesar & Geser Foto)
function bukaLightbox(index) {
    indexLightboxSekarang = index;
    updateTampilanLightbox();
    const modal = document.getElementById("modal-lightbox");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function updateTampilanLightbox() {
    const item = dataGaleriAktif[indexLightboxSekarang];
    if (!item) return;
    const img = document.getElementById("lightbox-img");
    const vid = document.getElementById("lightbox-video");

    if (item.video) {
        img.classList.add("hidden");
        vid.classList.remove("hidden");
        if (vid.getAttribute("src") !== item.video) vid.src = item.video;
        vid.play().catch(() => {});
    } else {
        vid.pause();
        vid.classList.add("hidden");
        img.classList.remove("hidden");
        img.src = item.url;
        img.alt = item.judul + " — Hasan Studio Sidoarjo";
    }
    document.getElementById("lightbox-judul").textContent = item.judul;
    document.getElementById("lightbox-ket").textContent = `${item.ket} (${indexLightboxSekarang + 1} dari ${dataGaleriAktif.length})`;
}

function geserLightbox(arah) {
    indexLightboxSekarang += arah;
    if (indexLightboxSekarang < 0) indexLightboxSekarang = dataGaleriAktif.length - 1;
    if (indexLightboxSekarang >= dataGaleriAktif.length) indexLightboxSekarang = 0;
    updateTampilanLightbox();
}

function tutupLightbox() {
    const vid = document.getElementById("lightbox-video");
    if (vid) { vid.pause(); vid.removeAttribute("src"); vid.load(); }
    const modal = document.getElementById("modal-lightbox");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// 3. Render Testimoni (data statis dari data.js — tanpa database)
function renderKomentar() {
    const listContainer = document.getElementById("komentar-list");
    listContainer.innerHTML = "";

    komentarAwal.forEach(k => {
        const bintang = "★".repeat(k.rating) + "☆".repeat(5 - k.rating);
        const item = document.createElement("div");
        item.className = "bg-white border border-stone-200 rounded-xl p-4";
        item.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-xs text-stone-900">${k.nama}</span>
                <span class="text-[11px] text-amber-600 font-semibold">${bintang}</span>
            </div>
            <div class="text-[11px] text-stone-400 mb-2">${k.acara} &bull; ${k.tanggal}</div>
            <p class="text-xs text-stone-600 leading-relaxed">"${k.isi}"</p>
        `;
        listContainer.appendChild(item);
    });
}

// 5. Form Booking — kirim ringkasan (teks + JSON) ke WhatsApp. Tanpa database.
function renderFormOptions() {
    // Opsi paket statis di index.html. Add-on dirender di sini, tanpa harga:
    // harga pasti ditentukan pemilik, web hanya memberi gambaran.
    const addonsBox = document.getElementById("addons-container");
    addonsBox.innerHTML = daftarTambahan.map(a => `
        <label class="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
            <input type="checkbox" class="cek-addon rounded border-stone-300" data-nama="${a.nama}">
            ${a.nama}
        </label>
    `).join("");
}

function pilihPaketDariKartu(idPaket) {
    const selectPaket = document.getElementById("pilih-paket");
    if ([...selectPaket.options].some(o => o.value === idPaket)) selectPaket.value = idPaket;
    document.getElementById("pesan").scrollIntoView({ behavior: "smooth" });
}

// Kumpulkan isi form jadi satu objek. Dipakai tombol WA dan tombol salin JSON.
function ambilDataBooking() {
    const selectPaket = document.getElementById("pilih-paket");
    const opsi = selectPaket.options[selectPaket.selectedIndex];
    const tambahan = [...document.querySelectorAll(".cek-addon:checked")]
        .map(cb => cb.getAttribute("data-nama"));

    return {
        sumber: "hasanstudio.my.id",
        waktuIsi: new Date().toISOString(),
        nama: document.getElementById("nama-klien").value.trim(),
        layanan: opsi ? opsi.getAttribute("data-nama") : "",
        tanggalAcara: document.getElementById("tanggal-acara").value,
        jamMulai: document.getElementById("jam-acara").value,
        lokasi: document.getElementById("lokasi-acara").value.trim(),
        tambahan: tambahan.length ? tambahan : [],
        catatan: document.getElementById("catatan-klien").value.trim() || "-",
        kisaranHarga: "Rp 1.500.000 - Rp 3.500.000",
        hargaPasti: "menunggu konfirmasi pemilik"
    };
}

function teksRingkasan(d) {
    return `Halo ${profilFotografer.namaPemilik} (${profilFotografer.namaUsaha}), saya ingin tanya jadwal & biaya:

- Nama: ${d.nama}
- Layanan: ${d.layanan}
- Tambahan: ${d.tambahan.length ? d.tambahan.join(", ") : "Tidak ada"}
- Tanggal & Jam: ${d.tanggalAcara} (pukul ${d.jamMulai})
- Lokasi: ${d.lokasi}
- Catatan: ${d.catatan}

Saya lihat kisaran biayanya ${d.kisaranHarga} di website. Mohon info harga pasti dan apakah jadwal tersebut masih kosong.

--- ringkasan data ---
${JSON.stringify(d, null, 2)}`;
}

function kirimKeWA(event) {
    event.preventDefault();
    const pesan = teksRingkasan(ambilDataBooking());
    window.open(`https://wa.me/${profilFotografer.nomorWA}?text=${encodeURIComponent(pesan)}`, "_blank");
}

function salinJSON() {
    const form = document.getElementById("form-booking");
    if (form && !form.reportValidity()) return;

    const teks = JSON.stringify(ambilDataBooking(), null, 2);
    const beres = () => {
        const status = document.getElementById("status-salin");
        status.classList.remove("hidden");
        setTimeout(() => status.classList.add("hidden"), 4000);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(teks).then(beres).catch(() => prompt("Salin manual:", teks));
    } else {
        prompt("Salin manual:", teks);
    }
}

function bukaModalQR() {
    const modal = document.getElementById("modal-qr");
    const qrImg = document.getElementById("qr-image");
    const urlSekarang = window.location.href;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(urlSekarang)}`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function tutupModalQR() {
    const modal = document.getElementById("modal-qr");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}
