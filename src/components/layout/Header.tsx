"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/formation", label: "Formation" },
  { href: "/glossaire", label: "Glossaire" },
  { href: "/exemples", label: "Exemples" },
  { href: "/reference", label: "Reference" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="hidden sm:inline">Firebase Academy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm transition-colors",
                pathname.startsWith(item.href)
                  ? "text-orange-400 bg-orange-400/10"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-neutral-950 border-neutral-800">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Firebase Academy
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-orange-400 bg-orange-400/10"
                        : "text-neutral-400 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
