import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: ReactNode;
  backendStatus: "checking" | "up" | "down";
}

export function AppLayout({ children, backendStatus }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header backendStatus={backendStatus} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
