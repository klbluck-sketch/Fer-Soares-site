"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Minus, X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/data";

/**
 * Floating cart button + panel. Selections are built into a plain-text
 * WhatsApp message (prices shown are reference only — availability and
 * final quantities are confirmed directly with the Fer).
 */
// Só soma itens com preço unitário limpo ("R$X,XX ..."); itens por lote
// (preço composto, ex: "25u R$75 · 50u R$145 · 100u R$280") ficam de fora
// e são confirmados no WhatsApp.
function parsePreco(preco) {
  const texto = preco.trim();
  if (!texto.startsWith("R$")) return null;
  const match = texto.match(/^R\$\s?([\d.,]+)/);
  if (!match) return null;
  const valor = parseFloat(match[1].replace(",", "."));
  return Number.isNaN(valor) ? null : valor;
}

function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartBar({ cart, onAdd, onRemove, onClear }) {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(cart);
  const totalItens = entries.reduce((sum, [, item]) => sum + item.qty, 0);

  if (totalItens === 0) return null;

  let subtotal = 0;
  let temItemNaoCalculado = false;
  entries.forEach(([, { preco, qty }]) => {
    const unitario = parsePreco(preco);
    if (unitario === null) {
      temItemNaoCalculado = true;
    } else {
      subtotal += unitario * qty;
    }
  });

  const mensagem = [
    "Olá! Gostaria de consultar disponibilidade e montar um pedido:",
    "",
    ...entries.map(([nome, { preco, qty, unidade }]) => {
      const qtdTexto = unidade ? `${qty} ${unidade}${qty > 1 ? "s" : ""}` : qty;
      return `• ${nome} — Qtd: ${qtdTexto} — ${preco}`;
    }),
    "",
    subtotal > 0
      ? `Estimativa parcial: ${formatBRL(subtotal)}${
          temItemNaoCalculado ? " (não inclui itens com preço por lote)" : ""
        }`
      : null,
    "Pode me ajudar a confirmar disponibilidade pra data do meu evento?",
  ]
    .filter((linha) => linha !== null)
    .join("\n");

  return (
    <>
      {open && (
        <div className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-sm rounded-lg border border-dourado/20 bg-[#161311] text-creme shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:right-6 sm:mx-0">
          <div className="flex items-center justify-between border-b border-dourado/15 px-5 py-4">
            <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-dourado">
              Seu pedido ({totalItens})
            </h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar carrinho"
              className="-m-2 p-2 text-creme/70 transition-colors hover:text-creme"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[45vh] overflow-y-auto px-5 py-1">
            {entries.map(([nome, { preco, qty, unidade }]) => (
              <div
                key={nome}
                className="flex items-center justify-between gap-3 border-b border-dourado/10 py-3 last:border-none"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm text-creme">{nome}</div>
                  <div className="text-xs text-dourado">{preco}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => onRemove(nome)}
                    aria-label={`Diminuir ${nome}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-dourado/40 text-dourado transition-colors hover:bg-dourado hover:text-verde active:scale-95"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-center text-sm">
                    {qty}
                    {unidade ? ` ${unidade}${qty > 1 ? "s" : ""}` : ""}
                  </span>
                  <button
                    onClick={() => onAdd(nome, preco, unidade)}
                    aria-label={`Aumentar ${nome}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-dourado/40 text-dourado transition-colors hover:bg-dourado hover:text-verde active:scale-95"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {subtotal > 0 && (
            <div className="border-t border-dourado/15 px-5 py-3 text-xs text-creme/75">
              Estimativa parcial:{" "}
              <span className="font-medium text-dourado">{formatBRL(subtotal)}</span>
              {temItemNaoCalculado && " — não inclui itens com preço por lote"}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-dourado/15 px-5 py-4">
            <button
              onClick={onClear}
              className="text-xs uppercase tracking-[0.05em] text-creme/60 transition-colors hover:text-creme"
            >
              Limpar
            </button>
            <a
              href={waLink(mensagem)}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 rounded-md bg-dourado px-4 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-verde transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle size={15} /> Enviar no WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir carrinho de pedido"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-dourado text-verde shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
      >
        <ShoppingBag size={22} />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-verde px-1 text-[0.7rem] font-medium text-creme">
          {totalItens}
        </span>
      </button>
    </>
  );
}
