import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senin için bir bahçe",
  description: "Sana hiç solmayacak bir bahçe hazırladım.",
  openGraph: {
    title: "Senin için bir bahçe",
    description: "Sana hiç solmayacak bir bahçe hazırladım.",
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf6f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${outfit.variable} ${cormorant.variable} h-full`}>
      <body className={`${outfit.className} min-h-full text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
