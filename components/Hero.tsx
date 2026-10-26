"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import NetworkField from "./NetworkField";
import { profile } from "@/data/profile";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <NetworkField />
      {/* Lapisan gradasi agar teks tetap terbaca di atas jaringan */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(14,26,43,0.92)_0%,rgba(14,26,43,0.55)_55%,rgba(14,26,43,0.2)_100%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32"
      >
        <motion.p variants={item} className="text-base text-brass-soft">
          {profile.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-mute"
        >
          Saya mengerjakan{" "}
          <span className="text-ivory">{profile.expertise[0]}</span>,{" "}
          <span className="text-ivory">{profile.expertise[1]}</span>, dan{" "}
          <span className="text-ivory">{profile.expertise[2]}</span>.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#galeri"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-night transition hover:bg-brass-soft"
          >
            Lihat karya saya
          </a>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ivory transition hover:border-brass hover:text-brass-soft"
          >
            Hubungi saya
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Gulir ke bagian About Me"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mute transition hover:text-brass"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
