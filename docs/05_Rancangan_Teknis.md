# RANCANGAN TEKNIS (TECHNICAL DESIGN DOCUMENT)
**Website Showcase "A Space for the Unbound" — Lomba Web Development IT FEST UNW 2026**

---

## 1. Ringkasan Arsitektur

Website ini adalah **static/SSG frontend site** (tanpa backend/database) karena kebutuhan utamanya hanya menampilkan konten promosi game — tidak ada fitur login, transaksi, atau data dinamis dari user. Pendekatan ini paling sesuai dengan Juknis (poin D.4: dilarang CMS) dan paling murah/cepat untuk di-host gratis.

```
┌─────────────────────────────┐
│         Browser User         │
└───────────────┬──────────────┘
                │  HTTPS
┌───────────────▼──────────────┐
│   Vercel / Netlify (Hosting)  │  ← Static/SSG build hasil Next.js
└───────────────┬──────────────┘
                │
┌───────────────▼──────────────┐
│         Next.js App           │
│  - App Router (page/section)  │
│  - Komponen React per section │
│  - Tailwind CSS (styling)     │
│  - Framer Motion / GSAP (anim)│
└───────────────┬──────────────┘
                │  embed (iframe)
┌───────────────▼──────────────┐
│     YouTube (trailer resmi)   │  ← konten eksternal, bukan hosted sendiri
└────────────────────────────────┘
```

Tidak ada API/database custom → tidak ada risiko keamanan server, tidak ada biaya hosting backend, dan sesuai dengan sifat website "showcase" (bukan aplikasi).

---

## 2. Tech Stack & Justifikasi

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Diizinkan Juknis (D.3), SSG/SSR built-in, performa bagus, mudah deploy gratis di Vercel |
| Styling | **Tailwind CSS 3** | Diizinkan Juknis (D.3), development cepat cocok untuk "vibe coding", konsisten dengan design tokens |
| Animasi | **Framer Motion** (komponen React) + **GSAP + ScrollTrigger** (animasi scroll kompleks, misal transisi warna section Gameplay) | Keduanya gratis untuk kebutuhan umum, kombinasi cukup untuk semua requirement interaktif Juknis (D.10) |
| Smooth scroll | **Lenis** | Ringan, open source, memberi kesan "premium/imersif" |
| Partikel background | **tsParticles** (react-tsparticles) | Gratis, untuk starfield di Hero |
| Ikon | **lucide-react** + **react-icons (Font Awesome free set)** | Gratis, ringan, cukup untuk ikon platform (Steam/PS/Xbox/Switch/iOS) |
| Font | **Google Fonts** (Silkscreen, Plus Jakarta Sans) via `next/font/google` | Gratis, di-self-host otomatis oleh Next.js (bagus untuk performa & privasi) |
| Form (jika ada, misal newsletter dummy) | Native HTML form + validasi client-side, **tanpa backend** | Tidak butuh CMS/database, cukup untuk showcase |
| Version control | **Git + GitHub** (repo publik) | Wajib Juknis D.8 |
| Hosting | **Vercel** (rekomendasi utama untuk Next.js) atau **Netlify** | Gratis, auto-deploy dari GitHub, HTTPS otomatis |
| Package manager | **pnpm** (atau npm jika tim lebih familiar) | Lebih cepat & hemat disk, gratis |

**Tidak dipakai (sesuai larangan Juknis D.4):** WordPress, Joomla, Blogger, Wix, Squarespace, atau CMS/website-builder apa pun.

---

## 3. Struktur Folder Project

```
asftu-showcase/
├── app/
│   ├── layout.tsx              # Root layout: font, metadata, Navbar, Footer, Lenis provider
│   ├── page.tsx                # Halaman utama (one-page scroll, merangkai semua section)
│   └── globals.css             # Tailwind base + custom CSS variables (design tokens)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx             # #home
│   │   ├── Characters.tsx       # #characters
│   │   ├── Gameplay.tsx         # #gameplay
│   │   ├── News.tsx             # #news
│   │   └── PlayNow.tsx          # #play
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeading.tsx
│   │   └── VideoModal.tsx
│   └── effects/
│       ├── Starfield.tsx        # tsParticles wrapper
│       └── ScrollColorShift.tsx # transisi warna background berbasis scroll
│
├── lib/
│   ├── constants.ts             # data konten: karakter, fitur, timeline, link platform
│   └── utils.ts
│
├── public/
│   ├── images/                  # aset visual orisinal tim (bukan aset resmi game)
│   ├── icons/
│   └── favicon.ico
│
├── styles/
│   └── tailwind.config.ts       # custom color tokens, font family, breakpoints
│
├── docs/
│   └── (dokumen-dokumen dari paket ini: brief, design system, konten, prompt, dokumentasi PDF)
│
├── .env.local                   # (jika ada key eksternal, misal YouTube API — opsional)
├── next.config.js
├── package.json
└── README.md                    # cara install & run project (wajib untuk juri via GitHub)
```

---

## 4. Konfigurasi Design Tokens (contoh `tailwind.config.ts`)

```ts
// tailwind.config.ts
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0B1026",
        "bg-secondary": "#161B33",
        "brand-primary": "#F4C95D",
        "brand-secondary": "#5B6EE1",
        "brand-accent": "#7FE7D8",
        "text-main": "#F5F3ED",
        "text-muted": "#9CA3C4",
        // palette "Dive Mind" untuk section Gameplay
        "dive-bg": "#050914",
        "dive-accent": "#00E5C7",
        "dive-secondary": "#8C6BFF",
      },
      fontFamily: {
        display: ["var(--font-silkscreen)", "monospace"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
};
```

> Catatan: nilai warna di atas memakai Opsi 1 ("Malam Loka") dari dokumen Design System. Ganti sesuai palette yang tim pilih final.

---

## 5. Breakpoint & Strategi Responsif

| Breakpoint | Lebar | Perilaku Utama |
|---|---|---|
| Mobile (default) | < 480px | 1 kolom, navbar jadi hamburger menu, font size diperkecil, starfield partikel dikurangi jumlahnya untuk performa |
| sm | ≥ 480px | Padding & spacing mulai melonggar |
| md (tablet) | ≥ 768px | Grid Character jadi 2 kolom, Gameplay grid 2x2 |
| lg (desktop) | ≥ 1024px | Navbar horizontal penuh, layout final desktop |
| xl | ≥ 1280px | Max-width container, spacing maksimal |

**Prinsip:** mobile-first (tulis style default untuk mobile dulu, tambahkan `md:` `lg:` untuk override di layar lebih besar) — ini pendekatan standar Tailwind dan memastikan poin D.6 Juknis (responsif desktop/tablet/smartphone) terpenuhi secara sistematis, bukan tempelan belakangan.

---

## 6. Performa & SEO

- **Font**: pakai `next/font/google` agar font di-self-host & tidak ada layout shift (FOUT/FOIT).
- **Gambar**: gunakan komponen `next/image` untuk lazy-load & auto-optimize otomatis (format WebP).
- **Komponen berat** (Starfield, VideoModal): pakai `next/dynamic` dengan `ssr: false` supaya tidak membebani initial load.
- **Lighthouse target**: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90 (cek via Chrome DevTools > Lighthouse, gratis).
- **Meta tags**: isi `title`, `description`, `og:image`, `og:title` di `app/layout.tsx` agar link preview rapi saat dibagikan (relevan untuk posting Instagram wajib di Juknis D.12).
- **Aksesibilitas dasar**: kontras warna teks vs background dicek (khususnya teks di atas background gelap harus tetap AA-compliant), semua tombol punya `aria-label` jika hanya berupa ikon.

---

## 7. Alur Kerja Git & Kolaborasi Tim

```
main            → versi stable, selalu bisa di-deploy
├── dev          → branch kerja gabungan
│   ├── feat/hero
│   ├── feat/characters
│   ├── feat/gameplay
│   ├── feat/news
│   └── feat/playnow
```

- Setiap anggota tim kerja di branch `feat/nama-section`, lalu **pull request** ke `dev`.
- `dev` di-merge ke `main` setelah semua section lolos QA responsif.
- Commit message singkat & jelas, contoh: `feat(hero): tambah starfield animation`.
- Vercel/Netlify diset **auto-deploy dari branch `main`** → setiap merge otomatis update live site (memenuhi Juknis D.7: website wajib bisa diakses online selama masa penilaian).

---

## 8. Checklist QA Sebelum Submit

- [ ] Semua 5 section wajib ada & sesuai konten final (bukan lorem ipsum)
- [ ] Responsif dicek di 3 breakpoint minimal: mobile (375px), tablet (768px), desktop (1440px)
- [ ] Semua animasi berjalan mulus, tidak ada jank/lag di device menengah (test di HP biasa, bukan cuma laptop kencang)
- [ ] Trailer video bisa diputar (embed YouTube aktif, bukan broken link)
- [ ] Tidak ada broken image/asset (cek Console browser, 0 error 404)
- [ ] Lighthouse score dicek & di-screenshot (bisa jadi lampiran dokumentasi)
- [ ] Link deploy (Vercel/Netlify) aktif & bisa diakses publik tanpa login
- [ ] Repo GitHub public, README berisi cara install (`pnpm install && pnpm dev`)
- [ ] Tidak ada konten melanggar poin D.11 Juknis (SARA, kekerasan, dsb.)
- [ ] Footer mencantumkan disclaimer fan-made + kredit hak cipta asli

---

## 9. Ringkasan Dependency (contoh `package.json`)

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "gsap": "^3.x",
    "@studio-freight/lenis": "^1.x",
    "react-tsparticles": "^2.x",
    "tsparticles": "^2.x",
    "lucide-react": "^0.x",
    "react-icons": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "typescript": "^5.x"
  }
}
```

Semua package di atas **open source & gratis** (lisensi MIT/ISC pada umumnya), aman dipakai untuk kompetisi tanpa biaya lisensi apa pun.
