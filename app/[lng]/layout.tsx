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
