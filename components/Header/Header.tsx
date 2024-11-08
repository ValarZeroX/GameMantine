'use client';

import { FC } from 'react';
import { Group, Burger, rem, ActionIcon } from '@mantine/core';
import { IconBrandMantine, IconLogin } from '@tabler/icons-react';
import classes from './Header.module.css';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  toggleUserMenu: () => void;
}

const Header: FC<HeaderProps> = ({ opened, toggle, toggleUserMenu }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <div className={classes.inner}>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <IconBrandMantine
          style={{ width: rem(36), height: rem(36) }}
          stroke={1.5}
          color="var(--mantine-color-blue-filled)"
        />
        <div>GameNier</div>
      </Group>
      <div className={classes.actionIcon}>
        <Group>
          <ActionIcon variant="default" size="lg" aria-label="Login" onClick={() => handleNavigation('/login')}>
            <IconLogin />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
};

export default Header;
