import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/sonner";
import { useAuth } from "../context/AuthContext";
import "./portal.css";

export default function ClientLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/cliente/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <div className="portal-grain" aria-hidden="true" />
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-7xl mx-auto">
          <Link to="/cliente" className="font-display text-lg tracking-wide uppercase">
            Portal do Cliente
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-3.5 w-3.5" />
            Sair
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
