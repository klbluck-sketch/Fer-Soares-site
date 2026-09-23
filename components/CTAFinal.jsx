import Link from "next/link";
import Reveal from "./Reveal";
import { SITE, waLink } from "@/lib/data";

export default function CTAFinal() {
  return (
    <section className="bg-verde px-6 py-20 text-center text-creme">
      <Reveal>
        <div className="mb-5 text-2xl font-semibold uppercase tracking-[0.12em] text-dourado">
          {SITE.nome}
        </div>
        <p className="mx-auto mb-8 max-w-md opacity-85">
          Pronta pra deixar sua festa mais doce? Consulte a disponibilidade
          da sua data pelo WhatsApp ou acompanhe o trabalho no Instagram.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="rounded-md bg-dourado px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-verde shadow-[0_6px_16px_-10px_rgba(201,164,104,0.6)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
          >
            Chamar no WhatsApp
          </a>
          <Link
            href="/cardapio"
            className="rounded-md border border-dourado px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-dourado transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
          >
            Ver Cardápio
          </Link>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener"
            className="rounded-md border border-dourado px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-dourado transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
          >
            Ver Instagram
          </a>
        </div>
      </Reveal>
    </section>
  );
}
