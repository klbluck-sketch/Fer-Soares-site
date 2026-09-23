export const SITE = {
  nome: "Fer Soares",
  tagline: "Doces Finos e Personalizados",
  whatsapp: "5566996027581",
  whatsappDisplay: "+55 66 99602-7581",
  instagram: "fersoaresdocesfinos",
  instagramUrl: "https://www.instagram.com/fersoaresdocesfinos",
};

export const waLink = (mensagem) =>
  `https://wa.me/${SITE.whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;

const TIER1 = "25u R$75 · 50u R$145 · 100u R$280";
const TIER2 = "25u R$65 · 50u R$130 · 100u R$250";

export const docesFinos = [
  ["Cereja Real", "R$65,00 /10und"], ["Copo Moscow Mule", "R$75,00 /10und"],
  ["Brigadeiro de Morango", "R$50,00 /10und"], ["Trouxinha de Abacaxi com Coco", "R$75,00 /10und"],
  ["Trufa de Nozes com Caramelo", "R$60,00 /10und"], ["Figo Recheado", "R$70,00 /10und"],
  ["Uva Folhada", "R$65,00 /10und"], ["Passion Boat", "R$65,00 /10und"],
  ["Pralinê de Nozes", "R$60,00 /10und"], ["Puxa de Pistache", "R$70,00 /10und"],
  ["Crocante de Nutella", "R$65,00 /10und"], ["Mini Tartelete Aveludada", "R$60,00 /10und"],
  ["Coquitelita", "R$70,00 /10und"], ["Damasco c/ Pistache", "R$70,00 /10und"],
  ["Pistache", "R$50,00 /10und"], ["Trufa Premium Churros", "R$78,00 /10und"],
  ["Caramelo e Flor de Sal", "R$60,00 /10und"], ["Trufa de Oreo e Nutella", "R$85,00 /10und"],
  ["Romeu e Julieta", "R$55,00 /10und"], ["Trufa Ovomaltine", "R$70,00 /10und"],
  ["Casadinho Chique", "R$50,00 /10und"], ["Copo ou Gota de Cereja", "R$65,00 /10und"],
  ["Copo de Caipirinha", "R$60,00 /10und"], ["Morango Folhado (tam. festa)", "R$130,00 /10und"],
  ["Brigadeiro Amarula", "R$65,00 /10und"], ["Ninho com Morango (tam. festa)", "R$120,00 /10und"],
  ["Damasco Bicolor", "R$60,00 /10und"], ["Coxinha de Morango (tam. festa)", "R$120,00 /10und"],
  ["Kinder Bueno", "R$70,00 /10und"], ["Bombom de Morango (tam. festa)", "R$130,00 /10und"],
];

export const docesEspeciais = [
  ["Brigadeiro Belga", "R$4,50 /und"], ["Damasco", "R$4,50 /und"],
  ["Capim Belga", "R$4,50 /und"], ["Limão Belga", "R$4,50 /und"],
  ["Camafeu de Nozes", "R$5,50 /und"], ["Ouriço de Coco", "R$5,50 /und"],
  ["Olho de Sogra", "R$5,50 /und"], ["Bombom de Uva", "R$5,50 /und"],
  ["Creme Brulee", "R$5,50 /und"], ["Ninho com Uva", "R$4,50 /und"],
  ["Mini Torta de Limão", "R$4,50 /und"], ["Mini Brownie", "R$4,00 /und"],
  ["Mini Pastel de Leite Ninho", "R$4,00 /und"], ["Floresta Negra", "R$5,50 /und"],
  ["Bala Baiana", "R$5,50 /und"], ["Kit Kat", "R$5,50 /und"],
  ["Brigadeiro de Amêndoas", "R$5,50 /und"],
];

export const docesTradicionais = [
  ["Ferrero", TIER1], ["Churros", TIER1], ["Ninho com Nutella", TIER1],
  ["Sensação", TIER1], ["Doce de Leite com Coco", TIER1], ["Cappuccino", TIER1],
  ["Paçoca", TIER1], ["Oreo c/ Mini Oreo", TIER1],
  ["Brigadeiro Tradicional", TIER2], ["Beijinho", TIER2], ["Bicho de Pé (Nesquik)", TIER2],
  ["Cajuzinho", TIER2], ["Prestígio", TIER2], ["Café com Leite", TIER2],
  ["Ninho", TIER2], ["Capim Santo/Cidreira", TIER2], ["Dois Amores", TIER2],
  ["Oreo", TIER2], ["Limão", TIER2], ["Chocolate Branco", TIER2],
];

export const extrasConsulta = [
  "Doces com Ejetor", "Doces Coloridos", "Napolitano", "Confete",
  "Doces com Carimbo", "Brigadeiro Torta de Limão", "Ninho Colorido com Ejetor/Molde",
];

export const tiers = { tier1: TIER1, tier2: TIER2 };

// Fotos de cada doce (fundo transparente) — uma por doce, quando disponível.
const DOCE_IMAGES = {
  "Brigadeiro Tradicional": "/img/doces/brigadeiro-tradicional.webp",
  "Ninho": "/img/doces/ninho.webp",
  "Beijinho": "/img/doces/beijinho.webp",
  "Capim Santo/Cidreira": "/img/doces/capim-santo-cidreira.webp",
  "Bicho de Pé (Nesquik)": "/img/doces/bicho-de-pe-nesquik.webp",
  "Dois Amores": "/img/doces/dois-amores.webp",
  "Cajuzinho": "/img/doces/cajuzinho.webp",
  "Oreo": "/img/doces/oreo.webp",
  "Prestígio": "/img/doces/prestigio.webp",
  "Limão": "/img/doces/limao.webp",
  "Café com Leite": "/img/doces/cafe-com-leite.webp",
  "Chocolate Branco": "/img/doces/chocolate-branco.webp",
  "Ferrero": "/img/doces/ferrero.webp",
  "Churros": "/img/doces/churros.webp",
  "Ninho com Nutella": "/img/doces/ninho-com-nutella.webp",
  "Sensação": "/img/doces/sensacao.webp",
  "Doce de Leite com Coco": "/img/doces/doce-de-leite-com-coco.webp",
  "Cappuccino": "/img/doces/cappuccino.webp",
  "Paçoca": "/img/doces/pacoca.webp",
  "Oreo c/ Mini Oreo": "/img/doces/oreo-c-mini-oreo.webp",
  "Brigadeiro Belga": "/img/doces/brigadeiro-belga.webp",
  "Damasco": "/img/doces/damasco.webp",
  "Capim Belga": "/img/doces/capim-belga.webp",
  "Limão Belga": "/img/doces/limao-belga.webp",
  "Camafeu de Nozes": "/img/doces/camafeu-de-nozes.webp",
  "Ouriço de Coco": "/img/doces/ourico-de-coco.webp",
  "Olho de Sogra": "/img/doces/olho-de-sogra.webp",
  "Bombom de Uva": "/img/doces/bombom-de-uva.webp",
  "Creme Brulee": "/img/doces/creme-brulee.webp",
  "Ninho com Uva": "/img/doces/ninho-com-uva.webp",
  "Mini Torta de Limão": "/img/doces/mini-torta-de-limao.webp",
  "Mini Brownie": "/img/doces/mini-brownie.webp",
  "Mini Pastel de Leite Ninho": "/img/doces/mini-pastel-de-leite-ninho.webp",
  "Floresta Negra": "/img/doces/floresta-negra.webp",
  "Bala Baiana": "/img/doces/bala-baiana.webp",
  "Kit Kat": "/img/doces/kit-kat.webp",
  "Brigadeiro de Amêndoas": "/img/doces/brigadeiro-de-amendoas.webp",
  "Pistache": "/img/doces/pistache.webp",
  "Caramelo e Flor de Sal": "/img/doces/caramelo-e-flor-de-sal.webp",
  "Romeu e Julieta": "/img/doces/romeu-e-julieta.webp",
  "Casadinho Chique": "/img/doces/casadinho-chique.webp",
  "Copo de Caipirinha": "/img/doces/copo-de-caipirinha.webp",
  "Brigadeiro Amarula": "/img/doces/brigadeiro-amarula.webp",
  "Damasco Bicolor": "/img/doces/damasco-bicolor.webp",
  "Kinder Bueno": "/img/doces/kinder-bueno.webp",
  "Trufa Premium Churros": "/img/doces/trufa-premium-churros.webp",
  "Trufa de Oreo e Nutella": "/img/doces/trufa-de-oreo-e-nutella.webp",
  "Trufa Ovomaltine": "/img/doces/trufa-ovomaltine.webp",
  "Copo ou Gota de Cereja": "/img/doces/copo-ou-gota-de-cereja.webp",
  "Morango Folhado (tam. festa)": "/img/doces/morango-folhado-tam-festa.webp",
  "Ninho com Morango (tam. festa)": "/img/doces/ninho-com-morango-tam-festa.webp",
  "Coxinha de Morango (tam. festa)": "/img/doces/coxinha-de-morango-tam-festa.webp",
  "Bombom de Morango (tam. festa)": "/img/doces/bombom-de-morango-tam-festa.webp",
  "Cereja Real": "/img/doces/cereja-real.webp",
  "Copo Moscow Mule": "/img/doces/copo-moscow-mule.webp",
  "Brigadeiro de Morango": "/img/doces/brigadeiro-de-morango.webp",
  "Trouxinha de Abacaxi com Coco": "/img/doces/trouxinha-de-abacaxi-com-coco.webp",
  "Trufa de Nozes com Caramelo": "/img/doces/trufa-de-nozes-com-caramelo.webp",
  "Figo Recheado": "/img/doces/figo-recheado.webp",
  "Uva Folhada": "/img/doces/uva-folhada.webp",
  "Passion Boat": "/img/doces/passion-boat.webp",
  "Pralinê de Nozes": "/img/doces/praline-de-nozes.webp",
  "Puxa de Pistache": "/img/doces/puxa-de-pistache.webp",
  "Crocante de Nutella": "/img/doces/crocante-de-nutella.webp",
  "Mini Tartelete Aveludada": "/img/doces/mini-tartelete-aveludada.webp",
  "Coquitelita": "/img/doces/coquitelita.webp",
  "Damasco c/ Pistache": "/img/doces/damasco-c-pistache.webp",
  "Doces com Ejetor": "/img/doces/doces-com-ejetor.webp",
  "Doces Coloridos": "/img/doces/doces-coloridos.webp",
  "Napolitano": "/img/doces/napolitano.webp",
  "Confete": "/img/doces/confete.webp",
  "Doces com Carimbo": "/img/doces/doces-com-carimbo.webp",
  "Brigadeiro Torta de Limão": "/img/doces/brigadeiro-torta-de-limao.webp",
  "Ninho Colorido com Ejetor/Molde": "/img/doces/ninho-colorido-com-ejetor-molde.webp",
};

export const docImg = (nome) => DOCE_IMAGES[nome];

export const galeria = [
  { src: "/img/mesa-casamento-branco.jpg", alt: "Mesa de doces para casamento com flores brancas em cascata", label: "Casamento" },
  { src: "/img/festa-stitch.jpg", alt: "Mesa de festa infantil com tema Stitch", label: "Aniversário infantil" },
  { src: "/img/festa-hulk.jpg", alt: "Mesa de festa infantil com tema Hulk", label: "Aniversário infantil" },
  { src: "/img/mesa-casamento-floral.jpg", alt: "Mesa de doces para casamento com flores laranja e amarelas", label: "Casamento" },
];
