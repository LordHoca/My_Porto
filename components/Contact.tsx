"use client";

import { useState } from "react";
import { Check, Copy, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { contact } from "@/data/profile";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard tidak tersedia — abaikan */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} tersalin` : `Salin ${label}`}
      className="rounded-full p-2 text-mute transition hover:bg-night hover:text-brass"
    >
      {copied ? <Check className="h-4 w-4 text-brass" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const rowClass =
  "flex items-center gap-4 rounded-2xl border border-line bg-deep p-5 transition-colors hover:border-brass/60";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Form membuka aplikasi email dengan isi yang sudah terisi (tanpa server)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-base text-ivory placeholder:text-mute/70 transition focus:border-brass focus:outline-none";

  return (
    <section id="kontak" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Kontak"
          description="Punya pertanyaan, tawaran proyek, atau ingin berkolaborasi? Hubungi saya lewat salah satu cara di bawah."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            <li className={rowClass}>
              <Mail className="h-6 w-6 shrink-0 text-brass" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-mute">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="block truncate text-base hover:text-brass-soft"
                >
                  {contact.email}
                </a>
              </div>
              <CopyButton value={contact.email} label="email" />
            </li>

            <li className={rowClass}>
              <Phone className="h-6 w-6 shrink-0 text-brass" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-mute">Telepon / WhatsApp</p>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base hover:text-brass-soft"
                >
                  {contact.phone}
                </a>
              </div>
              <CopyButton value={contact.phone} label="nomor telepon" />
            </li>

            <li className={rowClass}>
              <Instagram className="h-6 w-6 shrink-0 text-brass" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-mute">Instagram</p>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base hover:text-brass-soft"
                >
                  @{contact.instagramHandle}
                </a>
              </div>
            </li>

            <li className={rowClass}>
              <Linkedin className="h-6 w-6 shrink-0 text-brass" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-mute">LinkedIn</p>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-base hover:text-brass-soft"
                >
                  linkedin.com/in/fauzan28
                </a>
              </div>
            </li>
          </ul>

          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-deep p-6 sm:p-8">
            <h3 className="font-display text-2xl tracking-tight">Kirim pesan</h3>

            <label htmlFor="name" className="mt-6 block text-sm text-mute">
              Nama
              <input id="name" name="name" required autoComplete="name" className={field} />
            </label>

            <label htmlFor="email" className="mt-5 block text-sm text-mute">
              Email kamu
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={field}
              />
            </label>

            <label htmlFor="message" className="mt-5 block text-sm text-mute">
              Pesan
              <textarea id="message" name="message" required rows={5} className={field} />
            </label>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-night transition hover:bg-brass-soft sm:w-auto"
            >
              Kirim pesan
            </button>

            <p role="status" className="mt-4 min-h-5 text-sm text-mute">
              {sent && "Aplikasi emailmu akan terbuka. Tekan kirim di sana untuk menyelesaikan."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
