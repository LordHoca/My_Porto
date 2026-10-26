# Portofolio Fauzan Fadhilah

Website portofolio dengan Next.js (App Router), TypeScript, Tailwind CSS v4, dan Framer Motion.

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:3000
npm run build    # build produksi
npm run start    # jalankan hasil build
```

Butuh Node.js 18.18 atau lebih baru. Font (Instrument Serif dan Manrope) diunduh otomatis oleh Next.js saat dev/build, jadi butuh koneksi internet pertama kali.

## Cara mengisi konten

Semua isi website ada di folder `data/`, tidak perlu menyentuh komponen.

| Yang ingin diubah | File |
| --- | --- |
| Nama, profesi, foto profil, teks About Me, kontak | `data/profile.ts` |
| Kartu Galeri Karya | `data/projects.ts` (gambar di `public/gallery/`) |
| Skills dan persentasenya | `data/skills.ts` |

### Menambah karya ke galeri
1. Simpan gambar di `public/gallery/`, misalnya `proyek-1.jpg`.
2. Di `data/projects.ts`, edit satu kartu atau salin satu blok `{ ... }` untuk kartu baru.
3. Isi `image: "/gallery/proyek-1.jpg"`. Link demo dan GitHub boleh `null`.

### Mengisi About Me
Buka `data/profile.ts`, lalu isi `about` dengan daftar paragraf, contoh `about: ["Paragraf 1", "Paragraf 2"]`. Foto profil: simpan di `public/profile.jpg` dan isi `photo: "/profile.jpg"`.

## Struktur

```
app/          layout dan halaman utama
components/   Navbar, Hero, NetworkField, About, Gallery, ProjectCard, Skills, Contact, Footer
data/         profile.ts, projects.ts, skills.ts
public/       gambar (galeri, foto profil)
```

## Deploy tanpa memasang Node.js (GitHub + Vercel)

Vercel yang membangun website di servernya, jadi komputermu tidak perlu Node.js. Semua langkah dilakukan lewat browser.

1. Daftar di [github.com](https://github.com) lalu klik **New repository**. Beri nama `portfolio`, pilih Public, klik **Create repository**.
2. Ekstrak file zip ini. Di halaman repository, klik **uploading an existing file**, lalu seret **isi** folder `portfolio-fauzan` (bukan folder luarnya, supaya `package.json` berada di paling atas) dan klik **Commit changes**.
3. Daftar di [vercel.com](https://vercel.com) dengan akun GitHub, klik **Add New → Project**, pilih repository `portfolio`, lalu klik **Deploy**. Vercel mengenali Next.js otomatis, tidak ada pengaturan yang perlu diubah.
4. Tunggu 1–2 menit. Kamu mendapat alamat seperti `portfolio-xxxx.vercel.app`.

### Mengubah isi setelah online
Buka file di GitHub (misalnya `data/profile.ts`), klik ikon pensil, edit, lalu **Commit changes**. Vercel otomatis membangun ulang dan website terbarui dalam 1–2 menit. Untuk gambar karya, buka folder `public/gallery` lalu **Add file → Upload files**.

### Kalau deploy gagal
Di Vercel, buka deployment yang gagal dan salin pesan error dari tab **Build Logs**.
