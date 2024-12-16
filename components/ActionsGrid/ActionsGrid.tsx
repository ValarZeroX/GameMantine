'use client';

import {
    IconCards, IconStack2, IconFlare, IconUsers
  } from '@tabler/icons-react';
  import {
    Anchor,
    Card,
    Group,
    SimpleGrid,
    Text,
    UnstyledButton,
    Container,
  } from '@mantine/core';
  import classes from './ActionsGrid.module.css';
  import { FC } from 'react';
  import { useTranslation } from "../../app/i18n/client";
  import { useRouter } from 'next/navigation';

  
  interface ActionsGridProps {
    lng: string;
  }
  
  const ActionsGrid: FC<ActionsGridProps> = ({ lng }) => {

    const { t } = useTranslation(lng, ['common']);
    const router = useRouter();
    // const theme = useMantineTheme();

    const mockdata = [
        { title: t('common:navigation.cards'), icon: IconCards, color: 'violet', href: '/cards'  },
        { title: t('common:navigation.deck'), icon: IconStack2, color: 'indigo', href: '/decks/list' },
        { title: t('common:pokedex_collection'), icon: IconFlare, color: 'blue', href: '/recommend' },
        { title: t('common:community'), icon: IconUsers, color: 'blue', href: '/community/friend' },
      ];

      const handleNavigation = (href: string) => {
        router.push(href);
      };
  
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item} onClick={() => handleNavigation(item.href)}>
        <item.icon size={32} />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    ));
  
    return (
        <Container size="lg">
      <Card withBorder radius="md" className={classes.card}>
        <Group justify="space-between">
          <Text className={classes.title}>{t("common:feature")}</Text>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
      </Container>
    );
  }

  export default ActionsGrid;