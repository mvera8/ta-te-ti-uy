import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@/components/Providers";
import React from "react";
import { Analytics } from "@vercel/analytics/next"
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: "TaTeTiUy",
  description: "Juega al Ta Te Ti online con tus amigos, Sé el mejor del Uruguay.",
  appleWebApp: {
    capable: true,
    title: 'TaTeTiUy',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/splash/public/splash/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_landscape.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_17_Pro__iPhone_17__iPhone_16_Pro_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_17_Pro_Max__iPhone_16_Pro_Max_landscape.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/splash/public/splash/iPhone_17_Pro_Max__iPhone_16_Pro_Max_portrait.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  icons: {
    apple: [
      { url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180' },
      { url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/icons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/icons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/icons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/icons/apple-touch-icon-57x57.png', sizes: '57x57' },
    ],
  },
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
