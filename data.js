// =================================================================
// FILE DATA UTAMA (Cukup edit bagian ini saja sesuai hasil wawancara)
// =================================================================

const profilFotografer = {
    namaUsaha: "Hasan Studio",
    namaPemilik: "Pak Hasan",
    fileLogo: "logo_hasan_studio.svg", // Nama file logo untuk Tab Browser, Navbar, & Footer
    nomorWA: "6285257717309",          // Nomor WA aktif (+62 852-5771-7309)
    nomorWATampil: "+62 852-5771-7309",
    areaLayanan: "Ngaban, Tanggulangin & Sidoarjo",
    alamatLengkap: "Home studio di Jl. Raya Ngaban, RT.01/RW.03, Ngaban, Kecamatan Tanggulangin, Kabupaten Sidoarjo, Jawa Timur 61272. Melayani pemotretan panggilan ke rumah, sekolah, acara warga, dan tempat usaha UMKM di Sidoarjo & sekitarnya.",
    linkGoogleMaps: "https://maps.app.goo.gl/4S7jqvwqcM2AyeGM7",
    koordinatMapsEmbed: "https://maps.google.com/maps?q=Jl.+Raya+Ngaban,+Tanggulangin,+Sidoarjo&t=&z=16&ie=UTF8&iwloc=&output=embed",
    deskripsiSingkat: "Melayani foto akad, tasyakuran warga, wisuda sekolah/kuliah, dan foto produk UMKM. Hasil foto dikirim via Google Drive & siap cetak."
};

// Paket & harga sekarang STATIS di index.html (kartu + dropdown form).
// Alasan: crawler AI tidak menjalankan JS, jadi harga harus ada di HTML.
// Ubah harga di index.html, bukan di sini.
// Add-on TANPA harga: nominal ditentukan pemilik (disepakati lewat WhatsApp).
const daftarTambahan = [
    { id: "add-jam", nama: "Tambah durasi liputan" },
    { id: "add-video-highlight", nama: "Video highlight acara" },
    { id: "add-video-dok", nama: "Video dokumentasi lengkap" },
    { id: "add-album", nama: "Album magazine cetak" },
    { id: "add-cetak-4r", nama: "Cetak foto 4R" },
    { id: "add-foto-edit", nama: "Tambah foto hasil edit" },
    { id: "add-flashdisk", nama: "Salinan file di Flashdisk" }
];

// Galeri: foto & video asli Hasan Studio (hasil build_assets.py)
// Tambah/hapus entri di sini. kategori: "wedding", "magazine", "video".
const daftarPortofolio = [
    {
        judul: "Dokumentasi Wedding 01",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-01.webp"
    },
    {
        judul: "Dokumentasi Wedding 02",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-02.webp"
    },
    {
        judul: "Dokumentasi Wedding 03",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-03.webp"
    },
    {
        judul: "Dokumentasi Wedding 04",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-04.webp"
    },
    {
        judul: "Dokumentasi Wedding 05",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-05.webp"
    },
    {
        judul: "Dokumentasi Wedding 06",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-06.webp"
    },
    {
        judul: "Dokumentasi Wedding 07",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-07.webp"
    },
    {
        judul: "Dokumentasi Wedding 08",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-08.webp"
    },
    {
        judul: "Dokumentasi Wedding 09",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-09.webp"
    },
    {
        judul: "Dokumentasi Wedding 10",
        kategori: "wedding",
        ket: "Wedding",
        url: "assets/foto/wedding-10.webp"
    },
    {
        judul: "Sesi Magazine 01",
        kategori: "magazine",
        ket: "Magazine",
        url: "assets/foto/magazine-01.webp"
    },
    {
        judul: "Sesi Magazine 02",
        kategori: "magazine",
        ket: "Magazine",
        url: "assets/foto/magazine-02.webp"
    },
    {
        judul: "Sesi Magazine 03",
        kategori: "magazine",
        ket: "Magazine",
        url: "assets/foto/magazine-03.webp"
    },
    {
        judul: "Sesi Magazine 04",
        kategori: "magazine",
        ket: "Magazine",
        url: "assets/foto/magazine-04.webp"
    },
    {
        judul: "Sesi Magazine 05",
        kategori: "magazine",
        ket: "Magazine",
        url: "assets/foto/magazine-05.webp"
    },
    {
        judul: "Video Dokumentasi 01",
        kategori: "video",
        ket: "Video",
        url: "assets/foto/video-1-poster.jpg",
        video: "assets/video/video-1.mp4"
    },
    {
        judul: "Video Dokumentasi 02",
        kategori: "video",
        ket: "Video",
        url: "assets/foto/video-2-poster.jpg",
        video: "assets/video/video-2.mp4"
    }
];

// Komentar Awal dari Pelanggan
const komentarAwal = [
    {
        nama: "Mbak Dini (Warga RT 03)",
        acara: "Akad / Hajatan",
        rating: 5,
        tanggal: "Minggu lalu",
        isi: "Fotonya bagus dan terang semua, link Google Drive juga cepet dikirim jadi keluarga bisa langsung download di HP masing-masing."
    },
    {
        nama: "Mas Bagus",
        acara: "Foto Wisuda",
        rating: 5,
        tanggal: "2 minggu lalu",
        isi: "Orangnya sabar banget ngarahin gaya waktu foto wisuda bareng bapak ibu di rumah. Harganya juga ramah di kantong."
    },
    {
        nama: "Bu Sulis (Usaha Kue Basah)",
        acara: "Foto Produk UMKM",
        rating: 5,
        tanggal: "Bulan lalu",
        isi: "Sejak pakai foto produk yang baru buat status WA, pelanggan jadi lebih sering tanya dan pesan. Terima kasih banyak!"
    }
];

// FAQ sekarang STATIS di index.html (#faq-container).
