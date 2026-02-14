import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { Archivo, Google_Sans_Code } from "next/font/google";

const sans = Archivo({
  variable: "--next-font-sans",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  // I already set fallbacks in the CSS
  fallback: [],
});

const mono = Google_Sans_Code({
  variable: "--next-font-mono",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  // I already set fallbacks in the CSS
  fallback: [],
});

export const metadata: Metadata = {
  title: {
    default: "ely.al",
    template: "%s | ely.al",
  },
  description: "Ely Alon's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="bg-cBgMain text-cText">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-1">
              <NavBar />
            </header>
            <main className="grow">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
