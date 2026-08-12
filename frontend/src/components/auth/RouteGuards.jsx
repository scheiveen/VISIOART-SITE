import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-body">
      <p className="text-sm text-muted-foreground tracking-wide">Carregando...</p>
    </div>
  );
}

function RequireRole({ role, loginPath, children }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!token || !user || user.role !== role) {
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  return children;
}

export function RequireAdmin({ children }) {
  return (
    <RequireRole role="admin" loginPath="/admin/login">
      {children}
    </RequireRole>
  );
}

export function RequireClient({ children }) {
  return (
    <RequireRole role="client" loginPath="/cliente/login">
      {children}
    </RequireRole>
  );
}
