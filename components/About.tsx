import Image from "next/image";
import { User } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/profile";

export default function About() {
  const hasText = profile.about.length > 0;

  return (
    <section id="about" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        {/* Foto profil. Atur di data/profile.ts → photo */}
        <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-deep">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={`Foto ${profile.name}`}
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-mute">
              <User className="h-10 w-10" aria-hidden="true" />
              <span className="text-sm">Foto profil</span>
            </div>
          )}
        </div>

        <div>
          <SectionHeading title="About Me" />
          <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-mute">
            {hasText ? (
              profile.about.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              // TODO: isi teks About Me lewat data/profile.ts → about
              <p className="rounded-xl border border-dashed border-line px-5 py-6">
                Bagian ini belum diisi. Tambahkan ceritamu di{" "}
                <code className="text-brass-soft">data/profile.ts</code>.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
