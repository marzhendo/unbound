# DESIGN SYSTEM — Website "A Space for the Unbound" Showcase

## 1. Lima Opsi Color Palette

Setiap palette dirancang mengikuti mood berbeda dari game (malam berbintang, senja 90-an, dunia "dive"/supernatural, nuansa retro CRT, dan versi siang/pastel). Semua warna dalam format HEX, siap dipakai sebagai CSS variables / Tailwind config.

### Opsi 1 — "Malam Loka" (rekomendasi utama)
Nuansa langit malam kota kecil dengan lampu jalan hangat. Cocok untuk kesan sinematik & misterius tanpa terasa horor.

| Role | Hex | Contoh Pakai |
|---|---|---|
| Background utama | `#0B1026` | Latar hero, section gelap |
| Background sekunder | `#161B33` | Card, navbar |
| Primary (bintang/cahaya) | `#F4C95D` | CTA button, highlight |
| Secondary (langit) | `#5B6EE1` | Aksen, link hover |
| Accent (dive glow) | `#7FE7D8` | Ikon interaktif, glow effect |
| Teks utama (di atas gelap) | `#F5F3ED` | Body text |
| Teks muted | `#9CA3C4` | Caption, meta text |

### Opsi 2 — "Senja 90-an"
Palet gradasi senja hangat, membangkitkan nostalgia sore hari di pedesaan Indonesia era 90-an.

| Role | Hex |
|---|---|
| Background utama | `#2B1B3D` |
| Gradient atas | `#FF7E5F` |
| Gradient bawah | `#5C2A9D` |
| Primary | `#FFB84C` |
| Accent | `#FF5E7E` |
| Teks utama | `#FFF6E9` |
| Teks muted | `#D9B8E0` |

### Opsi 3 — "Dive Mind" (dunia supernatural)
Terinspirasi dari mekanik "menyelam" ke ingatan orang lain — dingin, glowing, sedikit surreal. Cocok untuk section Gameplay/Features.

| Role | Hex |
|---|---|
| Background utama | `#050914` |
| Background sekunder | `#101935` |
| Primary (energi psikis) | `#00E5C7` |
| Secondary | `#8C6BFF` |
| Accent (pulse/glow) | `#FF4D97` |
| Teks utama | `#E7F6F2` |
| Teks muted | `#7C8AA8` |

### Opsi 4 — "Retro CRT / VHS"
Terinspirasi tampilan televisi tabung & poster film 90-an — cocok kalau tim ingin kesan "found footage nostalgia" lebih kental.

| Role | Hex |
|---|---|
| Background utama | `#111111` |
| Cyan (VHS glitch) | `#2DE2E6` |
| Magenta (VHS glitch) | `#FF3EA5` |
| Amber (tube glow) | `#FFB627` |
| Teks utama | `#F2F2F2` |
| Teks muted | `#8A8A8A` |

### Opsi 5 — "Pixel Pastel" (siang hari, ringan)
Versi lebih cerah & ramah untuk kesan "slice of life" siang hari di kota Loka — cocok kalau tim ingin nuansa lebih hangat/ceria dibanding gelap-gelapan.

| Role | Hex |
|---|---|
| Background utama | `#FFF8ED` |
| Background sekunder | `#F2E6D8` |
| Primary | `#E4784A` |
| Secondary | `#3E7C59` |
| Accent | `#5B8DEF` |
| Teks utama | `#2B2620` |
| Teks muted | `#7A6F63` |

> **Saran pemakaian:** Opsi 1 (Malam Loka) sebagai palette utama Home & Hero, lalu Opsi 3 (Dive Mind) khusus dipakai saat section/scroll masuk ke bagian "Gameplay/Dive Mechanic" — transisi warna ini sekaligus jadi unsur *interaktif/transition* yang diminta Juknis poin D.10.

---

## 2. Tipografi (100% Google Fonts — Gratis, Open Source)

| Peran | Font | Alasan |
|---|---|---|
| Judul / Display (kesan pixel-retro) | **"Silkscreen"** atau **"Press Start 2P"** | Nuansa pixel-art khas game |
| Judul alternatif lebih terbaca | **"VT323"** | Pixel font tapi lebih mudah dibaca untuk heading besar |
| Body text | **"Plus Jakarta Sans"** atau **"Inter"** | Sans-serif modern, sangat mudah dibaca di semua ukuran layar |
| Aksen/quote | **"Caveat"** atau **"Patrick Hand"** | Kesan tulisan tangan buku catatan/diary Atma |

Semua tersedia gratis di [fonts.google.com](https://fonts.google.com) dan bisa langsung dipakai via `<link>` tag atau `next/font`.

---

## 3. Ikon (Gratis & Open Source)

- **Lucide Icons** — lucide.dev (React & SVG, gratis, ringan)
- **Phosphor Icons** — phosphoricons.com (gratis, banyak varian gaya termasuk "duotone" yang cocok untuk kesan glow)
- **Font Awesome Free** — fontawesome.com (versi free cukup untuk ikon platform: Steam, PlayStation, Xbox, Switch, App Store)

---

## 4. Animasi & Interaktivitas (Gratis)

| Kebutuhan | Tool | Catatan |
|---|---|---|
| Scroll reveal / fade-in | **AOS (Animate On Scroll)** | Ringan, tinggal tambah `data-aos` attribute |
| Animasi kompleks & timeline | **GSAP core + ScrollTrigger** | Core GSAP gratis untuk kebutuhan umum |
| Smooth scroll | **Lenis** (by Studio Freight) | Open source, bikin scroll terasa premium |
| Animasi berbasis komponen React | **Framer Motion** | Gratis, native untuk React/Next.js |
| Partikel bintang/starfield di background | **tsParticles** | Gratis, cocok untuk background "langit malam" |
| Micro-animation (ikon, loading) | **LottieFiles (free tier)** | Banyak animasi gratis siap pakai, format Lottie ringan |
| Efek parallax ringan | **Rellax.js** | Gratis, tanpa dependency berat |

---

## 5. Aset Visual & Ilustrasi (Gratis & Aman Hak Cipta)

Karena Juknis melarang penyalinan aset/desain asli game secara langsung, gunakan pendekatan berikut:

1. **Buat pixel art orisinal** terinspirasi (bukan menjiplak) gaya visual game — pakai tool gratis:
   - **Piskel** (piskel.com) — pixel art editor berbasis browser, gratis
   - **Aseprite** (via GIMP/Krita sebagai alternatif gratis jika tidak ingin beli Aseprite)
   - **LibreSprite** — fork gratis dari Aseprite lama
2. **Background/tekstur generik** (langit malam, tekstur kayu warung, dsb — bukan aset spesifik game):
   - **Unsplash** (unsplash.com) & **Pexels** (pexels.com) — foto gratis, lisensi bebas pakai
   - **OpenGameArt.org** — aset game gratis (CC0/CC-BY) untuk elemen dekoratif generik (bintang, partikel, dsb), bukan untuk meniru karakter Atma/Raya
3. **Ilustrasi vektor generik pelengkap** (bukan karakter game):
   - **Storyset** (storyset.com) & **unDraw** (undraw.co) — ilustrasi gratis, bisa diubah warnanya sesuai design system
4. **Video trailer**: sematkan **trailer resmi via YouTube embed** dari channel resmi Toge Productions/Mojiken Studio — ini cara yang aman & lazim untuk fan-showcase karena tidak mengunduh/menyalin ulang videonya, hanya menautkan.
5. **Cek Press Kit resmi**: banyak studio indie (termasuk kemungkinan Mojiken/Toge) menyediakan halaman *press kit* (biasanya di situs resmi atau presskit.itch.io) berisi logo & screenshot yang **diizinkan** dipakai untuk konten pers/fan/edukasi dengan kredit. Selalu cek dan cantumkan kredit sesuai ketentuan mereka — ini langkah paling aman untuk halaman Character/Hero.

---

## 6. Hosting & Tools Deploy (Gratis)

| Kebutuhan | Tool |
|---|---|
| Hosting frontend | **Vercel** (khusus Next.js, gratis) atau **Netlify** |
| Hosting statis sederhana | **GitHub Pages** |
| Version control & source code (wajib Juknis D.8) | **GitHub** (repo publik) |
| Optimasi gambar | **Squoosh.app** (gratis, dari Google) |
| Testing responsif | **Responsively App** (gratis, open source) atau DevTools browser |
