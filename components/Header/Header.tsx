'use client';

import { FC } from 'react';
import { Group, Burger, rem, ActionIcon, Loader, Menu, Text } from '@mantine/core';
import { IconBrandMantine, IconLogin, IconLogout, IconLanguage } from '@tabler/icons-react';
import classes from './Header.module.css';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  toggleUserMenu: () => void;
}

const Header: FC<HeaderProps> = ({ opened, toggle, toggleUserMenu }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { i18n } = useTranslation(); // 使用 useTranslation Hook

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  // 語言切換函式
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // localStorage.setItem('i18nextLng', lng); // 將語言保存到 localStorage
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
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon variant="default" size="lg" aria-label="Language">
                <IconLanguage />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>語言選擇</Menu.Label>
              <Menu.Item onClick={() => changeLanguage('en')}>
                <Text>English</Text>
              </Menu.Item>
              <Menu.Item onClick={() => changeLanguage('zh-Hant')}>
                <Text>繁體中文</Text>
              </Menu.Item>
              {/* 未來可以在這裡添加更多語言 */}
            </Menu.Dropdown>
          </Menu>
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
