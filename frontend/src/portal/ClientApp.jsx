import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { RequireClient } from "../components/auth/RouteGuards";
import ClientLayout from "./ClientLayout";
import ClientLoginPage from "./ClientLoginPage";
import DashboardPage from "./DashboardPage";
import ProjectPage from "./ProjectPage";

export default function ClientApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<ClientLoginPage />} />
        <Route
          element={
            <RequireClient>
              <ClientLayout />
            </RequireClient>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projeto/:id" element={<ProjectPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/cliente" replace />} />
      </Routes>
    </AuthProvider>
  );
}
