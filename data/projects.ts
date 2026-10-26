// =====================================================
// GALERI KARYA
// Cara menambah karya:
//   1. Taruh gambar di folder  /public/gallery/  (contoh: proyek-1.jpg)
//   2. Ubah salah satu item di bawah, atau salin satu blok { ... } untuk menambah kartu baru
//   3. Isi  image: "/gallery/proyek-1.jpg"
// Kalau  image: null  kartu akan menampilkan placeholder.
// demoUrl / githubUrl boleh dikosongkan dengan null (tombol otomatis disembunyikan).
// =====================================================

export type Project = {
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
};

export const projects: Project[] = [
  {
    title: "Judul Karya 1",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["Machine Learning", "Python"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Judul Karya 2",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["Deep Learning", "PyTorch"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Judul Karya 3",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["Next.js", "Tailwind CSS"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Judul Karya 4",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["Data Analysis", "Python"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Judul Karya 5",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["Computer Vision"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Judul Karya 6",
    description: "Tulis deskripsi singkat karya ini: masalah yang diselesaikan dan hasilnya.",
    image: null,
    tags: ["React", "TypeScript"],
    demoUrl: null,
    githubUrl: null,
  },
];
