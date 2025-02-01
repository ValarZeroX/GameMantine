// app/[lng]/recommend/all/RecommendAllPageClien.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RingProgress, Paper, Select, Checkbox, SemiCircleProgress, Progress, Breadcrumbs, Anchor, Title, Center, useMantineColorScheme, Loader, RangeSlider, Blockquote, Flex, Stack, Collapse, MultiSelectProps, Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table, Divider, MultiSelect, ScrollArea, Box } from '@mantine/core';
import { IconDiamondsFilled, IconStarFilled, IconCrown, IconX, IconSearch, IconFilter, IconFilterOff, IconCheck, IconInfoCircle, IconHeart, IconSword, IconRefresh, IconDeviceFloppy } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../../i18n/client";
// import classes from './CardsPage.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { showNotification } from "@mantine/notifications";
import { setDexMenu, aspectImages, aspectStringToNumber, rarityStringToNumber, typeStringToNumber, dexColorMap, odds } from '@/lib/constants';

interface RecommendAllPageClientProps {
    lng: string;
}

const RecommendAllPageClient: React.FC<RecommendAllPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { colorScheme } = useMantineColorScheme();  // 获取当前主题
    const [isLoading, setIsLoading] = useState(false);
    const [favoriteCards, setFavoriteCards] = useState<any[]>([]); // 假設 favoriteCards 是一個陣列


    const router = useRouter();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);

    useEffect(() => {
        const fetchFavoriteCards = async () => {
            if (!session?.user?.id) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/recommend/all?userId=${session.user.id}`);
                const data = await response.json();
console.log(data);
                if (response.ok) {
                    setFavoriteCards(data.favoriteCards);
                } else {
                    showNotification({
                        title: t("common:notification.error_title"),
                        message: data.message || t("common:notification.fetch_failed"),
                        color: 'red',
                    });
                }
            } catch (error) {
                console.error('Error fetching favorite cards:', error);
                showNotification({
                    title: t("common:notification.error_title"),
                    message: t("common:notification.fetch_failed"),
                    color: 'red',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteCards();
    }, [session, t]);

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: '圖鑑進度總覽', href: '#' },
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
                    <Title order={1} mt="sm">圖鑑進度總覽</Title>
                    {isLoading ? (
                        <Text component="div"><Center><Loader size="md" my="md" /></Center></Text>
                    ) : (
                        <Grid>
                            
                        </Grid>
                    )}
                </>
            )}
        </Container>
    );
};

export default RecommendAllPageClient;