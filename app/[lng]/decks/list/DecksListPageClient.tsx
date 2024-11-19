// app/[lng]/decks/list/DecksListPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Image, Anchor, Title, Container, Grid, Card, Text, Group, ActionIcon, Center, Loader } from '@mantine/core';
import { IconX, IconListDetails, IconCheck, IconBookmarkFilled, IconBookmark } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../../i18n/client";
import { showNotification } from '@mantine/notifications';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Card {
    set: string;
    number: string;
}

interface Deck {
    id: string;
    deckCards: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    isSaved: boolean;
    usageCount: number;
}

interface DeckResponse {
    decks: Deck[];
    nextCursor: string | null;
}

interface DecksListPageClientProps {
    lng: string;
}

const DecksListPageClient: React.FC<DecksListPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const limit = 20; // 每次載入的數量

    const fetchDecks = async () => {
        try {
            const url = new URL(`/api/decks/list`, window.location.origin);
            url.searchParams.append('limit', limit.toString());
            if (cursor) {
                url.searchParams.append('cursor', cursor);
            }

            const res = await fetch(url.toString());
            if (!res.ok) {
                throw new Error('Failed to fetch decks');
            }

            const data: DeckResponse = await res.json();
            setDecks((prev) => [...prev, ...data.decks]);
            setCursor(data.nextCursor);
            if (!data.nextCursor) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching decks:', error);
            showNotification({
                title: t('common:error'),
                message: t('common:failedToFetchDecks'),
                color: 'red',
            });
        }
    };

    useEffect(() => {
        fetchDecks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleSaveDeck = async (id: string) => {
        if (!session?.user) {
            showNotification({
                title: t('common:notification.error_not_logged_in'),
                message: t('common:notification.error_please_login'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        try {
            const response = await fetch(`/api/decks/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // deckCards,
                    deckName: t('common:notification.notification_unnamed'),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showNotification({
                    title: t('common:notification.success'),
                    message: t('common:notification.success_deck_saved'),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
                // setIsSaved(true);
                setDecks(prevDecks => prevDecks.map(deck => 
                    deck.id === id ? { ...deck, isSaved: true, usageCount: deck.usageCount + 1 } : deck
                ));
            } else {
                showNotification({
                    title: t("common:notification.error"),
                    message: data.message || t("common:notification.error_save_deck_failed"),
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            }
        } catch (error) {
            showNotification({
                title: t('common:notification.error'),
                message: t('common:notification.error_save_deck'),
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            // setIsLoading(false);
        }
    };

    const handleDeleteDeck = async (id: string) => {
        if (!session?.user) {
            showNotification({
                title: t('common:notification.error_not_logged_in'),
                message: t('common:notification.error_please_login'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        try {
            const response = await fetch(`/api/decks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            
            if (response.ok) {
                showNotification({
                    title: t('common:notification.success'),
                    message: t('common:notification.success_deck_deleted'),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
                // setIsSaved(false);
                setDecks(prevDecks => prevDecks.map(deck => 
                    deck.id === id ? { ...deck, isSaved: false, usageCount: deck.usageCount - 1 } : deck
                ));
            } else {
                showNotification({
                    title: t("common:notification.error_title"),
                    message: data.message || t("common:notification.error_delete_deck_failed"),
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            }
        } catch (error) {
            showNotification({
                title: t('common:notification.error_title'),
                message: t('common:notification.error_delete_deck'),
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <Container size="lg">
            <Title order={1}>牌組列表</Title>
            <InfiniteScroll
                dataLength={decks.length}
                next={fetchDecks}
                hasMore={hasMore}
                loader={
                    <Center mt="md">
                        <Loader />
                    </Center>
                }
                endMessage={<></>}
                style={{ width: '100%', overflow: 'hidden' }}
            >
                <Grid mt="md">
                    {decks.map((deck) => (
                        <Grid.Col key={deck.id}>

                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Group style={{ marginBottom: 5 }} justify="space-between">
                                        <Title order={4}>{deck.id}</Title>
                                        <Group>
                                        {deck.isSaved ? (
                                            <ActionIcon variant="default" size="lg" onClick={() => handleDeleteDeck(deck.id)}>
                                                <IconBookmarkFilled color="#fcc419" />
                                            </ActionIcon>
                                        ) : (
                                            <ActionIcon variant="default" size="lg" onClick={() => handleSaveDeck(deck.id)}>
                                                <IconBookmark color="#fcc419" /> 
                                            </ActionIcon>
                                        )}
                                        <Text  fw={500}>{deck.usageCount}</Text>
                                        </Group>
                                    </Group>
                                </Card.Section>
                                <Link href={`/decks/${deck.id}`} passHref style={{ textDecoration: 'none' }}>
                                    <Grid columns={10} mt="md">
                                        {parseDeckCards(deck.deckCards).map((card, index) => (
                                            <Grid.Col key={`${deck.id}-${card.set}-${card.number}-${index}`} span={{ base: 2, sm: 2, md: 1, lg: 1 }}>
                                                <Image
                                                    radius="md"
                                                    src={`/${lng}/${card.set}/${card.set}-${card.number}.webp`}
                                                    alt={`${card.set}-${card.number}`}
                                                />
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </Link>
                                {/* <Text size="xs" color="dimmed">
                                    {new Date(deck.updatedAt).toLocaleDateString(lng)}
                                </Text> */}
                            </Card>

                        </Grid.Col>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Container>
    );
};

export default DecksListPageClient;