'use client';

import React, { useState, use } from 'react';
import { AppShell} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../Header/Header'; 
import OriginMenu from '../Navbar/OriginMenu';

// import { useTranslation } from "../../i18n/client";

interface LayoutProps {
    children: React.ReactNode;
    lng: string;
  }

export default function Layout({ children, lng }: LayoutProps) {
  // const { lng } =  params;
  // const resolvedParams = use(params);
  //   const { lng } = resolvedParams;

  // const [opened, { toggle }] = useDisclosure();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          // collapsed: { mobile: !opened },
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
            <Header opened={mobileOpened} toggle={toggleMobile} desktopOpened={desktopOpened} toggleDesktop={toggleDesktop} lng={lng} />
        </AppShell.Header>
        <AppShell.Navbar p="md">
            <OriginMenu lng={lng}/>
        </AppShell.Navbar>
  
        <AppShell.Main>
        {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
