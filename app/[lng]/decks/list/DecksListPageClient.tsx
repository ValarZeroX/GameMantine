// app/[lng]/decks/list/DecksListPageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Blockquote, Box, ScrollArea, Badge, useMantineColorScheme, RangeSlider, MultiSelectProps, MultiSelect, TextInput, Stack, Collapse, Divider, Breadcrumbs, Anchor, Image, Select, Title, Container, Grid, Card, Text, Group, ActionIcon, Center, Loader, Button, Flex } from '@mantine/core';
import { IconSend, IconInfoCircle, IconX, IconStarFilled, IconCheck, IconBookmarkFilled, IconBookmark, IconFilter, IconSearch, IconHeart, IconSword, IconFilterOff } from '@tabler/icons-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from "../../../i18n/client";
import { showNotification } from '@mantine/notifications';
import InfiniteScroll from 'react-infinite-scroll-component';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { pt, aspectImages, aspectStringToNumber, rarityStringToNumber, typeStringToNumber, rarityImages } from '@/lib/constants';
import styles from './DecksListPageClient.module.css'; // 引入 CSS 模組
import { useSearchParams } from 'next/navigation';
import { Trans } from 'react-i18next';


interface CardList {
    set: string;
    number: string;
}


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

interface Deck {
    id: string;
    deckCards: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    isSaved: boolean;
    usageCount: number;
    averageRating: number;
}

interface DeckResponse {
    decks: Deck[];
    nextCursor: number;
    endCursor: boolean;
}

interface DecksListPageClientProps {
    lng: string;
}

const DecksListPageClient: React.FC<DecksListPageClientProps> = ({ lng }) => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState<number>(0);
    const limit = 10; // 每次載入的數量

    // 新增排序狀態
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortOrder, setSortOrder] = useState<string>('desc');

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

    const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [allCards, setAllCards] = useState<Card[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useLocalStorage<boolean>('isFilterOpenList', true);
    const toggle = () => setIsFilterOpen(!isFilterOpen);
    const [selectedSets, setSelectedSets] = useLocalStorage<string[]>('selectedSetsList', []);
    const [selectedDexs, setSelectedDexs] = useLocalStorage<string[]>('selectedDexsList', []);
    const [selectedAspects, setSelectedAspects] = useLocalStorage<string[]>('selectedAspectsList', []);
    const [selectedRarity, setSelectedRarity] = useLocalStorage<string[]>('selectedRarityList', []);
    const [selectedType, setSelectedType] = useLocalStorage<string[]>('selectedTypeList', []);
    const [selectedWeakness, setSelectedWeakness] = useLocalStorage<string[]>('selectedWeaknessList', []);
    const [selectedRetreat, setSelectedRetreat] = useLocalStorage<string[]>('selectedRetreatList', []);
    const [hpRange, setHpRange] = useLocalStorage<[number, number]>('hpRangeList', [0, 250]);
    const [attackRange, setAttackRange] = useLocalStorage<[number, number]>('attackRangeList', [0, 250]);
    const [selectedCard, setSelectedCard] = useState<string>('');


    // 無限滾動相關
    const [visibleCards, setVisibleCards] = useState<number>(20);

    const loadMoreCards = () => {
        setVisibleCards((prev) => prev + 20);
    };

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
        } catch (error) {
            // console.error('Error fetching cards:', error);
            setAllCards([]);
        }
    };


    useEffect(() => {
        if (selectedSets.length === 0) {
            setAllCards([]);
            setFilteredCards([]);
        } else {
            fetchCards(selectedSets);
        }
    }, [selectedSets]);


    useEffect(() => {
        let filtered = allCards;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(card =>
                t(`pokemon:${card.name}`).toLowerCase().includes(lowerSearch) ||
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
        setSelectedCard('');
    };

    useEffect(() => {
        const cardNumber = searchParams.get('selectedCard');
        if (cardNumber) {
            setSelectedCard(cardNumber);
        } else {
            setSelectedCard('');
        }

    }, [searchParams]);

    const fetchDecks = async (number: string | null, first: number | null) => {
        try {
            let url = new URL(`/api/decks/list`, window.location.origin);
            if (sortBy === 'usageCount') {
                 url = new URL(`/api/decks/list/usage`, window.location.origin);
            }
            if (sortBy === 'averageRating') {
                 url = new URL(`/api/decks/list/rating`, window.location.origin);
            }

            url.searchParams.append('limit', limit.toString());
            if (first !== null) {
                url.searchParams.append('cursor', first.toString());
            } else{
                url.searchParams.append('cursor', cursor.toString());
            }

            // 添加排序參數
            url.searchParams.append('sortBy', sortBy);
            url.searchParams.append('sortOrder', sortOrder);
            if (number !== null) {
                url.searchParams.append('card', number);
            } else {
                url.searchParams.append('card', selectedCard);
            }

            
            const res = await fetch(url.toString());
            if (!res.ok) {
                throw new Error('Failed to fetch decks');
            }

            const data: DeckResponse = await res.json();
            // 检查是否存在重复的 deck.id
        const deckIds = data.decks.map(deck => deck.id);
        const uniqueDeckIds = new Set(deckIds);
        if (uniqueDeckIds.size !== deckIds.length) {
            console.warn('Duplicate deck IDs found in the response:', deckIds);
        }

        setDecks(prev => {
            const mergedDecks = first !== null ? data.decks : [...prev, ...data.decks];
            // 使用 Map 确保 deck.id 的唯一性
            const uniqueDeckMap = new Map<string, Deck>();
            mergedDecks.forEach(deck => {
                uniqueDeckMap.set(deck.id, deck);
            });
            return Array.from(uniqueDeckMap.values());
        });

        setCursor(data.nextCursor);
        setHasMore(!data.endCursor);
            // console.log(data);
            // setDecks((prev) => [...prev, ...data.decks]);
            // // setDecks((prev) => {
            // //     const newDecks = data.decks.filter(
            // //         (deck) => !prev.some((existingDeck) => existingDeck.id === deck.id)
            // //     );
            // //     return [...prev, ...newDecks];
            // // });
            // setCursor(data.nextCursor);
            // if (data.endCursor) {
            //     setHasMore(false);
            // }
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
        const cardNumber = searchParams.get('selectedCard');
        // 初次載入資料
        setCursor(0);
        fetchDecks(cardNumber, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApplySort = () => {
        // 重置狀態以重新撈取資料
        setDecks([]);
        setCursor(0);
        setHasMore(true);
        fetchDecks(null, 0);
    };

    const parseDeckCards = (deckCards: string): CardList[] => {
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

    const handleNext = () => {
        fetchDecks(null, null); // 或傳遞適當的參數
    };

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.deck_list"), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));



    const icon = <IconInfoCircle />;

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t("common:navigation.deck_list")}</Title>
            <Blockquote color="blue" icon={icon} mt="xl">
                <Text><Trans i18nKey="common:filterInstruction" components={[
                    <IconFilter size={18} />,
                    <IconSend size={18} />
                ]} />
                </Text>
            </Blockquote>
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
            <Collapse in={isFilterOpen}>
                <Divider my="xs" label={t('common:advancedFiltering')} labelPosition="left" />
                <Box mb="md">
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
                        <Grid.Col span={{ base: 12, sm: 6, md: 6 }} mt="sm" mb="md">
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
                        <Grid.Col span={{ base: 12, sm: 6, md: 6 }} mt="sm" mb="md">
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
                </Box>
                <ScrollArea h={440} scrollbars="y" mt="md" id="scrollableDiv">
                    <Box mt="md" h={610} >
                        <Grid mt="md" columns={10}>
                            {filteredCards.slice(0, visibleCards).map((card) => (
                                <Grid.Col key={card.id} span={{ base: 5, sm: 2, md: 2, lg: 2 }}>
                                    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() =>
                                        setSelectedCard(selectedCard === card.number ? '' : card.number)
                                    } style={{ cursor: 'pointer', filter: selectedCard && selectedCard !== card.number ? 'grayscale(100%)' : 'none', }}>
                                        <Card.Section>
                                            <Image
                                                src={`/${lng}/${card.set}/${card.number}.webp`}
                                                alt={t(`pokemon:${card.name}`)}
                                                loading="lazy"
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
                                                {card.dex.filter((dex) => dex !== "NO").map((dex, index) => (
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
                        {/* 載入更多按鈕 */}
                        {visibleCards < filteredCards.length && (
                            <Center mt="md">
                                <Button onClick={loadMoreCards}>載入更多</Button>
                            </Center>
                        )}
                    </Box>
                </ScrollArea>
            </Collapse>
            <Divider my="xs" label={t("common:navigation.deck_list")} labelPosition="left" />
            <Flex mt="md" align="flex-end" gap="md">
                <Select
                    label={t("common:sorting.sortingMode")}
                    placeholder={t("common:sorting.chooseSortingMode")}
                    data={[
                        { value: 'averageRating', label: t("common:sorting.rating") },
                        { value: 'usageCount', label: t("common:sorting.favorite") },
                        { value: 'createdAt', label: t("common:sorting.creationTime") },
                    ]}
                    value={sortBy}
                    onChange={(value) => {
                        if (value !== null) {
                            setSortBy(value);
                        }
                    }}
                    style={{ width: 200 }}
                />
                <Select
                    label={t("common:sorting.sortingOrder")}
                    placeholder={t("common:sorting.chooseSortingOrder")}
                    data={[
                        { value: 'desc', label: t("common:sorting.descendingNewest") },
                        { value: 'asc', label: t("common:sorting.ascendingOldest") },
                    ]}
                    value={sortOrder}
                    onChange={(value) => {
                        if (value !== null) {
                            setSortOrder(value);
                        }
                    }}
                    style={{ width: 200 }}
                />
                <Button onClick={handleApplySort} style={{ height: 36 }}>
                    <IconSend />{t("common:sorting.submit")}
                </Button>
            </Flex>
            <InfiniteScroll
                dataLength={decks.length}
                next={handleNext}
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
                                            <IconStarFilled color="#fcc419" />
                                            <Text fw={500}>{deck.averageRating.toFixed(2)}</Text>
                                            {deck.isSaved ? (
                                                <ActionIcon variant="default" size="lg" onClick={() => handleDeleteDeck(deck.id)}>
                                                    <IconBookmarkFilled color="#fcc419" />
                                                </ActionIcon>
                                            ) : (
                                                <ActionIcon variant="default" size="lg" onClick={() => handleSaveDeck(deck.id)}>
                                                    <IconBookmark color="#fcc419" />
                                                </ActionIcon>
                                            )}
                                            <Text fw={500}>{deck.usageCount}</Text>
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
                                                    loading="lazy"
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