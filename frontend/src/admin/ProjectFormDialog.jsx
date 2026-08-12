import React, { useEffect, useState } from "react";
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
import { Textarea } from "../components/ui/textarea";
import { STATUS_OPTIONS } from "../lib/constants";

const EMPTY_FORM = {
  client_id: "",
  name: "",
  description: "",
  date: "",
  cover_image_url: "",
  status: "em_producao",
};

export default function ProjectFormDialog({ open, onOpenChange, project, clients, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(project);

  useEffect(() => {
    if (open) {
      setForm(
        project
          ? {
              client_id: project.client_id,
              name: project.name,
              description: project.description || "",
              date: project.date ? project.date.slice(0, 10) : "",
              cover_image_url: project.cover_image_url || "",
              status: project.status,
            }
          : EMPTY_FORM,
      );
      setError("");
    }
  }, [open, project]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.client_id) {
      setError("Selecione o cliente do projeto.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        ...form,
        description: form.description || null,
        date: form.date || null,
        cover_image_url: form.cover_image_url || null,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Não foi possível salvar o projeto.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide uppercase">
            {isEditing ? "Editar projeto" : "Novo projeto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Cliente</Label>
            <Select value={form.client_id} onValueChange={(v) => setForm({ ...form, client_id: v })}>
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
            <Label htmlFor="project-name">Nome do projeto</Label>
            <Input
              id="project-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-description">Descrição (opcional)</Label>
            <Textarea
              id="project-description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="project-date">Data</Label>
              <Input
                id="project-date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="project-cover">Capa (URL da imagem)</Label>
            <Input
              id="project-cover"
              value={form.cover_image_url}
              onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
