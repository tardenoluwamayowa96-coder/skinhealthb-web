import { Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";
import { BRAND, SOCIAL, productShareText } from "@/lib/brand";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.5c.28 0 .54.04.8.1v3.58a6.37 6.37 0 0 0-.8-.05 6.34 6.34 0 1 0 6.34 6.34V8.73a8.16 8.16 0 0 0 4.77 1.52V6.8a4.84 4.84 0 0 1-1-.11Z" />
    </svg>
  );
}

const ICONS = {
  instagram: Instagram,
  tiktok: TikTokIcon,
} as const;

export function SocialLink({
  id,
  className,
  label,
}: {
  id: (typeof SOCIAL)[number]["id"];
  className?: string;
  label?: string;
}) {
  const item = SOCIAL.find((s) => s.id === id)!;
  const Icon = ICONS[item.id];
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer me"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 text-sm text-fg transition-colors hover:text-primary",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span>{label ?? item.handle}</span>
    </a>
  );
}

export function InstagramLink({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return <SocialLink id="instagram" className={className} label={label} />;
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-1", className)}>
      {SOCIAL.map((s) => (
        <SocialLink key={s.id} id={s.id} label={`${s.label} ${s.handle}`} />
      ))}
    </div>
  );
}

export function SocialFollowCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {SOCIAL.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noreferrer me"
            className="flex min-h-[7.5rem] flex-col justify-between rounded-xl bg-card p-4 shadow-[var(--shadow-soft)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
          >
            <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-primary">
              <Icon className="size-4" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </span>
              <span className="mt-0.5 block font-medium">{s.handle}</span>
              <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                {s.blurb}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function ProductShare({
  brand,
  name,
}: {
  brand: string;
  name: string;
}) {
  const onShare = async () => {
    const text = productShareText(brand, name);
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} · ${BRAND.name}`, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("Lien copié — Instagram et TikTok @skinhealthb");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      toast.error("Partage impossible");
    }
  };

  return (
    <button
      type="button"
      onClick={() => void onShare()}
      aria-label="Partager sur Instagram ou TikTok"
      className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-fg"
    >
      <Share2 className="size-4" />
      Partager · {BRAND.instagramHandle}
    </button>
  );
}
