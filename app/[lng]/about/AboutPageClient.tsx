// app/[lng]/decks/user/UserDecksPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Divider, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center, Loader, Image } from '@mantine/core';
import { IconMail, IconCards, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../i18n/client";
import { showNotification } from '@mantine/notifications';


interface AboutPageClientProps {
    lng: string;
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    // const [userDecks, setUserDecks] = useState<DeckUser[]>([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const fetchUserDecks = async () => {
    //         if (!session?.user?.id) return;

    //         setIsLoading(true);
    //         try {
    //             const response = await fetch('/api/decks/user');
    //             const data = await response.json();
    //             if (response.ok) {
    //                 setUserDecks(data);
    //             } else {
    //                 showNotification({
    //                     title: '錯誤',
    //                     message: data.message || '獲取牌庫失敗。',
    //                     color: 'red',
    //                     icon: <IconX size={16} />,
    //                 });
    //             }
    //         } catch (error) {
    //             showNotification({
    //                 title: '錯誤',
    //                 message: '獲取牌庫時發生錯誤。',
    //                 color: 'red',
    //                 icon: <IconX size={16} />,
    //             });
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchUserDecks();
    // }, [session]);

    // const parseDeckCards = (deckCards: string): Card[] => {
    //     return deckCards.split(',').map(code => {
    //         const lastHyphenIndex = code.lastIndexOf('-');

    //         // 如果沒有找到連字符，則整個代碼作為 set，number 留空
    //         if (lastHyphenIndex === -1) {
    //             return { set: code.trim(), number: '' };
    //         }

    //         const set = code.substring(0, lastHyphenIndex).trim();
    //         const number = code.substring(lastHyphenIndex + 1).trim();

    //         return { set, number };
    //     });
    // };

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.about"), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t('common:navigation.about')}</Title>
            <Divider my="md" />
            <Grid mt="md" columns={10}>
                <Grid.Col span={10}><Text>{t("common:suggestions")}</Text></Grid.Col>
                <Grid.Col span={10}>
                    <Group><IconMail /><Text>skynier2024@gmail.com</Text></Group>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default AboutPageClient;