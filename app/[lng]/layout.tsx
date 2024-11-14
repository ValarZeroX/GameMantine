//app/[lng]/layout.tsx
import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript } from '@mantine/core';

import ClientProviders from './providers/ClientProviders';
import SessionProvider from "./providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

import { dir } from "i18next";

import { languages } from "../i18n/settings";
import Script from 'next/script'; // 引入 Script 組件
import GA_TRACKING_ID from '@/lib/gtag'; // 後續步驟將創建此文件


type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lng: string; }>;
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: 'Pokemon TCG Pocket',
  description: 'Pokemon TCG Pocket Wiki',
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params; // 在函式內部解構
  const session = await getServerSession(authOptions);
  // console.log(session);
  // console.log( lng);
  return (
    <html lang={lng} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* GA4 全站追踪腳本 */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
