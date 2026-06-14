import type { Metadata } from "next";
import { Nunito, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgressTimeline } from "@/components/formation/ProgressTimeline";
import { MainWithSidebar } from "@/components/formation/MainWithSidebar";
import { ChatBubble } from "@/components/chat/ChatBubble";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firebase Academy - Formation de 0 a 100",
  description:
    "Apprends Firebase en construisant une vraie app. Formation progressive en francais, sans jargon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${firaCode.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <Header />
          <MainWithSidebar>
            <main>{children}</main>
            <Footer />
          </MainWithSidebar>
          <ProgressTimeline />
          <ChatBubble />
        </Providers>
      </body>
    </html>
  );
}
