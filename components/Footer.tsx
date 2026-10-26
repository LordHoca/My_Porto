import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <p className="text-sm text-mute">© 2026 Fauzan Fadhilah</p>
        <a
          href="#home"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ivory transition hover:border-brass hover:text-brass-soft"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          Kembali ke atas
        </a>
      </div>
    </footer>
  );
}
