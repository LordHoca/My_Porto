"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
  onOpen: () => void;
};

export default function ProjectCard({ project, index, onOpen }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-deep transition-colors hover:border-brass/60"
    >
      {/* Area gambar (rasio 16:9) */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Lihat detail ${project.title}`}
        className="relative block aspect-video w-full overflow-hidden bg-night text-left"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-mute">
            <ImageIcon className="h-8 w-8" aria-hidden="true" />
            <span className="text-sm">Gambar karya</span>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl tracking-tight">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Teknologi yang dipakai">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-3 py-1 text-xs text-brass-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <button
            type="button"
            onClick={onOpen}
            className="text-sm font-semibold text-ivory underline-offset-4 transition hover:text-brass-soft hover:underline"
          >
            Lihat detail
          </button>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka demo ${project.title}`}
              className="ml-auto rounded-full p-2 text-mute transition hover:bg-night hover:text-brass"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka GitHub ${project.title}`}
              className={`rounded-full p-2 text-mute transition hover:bg-night hover:text-brass ${
                project.demoUrl ? "" : "ml-auto"
              }`}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
