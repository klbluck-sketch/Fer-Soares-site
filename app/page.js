"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CatalogCinematicHero from "@/components/CatalogCinematicHero";
import CartBar from "@/components/CartBar";
import {
  docesFinos,
  docesEspeciais,
  docesTradicionais,
  extrasConsulta,
  tiers,
  SITE,
  waLink,
} from "@/lib/data";

const GALERIA_CARDAPIO = [
  { src: "/img/fer-retrato-bandeja.jpg", alt: "Fer Soares segurando uma bandeja com doces finos variados" },
  { src: "/img/mesa-casamento-branco.jpg", alt: "Mesa de doces para casamento com flores brancas em cascata" },
  { src: "/img/festa-stitch.jpg", alt: "Mesa de festa infantil com tema Stitch" },
  { src: "/img/festa-hulk.jpg", alt: "Mesa de festa infantil com tema Hulk" },
  { src: "/img/mesa-casamento-floral.jpg", alt: "Mesa de doces para casamento com flores laranja e amarelas" },
  { src: "/img/fer-retrato-caixas.jpg", alt: "Fer Soares arrumando caixinhas de doces personalizadas" },
];

function normalizar(txt) {
  return txt
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

const UNIDADE_ABREV = { caixa: "cx", unidade: "un" };

function DoceCard({ nome, preco, hidden, qty, unidade, onAdd, onRemove }) {
  const abrev = unidade ? UNIDADE_ABREV[unidade] || unidade : null;
  return (
    <div
      className={`overflow-hidden rounded-lg border bg-[#161311] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-16px_rgba(0,0,0,0.55)] ${
        qty > 0 ? "border-dourado/70" : "border-dourado/15 hover:border-dourado/60"
      } ${hidden ? "hidden" : ""}`}
    >
      {/* Espaço reservado para a foto do doce (a importar depois) */}
      <div className="aspect-square w-full bg-[#1c1815]" />

      <div className="px-1.5 py-1.5 sm:px-2.5 sm:py-2">
        <div className="line-clamp-2 text-[0.62rem] font-medium leading-tight text-creme sm:text-[0.78rem]">
          {nome}
        </div>

        <div className="mt-1 flex items-center justify-between gap-1 sm:mt-1.5 sm:gap-1.5">
          <span className="truncate text-[0.56rem] text-dourado sm:text-[0.72rem]">{preco}</span>

          {qty > 0 ? (
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <button
                onClick={onRemove}
                aria-label={`Diminuir ${nome}`}
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-dourado/40 text-dourado transition-colors hover:bg-dourado hover:text-verde active:scale-95 sm:h-6 sm:w-6"
              >
                <Minus size={9} className="sm:hidden" />
                <Minus size={11} className="hidden sm:block" />
              </button>
              <span className="min-w-[0.9rem] text-center text-[0.56rem] text-creme sm:min-w-[1.1rem] sm:text-[0.72rem]">
                {qty}
                {abrev ? ` ${abrev}` : ""}
              </span>
              <button
                onClick={onAdd}
                aria-label={`Aumentar ${nome}`}
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-dourado/40 text-dourado transition-colors hover:bg-dourado hover:text-verde active:scale-95 sm:h-6 sm:w-6"
              >
                <Plus size={9} className="sm:hidden" />
                <Plus size={11} className="hidden sm:block" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              aria-label={`Adicionar ${nome}`}
              className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-dourado text-verde transition-transform active:scale-90 sm:h-6 sm:w-6"
            >
              <Plus size={10} className="sm:hidden" />
              <Plus size={13} className="hidden sm:block" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Cardapio() {
  const [busca, setBusca] = useState("");
  const [cart, setCart] = useState({});
  const termo = normalizar(busca.trim());

  const matches = (nome) => !termo || normalizar(nome).includes(termo);

  const addItem = (nome, preco, unidade) => {
    setCart((prev) => ({
      ...prev,
      [nome]: { preco, unidade, qty: (prev[nome]?.qty || 0) + 1 },
    }));
  };

  const removeItem = (nome) => {
    setCart((prev) => {
      const current = prev[nome];
      if (!current) return prev;
      if (current.qty <= 1) {
        const next = { ...prev };
        delete next[nome];
        return next;
      }
      return { ...prev, [nome]: { ...current, qty: current.qty - 1 } };
    });
  };

  const clearCart = () => setCart({});

  const totalVisivel = useMemo(() => {
    const todos = [
      ...docesFinos,
      ...docesEspeciais,
      ...docesTradicionais,
    ];
    return todos.filter(([nome]) => matches(nome)).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termo]);

  const qtyEspeciais = useMemo(() => {
    const nomes = new Set(docesEspeciais.map(([nome]) => nome));
    return Object.entries(cart).reduce(
      (sum, [nome, item]) => (nomes.has(nome) ? sum + item.qty : sum),
      0
    );
  }, [cart]);

  return (
    <>
      <Nav />

      <CatalogCinematicHero />

      <Reveal
        as="nav"
        y={16}
        className="sticky top-[61px] z-40 border-b border-marrom/15 bg-creme px-6 py-3.5"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#doces-finos" className="text-[0.82rem] uppercase tracking-[0.06em] text-marrom/75 hover:text-marrom">
            Doces Finos
          </a>
          <a href="#doces-especiais" className="text-[0.82rem] uppercase tracking-[0.06em] text-marrom/75 hover:text-marrom">
            Doces Especiais
          </a>
          <a href="#doces-tradicionais" className="text-[0.82rem] uppercase tracking-[0.06em] text-marrom/75 hover:text-marrom">
            Doces Tradicionais
          </a>
          <div className="relative ml-auto w-full max-w-[260px] flex-1">
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar um doce..."
              aria-label="Buscar um doce"
              className="w-full rounded-md border border-marrom/30 bg-white px-3.5 py-2 pr-9 text-sm text-verde focus:outline focus:outline-2 focus:outline-dourado"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                aria-label="Limpar busca"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-marrom/50 transition-colors hover:text-marrom"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      <section id="doces-finos" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal className="text-center">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-verde">
            Doces Finos
          </h2>
          <div className="mx-auto mt-4 mb-3 h-px w-12 bg-dourado" />
          <p className="mx-auto mb-9 max-w-lg text-sm opacity-75">
            Vendidos em caixa fechada de 10 unidades — preço por caixa.
          </p>
        </Reveal>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
          {docesFinos.map(([nome, preco]) => (
            <DoceCard
              key={nome}
              nome={nome}
              preco={preco}
              hidden={!matches(nome)}
              qty={cart[nome]?.qty || 0}
              unidade="caixa"
              onAdd={() => addItem(nome, preco, "caixa")}
              onRemove={() => removeItem(nome)}
            />
          ))}
        </div>
      </section>

      <section id="doces-especiais" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal className="text-center">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-verde">
            Doces Especiais
          </h2>
          <div className="mx-auto mt-4 mb-3 h-px w-12 bg-dourado" />
          <div className="mx-auto mb-9 max-w-lg">
            <p className="text-sm opacity-75">
              Pedido mínimo de 25 unidades — preço por unidade.
            </p>
            {qtyEspeciais > 0 && qtyEspeciais < 25 && (
              <p className="mt-1.5 text-sm text-marrom">
                Você tem {qtyEspeciais} unidade{qtyEspeciais === 1 ? "" : "s"} desta categoria no
                carrinho — faltam {25 - qtyEspeciais} para o pedido mínimo (25).
              </p>
            )}
          </div>
        </Reveal>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
          {docesEspeciais.map(([nome, preco]) => (
            <DoceCard
              key={nome}
              nome={nome}
              preco={preco}
              hidden={!matches(nome)}
              qty={cart[nome]?.qty || 0}
              unidade="unidade"
              onAdd={() => addItem(nome, preco, "unidade")}
              onRemove={() => removeItem(nome)}
            />
          ))}
        </div>
      </section>

      <section id="doces-tradicionais" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal className="text-center">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-verde">
            Doces Tradicionais
          </h2>
          <div className="mx-auto mt-4 mb-3 h-px w-12 bg-dourado" />
          <p className="mx-auto mb-9 max-w-lg text-sm opacity-75">
            Pedido mínimo de 25 unidades — preço por lote, com dois grupos de
            sabores.
          </p>
        </Reveal>

        <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-marrom px-6 py-5 text-center text-creme">
            <h3 className="mb-2.5 uppercase tracking-[0.06em] text-dourado">Grupo 1</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {tiers.tier1.split(" · ").map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-md bg-marrom px-6 py-5 text-center text-creme">
            <h3 className="mb-2.5 uppercase tracking-[0.06em] text-dourado">Grupo 2</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {tiers.tier2.split(" · ").map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
          {docesTradicionais.map(([nome, preco]) => (
            <DoceCard
              key={nome}
              nome={nome}
              preco={preco}
              hidden={!matches(nome)}
              qty={cart[nome]?.qty || 0}
              onAdd={() => addItem(nome, preco)}
              onRemove={() => removeItem(nome)}
            />
          ))}
        </div>

        <div className="mt-9 rounded-md border border-dourado/30 bg-dourado/[0.08] px-7 py-6">
          <h3 className="mb-3 font-medium uppercase tracking-[0.05em] text-verde">
            Variações sob consulta
          </h3>
          <p className="mb-4 text-sm opacity-80">
            Preço e sabor conforme o modelo escolhido — confirme direto com a
            Fer.
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {extrasConsulta.map((nome) => (
              <a
                key={nome}
                href={waLink(`Olá! Gostaria de saber mais sobre: ${nome}`)}
                target="_blank"
                rel="noopener"
                className="group overflow-hidden rounded-md border border-dourado/20 bg-[#161311] text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-dourado/60"
              >
                {/* Espaço reservado para a foto (a importar depois) */}
                <div className="aspect-square w-full bg-[#1c1815]" />
                <div className="px-1.5 py-2 text-[0.68rem] uppercase leading-tight tracking-[0.03em] text-creme">
                  {nome}
                </div>
              </a>
            ))}
          </div>
          <h3 className="mt-5 mb-2.5 font-medium uppercase tracking-[0.05em] text-verde">
            Toppings
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-marrom/30 px-3 py-1.5 text-[0.78rem] text-marrom">
              Tradicionais — R$3,50/und
            </span>
            <span className="rounded-full border border-marrom/30 px-3 py-1.5 text-[0.78rem] text-marrom">
              Especiais — R$6,00/und
            </span>
            <span className="rounded-full border border-marrom/30 px-3 py-1.5 text-[0.78rem] text-marrom">
              Glitter — consultar
            </span>
          </div>
        </div>
      </section>

      {termo && totalVisivel === 0 && (
        <div className="px-6 py-10 text-center opacity-70">
          Nenhum doce encontrado com esse termo.
        </div>
      )}

      <section className="bg-marrom px-6 py-16 text-creme">
        <Reveal className="text-center">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em]">
            Feito com carinho
          </h2>
          <div className="mx-auto mt-4 mb-10 h-px w-12 bg-dourado" />
        </Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3">
          {GALERIA_CARDAPIO.map((foto, i) => (
            <Reveal
              key={foto.src}
              delay={i * 0.06}
              as="figure"
              className="group relative aspect-[4/5] overflow-hidden rounded-md"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <Reveal className="text-center">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-verde">
            Observações
          </h2>
          <div className="mx-auto mt-4 mb-8 h-px w-12 bg-dourado" />
          <ul className="mx-auto flex max-w-lg flex-col gap-2.5 text-left text-[0.92rem]">
            {[
              "Brigadeiros no tamanho padrão: 15g, sem confeito",
              "Formas pétalas padronizadas na cor branca",
              "Modelos personalizados (flores, cores temáticas) por conta do cliente",
              "Forminhas de acetato: acréscimo de R$0,50/unidade",
              "Caixa de transporte com forminhas de flores: R$5,00",
              "Entrega no perímetro urbano: R$40,00",
              "Montagem de evento: varia conforme pedido e quantidade — confirme ao fechar",
            ].map((obs) => (
              <li key={obs}>
                <span className="text-dourado">❈ </span>
                {obs}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-verde px-6 py-20 text-center text-creme">
        <Reveal>
          <div className="font-heading mb-5 text-2xl font-semibold uppercase tracking-[0.08em] text-dourado">
            {SITE.nome}
          </div>
          <p className="mx-auto mb-8 max-w-md opacity-85">
            Gostou de algum doce? Chama no WhatsApp com a data do seu evento
            pra confirmar disponibilidade e fechar o pedido.
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
            <a
              href="#doces-finos"
              className="rounded-md border border-dourado px-7 py-3 text-sm font-medium uppercase tracking-[0.06em] text-dourado transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
            >
              Ver cardápio
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />

      <CartBar cart={cart} onAdd={addItem} onRemove={removeItem} onClear={clearCart} />
    </>
  );
}
