/** Normes cosmétiques coréennes — MFDS / Cosmetics Act. Skinhealthb revend, ne fabrique pas. */

export const MFDS_PILLARS = [
  {
    code: "화장품법",
    title: "Cosmetics Act",
    use: "Loi coréenne sur les cosmétiques. Tout produit fabriqué ou vendu en Corée y est soumis. L’autorité est le MFDS (식품의약품안전처), ex-KFDA.",
  },
  {
    code: "일반화장품",
    title: "Cosmétique général",
    use: "Notification post-marché. Pas d’allégation d’efficacité réglementée. La plupart des toners, essences, crèmes hydratantes.",
  },
  {
    code: "기능성화장품",
    title: "Cosmétique fonctionnel",
    use: "Examen MFDS avant vente si le produit revendique : SPF / PA, anti-taches (미백), anti-rides (주름), coloration, chute de cheveux, etc. C’est le cas de Relief Sun, Anthelios n’est pas coréen.",
  },
  {
    code: "CGMP",
    title: "Bonnes pratiques de fabrication",
    use: "Usines coréennes sous Cosmetics GMP. On refuse un SKU sans fabricant lisible sur l’emballage.",
  },
  {
    code: "표시",
    title: "Étiquetage obligatoire",
    use: "En coréen : nom, fabricant / responsable, volume, INCI, n° de lot, date de fabrication ou DLC, précautions. On photographie lot + DLC à Lomé.",
  },
] as const;

export const MFDS_CHECKS = [
  {
    title: "Pays 82",
    text: "Carton et étiquette de départ Corée (indicatif +82). Un packing « Dubaï » ou sans facture = quarantaine.",
  },
  {
    title: "Lot + DLC",
    text: "Le Cosmetics Act exige le n° de lot et la date. Sans les deux photographiés, le SKU n’est pas activé.",
  },
  {
    title: "SPF / PA",
    text: "Solaire coréen = cosmétique fonctionnel. SPF et grade PA (UVA) doivent être imprimés. Swatch peau foncée, zéro film blanc suspect.",
  },
  {
    title: "Interdits",
    text: "Hydroquinone, éclaircissement agressif, tests animaux pour le marché coréen (depuis 2018). Hors rayon Skinhealthb.",
  },
  {
    title: "Métaux / microbes",
    text: "Limites MFDS (plomb, mercure, arsenic, nickel, charge microbienne). On ne relabore pas : on revend le lot d’usine.",
  },
  {
    title: "QR marque",
    text: "COSRX Record et hologrammes Medicube : scan 100 % à réception, comme le bon de commande Corée.",
  },
] as const;

export const MFDS_DISCLAIMER =
  "Skinhealthb n’est pas titulaire d’une licence MFDS. Les SKU « Corée » sont des produits d’origine, fabriqués sous Cosmetics Act, importés avec facture. Ce n’est pas un médicament.";

export const KOREA_BRAND_NOTES: Record<string, string> = {
  laneige: "La Neige — hydratation Amorepacific. Lèvres et masques de nuit.",
  cosrx: "Snail et BHA. QR Record obligatoire à réception.",
  anua: "Heartleaf 77, taches TXA. Double nettoyage.",
  "beauty-of-joseon": "Relief Sun, ginseng, riz. Solaire sans film blanc.",
  medicube: "Pads, collagène. Circuit APR uniquement.",
  skin1004: "Centella Madagascar. Solaire Water-Fit.",
  tirtir: "Cushion Mask Fit. Teintes 33N et 40N Lomé.",
  romand: "Tints Juicy Lasting. Tenue chaleur.",
  "round-lab": "Birch Juice, Pine Cica.",
  "axis-y": "Dark Spot, solaire minéral.",
  dalba: "Brume truffe blanche.",
  "some-by-mi": "AHA BHA PHA 30 days.",
  "haruharu-wonder": "Riz noir, sans alcool.",
  goodal: "Vitamine C mandarine Jeju.",
  torriden: "HA bas poids moléculaire.",
  manyo: "Huile Pure Cleansing.",
  biodance: "Masque hydrogel collagène.",
  purito: "Solaire Daily Soft Touch.",
  iunik: "Bêta-glucane, vegan.",
  numbuzin: "N°5 taches glutathion.",
  "k-secret": "Seoul 1988 pine cica.",
  aestura: "Atobarrier 365, pharmacie Corée.",
  celimax: "Noni, barrière.",
  "dr-althea": "345 Relief Cream.",
  tiam: "Niacinamide, vita B3.",
  mixsoon: "Essence soja fermenté.",
  "vt-cosmetics": "Reedle Shot.",
  arencia: "Rice mochi cleanser.",
};
