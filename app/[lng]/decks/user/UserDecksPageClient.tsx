// app/[lng]/decks/user/UserDecksPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center,Loader } from '@mantine/core';
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
            <Title order={1}>{t('common:title.my_decks')}</Title>
            {isLoading ? (
                <Text component="div"><Center><Loader size="md" my="md" /></Center></Text>
            ) : (
                <Grid mt="md" columns={10}>
                    {userDecks.map((deckUser) => (
                        <Grid.Col key={deckUser.id}  span={{ base: 10, sm: 5, md: 5, lg: 5 }}>
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
                                <Text mt="sm" size="sm" c="dimmed">
                                    {t('common:card_count')}: {deckUser.deck.deckCards.split(',').length}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {t('common:creation_time')}: {new Date(deckUser.createdAt).toLocaleDateString()}
                                </Text>
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