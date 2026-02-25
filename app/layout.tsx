import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@/components/Providers";
import React from "react";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "TaTeTiUy",
  description: "Juega al Ta Te Ti online con tus amigos, Sé el mejor del Uruguay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
