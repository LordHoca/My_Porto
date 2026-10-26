// =====================================================
// DATA PROFIL — edit file ini untuk mengubah isi website
// =====================================================

export const profile = {
  name: "Fauzan Fadhilah",
  role: "Mahasiswa Informatika",
  expertise: ["Machine Learning", "Deep Learning", "Front-End Development"],

  // Foto profil: taruh file di /public/profile.jpg lalu ganti nilai ini menjadi "/profile.jpg"
  photo: null as string | null,

  // BAGIAN "ABOUT ME" — dikosongkan dulu.
  // Isi nanti, contoh: about: ["Paragraf pertama...", "Paragraf kedua..."]
  about: [] as string[],
};

export const contact = {
  email: "fauzanfadhilah28@gmail.com",
  phone: "085169578969",
  whatsapp: "https://wa.me/6285169578969",
  instagramHandle: "hoca_28",
  instagram: "https://instagram.com/hoca_28",
  linkedin: "https://www.linkedin.com/in/fauzan28/",
};

export const navItems = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "About Me" },
  { id: "galeri", label: "Galeri Karya" },
  { id: "skills", label: "Skills" },
  { id: "kontak", label: "Kontak" },
];
