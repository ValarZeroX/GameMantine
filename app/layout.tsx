import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript } from '@mantine/core';

import ClientProviders from './providers/ClientProviders';
import SessionProvider from "./providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default async function RootLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en" suppressHydrationWarning>
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
