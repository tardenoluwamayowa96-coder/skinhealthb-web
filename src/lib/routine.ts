/** Routine visage Lomé — chaleur, UV, harmattan. Pas un protocole médical. */

export const CLIMATE_NOTES = [
  {
    title: "UV toute l’année",
    text: "SPF50+ PA++++ le matin, même nuageux. Renouveler si vous restez dehors.",
  },
  {
    title: "Chaleur et sueur",
    text: "Textures gel, sérum, cushion — pas de crème occlusive le jour.",
  },
  {
    title: "Harmattan (nov.–mars)",
    text: "Vent sec, poussière. Le soir : plus d’hydratation, masque Laneige, barrière.",
  },
  {
    title: "Taches",
    text: "Le solaire d’abord. TXA / vitamine C le soir. Zéro hydroquinone.",
  },
] as const;

export const ROUTINES = [
  {
    slug: "matin",
    title: "Matin",
    kicker: "Chaleur + UV",
    why: "Laver sans décaper, hydrater léger, solaire généreux. C’est 80 % du résultat taches.",
    steps: [
      {
        name: "Nettoyer",
        text: "Eau ou gel doux. Pas d’huile le matin sauf SPF très résistant de la veille.",
        slugs: ["cosrx-low-ph-cleanser", "k-secret-seoul-foam"],
      },
      {
        name: "Hydrater",
        text: "Toner-sérum fluide. Laneige Cream Skin suffit souvent sous le SPF.",
        slugs: ["laneige-cream-skin", "torriden-dive-in", "anua-heartleaf-toner"],
      },
      {
        name: "Solaire",
        text: "Dernière étape soin. Une quantité généreuse, 15 min avant de sortir.",
        slugs: [
          "boje-relief-sun",
          "boje-relief-sun-aqua",
          "skin1004-hyalu-cica-sun",
          "round-lab-birch-sun",
        ],
      },
    ],
  },
  {
    slug: "soir",
    title: "Soir",
    kicker: "SPF + sébum",
    why: "Double nettoyage, puis un actif (taches ou barrière), puis sceller.",
    steps: [
      {
        name: "Huile",
        text: "Sur peau sèche : dissoudre SPF et maquillage, émulsionner, rincer.",
        slugs: [
          "anua-pore-cleansing-oil",
          "manyo-cleansing-oil",
          "skin1004-cleansing-oil",
        ],
      },
      {
        name: "Gel",
        text: "Second passage, pH doux. Ne pas frotter.",
        slugs: ["cosrx-low-ph-cleanser", "k-secret-seoul-foam"],
      },
      {
        name: "Actif",
        text: "Un seul le soir : taches (TXA, vita C) ou acné (BHA). Pas les deux.",
        slugs: ["anua-txa-serum", "goodal-vita-c", "numbuzin-no5", "cosrx-bha-liquid"],
      },
      {
        name: "Sceller",
        text: "Essence snail, crème légère, ou masque de nuit 2–3 fois / semaine.",
        slugs: [
          "cosrx-snail-96-essence",
          "laneige-water-sleeping-mask",
          "aestura-atobarrier-365",
        ],
      },
    ],
  },
  {
    slug: "harmattan",
    title: "Harmattan",
    kicker: "Novembre–mars",
    why: "Air sec + poussière : plus de barrière le soir, lèvres Laneige, solaire inchangé le jour.",
    steps: [
      {
        name: "Barrière",
        text: "Céramides, snail, Atobarrier. Éviter les peels les semaines de vent.",
        slugs: [
          "aestura-atobarrier-365",
          "cosrx-snail-92-cream",
          "iunik-beta-glucan",
        ],
      },
      {
        name: "Nuit",
        text: "Water Sleeping Mask ou Biodance. Lèvres : Lip Sleeping Mask Berry.",
        slugs: [
          "laneige-water-sleeping-mask",
          "laneige-lip-sleeping-mask",
          "biodance-collagen-mask",
        ],
      },
    ],
  },
] as const;
