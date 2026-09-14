import { DELIVERY_ZONES, type DeliveryZone } from "@/lib/zones";

export type TogoCity = {
  name: string;
  zone: DeliveryZone["id"];
  region: string;
};

/** Villes, communes et quartiers desservis — tout le Togo. */
export const TOGO_CITIES: TogoCity[] = [
  // Lomé commune — 1 500 F
  { name: "Lomé", zone: "lome", region: "Lomé" },
  { name: "Ablogamé", zone: "lome", region: "Lomé" },
  { name: "Adawlato", zone: "lome", region: "Lomé" },
  { name: "Amoutivé", zone: "lome", region: "Lomé" },
  { name: "Bé", zone: "lome", region: "Lomé" },
  { name: "Bè-Kpota", zone: "lome", region: "Lomé" },
  { name: "Gbadago", zone: "lome", region: "Lomé" },
  { name: "Hanoukopé", zone: "lome", region: "Lomé" },
  { name: "Hédzranawoé", zone: "lome", region: "Lomé" },
  { name: "Kodjoviakopé", zone: "lome", region: "Lomé" },
  { name: "Nukafu", zone: "lome", region: "Lomé" },
  { name: "Nyékonakpoé", zone: "lome", region: "Lomé" },
  { name: "Port de Lomé", zone: "lome", region: "Lomé" },
  { name: "Quartier administratif", zone: "lome", region: "Lomé" },
  { name: "Résidence du Bénin", zone: "lome", region: "Lomé" },
  { name: "Tokoin", zone: "lome", region: "Lomé" },
  { name: "Wuiti", zone: "lome", region: "Lomé" },
  { name: "Autre quartier — Lomé", zone: "lome", region: "Lomé" },

  // Grand Lomé
  { name: "Adakpamé", zone: "maritime", region: "Grand Lomé" },
  { name: "Adétikopé", zone: "maritime", region: "Grand Lomé" },
  { name: "Adidogomé", zone: "maritime", region: "Grand Lomé" },
  { name: "Aflao-Gakli", zone: "maritime", region: "Grand Lomé" },
  { name: "Aflao-Sagbado", zone: "maritime", region: "Grand Lomé" },
  { name: "Agoè", zone: "maritime", region: "Grand Lomé" },
  { name: "Agoè-Nyivé", zone: "maritime", region: "Grand Lomé" },
  { name: "Akodésséwa", zone: "maritime", region: "Grand Lomé" },
  { name: "Avépozo", zone: "maritime", region: "Grand Lomé" },
  { name: "Baguida", zone: "maritime", region: "Grand Lomé" },
  { name: "Cacaveli", zone: "maritime", region: "Grand Lomé" },
  { name: "Djagblé", zone: "maritime", region: "Grand Lomé" },
  { name: "Kégué", zone: "maritime", region: "Grand Lomé" },
  { name: "Legbassito", zone: "maritime", region: "Grand Lomé" },
  { name: "Sanguéra", zone: "maritime", region: "Grand Lomé" },
  { name: "Togblékopé", zone: "maritime", region: "Grand Lomé" },
  { name: "Zanguéra", zone: "maritime", region: "Grand Lomé" },
  { name: "Autre — Grand Lomé", zone: "maritime", region: "Grand Lomé" },

  // Maritime hors Grand Lomé
  { name: "Afagnan", zone: "maritime", region: "Maritime" },
  { name: "Agbélouvé", zone: "maritime", region: "Maritime" },
  { name: "Agbodrafo", zone: "maritime", region: "Maritime" },
  { name: "Aklakou", zone: "maritime", region: "Maritime" },
  { name: "Aného", zone: "maritime", region: "Maritime" },
  { name: "Anfoin", zone: "maritime", region: "Maritime" },
  { name: "Assahoun", zone: "maritime", region: "Maritime" },
  { name: "Attitogon", zone: "maritime", region: "Maritime" },
  { name: "Gapé-Centre", zone: "maritime", region: "Maritime" },
  { name: "Gboto", zone: "maritime", region: "Maritime" },
  { name: "Kévé", zone: "maritime", region: "Maritime" },
  { name: "Kpomé", zone: "maritime", region: "Maritime" },
  { name: "Kpémé", zone: "maritime", region: "Maritime" },
  { name: "Mission-Tové", zone: "maritime", region: "Maritime" },
  { name: "Noépé", zone: "maritime", region: "Maritime" },
  { name: "Tabligbo", zone: "maritime", region: "Maritime" },
  { name: "Togoville", zone: "maritime", region: "Maritime" },
  { name: "Tsévié", zone: "maritime", region: "Maritime" },
  { name: "Vèkpo", zone: "maritime", region: "Maritime" },
  { name: "Vogan", zone: "maritime", region: "Maritime" },
  { name: "Autre ville — Maritime", zone: "maritime", region: "Maritime" },

  // Plateaux
  { name: "Agou-Gadzépé", zone: "plateaux", region: "Plateaux" },
  { name: "Amlamé", zone: "plateaux", region: "Plateaux" },
  { name: "Amou-Oblo", zone: "plateaux", region: "Plateaux" },
  { name: "Anié", zone: "plateaux", region: "Plateaux" },
  { name: "Atakpamé", zone: "plateaux", region: "Plateaux" },
  { name: "Badou", zone: "plateaux", region: "Plateaux" },
  { name: "Danyi-Apéyémé", zone: "plateaux", region: "Plateaux" },
  { name: "Elavagnon", zone: "plateaux", region: "Plateaux" },
  { name: "Hahotoé", zone: "plateaux", region: "Plateaux" },
  { name: "Kloto", zone: "plateaux", region: "Plateaux" },
  { name: "Kougnohou", zone: "plateaux", region: "Plateaux" },
  { name: "Kpadapé", zone: "plateaux", region: "Plateaux" },
  { name: "Kpalimé", zone: "plateaux", region: "Plateaux" },
  { name: "Kpélé-Akata", zone: "plateaux", region: "Plateaux" },
  { name: "Kpéta", zone: "plateaux", region: "Plateaux" },
  { name: "Kuma-Konda", zone: "plateaux", region: "Plateaux" },
  { name: "Notsé", zone: "plateaux", region: "Plateaux" },
  { name: "Tohoun", zone: "plateaux", region: "Plateaux" },
  { name: "Tomegbé", zone: "plateaux", region: "Plateaux" },
  { name: "Autre ville — Plateaux", zone: "plateaux", region: "Plateaux" },

  // Centrale
  { name: "Adjengré", zone: "centrale", region: "Centrale" },
  { name: "Blitta", zone: "centrale", region: "Centrale" },
  { name: "Djarkpanga", zone: "centrale", region: "Centrale" },
  { name: "Fazao", zone: "centrale", region: "Centrale" },
  { name: "Kambolé", zone: "centrale", region: "Centrale" },
  { name: "Pagala", zone: "centrale", region: "Centrale" },
  { name: "Sokodé", zone: "centrale", region: "Centrale" },
  { name: "Sotouboua", zone: "centrale", region: "Centrale" },
  { name: "Tchamba", zone: "centrale", region: "Centrale" },
  { name: "Tchaoudjo", zone: "centrale", region: "Centrale" },
  { name: "Tchébébé", zone: "centrale", region: "Centrale" },
  { name: "Autre ville — Centrale", zone: "centrale", region: "Centrale" },

  // Kara
  { name: "Awandjélo", zone: "kara", region: "Kara" },
  { name: "Bafilo", zone: "kara", region: "Kara" },
  { name: "Bassar", zone: "kara", region: "Kara" },
  { name: "Défalé", zone: "kara", region: "Kara" },
  { name: "Guérin-Kouka", zone: "kara", region: "Kara" },
  { name: "Kabou", zone: "kara", region: "Kara" },
  { name: "Kadjalla", zone: "kara", region: "Kara" },
  { name: "Kanté", zone: "kara", region: "Kara" },
  { name: "Kara", zone: "kara", region: "Kara" },
  { name: "Kétao", zone: "kara", region: "Kara" },
  { name: "Kouméa", zone: "kara", region: "Kara" },
  { name: "Nadoba", zone: "kara", region: "Kara" },
  { name: "Niamtougou", zone: "kara", region: "Kara" },
  { name: "Pagouda", zone: "kara", region: "Kara" },
  { name: "Pya", zone: "kara", region: "Kara" },
  { name: "Sarakawa", zone: "kara", region: "Kara" },
  { name: "Autre ville — Kara", zone: "kara", region: "Kara" },

  // Savanes
  { name: "Bombouaka", zone: "savanes", region: "Savanes" },
  { name: "Borgou", zone: "savanes", region: "Savanes" },
  { name: "Cinkassé", zone: "savanes", region: "Savanes" },
  { name: "Dapaong", zone: "savanes", region: "Savanes" },
  { name: "Gando", zone: "savanes", region: "Savanes" },
  { name: "Koundjoaré", zone: "savanes", region: "Savanes" },
  { name: "Mandouri", zone: "savanes", region: "Savanes" },
  { name: "Mango", zone: "savanes", region: "Savanes" },
  { name: "Moba", zone: "savanes", region: "Savanes" },
  { name: "Naki-Est", zone: "savanes", region: "Savanes" },
  { name: "Nano", zone: "savanes", region: "Savanes" },
  { name: "Pana", zone: "savanes", region: "Savanes" },
  { name: "Tami", zone: "savanes", region: "Savanes" },
  { name: "Tandjouaré", zone: "savanes", region: "Savanes" },
  { name: "Autre ville — Savanes", zone: "savanes", region: "Savanes" },

  { name: "Cotonou", zone: "benin", region: "Bénin" },
  { name: "Porto-Novo", zone: "benin", region: "Bénin" },
  { name: "Abomey-Calavi", zone: "benin", region: "Bénin" },
  { name: "Parakou", zone: "benin", region: "Bénin" },
  { name: "Bohicon", zone: "benin", region: "Bénin" },
  { name: "Ouidah", zone: "benin", region: "Bénin" },
  { name: "Natitingou", zone: "benin", region: "Bénin" },
  { name: "Djougou", zone: "benin", region: "Bénin" },
  { name: "Autre ville — Bénin", zone: "benin", region: "Bénin" },

  { name: "Abidjan", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Yamoussoukro", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Bouaké", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "San-Pédro", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Korhogo", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Daloa", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Man", zone: "cote-ivoire", region: "Côte d’Ivoire" },
  { name: "Autre ville — Côte d’Ivoire", zone: "cote-ivoire", region: "Côte d’Ivoire" },

  { name: "Dakar", zone: "senegal", region: "Sénégal" },
  { name: "Thiès", zone: "senegal", region: "Sénégal" },
  { name: "Saint-Louis", zone: "senegal", region: "Sénégal" },
  { name: "Touba", zone: "senegal", region: "Sénégal" },
  { name: "Kaolack", zone: "senegal", region: "Sénégal" },
  { name: "Ziguinchor", zone: "senegal", region: "Sénégal" },
  { name: "Mbour", zone: "senegal", region: "Sénégal" },
  { name: "Autre ville — Sénégal", zone: "senegal", region: "Sénégal" },
];

const REGION_ORDER = [
  "Lomé",
  "Grand Lomé",
  "Maritime",
  "Plateaux",
  "Centrale",
  "Kara",
  "Savanes",
  "Bénin",
  "Côte d’Ivoire",
  "Sénégal",
];

function fold(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function cityByName(name: string): TogoCity | undefined {
  const n = fold(name);
  return TOGO_CITIES.find((c) => fold(c.name) === n);
}

export function resolveZone(city: string, fallback?: string): string {
  return cityByName(city)?.zone ?? fallback ?? "maritime";
}

export function groupCities(query = ""): [string, TogoCity[]][] {
  const q = fold(query);
  const list = q
    ? TOGO_CITIES.filter(
        (c) => fold(c.name).includes(q) || fold(c.region).includes(q),
      )
    : TOGO_CITIES;
  const map = new Map<string, TogoCity[]>();
  for (const city of list) {
    const arr = map.get(city.region) ?? [];
    arr.push(city);
    map.set(city.region, arr);
  }
  return REGION_ORDER.filter((r) => map.has(r)).map((r) => [r, map.get(r)!]);
}

export function cityDeliveryHint(cityName: string): string | null {
  const city = cityByName(cityName);
  if (!city) return null;
  const zone = DELIVERY_ZONES.find((z) => z.id === city.zone);
  if (!zone) return city.region;
  return `${city.region} · ${zone.eta}`;
}
