// app/[lng]/decks/user/UserDecksPageClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SemiCircleProgress, Progress, Breadcrumbs, Anchor, Title, Center, useMantineColorScheme, Loader, RangeSlider, Blockquote, Flex, Stack, Collapse, MultiSelectProps, Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table, Divider, MultiSelect, ScrollArea, Box } from '@mantine/core';
import { IconDiamondsFilled, IconStarFilled, IconCrown, IconX, IconSearch, IconFilter, IconFilterOff, IconCheck, IconCategory, IconHeart, IconSword, IconRefresh, IconDeviceFloppy } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../i18n/client";
// import classes from './CardsPage.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { showNotification } from "@mantine/notifications";
import { pt, aspectImages, aspectStringToNumber, rarityStringToNumber, typeStringToNumber, dexColorMap, odds } from '@/lib/constants';

interface Card {
    id: number;
    number: string;
    set: string;
    dex: string[];
    rarity: number;
    name: string;
    type: number;
    stage: number;
    hp: number;
    aspects: number;
    attack_1: number;
    attack_name_1: string;
    attack_aspects_1: number[] | string[];
    attack_skill_1?: string;
    attack_skill_name_1?: string;
    attack_2?: number;
    attack_name_2?: string;
    attack_aspects_2?: number[] | string[];
    attack_skill_2?: string;
    attack_skill_name_2?: string;
    ability_name?: string;
    ability_directions?: string;
    ability?: string;
    retreat: number;
    retreat_aspects: number[] | string[];
    weakness: number;
    weakness_value: number;
    illustrator: string;
    point: number;
    reprints?: { [key: string]: string[] } | null;
    rule?: string;
}

interface RecommendPageClientProps {
    lng: string;
}

interface CountPerDex {
    [dex: string]: {
        [rarity: string]: {
            count: number;
            cardNumber: string[];
        };
    };
}

interface ProbabilityPerDex {
    [dex: string]: {
        pos1_3: number;
        pos4: number;
        pos5: number;
    };
}

const calculateNewCardProbabilities = (
    cardCounts: CountPerDex,
    collectedCards: Set<string>
): ProbabilityPerDex => {
    const probabilities: ProbabilityPerDex = {};

    Object.keys(cardCounts).forEach(dex => {
        probabilities[dex] = { pos1_3: 0, pos4: 0, pos5: 0 };
        const dexData = cardCounts[dex];

        // 計算 pos1_3（僅稀有度 1）
        const rarity1 = dexData["1"];
        if (rarity1) {
            const totalRarity1 = rarity1.count;
            const pos1_3Initial = odds[1][0]; // 100%
            const perCardPos1_3Decrease = pos1_3Initial / totalRarity1;

            const collectedRarity1 = rarity1.cardNumber.filter(card => collectedCards.has(card)).length;
            const pos1_3Remaining = pos1_3Initial - (perCardPos1_3Decrease * collectedRarity1);
            probabilities[dex].pos1_3 = Math.max(pos1_3Remaining, 0);
        }

        // 計算 pos4 和 pos5（稀有度 2-8）
        for (let rarity = 2; rarity <= 8; rarity++) {
            const rarityStr = rarity.toString();
            const rarityData = dexData[rarityStr];
            if (rarityData) {
                const totalRarity = rarityData.count;
                const pos4Initial = odds[rarity][1];
                const pos5Initial = odds[rarity][2];
                const perCardPos4Decrease = pos4Initial / totalRarity;
                const perCardPos5Decrease = pos5Initial / totalRarity;

                const collectedRarity = rarityData.cardNumber.filter(card => collectedCards.has(card)).length;
                const pos4Remaining = pos4Initial - (perCardPos4Decrease * collectedRarity);
                const pos5Remaining = pos5Initial - (perCardPos5Decrease * collectedRarity);

                probabilities[dex].pos4 += Math.max(pos4Remaining, 0);
                probabilities[dex].pos5 += Math.max(pos5Remaining, 0);
            }
        }

        // 確保機率不低於 0 並不超過 100%
        probabilities[dex].pos1_3 = Math.min(Math.max(probabilities[dex].pos1_3, 0), 100);
        probabilities[dex].pos4 = Math.min(Math.max(probabilities[dex].pos4, 0), 100);
        probabilities[dex].pos5 = Math.min(Math.max(probabilities[dex].pos5, 0), 100);
    });

    return probabilities;
};

const RecommendPageClient: React.FC<RecommendPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const { colorScheme } = useMantineColorScheme();  // 获取当前主题

    // 定义图标颜色，根据主题色不同选择颜色
    const [iconBlueColor, setIconBlueColor] = useState('#228be6'); // 默认蓝色
    const [iconRedColor, setIconRedColor] = useState('red'); // 默认红色

    useEffect(() => {
        // 根据主题更新颜色
        if (colorScheme === 'dark') {
            setIconBlueColor('white');
            setIconRedColor('white');
        } else {
            setIconBlueColor('#228be6');
            setIconRedColor('red');
        }
    }, [colorScheme]);


    const router = useRouter();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    // console.log(cards)
    const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [allCards, setAllCards] = useState<Card[]>([]);
    // const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

    // const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    // const [active, setActive] = useState('grid');
    // const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
    // const [isFilterOpen, { toggle }] = useDisclosure(false); // 新增狀態
    const [isFilterOpen, setIsFilterOpen] = useLocalStorage<boolean>('isFilterOpenRecommend', true);
    const toggle = () => setIsFilterOpen(!isFilterOpen);

    //過濾卡片
    const [selectedSets, setSelectedSets] = useLocalStorage<string[]>('selectedSetsRecommend', []);
    const [selectedDexs, setSelectedDexs] = useLocalStorage<string[]>('selectedDexsRecommend', []);
    const [selectedAspects, setSelectedAspects] = useLocalStorage<string[]>('selectedAspectsRecommend', []);
    const [selectedRarity, setSelectedRarity] = useLocalStorage<string[]>('selectedRarityRecommend', []);
    const [selectedType, setSelectedType] = useLocalStorage<string[]>('selectedTypeRecommend', []);
    const [selectedWeakness, setSelectedWeakness] = useLocalStorage<string[]>('selectedWeaknessRecommend', []);
    const [selectedRetreat, setSelectedRetreat] = useLocalStorage<string[]>('selectedRetreatRecommend', []);
    const [hpRange, setHpRange] = useLocalStorage<[number, number]>('hpRangeRecommend', [0, 250]);
    const [attackRange, setAttackRange] = useLocalStorage<[number, number]>('attackRangeRecommend', [0, 250]);


    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [dexCounts, setDexCounts] = useState<{ [dex: string]: { collected: number; total: number } }>({});
    const [cardCounts, setCardCounts] = useState<CountPerDex>({});
    const [collectedCards, setCollectedCards] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [probabilities, setProbabilities] = useState<ProbabilityPerDex>({});

    // useEffect(() => {
    const fetchCollectedCards = async (sets: string[]) => {
        if (session?.user?.id) {
            try {
                const query = sets.length > 0 ? `set=${sets.join(',')}` : '';
                const response = await fetch(`/api/recommend?userId=${session.user.id}&${query}`);
                if (response.ok) {
                    const data = await response.json();
                    setCollectedCards(new Set(data.favoriteCard.mycards));
                    localStorage.setItem('collectedCards', JSON.stringify(data.favoriteCard.mycards));
                } else {
                    // 若無資料，使用 LocalStorage
                    const stored = localStorage.getItem('collectedCards');
                    if (stored) {
                        setCollectedCards(new Set(JSON.parse(stored)));
                    }
                }
            } catch (error) {
                console.error('Error fetching collected cards:', error);
            }
        } else {
            // 無使用者，僅使用 LocalStorage
            const stored = localStorage.getItem('collectedCards');
            if (stored) {
                setCollectedCards(new Set(JSON.parse(stored)));
            }
        }
    };

    //     fetchCollectedCards();
    // }, [session]);

    // 初始化已收集的卡牌ID，从localStorage中读取
    useEffect(() => {
        const storedCollected = localStorage.getItem('collectedCards');
        if (storedCollected) {
            setCollectedCards(new Set(JSON.parse(storedCollected)));
        }
    }, []);

    // 更新localStorage，当collectedCards变化时
    useEffect(() => {
        localStorage.setItem('collectedCards', JSON.stringify(Array.from(collectedCards)));
    }, [collectedCards]);

    // 处理卡牌点击，切换收集状态
    const handleCardClick = (cardNumber: string) => {
        setCollectedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(cardNumber)) {
                newSet.delete(cardNumber);
            } else {
                newSet.add(cardNumber);
            }
            return newSet;
        });
    };

    useEffect(() => {
        const counts: { [dex: string]: { collected: number; total: number } } = {};

        allCards.forEach(card => {
            card.dex.forEach(dex => {
                if (!counts[dex]) {
                    counts[dex] = { collected: 0, total: 0 };
                }
                counts[dex].total += 1;
                if (collectedCards.has(card.number)) {
                    counts[dex].collected += 1;
                }
            });
        });

        setDexCounts(counts);
    }, [allCards, collectedCards]);


    // 無限滾動相關
    const [visibleCards, setVisibleCards] = useState<number>(20);

    const loadMoreCards = () => {
        setVisibleCards((prev) => prev + 20);
    };

    const handleRowClick = (cardNumber: string) => {
        router.push(`/${lng}/cards/${cardNumber}`);
    };

    // 在組件掛載時從 localStorage 讀取 displayMode
    // useEffect(() => {
    //     const savedDisplayMode = localStorage.getItem('displayMode');
    //     if (savedDisplayMode === 'grid' || savedDisplayMode === 'list') {
    //         setDisplayMode(savedDisplayMode);
    //         setActive(savedDisplayMode);
    //     }
    // }, []);

    // // 切換顯示模式和設置 active 狀態
    // const toggleDisplayMode = (mode: 'grid' | 'list') => {
    //     setDisplayMode(mode);
    //     setActive(mode);
    //     localStorage.setItem('displayMode', mode);
    // };

    // const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    //     controlsRefs[name] = node;
    //     setControlsRefs(controlsRefs);
    // };

    const seriesOptions = ['A1', 'PROMO-A'].map((setKey) => ({
        value: setKey,
        label: `(${setKey})${t(`common:cardSet.${setKey}`)}`,
    }));

    const seriesOptionsDex = ['A1C', 'A1M', 'A1P'].map((setKey) => ({
        value: setKey,
        label: `(${setKey})${t(`common:cardDex.${setKey}`)}`,
    }));

    //['草', '火', '水', '雷電', '超能', '格鬥', '惡', '金屬', '龍', '普通']
    const seriesOptionsAspects = ['grass', 'fire', 'water', 'lightning', 'psychic', 'fighting', 'darkness', 'metal', 'dragon', 'colorless'].map((setKey) => ({
        value: setKey,
        label: `${t(`common:${setKey}`)}`,
    }));

    const seriesOptionsRarity = ['Common', 'Uncommon', 'Rare', 'DoubleRare', 'ArtRare', 'SuperRare', 'ImmersiveRare', 'UltraRare'].map((setKey) => ({
        value: setKey,
        label: `${t(`common:${setKey}`)}`,
    }));

    const seriesOptionsType = ['pokemon', 'item', 'supporter'].map((setKey) => ({
        value: setKey,
        label: `${t(`common:${setKey}`)}`,
    }));

    // const seriesOptionsWeakness = ['grass', 'fire', 'water', 'lightning', 'psychic', 'fighting', 'darkness', 'metal', 'dragon', 'colorless'].map((setKey) => ({
    //     value: setKey,
    //     label: `${t(`common:${setKey}`)}`,
    // }));

    const seriesOptionsRetreat = ['1', '2', '3', '4', '5'].map((setKey) => ({
        value: setKey,
        label: setKey,
    }));

    // 撈取卡片數據的函數
    const fetchCards = async (sets: string[]) => {
        try {
            const query = sets.length > 0 ? `?sets=${sets.join(',')}` : '';
            const response = await fetch(`/api/card${query}`);
            if (!response.ok) {
                throw new Error('無法取得卡片資料。');
            }
            const data: Card[] = await response.json();
            setAllCards(data);


            const counts: { [dex: string]: { collected: number; total: number } } = {};

            data.forEach(card => {
                card.dex.forEach(dex => {
                    if (!counts[dex]) {
                        counts[dex] = { collected: 0, total: 0 };
                    }
                    counts[dex].total += 1;
                });
            });

            const countsPerDex: CountPerDex = {};

            data.forEach(card => {
                card.dex?.forEach(dex => {
                    if (typeof dex !== 'string') return; // 確保 dex 為字串

                    if (!countsPerDex[dex]) {
                        countsPerDex[dex] = {};
                    }

                    const rarity = card.rarity;

                    if (!countsPerDex[dex][rarity]) {
                        countsPerDex[dex][rarity] = { count: 0, cardNumber: [] };
                    }

                    countsPerDex[dex][rarity].count += 1;
                    countsPerDex[dex][rarity].cardNumber.push(card.number);
                });
            });
            setCardCounts(countsPerDex);
            setDexCounts(counts);
        } catch (error) {
            // console.error('Error fetching cards:', error);
            setAllCards([]);
        }
    };

    // 初始化撈取
    // useEffect(() => {
    //     fetchCards(selectedSets);
    // }, []); // 初始撈取，僅撈取A1

    // 當過濾條件改變時，撈取匹配的卡片
    useEffect(() => {
        if (selectedSets.length === 0) {
            setAllCards([]);
            setFilteredCards([]);
        } else {
            fetchCards(selectedSets);
            fetchCollectedCards(selectedSets);
        }
    }, [selectedSets]);


    useEffect(() => {
        let filtered = allCards;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(card =>
                t(`pokemon:${card.name}`).toLowerCase().includes(lowerSearch) ||
                t(`pokemon:${card.number}`).toLowerCase().includes(lowerSearch) ||
                t(`skill:${card.attack_name_1}.name`).toLowerCase().includes(lowerSearch) ||
                t(`skill:${card.attack_name_1}.description`).toLowerCase().includes(lowerSearch) ||
                t(`skill:${card.attack_name_2}.name`).toLowerCase().includes(lowerSearch) ||
                t(`skill:${card.attack_name_2}.description`).toLowerCase().includes(lowerSearch) ||
                t(`ability:${card.ability_name}.name`).toLowerCase().includes(lowerSearch) ||
                t(`ability:${card.ability_name}.description`).toLowerCase().includes(lowerSearch)
            );
        }

        if (selectedSets.length > 0) {
            filtered = filtered.filter(card =>
                selectedSets.includes(card.set)
            );
        }

        if (selectedDexs.length > 0) {
            filtered = filtered.filter(card =>
                card.dex.some(dex => selectedDexs.includes(dex))
            );
        }

        if (selectedAspects.length > 0) {
            // 將選取的屬性字符串轉換為數字
            const selectedAspectNumbers = selectedAspects
                .map(aspect => aspectStringToNumber[aspect])
                .filter((num): num is number => typeof num === 'number');

            // 使用轉換後的數字進行過濾
            filtered = filtered.filter(card =>
                selectedAspectNumbers.includes(card.aspects)
            );
        }

        if (selectedRarity.length > 0) {
            // 將選取的屬性字符串轉換為數字
            const selectedRarityNumbers = selectedRarity
                .map(aspect => rarityStringToNumber[aspect])
                .filter((num): num is number => typeof num === 'number');

            // 使用轉換後的數字進行過濾
            filtered = filtered.filter(card =>
                selectedRarityNumbers.includes(card.rarity)
            );
        }

        if (selectedType.length > 0) {
            const selectedTypeNumbers = selectedType
                .map(type => typeStringToNumber[type])
                .filter((num): num is number => typeof num === 'number');

            filtered = filtered.filter(card =>
                selectedTypeNumbers.includes(card.type)
            );
        }

        if (selectedWeakness.length > 0) {
            // 將選取的屬性字符串轉換為數字
            const selectedAspectNumbers = selectedWeakness
                .map(weakness => aspectStringToNumber[weakness])
                .filter((num): num is number => typeof num === 'number');

            // 使用轉換後的數字進行過濾
            filtered = filtered.filter(card =>
                selectedAspectNumbers.includes(card.weakness)
            );
        }

        if (selectedRetreat.length > 0) {
            // 將選取的撤退字串轉換為數字
            const selectedRetreatNumbers = selectedRetreat
                .map(retreat => Number(retreat)) // 或使用 retreatStringToNumber[retreat] 如果有定義映射
                .filter((num): num is number => !isNaN(num));

            filtered = filtered.filter(card =>
                selectedRetreatNumbers.includes(card.retreat)
            );
        }

        filtered = filtered.filter(card =>
            card.hp >= hpRange[0] && card.hp <= hpRange[1]
        );

        filtered = filtered.filter(card =>
            (card.attack_1 >= attackRange[0] && card.attack_1 <= attackRange[1]) ||
            (card.attack_2 != null && card.attack_2 >= attackRange[0] && card.attack_2 <= attackRange[1])
        );

        setFilteredCards(filtered);
        setVisibleCards(20); // 重置可見卡片數量
    }, [allCards, searchTerm, selectedSets, selectedDexs, selectedAspects, selectedRarity, selectedType, selectedWeakness, selectedRetreat, hpRange, attackRange]);

    const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
        <Group gap="sm">
            <Image src={`/common/${option.value}.webp`} alt={t(`common:${option.value}`)} height={20} width={20} />
            <Text size="sm">{t(`common:${option.value}`)}</Text>
        </Group>
    );

    const renderMultiSelectOptionRarity: MultiSelectProps['renderOption'] = ({ option }) => (
        <Group gap="sm">
            <Image src={`/common/${option.value}.webp`} alt={t(`common:${option.value}`)} height={20} width={20} />
            <Text size="sm">{t(`common:${option.value}`)}</Text>
        </Group>
    );


    const clearFilters = () => {
        setSelectedDexs([]);
        setSelectedAspects([]);
        setSelectedRarity([]);
        setSelectedType([]);
        setSelectedWeakness([]);
        setSelectedRetreat([]);
        setSearchTerm('');
        setHpRange([0, 250]);
        setAttackRange([0, 250]);
    };

    useEffect(() => {
        const newProbabilities = calculateNewCardProbabilities(cardCounts, collectedCards);
        setProbabilities(newProbabilities);
    }, [cardCounts, collectedCards]);

    // const collectedCardsString = useMemo(() => {
    //     return Array.from(collectedCards).sort().join(',');
    // }, [collectedCards]);

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:pokedex_collection"), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const clearFavoriteCard = () => {
        setCollectedCards(new Set());
    };

    const handleSaveCards = async () => {
        if (!session?.user) {
            showNotification({
                title: t('common:notification.error_not_logged_in'),
                message: t('common:notification.error_please_login'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        // const trimmedDeckName = deckName.trim();
        // if (trimmedDeckName.length > 50) {
        //     showNotification({
        //         title: t('common:notification.error_name_too_long'),
        //         message: t('common:notification.error_deck_name_length'),
        //         color: 'red',
        //         icon: <IconX size={16} />,
        //     });
        //     return;
        // }
        const cardsArray = Array.from(collectedCards);
        // const cards = collectedCardsString;
        // if (selectedDeck.length !== 20) {
        //     showNotification({
        //         title: t('common:notification.error_title'),
        //         message: t('common:notification.error_deck_size'),
        //         color: 'red',
        //         icon: <IconX size={16} />,
        //     });
        //     return;
        // }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/recommend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cards: cardsArray,
                    userId: session.user.id,
                    set: selectedSets[0]
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showNotification({
                    title: t('common:notification.success'),
                    message: t('common:notification.success_recommend_saved'),
                    color: 'green',
                    icon: <IconCheck size={16} />,
                });
            } else {
                showNotification({
                    title: t("common:notification.error"),
                    message: data.message || t("common:notification.error_save_recommend_failed"),
                    color: 'red',
                    icon: <IconX size={16} />,
                });
            }
        } catch (error) {
            showNotification({
                title: t("common:notification.error"),
                message: t('common:notification.error_save_recommend'),
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t("common:pokedex_collection")}</Title>
            <Group mt="md" justify="flex-end" align="center" >
                <ActionIcon variant="default" size="lg" onClick={clearFavoriteCard}>
                    <IconRefresh />
                </ActionIcon>
                <ActionIcon variant="default" size="lg" onClick={handleSaveCards} >
                    <IconDeviceFloppy />
                </ActionIcon>
            </Group>
            {/* <Grid>
                {Object.entries(probabilities).map(([dex, probs]) => (
                    <Grid.Col key={dex} span={4}>
                        <Text fw={800}>{`Dex: ${dex}`}</Text>
                        <Text>{`1-3張卡獲得新卡機率: ${probs.pos1_3.toFixed(2)}%`}</Text>
                        <Text>{`第4張卡獲得新卡機率: ${probs.pos4.toFixed(2)}%`}</Text>
                        <Text>{`第5張卡獲得新卡機率: ${probs.pos5.toFixed(2)}%`}</Text>
                    </Grid.Col>
                ))}
            </Grid> */}
            <Grid gutter="md" mb="md">
                {Object.entries(dexCounts).map(([dex, count]) => {
                    // if (dex === "NO") {
                    //     return null; // 排除 dex 為 "NO" 的項目
                    // }
                    const prob = probabilities[dex];
                    if (!prob) {
                        // 如果 probabilities 中沒有該 dex 的資訊，跳過渲染
                        return null;
                    }
                    const percentage = count.total > 0 ? (count.collected / count.total) * 100 : 0;
                    const color = dexColorMap[dex] || 'green';

                    return (
                        <React.Fragment key={dex}>
                            <Grid.Col span={12}>
                                <Text mt="sm">{`${t(`common:cardDex.${dex}`)} ${t("common:collection_progress")}`}</Text>
                                <Progress.Root size="xl">
                                    <Progress.Section value={percentage} color={color}>
                                        <Progress.Label>{`${count.collected}/${count.total}`}</Progress.Label>
                                    </Progress.Section>
                                </Progress.Root>
                                {/* <Text mt="sm">
                                {`抽到沒有新卡片的機率: ${(noNewProb * 100).toFixed(2)}%`}
                            </Text> */}
                            </Grid.Col>
                            {dex !== "NO" && dex !== "HIDDEN" && (
                                <>
                                    <Grid.Col span={4}>
                                        {/* <Text fw={800}>{`Dex: ${dex}`}</Text> */}
                                        <SemiCircleProgress
                                            size={140}
                                            thickness={20}
                                            value={prob.pos1_3}
                                            transitionDuration={250}
                                            label={`${prob.pos1_3.toFixed(2)}%`}
                                            filledSegmentColor={color}
                                        />
                                        <Text>{t("common:first_three_card_rate")}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {/* <Text fw={800}>{`Dex: ${dex}`}</Text> */}
                                        <SemiCircleProgress
                                            size={140}
                                            thickness={20}
                                            value={prob.pos4}
                                            transitionDuration={250}
                                            label={`${prob.pos4.toFixed(2)}%`}
                                            filledSegmentColor={color}
                                        />
                                        <Text>{t("common:fourth_card_rate")}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        {/* <Text fw={800}>{`Dex: ${dex}`}</Text> */}
                                        <SemiCircleProgress
                                            size={140}
                                            thickness={20}
                                            value={prob.pos5}
                                            transitionDuration={250}
                                            label={`${prob.pos5.toFixed(2)}%`}
                                            filledSegmentColor={color}
                                        />
                                        <Text>{t("common:fifth_card_rate")}</Text>
                                    </Grid.Col>
                                </>
                            )}
                        </React.Fragment>
                    );
                })}
            </Grid>
            <Divider my="xs" label={t("common:select_card")}labelPosition="center" />
            <Group align="center" justify="space-between" mb="md" mt="md">
                <MultiSelect
                    // label={t('common:set')}
                    placeholder={t('common:set')}
                    data={seriesOptions}
                    searchable
                    clearable
                    value={selectedSets}
                    onChange={setSelectedSets}
                    maxValues={1}
                />
                <Group>
                    <ActionIcon variant="default" size="lg" onClick={clearFilters}>
                        <IconFilterOff />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={toggle} >
                        <IconFilter />
                    </ActionIcon>
                </Group>
            </Group>
            {/* <Blockquote color="blue" icon={icon} mt="xl">
                <Text>{t('common:please_select_up_to_3_series')}</Text>
            </Blockquote> */}
            <Collapse in={isFilterOpen}>
                <Divider my="xs" label={t('common:advancedFiltering')} labelPosition="left" />
                <Group>
                    <TextInput
                        placeholder={t('common:search_card')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        leftSection={<IconSearch size={16} />}
                        radius="md"
                        size="md"
                        styles={{
                            input: { width: 300 },
                        }}
                    />
                </Group>
                <Grid mb="md">
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:dex')}
                            placeholder={t('common:dex')}
                            data={seriesOptionsDex}
                            searchable
                            clearable
                            value={selectedDexs}
                            onChange={setSelectedDexs}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:aspects')}
                            placeholder={t('common:aspects')}
                            data={seriesOptionsAspects}
                            clearable
                            renderOption={renderMultiSelectOption}
                            value={selectedAspects}
                            onChange={setSelectedAspects}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:rarity')}
                            placeholder={t('common:rarity')}
                            data={seriesOptionsRarity}
                            clearable
                            renderOption={renderMultiSelectOptionRarity}
                            value={selectedRarity}
                            onChange={setSelectedRarity}
                        />
                    </Grid.Col>
                </Grid>
                <Grid mb="md">
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:type')}
                            placeholder={t('common:type')}
                            data={seriesOptionsType}
                            clearable
                            value={selectedType}
                            onChange={setSelectedType}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:weakness')}
                            placeholder={t('common:weakness')}
                            data={seriesOptionsAspects}
                            clearable
                            renderOption={renderMultiSelectOption}
                            value={selectedWeakness}
                            onChange={setSelectedWeakness}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <MultiSelect
                            label={t('common:retreat')}
                            placeholder={t('common:retreat')}
                            data={seriesOptionsRetreat}
                            clearable
                            value={selectedRetreat}
                            onChange={setSelectedRetreat}
                        />
                    </Grid.Col>
                </Grid>
                <Grid mb="md" gutter="md">
                    {/* HP Range Slider */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 6 }} mt="sm">
                        <Stack >
                            <RangeSlider
                                min={0}
                                max={250}
                                value={hpRange}
                                onChange={setHpRange}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 50, label: '50' },
                                    { value: 100, label: '100' },
                                    { value: 150, label: '150' },
                                    { value: 200, label: '200' },
                                    { value: 250, label: '250' },
                                ]}
                                aria-label={t('common:hp_range')}
                                thumbSize={26}
                                thumbChildren={[<IconHeart size="1rem" key="1" color={iconRedColor} />, <IconHeart size="1rem" key="2" color={iconRedColor} />]}
                                color="red"
                            />
                        </Stack>
                    </Grid.Col>

                    {/* Attack Range Slider */}
                    <Grid.Col span={{ base: 12, sm: 6, md: 6 }} mt="sm">
                        <Stack >
                            <RangeSlider
                                min={0}
                                max={250}
                                value={attackRange}
                                onChange={setAttackRange}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 50, label: '50' },
                                    { value: 100, label: '100' },
                                    { value: 150, label: '150' },
                                    { value: 200, label: '200' },
                                    { value: 250, label: '250' },
                                ]}
                                aria-label={t('common:attack_range')}
                                thumbSize={26}
                                thumbChildren={[<IconSword size="1rem" key="3" color={iconBlueColor} />, <IconSword size="1rem" key="4" color={iconBlueColor} />]}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Collapse>
            <InfiniteScroll
                dataLength={visibleCards}
                next={loadMoreCards}
                hasMore={visibleCards < filteredCards.length}
                loader={<Center><Loader size="md" my="md" /></Center>}
                endMessage={<></>}
                style={{ width: '100%', overflow: 'hidden' }}
            >
                <Grid mt="md" columns={10}>
                    {filteredCards.slice(0, visibleCards).map((card) => (
                        <Grid.Col key={card.id} span={{ base: 5, sm: 2, md: 2, lg: 2 }}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => handleCardClick(card.number)}
                                style={{ cursor: 'pointer', position: 'relative' }}>
                                <Card.Section>
                                    <Image
                                        src={`/${lng}/${card.set}/${card.number}.webp`}
                                        alt={t(`pokemon:${card.name}`)}
                                        loading="lazy"
                                        style={{
                                            filter: collectedCards.has(card.number) ? 'none' : 'grayscale(100%)',
                                            transition: 'filter 0.3s',
                                        }}
                                    />
                                </Card.Section>
                                <Stack mt="md" align="center" gap="xs">
                                    <Text fw={700} size="lg">
                                        {t(`pokemon:${card.name}`)}
                                    </Text>
                                    <Text c="dimmed" size="sm">
                                        {card.number}
                                    </Text>
                                    <Flex gap="xs" justify="center" wrap="wrap">
                                        <Badge color="blue" variant="light">
                                            {t(`common:cardSet.${card.set}`)}
                                        </Badge>
                                        {card.dex.filter((dex) => dex !== "NO" && dex !== "HIDDEN").map((dex, index) => (
                                            <Badge color="green" variant="outline" key={index}>
                                                {t(`common:cardDex.${dex}`)}
                                            </Badge>
                                        ))}
                                    </Flex>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Container>
    );
};

export default RecommendPageClient;