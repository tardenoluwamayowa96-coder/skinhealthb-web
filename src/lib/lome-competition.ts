/** Carte concurrentielle Lomé — interne, pas destinée à la vitrine. */

export type Threat = "direct" | "adjacent" | "mass" | "informal" | "avoid";

export const THREAT_LABEL: Record<Threat, string> = {
  direct: "Direct",
  adjacent: "Voisin",
  mass: "Volume",
  informal: "Gris",
  avoid: "Hors jeu",
};

export type Competitor = {
  id: string;
  name: string;
  threat: Threat;
  area: string;
  hours?: string;
  contact?: string;
  brands: string;
  overlap: string;
  prices: string;
  strength: string;
  weakness: string;
  move: string;
};

export const COMPETITORS: Competitor[] = [
  {
    id: "raam",
    name: "RA'AM Shop",
    threat: "direct",
    area: "Avédji (ANASAP) · Galerie Honam, Nyékonakpoé",
    hours: "Lun–sam 9 h–19 h",
    contact: "+228 93 64 22 20 · @raamshopbeauty",
    brands:
      "Distributeur In'oya, Biolissime, Nuhanciam, SVR. Rayon aussi : COSRX, Beauty of Joseon, The Ordinary, La Roche-Posay, CeraVe, Evoluderm, Geek & Gorgeous, Hada Labo, Good Molecules.",
    overlap:
      "Presque toute la tête de gondole K-beauty et para : Snail, Relief Sun, Ordinary, SVR, LRP, Evoluderm, G&G.",
    prices: "1 500 – 36 000 F selon la marque (fourchette 2024, à revérifier en boutique).",
    strength:
      "Seul vrai spécialiste dermocos + peaux noires à Lomé. Conseil en boutique, gros, Instagram/TikTok, 2018.",
    weakness:
      "Un point de vente physique. Pas de Flooz/TMoney boutique ni livraison tout Togo. Pas de lots photographiés côté client.",
    move:
      "Ne pas copier In'oya / Biolissime. Gagner sur authenticité documentée (lot, QR COSRX, UMMA), paiement mobile, 48 h Lomé, fiches climat harmattan.",
  },
  {
    id: "pharma",
    name: "Pharmacies de Lomé",
    threat: "adjacent",
    area: "44 officines · Boulevard, Tokoin, Nyékonakpoé, Bè, Agoè…",
    brands:
      "La Roche-Posay, Avène, SVR, Caudalie, Bioderma, CeraVe — quand le dépositaire a du stock.",
    overlap: "LRP Anthelios, Avène thermale, SVR SEBIACLEAR, Caudalie Vinoperfect.",
    prices:
      "Tarif dépositaire + marge officine. Anthelios souvent 18–25 000 F quand il y en a. Ruptures fréquentes.",
    strength:
      "Confiance médicale. Ordonnance. Présence de quartier. Cible taches / acné qui « va à la pharmacie ».",
    weakness:
      "Étude 2018 : 10 % du personnel formé en cosmétologie. 1 à 10 clients cosmétique / semaine. Demande dominante = taches et éclaircissement. Zéro K-beauty.",
    move:
      "Se poser en complément, pas en ennemi : « le solaire LRP, le Snail et le toner, livrés ». Former le conseil que l'officine n'a pas.",
  },
  {
    id: "gsa",
    name: "Champion · Superamco · Marina",
    threat: "mass",
    area: "Champion dans chaque quartier · Superamco Marina, Adidogomé, Adidoadin, Assivito, Tokoin",
    brands: "Dove, Vaseline, Nivea, Garnier Ultra Doux, Mixa lait (pas les pots dm), parfois Balea / Evoluderm import.",
    overlap: "Dove Beauty Bar, Vaseline, Mixa lait, Ultra Doux. Pas de Wahre Schätze ni des pots Mixa Ceramide / Cica dm.",
    prices: "Prix rayon, souvent sous nos 3–8 000 F sur le drugstore. Pas de conseil.",
    strength: "Proximité, volume, caddie du dimanche. Champion a gagné Ramco sur le prix.",
    weakness: "Pas de lot, pas de K-beauty, pas de routine. Mixa / Dove = remplissage de gondole.",
    move:
      "Ne jamais aligner Dove/Vaseline/Mixa sur Champion. Ce sont des appâts, pas la marge. Mettre le ticket sur COSRX, Anua, LRP, Tiam.",
  },
  {
    id: "rabs",
    name: "ETS RABS",
    threat: "adjacent",
    area: "Av. de la Libération, avant Pharmacie du Grand Marché · succursale Rue du Commerce",
    hours: "Lun–sam 8 h–17 h 30",
    brands: "Grandes marques classiques, parfumerie, coffrets — pas de rayon K-beauty documenté.",
    overlap: "Faible. Occasionnellement L'Oréal / Garnier prestige.",
    prices: "Positionnement boutique « incontournable » du Grand Marché.",
    strength: "Historique, vitrine, flux Grand Marché.",
    weakness: "Pas le même client que le sérum niacinamide. Décoration > protocole.",
    move: "Ignorer au quotidien. Recruter plutôt les clientes qui sortent de RABS sans routine.",
  },
  {
    id: "ubuy",
    name: "Ubuy / commandes internationales",
    threat: "adjacent",
    area: "En ligne, entrepôts hors Togo",
    brands: "COSRX, The Ordinary, CeraVe — catalogue mondial.",
    overlap: "Snail 96, Low pH, Ordinary Niacinamide.",
    prices: "Souvent plus cher une fois douane + délai. Délais 2–6 semaines.",
    strength: "Largeur de SKU. Promesse « authenticité globale ».",
    weakness: "Pas de stock Lomé, pas de Flooz, pas de SAV local, DLC à l'arrivée hasardeuse.",
    move: "Message : « le Snail est déjà à Lomé, lot contrôlé, demain chez vous ».",
  },
  {
    id: "gris",
    name: "WhatsApp · CoinAfrique · Instagram",
    threat: "informal",
    area: "Annonces « crème Advanced Korean » · reventes 7 000 F sans marque",
    brands: "Contrefaçons COSRX / Medicube PDRN / « Korean glow ». Hydroquinone non déclarée.",
    overlap: "Même demande (taches, acné, glow) — pas les mêmes produits.",
    prices: "Dumping. Un Snail « trop beau » sous 10 000 F est un fake.",
    strength: "Vitesse, proximité WhatsApp, prix d'appel.",
    weakness: "Zéro traçabilité. Lots PDRN hors circuit déjà saisis. Détruit la confiance.",
    move:
      "Ne jamais descendre COSRX / Medicube pour « matcher ». Photographier lot + DLC. Dire clairement que le discount est un signal d'alerte.",
  },
  {
    id: "eclair",
    name: "Well White · Fair & White · STEFCOS · DODO · NIDAF",
    threat: "avoid",
    area: "Grand Marché, Assigamé, zone portuaire, Agbalépédo, Agoè",
    brands:
      "Oscar, Magic, Corps de Rêve, Medi Light, Very White, Sido Clair, Yummie, Mira, RAM'S Beauty.",
    overlap: "Aucune — autre métier (éclaircissement, hydroquinone, kits « 7 jours »).",
    prices: "Volume populaire.",
    strength: "Demande structurelle à Lomé (étude pharmacies : 90 % des clientes cosmétique).",
    weakness: "Risque sanitaire, image, saisie. Incompatible avec « authenticité, pas un médicament ».",
    move:
      "Hors jeu. Répondre à la demande taches par niacinamide, TXA, vitamine C, SPF — jamais par un lait clarifiant.",
  },
  {
    id: "local",
    name: "NIM · Maison A&A · Unicos · Beauty Nap",
    threat: "adjacent",
    area: "Wonougba, Attiégou, Adidoadin, Hanoukopé",
    brands: "Marques made in Togo : karité, huiles, savons, cica maison.",
    overlap: "Hydratation corps basique. Pas de COSRX ni de solaire filtre UV.",
    prices: "2 500 – 17 000 F.",
    strength: "Fierté locale, naturel, storytelling.",
    weakness: "Pas de dermo, pas de SPF 50 testé, pas de K-beauty.",
    move: "Complémentaire. Ne pas attaquer. Éventuellement co-routine (leur savon + notre SPF).",
  },
];

export type SkuFight = {
  slug: string;
  name: string;
  ours: number;
  channels: string;
  stance: string;
};

export const SKU_FIGHTS: SkuFight[] = [
  {
    slug: "cosrx-snail-96-essence",
    name: "COSRX Snail 96",
    ours: 19900,
    channels: "RA'AM · Ubuy · gris (fakes 7–12 000 F)",
    stance: "Tenir 19 900 F. Un prix cassé = fake. QR Record obligatoire.",
  },
  {
    slug: "boje-relief-sun",
    name: "Beauty of Joseon Relief Sun",
    ours: 15900,
    channels: "RA'AM",
    stance: "Tête de gondole. Gagner sur le white-cast peau foncée, pas sur 500 F.",
  },
  {
    slug: "ordinary-niacinamide",
    name: "The Ordinary Niacinamide 10 %",
    ours: 10900,
    channels: "RA'AM · Jumia CI ~12 500 F · gris",
    stance: "Prix déjà serré. Ne pas descendre sous 10 000 F.",
  },
  {
    slug: "svr-sebiaclear",
    name: "SVR SEBIACLEAR",
    ours: 17500,
    channels: "RA'AM (distrib. officielle) · pharmacies",
    stance: "RA'AM a l'exclusivité SVR. Jouer le sérum + Active en duo, pas une guerre de tarif.",
  },
  {
    slug: "lrp-anthelios-uvmune",
    name: "LRP Anthelios UVMune 400",
    ours: 20000,
    channels: "Pharmacies (ruptures) · RA'AM",
    stance: "20 000 F tient si le stock est réel. L'officine gagne la confiance, on gagne la dispo.",
  },
  {
    slug: "caudalie-vinoperfect",
    name: "Caudalie Vinoperfect",
    ours: 41500,
    channels: "Pharmacies haut de gamme",
    stance: "Ticket image. Rare à Lomé : ne pas brader.",
  },
  {
    slug: "avene-eau-thermale",
    name: "Avène Eau Thermale",
    ours: 12000,
    channels: "Pharmacies",
    stance: "Produit d'appel para. Aligner si l'officine est sous 11 000 F, sinon tenir.",
  },
  {
    slug: "dove-beauty-bar",
    name: "Dove Beauty Bar",
    ours: 3000,
    channels: "Champion · Superamco (souvent moins cher)",
    stance: "Pas un champ de bataille. Trafic seulement.",
  },
  {
    slug: "mixa-panthenol-comfort",
    name: "Mixa Panthenol Comfort",
    ours: 6500,
    channels: "ESA / para Afrique ~10 900 F · Jumia SN promo ~6 000 F · dm DE ~4 000–5 200 F · Champion (lait, pas le pot)",
    stance: "6 500 F est sous la para africaine, au-dessus du promo Jumia. Ne pas descendre : Champion vend le lait, pas ce pot 13 %.",
  },
  {
    slug: "mixa-ceramide-protect",
    name: "Mixa Ceramide Protect",
    ours: 7000,
    channels: "Para Afrique ~10 900 F · dm DE ~4 000–5 500 F · absent Champion",
    stance: "Ticket encore plus rare à Lomé. Tenir 7 000 F. Argument : barrière + sans parfum, pas le prix.",
  },
  {
    slug: "mixa-cica-creme-400",
    name: "Mixa Urea Cica Repair+",
    ours: 6500,
    channels: "ESA 10 900 F · dm DE ~5 200 F",
    stance: "Aligné Panthenol. Ne pas matcher le lait Cica Champion.",
  },
  {
    slug: "mixa-cica-balsam",
    name: "Mixa baume 10-en-1 Cica",
    ours: 6500,
    channels: "dm DE ~3 500–4 500 F · introuvable rayon Lomé",
    stance: "Stock d'avantage. Post-tatouage / harmattan — pas une guerre de tarif.",
  },
  {
    slug: "garnier-ws-traube",
    name: "Garnier Wahre Schätze shampoing",
    ours: 3500,
    channels: "dm DE ~1 800 F · Champion = Ultra Doux 1 500–2 500 F (autre gamme)",
    stance: "3 500 F = import + last-mile. Ne jamais aligner sur Ultra Doux Champion : ce n'est pas le même flacon.",
  },
  {
    slug: "garnier-ws-kokos",
    name: "Garnier Wahre Schätze après-shampoing",
    ours: 2500,
    channels: "dm DE ~1 800 F · pas en supermarché Lomé",
    stance: "2 500 F tient. Duo shampoing 3 500 + après 2 500 = 6 000 F, sous un masque 4 500.",
  },
  {
    slug: "garnier-olive",
    name: "Garnier Ultra Doux",
    ours: 1650,
    channels: "Champion · Superamco (souvent 1 200–2 000 F)",
    stance: "Appât. Laisser Champion gagner le 400 ml familial. Pousser Wahre Schätze à côté.",
  },
  {
    slug: "lrp-cicaplast-b5",
    name: "LRP Cicaplast Baume B5+",
    ours: 8900,
    channels: "Pharmacies (souvent 9–12 000 F, ruptures)",
    stance: "Tenir 8 900 F si le stock est réel. L'officine a la confiance, on a la dispo 48 h.",
  },
  {
    slug: "cerave-moisturizing-cream",
    name: "CeraVe Crème hydratante 454 g",
    ours: 14500,
    channels: "RA'AM · pharmacies · Ubuy",
    stance: "Pot famille. Ne pas descendre sous 13 000 F — le 454 g gris est souvent une copie.",
  },
  {
    slug: "ordinary-arbutin",
    name: "The Ordinary Alpha Arbutin 2 %",
    ours: 11900,
    channels: "RA'AM · gris « Korean glow »",
    stance: "Arme taches sans hydroquinone. Dire clairement : pas un lait éclaircissant.",
  },
  {
    slug: "medicube-pdrn-exosome",
    name: "Medicube PDRN Exosome",
    ours: 25000,
    channels: "Gris (fakes colorés) · pas RA'AM documenté",
    stance: "Circuit APR seulement. Refuser toute comparaison de prix WhatsApp.",
  },
  {
    slug: "anua-heartleaf-toner",
    name: "Anua Heartleaf 77",
    ours: 17900,
    channels: "Peu ou pas en boutique physique Lomé",
    stance: "Avantage stock. Pousser comme alternative au toner pharmacie.",
  },
];

export const PLAYBOOK = [
  {
    title: "Où gagner",
    body: "Authenticité (lot, DLC, QR), paiement Flooz / TMoney, livraison 100+ villes, fiches climat Lomé, K-beauty que ni Champion ni l'officine n'ont.",
  },
  {
    title: "Où ne pas aller",
    body: "Éclaircissement, hydroquinone, « résultat 7 jours », guerre de prix Dove/Vaseline, Medicube PDRN hors APR, Snail 96 sous 15 000 F.",
  },
  {
    title: "Message unique",
    body: "« La même routine qu'à Séoul ou en pharmacie française — déjà à Lomé, lot vérifié, payée au mobile. »",
  },
  {
    title: "Terrain RA'AM",
    body: "Eux : conseil en boutique Avédji + In'oya. Nous : e-commerce + last-mile Togo + sourcing Corée documenté. Coexister, pas les dénigrer.",
  },
];

export function briefingText() {
  const lines = [
    "Skinhealthb — briefing concurrence Lomé",
    "",
    "Concurrent direct : RA'AM Shop (Avédji / Nyékonakpoé). COSRX, BOJ, Ordinary, SVR, LRP. Conseil physique. 1 500–36 000 F.",
    "Voisins : pharmacies (LRP, Avène, SVR, Caudalie, ruptures, peu formées) ; Champion/Superamco (Dove, Vaseline, Mixa).",
    "Gris : WhatsApp / CoinAfrique — fakes Korean à 7 000 F. Ne jamais aligner.",
    "Hors jeu : Well White, Fair & White, STEFCOS, DODO (éclaircissement).",
    "",
    "Tenir : Snail 19 900, Relief Sun 15 900, Ordinary 10 900, LRP 20 000, Caudalie 41 500.",
    "Appâts : Dove, Vaseline, Ultra Doux — ne pas matcher Champion.",
    "Drugstore import : Mixa pots 6 500–7 000 (para Afrique ~11 000), Wahre Schätze shampoing 3 500 / après 2 500 (absent Champion).",
    "PDRN : circuit APR, zéro gris.",
  ];
  return lines.join("\n");
}
