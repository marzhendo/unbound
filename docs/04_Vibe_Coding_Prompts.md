# VIBE CODING PROMPTS
Kumpulan prompt siap-pakai untuk AI coding assistant (Claude, Cursor, v0, dsb). Kerjakan **section per section**, jangan sekaligus satu website penuh, supaya hasil lebih terkontrol dan mudah direvisi.

Sebelum mulai, tempel dulu **Prompt 0 (System/Context)** di awal percakapan dengan AI, baru lanjut ke prompt per section.

---

## Prompt 0 — Context Awal (tempel sekali di awal)

```
Kita membangun website fan-made showcase untuk game indie "A Space for the Unbound"
(dev: Mojiken Studio, publisher: Toge Productions), untuk lomba web development.

Tech stack: Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Lenis (smooth scroll).
Semua library yang dipakai harus gratis/open source.

Design system:
- Warna: background #0B1026, background sekunder #161B33, primary #F4C95D,
  secondary #5B6EE1, accent #7FE7D8, teks utama #F5F3ED, teks muted #9CA3C4
- Font heading: "Silkscreen" (Google Fonts, pixel style)
- Font body: "Plus Jakarta Sans" (Google Fonts)
- Mood: nostalgia malam 90-an, starry night, sedikit surreal tapi tetap hangat & story-driven,
  BUKAN horor.

Aturan penting:
- JANGAN gunakan CMS apapun.
- JANGAN gunakan template premium/jadi secara utuh.
- Semua ilustrasi/aset visual harus placeholder/generik dulu (saya akan ganti dengan aset
  orisinal buatan tim), jangan pernah generate/asumsikan aset resmi game.
- Website harus fully responsive (mobile, tablet, desktop).
- Setiap section wajib punya minimal satu unsur interaktif: scroll animation, hover effect,
  atau transition halus.

Kerjakan satu section per prompt, tunggu instruksi saya untuk lanjut ke section berikutnya.
```

---

## Prompt 1 — Setup Project

```
Buatkan struktur awal project Next.js 14 (App Router) + Tailwind CSS.
Setup:
1. tailwind.config.js dengan custom color tokens sesuai design system di atas
   (namai: bg-primary, bg-secondary, brand-primary, brand-secondary, brand-accent,
   text-main, text-muted)
2. Import font "Silkscreen" dan "Plus Jakarta Sans" dari next/font/google
3. Layout dasar (app/layout.tsx) dengan <Navbar /> sticky transparan-jadi-solid saat
   scroll, dan <Footer /> berisi disclaimer fan-made project.
4. Install & setup Lenis untuk smooth scroll di layout.
Tampilkan semua file yang perlu dibuat lengkap dengan isinya.
```

---

## Prompt 2 — Section Home / Hero

```
Buatkan komponen <Hero /> untuk section Home dengan spesifikasi:
- Full-height (min-h-screen), background gelap (#0B1026) dengan animated starfield
  memakai tsParticles (react-tsparticles), partikel putih kecil bergerak pelan.
- Di atas starfield: judul besar "A SPACE FOR THE UNBOUND" pakai font Silkscreen,
  animasi fade-up + sedikit glow saat halaman load (Framer Motion).
- Tagline di bawah judul: "Dua remaja, satu kota kecil, dan kekuatan yang bisa
  menembus ingatan."
- Dua tombol CTA: "Tonton Trailer" (buka modal berisi iframe YouTube — pakai placeholder
  video ID dulu) dan "Play Now" (smooth scroll ke section #play).
- Tombol punya hover effect (scale + glow warna brand-primary).
- Badge kecil "Best Storytelling — SEA Game Awards 2020" di pojok bawah, subtle.
Gunakan Tailwind untuk semua styling, jangan CSS terpisah kecuali benar-benar perlu.
```

---

## Prompt 3 — Section Character / Hero

```
Buatkan komponen <Characters /> menampilkan 2 kartu karakter: Atma dan Raya.
- Layout grid 2 kolom di desktop, stack 1 kolom di mobile.
- Setiap card: gambar placeholder rasio 3:4, nama karakter (font Silkscreen),
  deskripsi singkat (2-3 kalimat, saya sudah siapkan copy-nya, tempel dari dokumen
  konten), dan efek hover: card sedikit terangkat + border glow warna brand-accent.
- Tambahkan scroll-reveal animation (Framer Motion, whileInView) sehingga card
  muncul fade-up satu-satu saat di-scroll ke section ini.
Copy Atma: [tempel dari dokumen 03_Content_dan_Sitemap.md]
Copy Raya: [tempel dari dokumen 03_Content_dan_Sitemap.md]
```

---

## Prompt 4 — Section Gameplay / Features

```
Buatkan komponen <Gameplay /> menampilkan 4 feature card:
1. Jelajahi Kota Loka
2. Dive Mechanic
3. Cerita yang Menyentuh
4. Seni Pixel yang Memukau
(gunakan copy lengkap dari dokumen konten)

Spesifikasi visual:
- Background section ini transisi dari palette utama (#0B1026) ke palette "Dive Mind"
  (background #050914, accent #00E5C7, secondary #8C6BFF) — buat transisi warna
  background yang smooth mengikuti scroll progress (pakai Framer Motion useScroll +
  useTransform, atau GSAP ScrollTrigger).
- Setiap feature card pakai ikon dari lucide-react, dengan efek glow warna accent
  saat card masuk viewport.
- Grid 2x2 di desktop, 1 kolom di mobile.
```

---

## Prompt 5 — Section News / Event

```
Buatkan komponen <News /> berbentuk timeline vertikal responsif menampilkan 5 milestone
(copy sudah tersedia di dokumen konten: 2020 SEA Game Awards, 2022 Japan Game Award,
Januari 2023 rilis multi-platform, 2023 nominee The Game Awards, 2025 rilis iOS).
- Setiap item timeline muncul dengan animasi slide-in dari kiri/kanan bergantian saat
  di-scroll ke area tersebut (Framer Motion whileInView).
- Garis vertikal timeline dengan titik penanda bergaya pixel/kotak (bukan bulat, untuk
  konsistensi tema pixel art).
- Responsif: di mobile, timeline jadi single-column dengan garis di kiri.
```

---

## Prompt 6 — Section Download / Play Now

```
Buatkan komponen <PlayNow /> berisi grid tombol platform: Steam (PC), PlayStation,
Xbox, Nintendo Switch, iOS. Gunakan ikon dari react-icons/fa atau lucide-react untuk
tiap platform.
- Setiap tombol: hover effect scale + ubah warna background jadi brand-primary.
- Di atas grid tombol, tampilkan headline singkat + short description dari dokumen
  konten.
- Section ini jadi penutup halaman sebelum footer, beri padding besar & background
  sedikit lebih terang dari section sebelumnya sebagai penanda "akhir perjalanan".
Catatan: href tombol sementara pakai "#" placeholder, nanti diisi link store resmi asli.
```

---

## Prompt 7 — Polish & QA (dikerjakan paling akhir)

```
Tolong review seluruh halaman yang sudah dibuat dan:
1. Pastikan semua section responsif di breakpoint sm/md/lg/xl (Tailwind).
2. Tambahkan smooth anchor scroll dari Navbar ke tiap section (#home, #characters,
   #gameplay, #news, #play).
3. Cek kontras warna teks vs background agar tetap accessible (WCAG AA minimal).
4. Tambahkan meta tag SEO dasar (title, description, og:image placeholder) di layout.
5. Sarankan optimasi performa: lazy-load gambar, dynamic import untuk komponen berat
   (starfield, modal video).
```

---

## Tips Umum "Vibe Coding" untuk Kompetisi Ini

1. **Iterasi kecil.** Selesaikan satu section, cek hasilnya di browser, baru lanjut — jangan minta AI generate seluruh website sekaligus, hasilnya lebih sulit dikontrol dan didebug.
2. **Selalu sebut ulang design tokens** (warna, font) di tiap prompt baru kalau sesi chat AI-nya terpisah, supaya konsisten antar section.
3. **Simpan setiap prompt & hasilnya** — ini bisa jadi bagian dari **Dokumentasi Proyek (PDF)** yang wajib dikumpulkan (Juknis bagian E.3), sebagai bukti proses pengembangan.
4. **Ganti semua placeholder aset** sebelum submit — jangan biarkan gambar dummy/generic dari AI (kadang berupa ilustrasi acak) terpakai di versi final tanpa dicek relevansi & lisensinya.
5. **Test di device asli** (bukan cuma resize browser) untuk memastikan poin responsif benar-benar terpenuhi.
