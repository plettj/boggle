import {
  BASE_URL,
  OG_DESCRIPTION,
  OG_IMAGES,
  OG_KEYWORDS,
  OG_NAME,
  OG_NAME_FULL,
  PATH_FAVICON,
} from "@/lib/constants";
import { type Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { AUTHOR } from "@/lib/constants";

const fontSans = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

// OPG compliant metadata (https://ogp.me/)
export const metadata: Metadata = {
  title: {
    default: OG_NAME_FULL,
    template: `%s | ${OG_NAME}`,
  },
  description: OG_DESCRIPTION,
  generator: "Next.js",
  keywords: OG_KEYWORDS,
  authors: AUTHOR,
  creator: AUTHOR.name,
  referrer: "strict-origin-when-cross-origin", // Default
  icons: [
    {
      url: PATH_FAVICON,
      sizes: "64x64",
      type: "image/png",
    },
  ],
  metadataBase: new URL(BASE_URL),
  formatDetection: {
    telephone: false,
    date: false,
    email: true,
    url: true,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: OG_NAME,
    title: OG_NAME_FULL,
    description: OG_DESCRIPTION,
    images: OG_IMAGES,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fontSans.variable)} suppressHydrationWarning>
      <body className="flex flex-col h-screen items-center overflow-x-hidden scrollbar bg-background font-sans antialiased transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
