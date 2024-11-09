'use client';

import { FC } from 'react';
import { Group, Burger, rem, ActionIcon, Loader } from '@mantine/core';
import { IconBrandMantine, IconLogin, IconLogout } from '@tabler/icons-react';
import classes from './Header.module.css';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  toggleUserMenu: () => void;
}

const Header: FC<HeaderProps> = ({ opened, toggle, toggleUserMenu }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session)
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
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
          {status === 'loading' ? (
            // 當會話狀態加載中時，可以顯示一個載入指示器或空白
            <ActionIcon variant="default" size="lg" aria-label="Loading">
              <Loader color="blue" />
            </ActionIcon>
          ) : session ? (
            <ActionIcon variant="default" size="lg" aria-label="Logout" onClick={handleLogout}>
              <IconLogout />
            </ActionIcon>
          ) : (
            <ActionIcon variant="default" size="lg" aria-label="Login" onClick={() => handleNavigation('/login')}>
              <IconLogin />
            </ActionIcon>
          )}
        </Group>
      </div>
    </div>
  );
};

export default Header;
