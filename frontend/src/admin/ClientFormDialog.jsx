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
import { Switch } from "../components/ui/switch";
import PasswordInput from "../components/shared/PasswordInput";

const EMPTY_FORM = { name: "", email: "", phone: "", password: "", active: true };

export default function ClientFormDialog({ open, onOpenChange, client, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(client);

  useEffect(() => {
    if (open) {
      setForm(
        client
          ? {
              name: client.name || "",
              email: client.email || "",
              phone: client.phone || "",
              password: "",
              active: client.active,
            }
          : EMPTY_FORM,
      );
      setError("");
    }
  }, [open, client]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEditing && form.password.length < 8) {
      setError("A senha inicial deve ter pelo menos 8 caracteres.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(form);
      onOpenChange(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Não foi possível salvar o cliente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide uppercase">
            {isEditing ? "Editar cliente" : "Novo cliente"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="client-name">Nome</Label>
            <Input
              id="client-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-email">E-mail</Label>
            <Input
              id="client-email"
              type="email"
              required
              disabled={isEditing}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-phone">Telefone (opcional)</Label>
            <Input
              id="client-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="client-password">
              {isEditing ? "Nova senha (deixe em branco para manter)" : "Senha inicial"}
            </Label>
            <PasswordInput
              id="client-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
            <Label htmlFor="client-active" className="cursor-pointer">
              Cliente ativo
            </Label>
            <Switch
              id="client-active"
              checked={form.active}
              onCheckedChange={(active) => setForm({ ...form, active })}
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
