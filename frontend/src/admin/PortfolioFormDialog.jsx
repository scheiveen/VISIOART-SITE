import React, { useEffect, useRef, useState } from "react";
import { Check, Film, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import {
  formatBytes,
  frameUrl,
  prepareVideo,
  thumbnailOffsets,
  uploadToCloudinary,
} from "./portfolioUpload";

const TAG_SUGGESTIONS = [
  "Casamento",
  "Cerimônia de Casamento",
  "Pedido de Casamento",
  "Aniversário de 15 anos",
  "Institucional",
  "Publicidade",
  "Redes Sociais",
  "Imobiliário",
  "Construção",
];

const EMPTY_FORM = { tag: "", title: "", featured: false, thumb_offset: null };

function ThumbnailPicker({ videoUrl, duration, value, onChange }) {
  const offsets = thumbnailOffsets(duration);
  return (
    <div className="space-y-1.5">
      <Label>Miniatura (clique para escolher)</Label>
      <div className="grid grid-cols-2 gap-2">
        {offsets.map((offset) => (
          <button
            key={offset}
            type="button"
            onClick={() => onChange(offset)}
            className={`relative aspect-video overflow-hidden rounded-md border-2 bg-secondary transition ${
              value === offset ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={frameUrl(videoUrl, offset)}
              alt={`Frame em ${offset}s`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 text-xs text-white">
              {offset}s
            </span>
            {value === offset && (
              <Check className="absolute right-1 top-1 h-5 w-5 rounded-full bg-primary p-0.5 text-primary-foreground" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function TagField({ value, onChange, existingTags }) {
  const suggestions = Array.from(new Set([...existingTags, ...TAG_SUGGESTIONS]));
  return (
    <div className="space-y-1.5">
      <Label htmlFor="portfolio-tag">Tipo</Label>
      <Input
        id="portfolio-tag"
        list="portfolio-tag-options"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex.: Casamento"
        required
      />
      <datalist id="portfolio-tag-options">
        {suggestions.map((tag) => (
          <option key={tag} value={tag} />
        ))}
      </datalist>
    </div>
  );
}

/**
 * Criação: escolher arquivo → preparar/enviar (com progresso) → escolher
 * miniatura → publicar. Edição: tipo, título e miniatura.
 */
export default function PortfolioFormDialog({ open, onOpenChange, item, existingTags, onCreate, onUpdate }) {
  const isEditing = Boolean(item);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("form"); // form | preparing | uploading | thumbnail
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const busy = stage === "preparing" || stage === "uploading";

  useEffect(() => {
    if (!open) return;
    setForm(
      item
        ? { tag: item.tag, title: item.title, featured: item.featured, thumb_offset: item.thumb_offset }
        : EMPTY_FORM,
    );
    setFile(null);
    setStage("form");
    setProgress(0);
    setUploaded(null);
    setError("");
  }, [open, item]);

  function handleOpenChange(next) {
    // Não deixa fechar no meio da conversão/envio.
    if (!next && busy) return;
    onOpenChange(next);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) {
      setError("Escolha o arquivo do vídeo.");
      return;
    }
    setError("");
    try {
      setStage("preparing");
      setProgress(0);
      const prepared = await prepareVideo(file, setProgress);

      setStage("uploading");
      setProgress(0);
      const result = await uploadToCloudinary(prepared.blob, setProgress);

      const duration = result.duration || prepared.duration;
      setUploaded({ ...result, duration, converted: prepared.converted, size: prepared.blob.size });
      setForm((current) => ({ ...current, thumb_offset: thumbnailOffsets(duration)[1] }));
      setStage("thumbnail");
    } catch (err) {
      setStage("form");
      setError(err.response?.data?.detail || err.message || "Não foi possível enviar o vídeo.");
    }
  }

  async function handlePublish() {
    setSubmitting(true);
    setError("");
    try {
      await onCreate({
        tag: form.tag.trim(),
        title: form.title.trim(),
        featured: form.featured,
        thumb_offset: form.thumb_offset,
        public_id: uploaded.public_id,
        version: String(uploaded.version),
        duration: uploaded.duration || null,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Não foi possível publicar o filme.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onUpdate(item.id, {
        tag: form.tag.trim(),
        title: form.title.trim(),
        thumb_offset: form.thumb_offset,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Não foi possível salvar.");
    } finally {
      setSubmitting(false);
    }
  }

  const textFields = (
    <>
      <TagField
        value={form.tag}
        onChange={(tag) => setForm({ ...form, tag })}
        existingTags={existingTags}
      />
      <div className="space-y-1.5">
        <Label htmlFor="portfolio-title">Título</Label>
        <Input
          id="portfolio-title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Ex.: Leticia & Wagner"
          required
        />
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide uppercase">
            {isEditing ? "Editar filme" : "Adicionar filme"}
          </DialogTitle>
          {!isEditing && (
            <DialogDescription>
              Pode enviar o arquivo original, mesmo em 4K: se passar de 100 MB ele é otimizado
              automaticamente antes do envio.
            </DialogDescription>
          )}
        </DialogHeader>

        {isEditing && (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            {textFields}
            <ThumbnailPicker
              videoUrl={item.video_url}
              duration={item.duration}
              value={form.thumb_offset}
              onChange={(thumb_offset) => setForm({ ...form, thumb_offset })}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {!isEditing && (stage === "form" || busy) && (
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Arquivo do vídeo</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                disabled={busy}
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-md border border-dashed border-border px-4 py-5 text-left text-sm hover:bg-secondary disabled:opacity-60"
              >
                <Film className="h-5 w-5 shrink-0 text-muted-foreground" />
                {file ? (
                  <span>
                    <span className="block font-medium">{file.name}</span>
                    <span className="text-muted-foreground">{formatBytes(file.size)}</span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Clique para escolher o vídeo</span>
                )}
              </button>
            </div>
            {textFields}
            <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
              <Label htmlFor="portfolio-featured" className="cursor-pointer">
                Usar como destaque (vídeo grande no topo)
              </Label>
              <Switch
                id="portfolio-featured"
                checked={form.featured}
                disabled={busy}
                onCheckedChange={(featured) => setForm({ ...form, featured })}
              />
            </div>

            {busy && (
              <div className="space-y-2">
                <p className="text-sm">
                  {stage === "preparing" ? "Otimizando o vídeo para a web" : "Enviando para o Cloudinary"}
                  {" — "}
                  {Math.round(progress * 100)}%
                </p>
                <Progress value={progress * 100} />
                <p className="text-xs text-muted-foreground">
                  Mantenha esta aba aberta até terminar.
                </p>
              </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" disabled={busy} onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={busy} className="gap-2">
                <Upload className="h-4 w-4" />
                {busy ? "Enviando..." : "Enviar vídeo"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {!isEditing && stage === "thumbnail" && uploaded && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Vídeo enviado ({formatBytes(uploaded.size)}
              {uploaded.converted ? ", otimizado para 1080p" : ""}). Agora escolha a miniatura.
              As imagens podem levar alguns segundos para aparecer.
            </p>
            <ThumbnailPicker
              videoUrl={uploaded.secure_url}
              duration={uploaded.duration}
              value={form.thumb_offset}
              onChange={(thumb_offset) => setForm({ ...form, thumb_offset })}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <DialogFooter>
              <Button onClick={handlePublish} disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Publicando..." : "Publicar no site"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
