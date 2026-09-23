import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-dourado/20 bg-verde px-6 py-6 text-center text-xs uppercase tracking-[0.05em] text-creme/60">
      {SITE.nome} — {SITE.tagline}
    </footer>
  );
}
