'use client';

import React from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconFlame } from '@tabler/icons-react';
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
      <NavLink
        component="button"
        label="卡牌"
        leftSection={<IconFlame size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/courses')}
      />
      <Divider my="xs" label="討論區" labelPosition="left" />
      <Divider my="xs" label="部落格" labelPosition="left" />
    </nav>
  );
}

export default OriginMenu;
