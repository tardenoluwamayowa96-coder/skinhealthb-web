export function formatXof(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(amount))} F CFA`;
}

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function localTogoDigits(value: string): string {
  const d = phoneDigits(value);
  return d.startsWith("228") ? d.slice(3) : d;
}

export function isTogoMobile(value: string): boolean {
  return localTogoDigits(value).length >= 8;
}

const INTL_LEN: Record<string, { dial: string; local: number }> = {
  benin: { dial: "229", local: 8 },
  "cote-ivoire": { dial: "225", local: 10 },
  senegal: { dial: "221", local: 9 },
};

export function isDeliveryPhone(value: string, zoneId: string): boolean {
  const spec = INTL_LEN[zoneId];
  if (!spec) return isTogoMobile(value);
  const d = phoneDigits(value);
  if (d.startsWith(spec.dial) && d.length === spec.dial.length + spec.local) {
    return true;
  }
  return d.length === spec.local;
}

export function normalizeDeliveryPhone(value: string, zoneId: string): string {
  const spec = INTL_LEN[zoneId];
  const d = phoneDigits(value);
  if (!spec) return normalizeTogoPhone(value);
  if (d.startsWith(spec.dial)) return `+${d}`;
  return `+${spec.dial}${d}`;
}

export function normalizeTogoPhone(value: string): string {
  return `+228${localTogoDigits(value)}`;
}

export function formatTogoPhone(value: string): string {
  const local = localTogoDigits(value);
  if (local.length !== 8) return value.trim();
  return `+228 ${local.slice(0, 2)} ${local.slice(2, 4)} ${local.slice(4, 6)} ${local.slice(6, 8)}`;
}
