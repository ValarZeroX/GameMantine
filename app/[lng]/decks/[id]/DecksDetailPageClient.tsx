// app/[lng]/decks/user/DecksDetailPageClient.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Breadcrumbs, Anchor, Progress, Badge, Image, Button, Title, Container, Grid, Card, Rating, Group, ActionIcon, useMantineColorScheme, Stack, Text, Divider, Textarea } from '@mantine/core';
import { IconHeart, IconBookmark, IconBookmarkFilled, IconSend, IconCheck, IconX, IconDownload } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../../i18n/client";
import classes from './EditDecksPageClient.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import html2canvas from 'html2canvas';
import { useSession } from 'next-auth/react';
import { showNotification } from "@mantine/notifications";
import { useParams } from 'next/navigation';
import { pt } from '@/lib/constants';

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

interface Card {
    id: number;
    number: string;
    set: string;
    name: string;
    dex: string;
    rarity: number;
    type: number;
    stage: number;
    hp: number;
    aspects: number;
    attack_1: number;
    attack_name_1: string;
    attack_aspects_1: string;
    attack_skill_name_1?: string;
    attack_2?: number;
    attack_name_2?: string;
    attack_aspects_2?: string;
    attack_skill_name_2?: string;
    ability_name?: string;
    ability_directions?: string;
    ability?: string;
    retreat: number;
    retreat_aspects: string;
    weakness: number;
    weakness_value: number;
    illustrator: string;
    point: number;
    reprints?: string;
    rule?: string;
}


interface DecksDetailPageClientProps {
    lng: string;
}

const DecksDetailPageClient: React.FC<DecksDetailPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    const [deck, setDeck] = useState<Deck | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [allCards, setAllCards] = useState<Card[]>([]);
    const [deckCards, setDeckCards] = useState<Card[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    // 增加狀態變數
    const [ratingValue, setRatingValue] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [averageRating, setAverageRating] = useState<number>(0);
    const [ratingCount, setRatingCount] = useState<number>(0);

    const params = useParams();
    const { id } = params;

    const { colorScheme } = useMantineColorScheme();  // 获取当前主题
    const deckRef = useRef<HTMLDivElement>(null);
    // console.log(id);


    // 建立卡片映射表，提高查找效率
    // const cardMap = useMemo(() => {
    //     const map = new Map<string, Card>();
    //     allCards.forEach(card => {
    //         map.set(card.number, card);
    //     });
    //     return map;
    // }, [allCards]);
    useEffect(() => {
        if (!session?.user?.id) return;
        if (!id || Array.isArray(id)) {
            setError(t('common:notification.error_invalid_id'));
            setIsLoading(false);
            return;
        }

        const fetchIsSaved = async () => {
            try {
                const isSavedResponse = await fetch(`/api/decks/${id}`, {
                    method: 'GET',
                    credentials: 'include', // 確保攜帶 Cookie
                });

                if (!isSavedResponse.ok) {
                    const data = await isSavedResponse.json();
                    setError(data.message || t('common:notification.error_fetch_deck'));
                    setIsLoading(false);
                    return;
                }
                const isSavedData = await isSavedResponse.json();
                setIsSaved(isSavedData.isSaved);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching Deck:', err);
                // setError(t('common:notification.error_fetch_deck'));
                setIsLoading(false);
            }
        };

        fetchIsSaved();
    }, [id, t]);

    useEffect(() => {
        if (!id || Array.isArray(id)) {
            setError(t('common:notification.error_invalid_id'));
            setIsLoading(false);
            return;
        }

        const fetchDeck = async () => {
            try {
                const response = await fetch(`/api/decks/user/${id}`, {
                    method: 'GET',
                    credentials: 'include', // 確保攜帶 Cookie
                });

                if (!response.ok) {
                    const data = await response.json();
                    setError(data.message || t('common:notification.error_fetch_deck'));
                    setIsLoading(false);
                    return;
                }

                const data: { deck: Deck, cards: Card[] } = await response.json();
                setDeck(data.deck);

                // 將 deckCards 轉換為卡片詳細資料陣列
                const cardDetails = data.deck.deckCards.split(',').map(cardNumber => {
                    const card = data.cards.find(c => c.number === cardNumber.trim());
                    return card ? { ...card } : null;
                }).filter(card => card !== null) as Card[];

                // const isSavedResponse = await fetch(`/api/decks/${id}`, {
                //     method: 'GET',
                //     credentials: 'include', // 確保攜帶 Cookie
                // });

                // if (!isSavedResponse.ok) {
                //     const data = await isSavedResponse.json();
                //     setError(data.message || t('common:notification.error_fetch_deck'));
                //     setIsLoading(false);
                //     return;
                // }
                // const isSavedData = await isSavedResponse.json();

                setDeckCards(cardDetails);
                // setIsSaved(isSavedData.isSaved)
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching Deck:', err);
                setError(t('common:notification.error_fetch_deck'));
                setIsLoading(false);
            }
        };

        fetchDeck();
    }, [id, t]);

    // const parseDeckCards = (deckCards: string[]): Card[] => {
    //     return deckCards.map(code => {
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

    const cardTypeCounts = useMemo(() => {
        const counts = { pokemon: 0, item: 0, supporter: 0, pokemon_tool: 0 };
        deckCards.forEach((card) => {
            if (card.type === 0) counts.pokemon += 1;
            else if (card.type === 1) counts.item += 1;
            else if (card.type === 2) counts.supporter += 1;
            else if (card.type === 3) counts.pokemon_tool += 1;
        });
        return counts;
    }, [deckCards]);

    const progressValues = useMemo(() => {
        return {
            pokemon: cardTypeCounts.pokemon * 5,
            item: cardTypeCounts.item * 5,
            supporter: cardTypeCounts.supporter * 5,
            pokemon_tool: cardTypeCounts.pokemon_tool * 5,
        };
    }, [cardTypeCounts]);

    const totalExchangePoints = useMemo(() => {
        return deckCards.reduce((total, card) => total + pt[card.rarity], 0);
    }, [deckCards, pt]);

    const handleSaveDeck = async () => {
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
                    deckCards,
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
                setIsSaved(true);
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
            setIsLoading(false);
        }
    };

    const handlDeleteDeck = async () => {
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
                setIsSaved(false);
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
            setIsLoading(false);
        }
    };



    // 發送評價的函數
    const handleSubmitRating = async () => {
        if (!session?.user) {
            showNotification({
                title: t('common:notification.error_not_logged_in'),
                message: t('common:notification.error_please_login'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/decks/${id}/rating`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: ratingValue,
                    comment,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showNotification({
                    title: t('common:notification.success'),
                    message: '您的評分已提交',
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
                // 清空評分
                setRatingValue(0);
                setComment('');
            } else {
                showNotification({
                    title: t('common:notification.error_title'),
                    message: data.message || '提交評分時出錯',
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            showNotification({
                title: t('common:notification.error_title'),
                message: '提交評分時發生伺服器錯誤',
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`/api/decks/${id}/rating`);
                const data = await response.json();
                if (response.ok) {
                    setAverageRating(data.averageRating);
                    setRatingCount(data.ratingCount);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                // console.error('獲取平均評分時發生錯誤：', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAverageRating();
    }, [id]);

    const handleDownload = async () => {
        if (deckRef.current) {
            // Clone the node to modify styles without affecting the actual UI
            const clone = deckRef.current.cloneNode(true) as HTMLElement;

            // Apply background color based on the current theme
            clone.style.backgroundColor = colorScheme === 'dark' ? '#242424' : '#FFFFFF'; // Example colors

            // Append the clone to the body to ensure styles are applied
            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                backgroundColor: null, // Let the cloned element's background color apply
                useCORS: true, // Enable cross-origin images if needed
            });

            // Remove the clone after capturing
            document.body.removeChild(clone);

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'pokemonnier.png';
            link.click();
        }
    };

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.deck_list"), href: '/decks/list' },
        { title: t("common:navigation.deck"), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="md">{id} - {t("common:navigation.deck")}</Title>
            <Group mt="md" justify='flex-end'>
                <ActionIcon variant="default" size="lg" onClick={handleDownload}>
                    <IconDownload />
                </ActionIcon>
                {isSaved ? (
                    <ActionIcon variant="default" size="lg" onClick={handlDeleteDeck} loading={isLoading} >
                        <IconBookmarkFilled color="#fcc419" />
                    </ActionIcon>
                ) : (
                    <ActionIcon variant="default" size="lg" onClick={handleSaveDeck} loading={isLoading} >
                        <IconBookmark color="#fcc419" />
                    </ActionIcon>
                )}
            </Group>
            <div ref={deckRef}>
                <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                    <Grid columns={10} >
                        {deckCards.map((card, index) => (
                            <Grid.Col key={`${id}-${card.set}-${card.number}-${index}`} span={{ base: 2, sm: 2, md: 1, lg: 1 }}>
                                <Link href={`/${lng}/cards/${card.number}`} passHref style={{ textDecoration: 'none' }}>
                                    <Image
                                        radius="md"
                                        src={`/${lng}/${card.set}/${card.number}.webp`}
                                        alt={`${card.number}`}
                                    />
                                </Link>
                                <Stack mt="md" align="center" gap="xs">
                                    <Text fw={700} size="xs">
                                        {t(`pokemon:${card.name}`)}
                                    </Text>
                                    <Text c="dimmed" size="xs">
                                        {card.number}
                                    </Text>
                                </Stack>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Card>
                <Grid mt="md">
                    <Grid.Col span={12}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group mb="md">
                                <Badge color="cyan" variant="filled">
                                    {t('common:pokemon')}
                                </Badge>
                                <Badge color="pink" variant="filled">
                                    {t('common:item')}
                                </Badge>
                                <Badge color="orange" variant="filled">
                                    {t('common:supporter')}
                                </Badge>
                                <Badge color="blue" variant="filled">
                                    {t('common:pokemon_tool')}
                                </Badge>
                            </Group>
                            <Progress.Root size="20" >
                                <Progress.Section
                                    value={progressValues.pokemon}
                                    color="cyan"
                                >
                                    <Progress.Label>{cardTypeCounts.pokemon}</Progress.Label>
                                </Progress.Section>
                                <Progress.Section
                                    value={progressValues.item}
                                    color="pink"
                                >
                                    <Progress.Label>{cardTypeCounts.item}</Progress.Label>
                                </Progress.Section>
                                <Progress.Section
                                    value={progressValues.supporter}
                                    color="orange"
                                >
                                    <Progress.Label>{cardTypeCounts.supporter}</Progress.Label>
                                </Progress.Section>
                                <Progress.Section
                                    value={progressValues.pokemon_tool}
                                    color="blue"
                                >
                                    <Progress.Label>{cardTypeCounts.pokemon_tool}</Progress.Label>
                                </Progress.Section>
                            </Progress.Root>
                        </Card>
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            {t('common:points')}: {totalExchangePoints}
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                        <Card shadow="sm" padding="md" radius="md" withBorder>
                            <Group align="center">
                                <Rating value={averageRating} fractions={4} readOnly size="lg" />
                                <Text fw="600">{averageRating.toFixed(2)}</Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>
            </div>
            <Divider my="xs" labelPosition="left" />
            <Grid mt="md">
                <Grid.Col span={12}>
                    <Card padding="xs" radius="md" withBorder>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group justify="space-between">
                                <Text>{t("common:sorting.rating")}</Text>
                            </Group>
                        </Card.Section>
                        {/* <Textarea
                            mt="md"
                            placeholder="e.g. 這是一個很棒的牌組"
                            value={comment}
                            onChange={(event) => setComment(event.currentTarget.value)}
                        /> */}

                        <Rating
                            defaultValue={0}
                            size="lg"
                            fractions={2}
                            value={ratingValue}
                            onChange={setRatingValue}
                            mt="sm"
                        />
                        <Button
                            leftSection={<IconSend size={14} />}
                            variant="default"
                            fullWidth
                            mt="md"
                            radius="md"
                            onClick={handleSubmitRating}
                            disabled={isSubmitting}
                        >
                            {t("common:sorting.submit")}
                        </Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default DecksDetailPageClient;