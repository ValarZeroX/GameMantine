'use client';

import React from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconFlame, IconCards, IconStack2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

function OriginMenu() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav>
      <NavLink
        component="button"
        label="首頁"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/')}
      />
      {/* <NavLink
        component="button"
        label="卡牌"
        leftSection={<IconFlame size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/courses')}
      /> */}
      <NavLink
        component="button"
        label="卡牌"
        leftSection={<IconCards size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/cards')}
      />
      {/* <NavLink
        component="button"
        label="牌組"
        leftSection={<IconStack2 size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/decks')}
      /> */}
      {/* <Divider my="xs" label="討論區" labelPosition="left" />
      <Divider my="xs" label="部落格" labelPosition="left" /> */}
    </nav>
  );
}

export default OriginMenu;
