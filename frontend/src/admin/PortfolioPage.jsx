import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import api from "../lib/api";
import PortfolioFormDialog from "./PortfolioFormDialog";

// Mesmo valor do site (PortfolioSection): os demais ficam no "Mostrar mais".
const INITIAL_VISIBLE = 5;

export default function PortfolioPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get("/admin/portfolio");
      setItems(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  async function handleCreate(payload) {
    await api.post("/admin/portfolio", payload);
    toast.success("Filme publicado no site.");
    load();
  }

  async function handleUpdate(id, payload) {
    await api.put(`/admin/portfolio/${id}`, payload);
    toast.success("Filme atualizado.");
    load();
  }

  async function move(index, direction) {
    const next = [...items];
    const target = index + direction;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setSaving(true);
    try {
      const { data } = await api.put("/admin/portfolio/reorder", { ids: next.map((i) => i.id) });
      setItems(data);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Não foi possível reordenar.");
      load();
    } finally {
      setSaving(false);
    }
  }

  async function makeFeatured(item) {
    setSaving(true);
    try {
      await api.put(`/admin/portfolio/${item.id}`, { featured: true });
      toast.success(`"${item.title}" agora é o destaque.`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Não foi possível alterar o destaque.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/admin/portfolio/${deleteTarget.id}`);
      toast.success("Filme removido do site.");
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Não foi possível remover o filme.");
    }
  }

  const existingTags = Array.from(new Set(items.map((i) => i.tag)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl tracking-wide uppercase mb-1">Portfólio</h1>
          <p className="text-sm text-muted-foreground">
            Filmes da seção "Histórias que já eternizamos". Os {INITIAL_VISIBLE} primeiros aparecem
            direto no site; os demais ficam no botão "Mostrar mais".
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild className="gap-2">
            <a href="/#portfolio" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Ver no site
            </a>
          </Button>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar filme
          </Button>
        </div>
      </div>

      {loading && <Skeleton className="h-64 rounded-xl" />}
      {!loading && error && <ErrorState onRetry={load} />}

      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="Nenhum filme no portfólio"
          description="Adicione o primeiro filme para ele aparecer no site."
          action={<Button onClick={openCreate}>Adicionar filme</Button>}
        />
      )}

      {!loading && !error && items.length > 0 && (
        <ol className="space-y-3">
          {items.map((item, index) => {
            const canMoveUp = !item.featured && index > 0 && !items[index - 1].featured;
            const canMoveDown = !item.featured && index < items.length - 1;
            return (
              <React.Fragment key={item.id}>
                {index === INITIAL_VISIBLE && (
                  <li className="flex items-center gap-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    Daqui para baixo: aparece no "Mostrar mais"
                    <span className="h-px flex-1 bg-border" />
                  </li>
                )}
                <li className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-card p-3">
                  <span className="w-5 text-center text-sm text-muted-foreground">{index + 1}</span>
                  <img
                    src={item.thumbnail_url}
                    alt=""
                    className="h-14 w-24 sm:h-16 sm:w-28 shrink-0 rounded-md object-cover bg-secondary"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.tag}</span>
                      {item.featured && <Badge>Destaque</Badge>}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Subir"
                      disabled={!canMoveUp || saving}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Descer"
                      disabled={!canMoveDown || saving}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title={item.featured ? "Já é o destaque" : "Tornar destaque"}
                      disabled={item.featured || saving}
                      onClick={() => makeFeatured(item)}
                    >
                      <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar" onClick={() => openEdit(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Remover" onClick={() => setDeleteTarget(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      )}

      <PortfolioFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editingItem}
        existingTags={existingTags}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Remover filme do site?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" deixará de aparecer no portfólio. O arquivo continua guardado no
              Cloudinary.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
