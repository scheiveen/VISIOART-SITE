import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import EmptyState from "../components/shared/EmptyState";
import ErrorState from "../components/shared/ErrorState";
import api from "../lib/api";
import { CATEGORY_LABELS } from "../lib/constants";
import MaterialFormDialog from "./MaterialFormDialog";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const projectName = (id) => projects.find((p) => p.id === id)?.name || "—";

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const [materialsRes, projectsRes, clientsRes] = await Promise.all([
        api.get("/admin/materials"),
        api.get("/admin/projects"),
        api.get("/admin/clients"),
      ]);
      setMaterials(materialsRes.data);
      setProjects(projectsRes.data);
      setClients(clientsRes.data);
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
    setEditingMaterial(null);
    setDialogOpen(true);
  }

  function openEdit(material) {
    setEditingMaterial(material);
    setDialogOpen(true);
  }

  async function handleSubmit(form) {
    if (editingMaterial) {
      await api.put(`/admin/materials/${editingMaterial.id}`, form);
      toast.success("Material atualizado.");
    } else {
      await api.post("/admin/materials", form);
      toast.success("Material publicado.");
    }
    load();
  }

  async function handleDelete() {
    try {
      await api.delete(`/admin/materials/${deleteTarget.id}`);
      toast.success("Material excluído.");
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Não foi possível excluir o material.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl tracking-wide uppercase mb-1">Materiais</h1>
          <p className="text-sm text-muted-foreground">Vídeos, fotos e arquivos dos projetos</p>
        </div>
        <Button onClick={openCreate} className="gap-2" disabled={projects.length === 0}>
          <Plus className="h-4 w-4" />
          Adicionar material
        </Button>
      </div>

      {loading && <Skeleton className="h-64 rounded-xl" />}
      {!loading && error && <ErrorState onRetry={load} />}

      {!loading && !error && projects.length === 0 && (
        <EmptyState
          title="Cadastre um projeto primeiro"
          description="Você precisa de pelo menos um projeto para adicionar materiais."
        />
      )}

      {!loading && !error && projects.length > 0 && materials.length === 0 && (
        <EmptyState
          title="Nenhum material ainda"
          description="Publique vídeos, fotos ou arquivos para os projetos dos clientes."
          action={<Button onClick={openCreate}>Adicionar material</Button>}
        />
      )}

      {!loading && !error && materials.length > 0 && (
        <>
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Download</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">{projectName(m.project_id)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {CATEGORY_LABELS[m.category] || m.category}
                    </TableCell>
                    <TableCell>
                      <Badge variant={m.download_allowed ? "default" : "secondary"}>
                        {m.download_allowed ? "Permitido" : "Bloqueado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(m)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(m)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-3">
            {materials.map((m) => (
              <Card key={m.id} className="bg-card border-border">
                <CardContent className="pt-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-muted-foreground">{projectName(m.project_id)}</p>
                    </div>
                    <Badge variant={m.download_allowed ? "default" : "secondary"}>
                      {m.download_allowed ? "Permitido" : "Bloqueado"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {CATEGORY_LABELS[m.category] || m.category}
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => openEdit(m)}>
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setDeleteTarget(m)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <MaterialFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        material={editingMaterial}
        clients={clients}
        projects={projects}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir material?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. "{deleteTarget?.name}" deixará de aparecer no portal
              do cliente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
