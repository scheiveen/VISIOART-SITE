import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { STATUS_LABELS } from "../lib/constants";
import "./portal.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get("/client/projects");
      setProjects(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const totalMaterials = projects.reduce((sum, p) => sum + (p.material_count || 0), 0);

  return (
    <div className="space-y-14 text-center">
      <div className="space-y-5">
        <span className="portal-eyebrow text-sm">VISIOART · Portal do Cliente</span>
        <div>
          <p className="portal-greeting text-2xl">Olá,</p>
          <h1 className="font-display text-6xl md:text-7xl tracking-wide uppercase">
            {user?.name || "Cliente VISIOART"}
          </h1>
        </div>
        {!loading && !error && projects.length > 0 && (
          <div className="flex justify-center gap-14 pt-4 mx-auto w-fit border-t border-border/60">
            <div>
              <div className="portal-stat-number text-5xl md:text-6xl">{projects.length}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {projects.length === 1 ? "Projeto" : "Projetos"}
              </div>
            </div>
            <div>
              <div className="portal-stat-number text-5xl md:text-6xl">{totalMaterials}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {totalMaterials === 1 ? "Material" : "Materiais"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-2xl tracking-wide uppercase text-muted-foreground mb-8">
          Seus projetos
        </h2>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState onRetry={load} />}

        {!loading && !error && projects.length === 0 && (
          <EmptyState
            title="Nenhum projeto por aqui ainda"
            description="Assim que a VISIOART publicar seu projeto, ele vai aparecer nesta página."
          />
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="portal-fade-in bg-card border-border overflow-hidden flex flex-col text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="aspect-video bg-secondary overflow-hidden relative">
                  {project.cover_image_url ? (
                    <img
                      src={project.cover_image_url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-3xl text-muted-foreground/40 uppercase">
                        VISIOART
                      </span>
                    </div>
                  )}
                  <div className="portal-grain-card" aria-hidden="true" />
                </div>
                <CardContent className="pt-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-2xl tracking-wide uppercase leading-tight">
                      {project.name}
                    </h3>
                    <Badge variant="secondary" className="shrink-0">
                      {STATUS_LABELS[project.status] || project.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    {project.date && (
                      <p>{new Date(project.date).toLocaleDateString("pt-BR")}</p>
                    )}
                    <p>
                      {project.material_count}{" "}
                      {project.material_count === 1 ? "material" : "materiais"}
                    </p>
                  </div>
                  <Button asChild size="lg" className="mt-auto w-full">
                    <Link to={`/cliente/projeto/${project.id}`}>Acessar projeto</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
