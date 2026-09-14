/** Normes EPI — CE obligatoire, NF (AFNOR) exigée sur le lot photographié. */

export const EPI_NORMS = [
  {
    code: "NF",
    title: "Marque NF — AFNOR Certification",
    use: "Marque collective française. Le lot doit porter le sigle NF + le n° de certificat. Sans ça, on ne le met pas en rayon.",
  },
  {
    code: "UE 2016/425",
    title: "Règlement EPI (marquage CE)",
    use: "Cadre européen obligatoire. Le CE seul ne suffit pas chez Skinhealthb : on exige aussi la NF.",
  },
  {
    code: "NF EN 374",
    title: "Gants chimiques",
    use: "Famille NF EN ISO 374. Type A, B ou C + lettres des produits chimiques + pictogramme micro-organismes. Détail ci-dessous.",
  },
  {
    code: "NF EN 455",
    title: "Gants d’examen",
    use: "Gants médicaux à usage unique — étanchéité, résistance, biocompatibilité.",
  },
  {
    code: "NF EN 149",
    title: "Appareils filtrants",
    use: "Masques FFP1 / FFP2 / FFP3. FFP2 : filtration ≥ 94 % des aérosols.",
  },
  {
    code: "NF EN 14683",
    title: "Masques médicaux",
    use: "Type I, II, IIR. Le IIR est résistant aux projections.",
  },
  {
    code: "NF EN 166",
    title: "Protection oculaire",
    use: "Lunettes et visières — choc, liquides, poussières.",
  },
] as const;

export const EN374_PARTS = [
  {
    code: "NF EN ISO 374-1",
    title: "Risques chimiques — types A / B / C",
    use: "Exigences de perméation. Le pictogramme bécher + les lettres des produits testés doivent figurer sur l’emballage.",
  },
  {
    code: "NF EN ISO 374-2",
    title: "Pénétration (étanchéité)",
    use: "Test de fuite d’air ou d’eau. Un gant percé n’est pas un EPI, même nitrile.",
  },
  {
    code: "NF EN ISO 374-4",
    title: "Dégradation",
    use: "Mesure la perte de résistance après contact chimique. Complète la perméation, ne la remplace pas.",
  },
  {
    code: "NF EN ISO 374-5",
    title: "Micro-organismes",
    use: "Bactéries et champignons. Pictogramme virus uniquement si le test viral (ISO 16604) est réussi.",
  },
] as const;

export const EN374_TYPES = [
  {
    type: "A",
    rule: "≥ 6 produits chimiques",
    level: "niveau 2 · plus de 30 min",
  },
  {
    type: "B",
    rule: "≥ 3 produits chimiques",
    level: "niveau 2 · plus de 30 min",
  },
  {
    type: "C",
    rule: "≥ 1 produit chimique",
    level: "niveau 1 · plus de 10 min",
  },
] as const;

export const EN374_LEVELS = [
  { level: "1", minutes: "> 10 min" },
  { level: "2", minutes: "> 30 min" },
  { level: "3", minutes: "> 60 min" },
  { level: "4", minutes: "> 120 min" },
  { level: "5", minutes: "> 240 min" },
  { level: "6", minutes: "> 480 min" },
] as const;

export const EN374_CHEMICALS = [
  { letter: "A", name: "Méthanol" },
  { letter: "B", name: "Acétone" },
  { letter: "C", name: "Acétonitrile" },
  { letter: "D", name: "Dichlorométhane" },
  { letter: "E", name: "Sulfure de carbone" },
  { letter: "F", name: "Toluène" },
  { letter: "G", name: "Diéthylamine" },
  { letter: "H", name: "Tétrahydrofurane" },
  { letter: "I", name: "Acétate d’éthyle" },
  { letter: "J", name: "n-Heptane" },
  { letter: "K", name: "Soude 40 %" },
  { letter: "L", name: "Acide sulfurique 96 %" },
  { letter: "M", name: "Acide nitrique 65 %" },
  { letter: "N", name: "Acide acétique 99 %" },
  { letter: "O", name: "Ammoniaque 25 %" },
  { letter: "P", name: "Peroxyde d’hydrogène 30 %" },
  { letter: "S", name: "Acide fluorhydrique 40 %" },
  { letter: "T", name: "Formaldéhyde 37 %" },
] as const;
