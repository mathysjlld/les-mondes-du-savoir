import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Footer } from "@/components/Footer";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Les mondes du Savoir - Apprends en t'amusant !",
  description: "Plateforme éducative interactive et gamifiée pour les enfants de 3 à 12 ans. Découvre la nature, l'espace, les sciences et bien plus !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sky-100 text-slate-800">
        <AppProvider>
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
