"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, Globe } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills, type Skill } from "@/data/skills";

const icons: Record<Skill["icon"], typeof Code2> = {
  python: Code2,
  data: BarChart3,
  nextjs: Globe,
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Skills"
          description="Alat yang paling sering saya pakai. Angka menunjukkan perkiraan tingkat penguasaan saya."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {skills.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.name}
                className="rounded-2xl border border-line bg-deep p-7 transition-colors hover:border-brass/60"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-brass" aria-hidden="true" />
                  <span className="font-display text-3xl text-ivory">{s.level}%</span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{s.description}</p>

                <div
                  role="progressbar"
                  aria-label={`Penguasaan ${s.name}`}
                  aria-valuenow={s.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-night"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-brass"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
