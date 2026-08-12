import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileVideo, FolderKanban, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import ErrorState from "../components/shared/ErrorState";
import api from "../lib/api";
import { STATUS_LABELS } from "../lib/constants";

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6 flex items-center gap-4">
        <div className="h-11 w-11 rounded-md bg-primary/15 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-display tracking-wide">{value}</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get("/admin/dashboard");
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl tracking-wide uppercase mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral da VISIOART</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Clientes" value={data.clients_count} />
        <StatCard icon={FolderKanban} label="Projetos" value={data.projects_count} />
        <StatCard icon={FileVideo} label="Materiais" value={data.materials_count} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-base tracking-wide uppercase">
              Projetos recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recent_projects.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum projeto ainda.</p>
            )}
            {data.recent_projects.map((p) => (
              <Link
                key={p.id}
                to="/admin/projetos"
                className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0 hover:text-primary transition-colors"
              >
                <span>{p.name}</span>
                <span className="text-xs text-muted-foreground">
                  {STATUS_LABELS[p.status] || p.status}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-base tracking-wide uppercase">
              Clientes recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recent_clients.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum cliente ainda.</p>
            )}
            {data.recent_clients.map((c) => (
              <Link
                key={c.id}
                to="/admin/clientes"
                className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0 hover:text-primary transition-colors"
              >
                <span>{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.email}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
