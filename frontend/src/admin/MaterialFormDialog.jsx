import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { CATEGORY_OPTIONS, CATEGORY_GROUPS } from "../lib/constants";

const EMPTY_FORM = {
  client_id: "",
  project_id: "",
  category: "video_principal",
  name: "",
  description: "",
  file_url: "",
  preview_url: "",
  thumbnail_url: "",
  download_allowed: false,
};

export default function MaterialFormDialog({
  open,
  onOpenChange,
  material,
  clients,
  projects,
  defaultProjectId,
  onSubmit,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(material);

  useEffect(() => {
    if (!open) return;
    if (material) {
      setForm({
        client_id: material.client_id,
        project_id: material.project_id,
        category: material.category,
        name: material.name,
        description: material.description || "",
        file_url: material.file_url || "",
        preview_url: material.preview_url || "",
        thumbnail_url: material.thumbnail_url || "",
        download_allowed: material.download_allowed,
      });
    } else {
      const project = projects.find((p) => p.id === defaultProjectId);
      setForm({
        ...EMPTY_FORM,
        project_id: defaultProjectId || "",
        client_id: project?.client_id || "",
      });
    }
    setError("");
  }, [open, material, defaultProjectId, projects]);

  const projectsForClient = useMemo(
    () => projects.filter((p) => p.client_id === form.client_id),
    [projects, form.client_id],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.project_id) {
      setError("Selecione o projeto do material.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        project_id: form.project_id,
        category: form.category,
        name: form.name,
        description: form.description || null,
        file_url: form.file_url || null,
        preview_url: form.preview_url || null,
        thumbnail_url: form.thumbnail_url || null,
        download_allowed: form.download_allowed,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Não foi possível salvar o material.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide uppercase">
            {isEditing ? "Editar material" : "Adicionar material"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Cliente</Label>
            <Select
              value={form.client_id}
              onValueChange={(client_id) => setForm({ ...form, client_id, project_id: "" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Projeto</Label>
            <Select
              value={form.project_id}
              onValueChange={(project_id) => setForm({ ...form, project_id })}
              disabled={!form.client_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o projeto" />
              </SelectTrigger>
              <SelectContent>
                {projectsForClient.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_GROUPS.map((group) => (
                  <React.Fragment key={group.key}>
                    {CATEGORY_OPTIONS.filter((c) => c.group === group.key).map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {group.emoji} {c.label}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="material-name">Nome</Label>
            <Input
              id="material-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="material-description">Descrição (opcional)</Label>
            <Textarea
              id="material-description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="material-file-url">Link do arquivo original (Google Drive)</Label>
            <Input
              id="material-file-url"
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
              placeholder="https://drive.google.com/..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="material-preview-url">Vídeo de preview (Cloudinary)</Label>
              <Input
                id="material-preview-url"
                value={form.preview_url}
                onChange={(e) => setForm({ ...form, preview_url: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="material-thumbnail-url">Thumbnail (Cloudinary)</Label>
              <Input
                id="material-thumbnail-url"
                value={form.thumbnail_url}
                onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
            <Label htmlFor="material-download" className="cursor-pointer">
              Download permitido
            </Label>
            <Switch
              id="material-download"
              checked={form.download_allowed}
              onCheckedChange={(v) => setForm({ ...form, download_allowed: v })}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Publicando..." : "Publicar material"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
