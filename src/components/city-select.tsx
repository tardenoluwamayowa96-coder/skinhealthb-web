import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cityByName, groupCities, type TogoCity } from "@/lib/togo-cities";
import { formatXof } from "@/lib/format";
import { zoneById } from "@/lib/zones";

export function CitySelect({
  value,
  onChange,
  id = "city",
}: {
  value: string;
  onChange: (city: TogoCity) => void;
  id?: string;
}) {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => groupCities(query), [query]);
  const selected = cityByName(value);
  const zone = selected ? zoneById(selected.zone) : undefined;
  const missing = value && !selected;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={`${id}-search`}>Ville / quartier</Label>
      <Input
        id={`${id}-search`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Lomé, Cotonou, Abidjan, Dakar…"
        autoComplete="off"
      />
      <select
        id={id}
        required
        className="h-11 w-full rounded-md border border-input bg-surface px-3 text-sm"
        value={value}
        onChange={(e) => {
          const city = cityByName(e.target.value);
          if (city) onChange(city);
        }}
      >
        <option value="" disabled>
          Choisir une ville
        </option>
        {missing ? <option value={value}>{value}</option> : null}
        {groups.map(([region, cities]) => (
          <optgroup key={region} label={region}>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {zone ? (
        <p className="text-xs text-muted-foreground">
          Livraison {selected?.region} — {formatXof(zone.fee)} · {zone.eta}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Plus de 100 villes au Togo, plus Bénin, Côte d’Ivoire, Sénégal (Poste).
        </p>
      )}
    </div>
  );
}
