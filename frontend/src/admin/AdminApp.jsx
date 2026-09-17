import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { RequireAdmin } from "../components/auth/RouteGuards";
import AdminLayout from "./AdminLayout";
import AdminLoginPage from "./AdminLoginPage";
import ClientsPage from "./ClientsPage";
import DashboardPage from "./DashboardPage";
import MaterialsPage from "./MaterialsPage";
import ProjectsPage from "./ProjectsPage";

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="clientes" element={<ClientsPage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="materiais" element={<MaterialsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
