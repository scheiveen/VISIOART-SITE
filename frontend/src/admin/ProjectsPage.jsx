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
import { STATUS_LABELS } from "../lib/constants";
import ProjectFormDialog from "./ProjectFormDialog";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const clientName = (id) => clients.find((c) => c.id === id)?.name || "—";

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        api.get("/admin/projects"),
        api.get("/admin/clients"),
      ]);
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
    setEditingProject(null);
    setDialogOpen(true);
  }

  function openEdit(project) {
    setEditingProject(project);
    setDialogOpen(true);
  }

  async function handleSubmit(form) {
    if (editingProject) {
      await api.put(`/admin/projects/${editingProject.id}`, form);
      toast.success("Projeto atualizado.");
    } else {
      await api.post("/admin/projects", form);
      toast.success("Projeto criado.");
    }
    load();
  }

  async function handleDelete() {
    try {
      const { data } = await api.delete(`/admin/projects/${deleteTarget.id}`);
      toast.success(
        data.materials_deleted > 0
          ? `Projeto excluído junto com ${data.materials_deleted} material(is).`
          : "Projeto excluído.",
      );
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Não foi possível excluir o projeto.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl tracking-wide uppercase mb-1">Projetos</h1>
          <p className="text-sm text-muted-foreground">Organize os projetos de cada cliente</p>
        </div>
        <Button onClick={openCreate} className="gap-2" disabled={clients.length === 0}>
          <Plus className="h-4 w-4" />
          Novo projeto
        </Button>
      </div>

      {loading && <Skeleton className="h-64 rounded-xl" />}
      {!loading && error && <ErrorState onRetry={load} />}

      {!loading && !error && clients.length === 0 && (
        <EmptyState
          title="Cadastre um cliente primeiro"
          description="Você precisa de pelo menos um cliente para criar um projeto."
        />
      )}

      {!loading && !error && clients.length > 0 && projects.length === 0 && (
        <EmptyState
          title="Nenhum projeto ainda"
          description="Crie o primeiro projeto para começar a publicar materiais."
          action={<Button onClick={openCreate}>Novo projeto</Button>}
        />
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{clientName(p.client_id)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.date ? new Date(p.date).toLocaleDateString("pt-BR") : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{STATUS_LABELS[p.status] || p.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(p)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-3">
            {projects.map((p) => (
              <Card key={p.id} className="bg-card border-border">
                <CardContent className="pt-5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{clientName(p.client_id)}</p>
                    </div>
                    <Badge variant="secondary">{STATUS_LABELS[p.status] || p.status}</Badge>
                  </div>
                  {p.date && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(p.date).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setDeleteTarget(p)}
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

      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        clients={clients}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todos os materiais de "{deleteTarget?.name}" também
              serão excluídos.
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
