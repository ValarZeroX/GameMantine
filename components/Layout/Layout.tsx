'use client';

import React, { useState } from 'react';
import { AppShell} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Header from '../Header/Header'; 
import OriginMenu from '../Navbar/OriginMenu';

interface LayoutProps {
    children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const [isUserMenu, setIsUserMenu] = useState(false);
  const toggleUserMenu = () => {
    setIsUserMenu(!isUserMenu);
};
  return (
    <>
      {/* <Welcome />
      <ColorSchemeToggle /> */}
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
            <Header opened={opened} toggle={toggle} toggleUserMenu={toggleUserMenu} />
        </AppShell.Header>
        <AppShell.Navbar p="md">
            <OriginMenu />
        </AppShell.Navbar>
  
        <AppShell.Main>
        {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
