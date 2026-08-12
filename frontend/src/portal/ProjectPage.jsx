import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import api from "../lib/api";
import { CATEGORY_GROUP, CATEGORY_GROUPS, CATEGORY_LABELS, STATUS_LABELS } from "../lib/constants";
import "./portal.css";

function groupMaterials(materials) {
  const groups = { videos: [], fotos: [], arquivos: [] };
  materials.forEach((m) => {
    const group = CATEGORY_GROUP[m.category] || "arquivos";
    groups[group].push(m);
  });
  return groups;
}

function VideoCard({ material }) {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="aspect-video bg-black">
        {material.preview_url ? (
          <video
            controls
            controlsList="nodownload"
            className="w-full h-full"
            poster={material.thumbnail_url || undefined}
            src={material.preview_url}
          >
            Seu navegador não suporta reprodução de vídeo.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center px-4">
            <p className="text-sm text-muted-foreground">
              Prévia indisponível. {material.download_allowed ? "Baixe o vídeo abaixo." : ""}
            </p>
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{material.name}</p>
          <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[material.category]}</p>
        </div>
        {material.download_allowed && material.file_url && (
          <Button asChild size="sm" variant="outline" className="gap-2 shrink-0">
            <a href={material.file_url} target="_blank" rel="noreferrer">
              <Download className="h-3.5 w-3.5" />
              Baixar
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function PhotoGrid({ materials }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {materials.map((m) => {
          const src = m.preview_url || m.thumbnail_url;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => src && setLightbox(m)}
              className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border group"
            >
              {src ? (
                <img
                  src={src}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                  {m.name}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Dialog open={Boolean(lightbox)} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="bg-card border-border max-w-3xl">
          {lightbox && (
            <div className="space-y-3">
              <img
                src={lightbox.preview_url || lightbox.thumbnail_url}
                alt={lightbox.name}
                className="w-full max-h-[70vh] object-contain rounded-md"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm">{lightbox.name}</p>
                {lightbox.download_allowed && lightbox.file_url && (
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <a href={lightbox.file_url} target="_blank" rel="noreferrer">
                      <Download className="h-3.5 w-3.5" />
                      Baixar
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function FileRow({ material }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 px-4 border border-border rounded-lg">
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{material.name}</p>
          <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[material.category]}</p>
        </div>
      </div>
      {material.download_allowed && material.file_url ? (
        <Button asChild size="sm" variant="outline" className="gap-2 shrink-0">
          <a href={material.file_url} target="_blank" rel="noreferrer">
            <Download className="h-3.5 w-3.5" />
            Baixar
          </a>
        </Button>
      ) : (
        <span className="text-xs text-muted-foreground shrink-0">Download não liberado</span>
      )}
    </div>
  );
}

function StatsBar({ groups }) {
  const entries = CATEGORY_GROUPS.filter((g) => groups[g.key].length > 0);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((g) => {
        const count = groups[g.key].length;
        const label = g.label.toLowerCase();
        return (
          <span
            key={g.key}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground"
          >
            <span>{g.emoji}</span>
            {count} {count === 1 ? label.slice(0, -1) : label}
          </span>
        );
      })}
    </div>
  );
}

function HeroVideo({ material, poster }) {
  return (
    <div className="rounded-xl overflow-hidden bg-black aspect-video lg:aspect-[21/9]">
      <video
        controls
        controlsList="nodownload"
        className="w-full h-full"
        poster={material.thumbnail_url || poster || undefined}
        src={material.preview_url}
      >
        Seu navegador não suporta reprodução de vídeo.
      </video>
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  async function load() {
    setLoading(true);
    setError(false);
    setNotFound(false);
    try {
      const [projectRes, materialsRes] = await Promise.all([
        api.get(`/client/projects/${id}`),
        api.get(`/client/projects/${id}/materials`),
      ]);
      setProject(projectRes.data);
      setMaterials(materialsRes.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (notFound) {
    return (
      <EmptyState
        title="Projeto não encontrado"
        description="Este projeto não existe ou não pertence à sua conta."
        action={
          <Button asChild>
            <Link to="/cliente">Voltar aos meus projetos</Link>
          </Button>
        }
      />
    );
  }

  if (error) return <ErrorState onRetry={load} />;

  const groups = groupMaterials(materials);

  const featuredVideo =
    groups.videos.find((m) => m.category === "video_principal" && m.preview_url) ||
    groups.videos.find((m) => m.preview_url);
  const secondaryVideos = groups.videos.filter((m) => m.id !== featuredVideo?.id);

  return (
    <div className="space-y-8">
      <Link
        to="/cliente"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Meus projetos
      </Link>

      {featuredVideo ? (
        <HeroVideo material={featuredVideo} poster={project.cover_image_url} />
      ) : (
        project.cover_image_url && (
          <div className="aspect-[21/9] rounded-xl overflow-hidden bg-secondary">
            <img
              src={project.cover_image_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )
      )}

      <div className="space-y-5 text-center">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h1 className="font-display text-5xl md:text-6xl tracking-wide uppercase">
            {project.name}
          </h1>
          <Badge variant="secondary">{STATUS_LABELS[project.status] || project.status}</Badge>
        </div>
        {project.description && (
          <p className="portal-greeting text-xl max-w-2xl mx-auto">{project.description}</p>
        )}
        {project.date && (
          <p className="text-sm text-muted-foreground">
            {new Date(project.date).toLocaleDateString("pt-BR")}
          </p>
        )}
        {featuredVideo?.download_allowed && featuredVideo?.file_url && (
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href={featuredVideo.file_url} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              Baixar vídeo
            </a>
          </Button>
        )}
        <div className="flex justify-center">
          <StatsBar groups={groups} />
        </div>
      </div>

      {materials.length === 0 ? (
        <EmptyState
          title="Nenhum material publicado ainda"
          description="Assim que a VISIOART publicar os vídeos e fotos deste projeto, eles aparecerão aqui."
        />
      ) : (
        CATEGORY_GROUPS.map((group) => {
          const items = group.key === "videos" ? secondaryVideos : groups[group.key];
          if (items.length === 0) return null;
          return (
            <section key={group.key} className="space-y-6 text-center">
              <h2 className="font-display text-2xl tracking-wide uppercase text-muted-foreground">
                {group.emoji} {group.key === "videos" && featuredVideo ? "Mais vídeos" : group.label}
              </h2>
              {group.key === "videos" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                  {items.map((m) => (
                    <VideoCard key={m.id} material={m} />
                  ))}
                </div>
              )}
              {group.key === "fotos" && (
                <div className="max-w-4xl mx-auto">
                  <PhotoGrid materials={items} />
                </div>
              )}
              {group.key === "arquivos" && (
                <div className="space-y-2 max-w-2xl mx-auto text-left">
                  {items.map((m) => (
                    <FileRow key={m.id} material={m} />
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}
