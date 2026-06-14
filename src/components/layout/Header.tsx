"use client";

import { usePathname } from "next/navigation";
import { Flame, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/formation", label: "Formation" },
  { href: "/glossaire", label: "Glossaire" },
  { href: "/exemples", label: "Exemples" },
  { href: "/reference", label: "Référence" },
  { href: "/produits", label: "Produits" },
  { href: "/commandes", label: "Commandes" },
];

export function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 gap-6">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="hidden sm:inline">Firebase Academy</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm transition-colors",
                pathname.startsWith(item.href)
                  ? "text-orange-400 bg-orange-400/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />

          {/* Auth */}
          {!loading && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="w-5 h-5 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-muted-foreground max-w-[120px] truncate">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    title="Se déconnecter"
                  >
                    <LogOut className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              ) : (
                <Button
                  render={<a href="/connexion" />}
                  nativeButton={false}
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
                >
                  Connexion
                </Button>
              )}
            </>
          )}

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-border">
              <div className="flex flex-col gap-4 mt-8">
                <a href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Firebase Academy
                </a>
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-orange-400 bg-orange-400/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Mobile auth */}
                {!loading && (
                  <div className="border-t border-border pt-4 mt-2">
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt=""
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <User className="w-5 h-5 text-muted-foreground" />
                          )}
                          <span className="truncate">
                            {user.displayName || user.email}
                          </span>
                        </div>
                        <button
                          onClick={logout}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <LogOut className="w-4 h-4" />
                          Se déconnecter
                        </button>
                      </div>
                    ) : (
                      <a
                        href="/connexion"
                        className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300"
                      >
                        Connexion
                      </a>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
