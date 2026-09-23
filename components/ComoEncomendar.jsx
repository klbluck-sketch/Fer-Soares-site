"use client";

import Reveal from "./Reveal";

const PASSOS = [
  {
    titulo: "Consulte a data",
    texto:
      "Chame no WhatsApp com a data do seu evento — os pedidos seguem a agenda da Fer, então a disponibilidade é confirmada antes de tudo.",
  },
  {
    titulo: "Personalize com a Fer",
    texto:
      "Juntas, vocês ajustam sabores, quantidades e visual conforme a ocasião.",
  },
  {
    titulo: "Confirme o pedido",
    texto: "Combinado tudo, é só aguardar a entrega no dia da sua celebração.",
  },
];

export default function ComoEncomendar() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal className="text-center">
        <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.08em] text-verde">
          Como encomendar
        </h2>
        <div className="mx-auto mt-4 mb-10 h-px w-12 bg-dourado" />
      </Reveal>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {PASSOS.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 0.1} className="group text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-dourado text-lg text-dourado transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-dourado group-hover:text-verde">
              {i + 1}
            </div>
            <h3 className="mb-2 text-lg font-semibold uppercase tracking-[0.06em] text-verde">
              {p.titulo}
            </h3>
            <p className="text-sm opacity-85">{p.texto}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
