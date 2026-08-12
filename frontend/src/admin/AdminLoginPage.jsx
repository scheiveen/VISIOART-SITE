import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/shared/AuthCard";
import ForgotPasswordNote from "../components/shared/ForgotPasswordNote";
import PasswordInput from "../components/shared/PasswordInput";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../context/AuthContext";

export default function AdminLoginPage() {
  const { login, logout, user, token, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && token && user?.role === "admin") {
    return <Navigate to={location.state?.from?.pathname || "/admin"} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login(email, password);
      if (data.role !== "admin") {
        logout();
        setError("Este acesso é exclusivo para administradores da VISIOART.");
        return;
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "E-mail ou senha inválidos."
          : err.response?.status === 403
            ? "Conta desativada. Entre em contato com a VISIOART."
            : "Não foi possível entrar agora. Tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard eyebrow="VISIOART" title="Admin" description="Acesso restrito à equipe VISIOART">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="admin-email">E-mail</Label>
          <Input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="admin-password">Senha</Label>
          <PasswordInput
            id="admin-password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <ForgotPasswordNote />
    </AuthCard>
  );
}
