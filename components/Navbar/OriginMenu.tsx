'use client';

import { FC } from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconFlame, IconCards, IconStack2, IconAlertCircle,IconFlare } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../app/i18n/client";

interface OriginMenuProps {
  lng: string;
}

const OriginMenu: FC<OriginMenuProps> = ({lng }) => {
// function OriginMenu({ lng }:OriginMenuProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { t } = useTranslation(lng, ['common']);

// console.log('OriginMenu', lng);
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav>
      <NavLink
        component="button"
        label={t('common:navigation.home')}
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
        label={t('common:navigation.cards')}
        leftSection={<IconCards size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/cards')}
      />
      <NavLink
        component="button"
        label={t('common:navigation.deck')}
        leftSection={<IconStack2 size="1rem" stroke={1.5} />}
        // onClick={() => handleNavigation('/decks')}
      >
        <NavLink label={t('common:navigation.deck_list')} onClick={() => handleNavigation('/decks/list')} />
        <NavLink label={t('common:navigation.create_deck')} onClick={() => handleNavigation('/decks/build')} />
        {session && (
          <NavLink label={t('common:navigation.my_decks')} onClick={() => handleNavigation('/decks/user')} />
        )}
      </NavLink>
      <NavLink
        component="button"
        label={t('common:pokedex_collection')}
        leftSection={<IconFlare size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/recommend')}
      />
      <NavLink
        component="button"
        label={t('common:navigation.about')}
        leftSection={<IconAlertCircle size="1rem" stroke={1.5} />}
        onClick={() => handleNavigation('/about')}
      />
      
      {/* <Divider my="xs" label="討論區" labelPosition="left" />
      <Divider my="xs" label="部落格" labelPosition="left" /> */}
    </nav>
  );
}

export default OriginMenu;
