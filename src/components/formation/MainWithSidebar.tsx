"use client";

import { useAuth } from "@/contexts/AuthContext";

export function MainWithSidebar({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const showSidebar = !loading && !!user;

  return (
    <div className={`flex-1 ${showSidebar ? "lg:mr-64" : ""}`}>
      {children}
    </div>
  );
}
