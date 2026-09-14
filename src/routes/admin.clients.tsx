import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminBar } from "@/components/admin-bar";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { adminListCustomers, adminListMessages } from "@/lib/server/admin";
import { getMyProfile } from "@/lib/server/profile";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/admin/clients")({
  component: AdminClients,
});

function AdminClients() {
  const { user, isPending } = useCurrentUserState();
  const [ok, setOk] = useState(false);
  const [customers, setCustomers] = useState<Awaited<ReturnType<typeof adminListCustomers>>>([]);
  const [messages, setMessages] = useState<Awaited<ReturnType<typeof adminListMessages>>>([]);

  useEffect(() => {
    if (!user) return;
    getMyProfile().then((p) => {
      if (p.role !== "admin") return;
      setOk(true);
      adminListCustomers().then(setCustomers).catch(() => {});
      adminListMessages().then(setMessages).catch(() => {});
    });
  }, [user]);

  if (isPending) return <div className="h-32 animate-pulse bg-surface-2" />;
  if (!user) return <RedirectToSignIn />;
  if (!ok) return <p className="p-8 text-sm">Accès refusé.</p>;

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-4xl">Clients</h1>
        <div className="mt-6 overflow-x-auto rounded-lg bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Nom</th>
                <th className="px-3 py-3">E-mail</th>
                <th className="px-3 py-3">Rôle</th>
                <th className="px-3 py-3">Commandes</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-3">{c.name}</td>
                  <td className="px-3 py-3">{c.email}</td>
                  <td className="px-3 py-3">{c.role ?? "customer"}</td>
                  <td className="px-3 py-3 tabular-nums">{c.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-display text-2xl">Messages</h2>
        <ul className="mt-3 space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="rounded-lg bg-card p-4 text-sm">
              <p className="font-medium">
                {m.name} · {m.phone || m.email || "sans contact"}
              </p>
              <p className="mt-1 text-muted-foreground">{m.body}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(m.created_at)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
