// app/[lng]/decks/user/UserDecksPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Breadcrumbs,Box, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center,Loader, Image } from '@mantine/core';
import { IconX, IconCards, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../../i18n/client";
import { showNotification } from '@mantine/notifications';

interface Deck {
    id: string;
    deckCards: string;
    version: number;
    createdAt: string;
    updatedAt: string;
}

interface DeckUser {
    id: number;
    deckId: string;
    userId: string;
    deckName: string;
    createdAt: string;
    updatedAt: string;
    deck: Deck;
}

interface UserDecksPageClientProps {
    lng: string;
}

interface Card {
    set: string;
    number: string;
}

const UserDecksPageClient: React.FC<UserDecksPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    const [userDecks, setUserDecks] = useState<DeckUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserDecks = async () => {
            if (!session?.user?.id) return;

            setIsLoading(true);
            try {
                const response = await fetch('/api/decks/user');
                const data = await response.json();
                if (response.ok) {
                    setUserDecks(data);
                } else {
                    showNotification({
                        title: '錯誤',
                        message: data.message || '獲取牌庫失敗。',
                        color: 'red',
                        icon: <IconX size={16} />,
                    });
                }
            } catch (error) {
                showNotification({
                    title: '錯誤',
                    message: '獲取牌庫時發生錯誤。',
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDecks();
    }, [session]);

    const parseDeckCards = (deckCards: string): Card[] => {
        return deckCards.split(',').map(code => {
            const lastHyphenIndex = code.lastIndexOf('-');

            // 如果沒有找到連字符，則整個代碼作為 set，number 留空
            if (lastHyphenIndex === -1) {
                return { set: code.trim(), number: '' };
            }

            const set = code.substring(0, lastHyphenIndex).trim();
            const number = code.substring(lastHyphenIndex + 1).trim();

            return { set, number };
        });
    };

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.my_decks"), href: '#' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    return (
        <Container size="lg">
            {!session?.user ? (
                <Center>
                    <Text>{t('common:errors.error_insufficient_permissions')}{' '}
                    <Anchor component={Link} href="/login" size="sm">
                        {t('common:login.login')}
                    </Anchor></Text>
                </Center>
            ) : (
                <>
                <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t('common:title.my_decks')}</Title>
            {isLoading ? (
                <Text component="div"><Center><Loader size="md" my="md" /></Center></Text>
            ) : (
                <Grid mt="md" columns={10}>
                    {userDecks.map((deckUser) => (
                        <Grid.Col key={deckUser.id}  span={10}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Card.Section withBorder inheritPadding py="xs">
                                <Group  mb="xs" justify="space-between">
                                <Box w={300}>
                                    <Text truncate="end">{deckUser.deckName}</Text>
                                    </Box>
                                    <Group>
                                    <ActionIcon variant="default" size="lg" component={Link} href={`/decks/${deckUser.deck.id}`}>
                                        <IconCards />
                                    </ActionIcon>
                                    <ActionIcon variant="default" size="lg" component={Link} href={`/decks/${deckUser.id}/edit`}>
                                        <IconEdit />
                                    </ActionIcon>
                                    </Group>
                                </Group>
                                </Card.Section>
                                <Grid columns={10} mt="md">
                                        {parseDeckCards(deckUser.deck.deckCards).map((card, index) => (
                                            <Grid.Col key={`${deckUser.id}-${card.set}-${card.number}-${index}`} span={{ base: 2, sm: 2, md: 1, lg: 1 }}>
                                                <Image
                                                    radius="md"
                                                    src={`/${lng}/${card.set}/${card.set}-${card.number}.webp`}
                                                    alt={`${card.set}-${card.number}`}
                                                />
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            )}
            </>
            )}
        </Container>
    );
};

export default UserDecksPageClient;