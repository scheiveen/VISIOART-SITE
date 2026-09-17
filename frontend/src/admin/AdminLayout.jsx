import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FileVideo, FolderKanban, LayoutDashboard, LogOut, Menu, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Toaster } from "../components/ui/sonner";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/clientes", label: "Clientes", icon: Users },
  { to: "/admin/projetos", label: "Projetos", icon: FolderKanban },
  { to: "/admin/materiais", label: "Materiais", icon: FileVideo },
];

function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          <div className="flex items-center gap-3">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background w-64">
                <div className="mt-8">
                  <NavLinks onNavigate={() => setSheetOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-display text-lg tracking-wide uppercase">
              Admin VISIOART
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user.name}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden md:block w-60 shrink-0 border-r border-border min-h-[calc(100vh-4rem)] px-3 py-6">
          <NavLinks />
        </aside>
        <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
