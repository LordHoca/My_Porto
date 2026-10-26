// =====================================================
// SKILLS
// level = 0 sampai 100 (angka perkiraan, silakan ubah)
// icon  = salah satu dari: "python" | "data" | "nextjs"
// Untuk menambah skill baru, salin satu blok { ... }.
// =====================================================

export type Skill = {
  name: string;
  description: string;
  level: number;
  icon: "python" | "data" | "nextjs";
};

export const skills: Skill[] = [
  {
    name: "Python",
    description: "Dasar untuk machine learning, deep learning, dan otomasi.",
    level: 85,
    icon: "python",
  },
  {
    name: "Data Analyst",
    description: "Membersihkan, menganalisis, dan memvisualisasikan data.",
    level: 75,
    icon: "data",
  },
  {
    name: "Next.js",
    description: "Membangun antarmuka web yang cepat dan responsif.",
    level: 80,
    icon: "nextjs",
  },
];
