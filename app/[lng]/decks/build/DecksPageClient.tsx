// app/[lng]/decks/build/DecksPageClient.tsx
'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Input, Progress, Title, Center, useMantineColorScheme, Loader, RangeSlider, Blockquote, Flex, Stack, Collapse, MultiSelectProps, Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table, Divider, MultiSelect, ScrollArea, Box } from '@mantine/core';
import { IconCheck, IconX, IconDeviceFloppy, IconDownload, IconRefresh, IconInfoCircle, IconSearch, IconFilter, IconFilterOff, IconListDetails, IconCategory, IconHeart, IconSword } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../../i18n/client";
import classes from './DecksPageClient.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import html2canvas from 'html2canvas';
import { useSession } from 'next-auth/react';
import { showNotification } from "@mantine/notifications";

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
    reprints?: string[] | null;
    rule?: string;
}

interface DecksPageClientProps {
    lng: string;
}

const DecksPageClient: React.FC<DecksPageClientProps> = ({ lng }) => {
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

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState('grid');
    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
    // const [isFilterOpen, { toggle }] = useDisclosure(false); // 新增狀態
    const [isFilterOpen, setIsFilterOpen] = useLocalStorage<boolean>('isFilterOpen', false);
    const toggle = () => setIsFilterOpen(!isFilterOpen);

    //過濾卡片
    const [selectedSets, setSelectedSets] = useLocalStorage<string[]>('selectedSets', []);
    const [selectedDexs, setSelectedDexs] = useLocalStorage<string[]>('selectedDexs', []);
    const [selectedAspects, setSelectedAspects] = useLocalStorage<string[]>('selectedAspects', []);
    const [selectedRarity, setSelectedRarity] = useLocalStorage<string[]>('selectedRarity', []);
    const [selectedType, setSelectedType] = useLocalStorage<string[]>('selectedType', []);
    const [selectedWeakness, setSelectedWeakness] = useLocalStorage<string[]>('selectedWeakness', []);
    const [selectedRetreat, setSelectedRetreat] = useLocalStorage<string[]>('selectedRetreat', []);
    const [hpRange, setHpRange] = useLocalStorage<[number, number]>('hpRange', [0, 250]);
    const [attackRange, setAttackRange] = useLocalStorage<[number, number]>('attackRange', [0, 250]);


    // const [selectedDeck, setSelectedDeck] = useState<Card[]>([]);
    const [deckName, setDeckName] = useState('');
    const [selectedDeck, setSelectedDeck] = useLocalStorage<Card[]>('selectedDeck', []);
    const [isLoading, setIsLoading] = useState(false);

    const deckRef = useRef<HTMLDivElement>(null);
    // 無限滾動相關
    const [visibleCards, setVisibleCards] = useState<number>(24);

    const loadMoreCards = () => {
        setVisibleCards((prev) => prev + 24);
    };

    const handleRowClick = (cardNumber: string) => {
        router.push(`/${lng}/cards/${cardNumber}`);
    };

    // 在組件掛載時從 localStorage 讀取 displayMode
    useEffect(() => {
        const savedDisplayMode = localStorage.getItem('displayMode');
        if (savedDisplayMode === 'grid' || savedDisplayMode === 'list') {
            setDisplayMode(savedDisplayMode);
            setActive(savedDisplayMode);
        }
    }, []);

    // 切換顯示模式和設置 active 狀態
    const toggleDisplayMode = (mode: 'grid' | 'list') => {
        setDisplayMode(mode);
        setActive(mode);
        localStorage.setItem('displayMode', mode);
    };

    const aspectImages: { [key: number]: string } = {
        0: '/common/grass.webp',
        1: '/common/fire.webp',
        2: '/common/water.webp',
        3: '/common/lightning.webp',
        4: '/common/psychic.webp',
        5: '/common/fighting.webp',
        6: '/common/darkness.webp',
        7: '/common/metal.webp',
        8: '/common/dragon.webp',
        9: '/common/colorless.webp',
    };

    // const aspectStringImages: { [key: string]: string } = {
    //     'grass': '/common/grass.webp',
    //     'fire': '/common/fire.webp',
    //     'water': '/common/water.webp',
    //     'lightning': '/common/lightning.webp',
    //     'psychic': '/common/psychic.webp',
    //     'fighting': '/common/fighting.webp',
    //     'darkness': '/common/darkness.webp',
    //     'metal': '/common/metal.webp',
    //     'dragon': '/common/dragon.webp',
    //     'colorless': '/common/colorless.webp',
    // };

    const aspectStringToNumber: { [key: string]: number } = {
        'grass': 0,
        'fire': 1,
        'water': 2,
        'lightning': 3,
        'psychic': 4,
        'fighting': 5,
        'darkness': 6,
        'metal': 7,
        'dragon': 8,
        'colorless': 9,
    };

    const rarityStringToNumber: { [key: string]: number } = {
        'Common': 1,
        'Uncommon': 2,
        'Rare': 3,
        'DoubleRare': 4,
        'ArtRare': 5,
        'SuperRare': 6,
        'ImmersiveRare': 7,
        'UltraRare': 8,
    };

    const typeStringToNumber: { [key: string]: number } = {
        'pokemon': 0,
        'item': 1,
        'supporter': 2,
    };

    const retreatStringToNumber: { [key: string]: number } = {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
    };

    const setControlRef = (name: string) => (node: HTMLButtonElement) => {
        controlsRefs[name] = node;
        setControlsRefs(controlsRefs);
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
                throw new Error(t('common:notification.error_fetch_card_data'));
            }
            const data: Card[] = await response.json();
            setAllCards(data);
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
        setVisibleCards(24); // 重置可見卡片數量
    }, [allCards, searchTerm, selectedSets, selectedDexs, selectedAspects, selectedRarity, selectedType, selectedWeakness, selectedRetreat, hpRange, attackRange]);


    const rarityImages: { [key: number]: string } = {
        0: '',
        1: '/common/Common.webp',
        2: '/common/Uncommon.webp',
        3: '/common/Rare.webp',
        4: '/common/DoubleRare.webp',
        5: '/common/ArtRare.webp',
        6: '/common/SuperRare.webp',
        7: '/common/ImmersiveRare.webp',
        8: '/common/UltraRare.webp',
    };

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

    const icon = <IconInfoCircle />;

    const handleCardClick = (card: Card) => {
        const count = selectedDeck.filter(selectedCard => selectedCard.id === card.id).length;

        if (count >= 2) {
            // alert('每張卡牌最多選擇兩次');
            return;
        }

        if (selectedDeck.length >= 20) {
            // alert('牌組已達到20張');
            return;
        }

        setSelectedDeck([...selectedDeck, card]);
    };

    const clearDeck = () => {
        setSelectedDeck([]);
    };

    // 排序選擇的牌組
    const sortedSelectedDeck = useMemo(() => {
        return [...selectedDeck].sort((a, b) => {
            // 分割 card.number 為前綴和數字部分
            const splitA = a.number.split('-');
            const splitB = b.number.split('-');

            // 前綴部分（可能包含多個 '-')
            const prefixA = splitA.slice(0, -1).join('-').toUpperCase();
            const prefixB = splitB.slice(0, -1).join('-').toUpperCase();

            // 比較前綴
            if (prefixA < prefixB) return -1;
            if (prefixA > prefixB) return 1;

            // 數字部分
            const numA = parseInt(splitA[splitA.length - 1], 10);
            const numB = parseInt(splitB[splitB.length - 1], 10);

            return numA - numB;
        });
    }, [selectedDeck]);

    const removeCard = (cardToRemove: Card) => {
        // 找到要移除的卡牌在 selectedDeck 中的第一个匹配项
        const index = selectedDeck.findIndex(
            (card) =>
                card.id === cardToRemove.id &&
                card.number === cardToRemove.number &&
                card.set === cardToRemove.set
        );

        if (index !== -1) {
            const newDeck = [...selectedDeck];
            newDeck.splice(index, 1);
            setSelectedDeck(newDeck);
        }
    };

    const cardTypeCounts = useMemo(() => {
        const counts = { pokemon: 0, item: 0, supporter: 0 };
        selectedDeck.forEach((card) => {
            if (card.type === 0) counts.pokemon += 1;
            else if (card.type === 1) counts.item += 1;
            else if (card.type === 2) counts.supporter += 1;
        });
        return counts;
    }, [selectedDeck]);

    const progressValues = useMemo(() => {
        return {
            pokemon: cardTypeCounts.pokemon * 5,
            item: cardTypeCounts.item * 5,
            supporter: cardTypeCounts.supporter * 5,
        };
    }, [cardTypeCounts]);

    const pt: { [key: number]: number } = {
        0: 0,
        1: 35,
        2: 70,
        3: 150,
        4: 500,
        5: 400,
        6: 1250,
        7: 1500,
        8: 2500,
    };

    const totalExchangePoints = useMemo(() => {
        return selectedDeck.reduce((total, card) => total + pt[card.rarity], 0);
    }, [selectedDeck, pt]);

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

        const trimmedDeckName = deckName.trim();
        if (trimmedDeckName.length > 30) {
            showNotification({
                title: t('common:notification.error_name_too_long'),
                message: t('common:notification.error_deck_name_length'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        const deckCards = selectedDeck.map(card => card.number).sort().join(',');

        if (selectedDeck.length !== 20) {
            showNotification({
                title: t('common:notification.error_title'),
                message: t('common:notification.error_deck_size'),
                color: 'red',
                icon: <IconX size={16} />,
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/decks/build`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deckCards,
                    deckName: deckName.trim() || t('common:notification.notification_unnamed'),
                    userId: session.user.id,
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
                title: t("common:notification.error"),
                message: t('common:notification.error_save_deck'),
                color: 'red',
                icon: <IconX size={16} />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container size="lg">
            <Title order={1}>{t('common:title.decks_build_title')}</Title>
            <Group mt="md" justify="flex-end" align="center" >
                <Input
                    placeholder={t(`common:deck_name`)}
                    value={deckName}
                    onChange={(event) => {
                        const value = event.currentTarget.value;
                        if (value.length <= 30) {
                            setDeckName(value);
                        }
                    }}
                    maxLength={30}
                    style={{ flexGrow: 1 }}
                />
                <ActionIcon variant="default" size="lg" onClick={clearDeck}>
                    <IconRefresh />
                </ActionIcon>
                <ActionIcon variant="default" size="lg" onClick={handleDownload}>
                    <IconDownload />
                </ActionIcon>
                <ActionIcon variant="default" size="lg" onClick={handleSaveDeck} loading={isLoading}>
                    <IconDeviceFloppy />
                </ActionIcon>
            </Group>
            <div ref={deckRef}>
                <Grid mt="md" columns={10}>
                    {sortedSelectedDeck.map((card, index) => (
                        <Grid.Col key={`${card.id}-${index}`} span={{ base: 2, sm: 2, md: 1, lg: 1 }}>
                            <Image
                                radius="md"
                                src={`/${lng}/${card.set}/${card.number}.webp`}
                                alt={t(`pokemon:${card.name}`)}
                                onClick={() => removeCard(card)}
                            />
                            <Text size="xs" mt="xs">
                                {t(`pokemon:${card.name}`)}
                            </Text>
                            <Text size="xs">
                                #{card.number}
                            </Text>
                        </Grid.Col>
                    ))}
                </Grid>
                <Grid>
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
                            </Progress.Root>
                        </Card>
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            {selectedDeck.length}/20
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 12, md: 4, lg: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            {t('common:points')}: {totalExchangePoints}
                        </Card>
                    </Grid.Col>
                </Grid>
            </div>
            <Divider my="md" />
            <Group align="center" justify="space-between" mb="md" mt="md">
                <MultiSelect
                    // label={t('common:set')}
                    placeholder={t('common:set')}
                    data={seriesOptions}
                    searchable
                    clearable
                    value={selectedSets}
                    onChange={setSelectedSets}
                    maxValues={3}
                />
                <Group>
                    <ActionIcon variant="default" size="lg" onClick={clearFilters}>
                        <IconFilterOff />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={toggle} >
                        <IconFilter />
                    </ActionIcon>
                    <div className={classes.root} dir="ltr" ref={setRootRef}>
                        <FloatingIndicator
                            target={controlsRefs[active]}
                            parent={rootRef}
                            className={classes.indicator}
                        />
                        <div className={classes.controlsGroup}>
                            <UnstyledButton variant="default" size="lg" className={classes.control} aria-label="Category" onClick={() => { setActive('grid'); toggleDisplayMode('grid') }} ref={setControlRef('grid')}
                                mod={{ active: active === 'grid' }}>
                                <IconCategory />
                            </UnstyledButton >
                            <UnstyledButton variant="default" size="lg" className={classes.control} aria-label="ListDetails" onClick={() => { { setActive('list'); toggleDisplayMode('list'); } }}
                                ref={setControlRef('list')}
                                mod={{ active: active === 'list' }}>
                                <IconListDetails />
                            </UnstyledButton >
                        </div>
                    </div>
                </Group>
            </Group>
            <Blockquote color="blue" icon={icon} mt="xl">
                <Text>{t('common:please_select_up_to_3_series')}</Text>
            </Blockquote>
            <Collapse in={isFilterOpen}>
                <Divider my="xs" label="進階過濾" labelPosition="left" />
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
                {displayMode === 'grid' ? (
                    <Grid mt="md">
                        {filteredCards.slice(0, visibleCards).map((card) => (
                            <Grid.Col key={card.id} span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
                                {/* <Link href={`/${lng}/cards/${card.number}`} passHref style={{ textDecoration: 'none' }}> */}
                                <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
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
                                        <Text color="dimmed" size="sm">
                                            #{card.number}
                                        </Text>
                                    </Stack>
                                </Card>
                                {/* </Link> */}
                            </Grid.Col>
                        ))}
                    </Grid>
                ) : (
                    <Group mt="md" >
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <ScrollArea>
                                <Box w={1060} >
                                    <Table striped verticalSpacing="lg">
                                        <Table.Thead>
                                            <Table.Tr >
                                                <Table.Th style={{ textAlign: 'center' }}>{t('common:name')}</Table.Th>
                                                <Table.Th >{t('common:aspects')}</Table.Th>
                                                <Table.Th >{t('common:hp')}</Table.Th>
                                                <Table.Th >{t('common:stage')}</Table.Th>
                                                <Table.Th >{t('common:rarity')}</Table.Th>
                                                <Table.Th >{t('common:weakness')}</Table.Th>
                                                <Table.Th >{t('common:retreat')}</Table.Th>
                                                <Table.Th style={{ width: 300 }}>{t('common:attack')} & {t('common:ability')}</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {filteredCards.slice(0, visibleCards).map((card) => (
                                                //onClick={() => handleRowClick(card.number)}
                                                <Table.Tr key={card.number} >
                                                    <Table.Td>
                                                        <Group> <Image
                                                            src={`/${lng}/${card.set}/${card.number}.webp`}
                                                            alt={t(`pokemon:${card.name}`)}
                                                            loading="lazy"
                                                            style={{ width: 100 }}
                                                        />
                                                            <Stack gap="xs" align="center">
                                                                <Text mt="xs">{t(`pokemon:${card.name}`)}</Text>
                                                                <Text c="dimmed" size="xs" mt="xs">#{card.number}</Text>
                                                            </Stack>
                                                        </Group>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {card.type === 0 ? (
                                                            <Group>
                                                                <Image
                                                                    src={aspectImages[card.aspects]}
                                                                    alt="Element Aspect"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                            </Group>
                                                        ) : null}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Badge size="lg" circle variant="gradient" gradient={{ from: 'red', to: 'violet', deg: 90 }}>
                                                            <Text size="xs">{card.hp}</Text>
                                                        </Badge>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Badge color="blue">{t(`common:cardStage.${card.stage}`)}</Badge>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {card.rarity !== 0 && (
                                                            <Group>
                                                                <Image
                                                                    src={rarityImages[card.rarity]}
                                                                    alt="Rarity"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                            </Group>
                                                        )}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {card.weakness !== 10 && (
                                                            <Group>
                                                                <Image
                                                                    src={aspectImages[card.weakness]}
                                                                    alt="Weakness"
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                                <Badge size="lg" circle variant="gradient" gradient={{ from: 'red', to: 'violet', deg: 90 }}>
                                                                    <Text size="xs">{card.weakness_value}</Text>
                                                                </Badge>
                                                            </Group>
                                                        )}
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Group gap="xs">
                                                            {card.retreat_aspects.filter((aspect) => aspect !== 99).map((aspect, index) => (
                                                                <Image
                                                                    key={index}
                                                                    src={aspectImages[aspect as number]}
                                                                    alt={`Aspect ${aspect}`}
                                                                    height={20}
                                                                    width={20}
                                                                />
                                                            ))}
                                                        </Group>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        {card.type === 0 ? (
                                                            <>
                                                                <Badge>{t(`skill:${card.attack_name_1}.name`)}</Badge>
                                                                <Group gap="xs" mt="xs">
                                                                    <Badge size="lg" circle variant="gradient"
                                                                        gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text size="xs">{card.attack_1}</Text></Badge>
                                                                    {card.attack_aspects_1.map((aspect, index) => (
                                                                        <Image
                                                                            key={index}
                                                                            src={aspectImages[aspect as number]}
                                                                            alt={`Aspect`}
                                                                            height={20}
                                                                            width={20}
                                                                        />
                                                                    ))}
                                                                </Group>
                                                                {card.attack_skill_name_1 && card.attack_skill_name_1.length > 0 && (
                                                                    <Text c="dimmed" size="xs" mt="xs">{t(`skill:${card.attack_name_1}.description`)}</Text>
                                                                )}
                                                                {card.attack_aspects_2 && card.attack_aspects_2.length > 0 && (
                                                                    <>
                                                                        <Divider my="md" />
                                                                        <Badge>{t(`skill:${card.attack_name_2}.name`)}</Badge>
                                                                        <Group gap="xs" mt="xs">
                                                                            <Badge size="lg" circle variant="gradient"
                                                                                gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text size="xs">{card.attack_2}</Text></Badge>
                                                                            {card.attack_aspects_2.map((aspect, index) => (
                                                                                <Image
                                                                                    key={index}
                                                                                    src={aspectImages[aspect as number]}
                                                                                    alt={`Aspect`}
                                                                                    height={20}
                                                                                    width={20}
                                                                                />
                                                                            ))}
                                                                        </Group>
                                                                    </>
                                                                )}
                                                                {card.attack_skill_name_2 && card.attack_skill_name_2.length > 0 && (
                                                                    <Text c="dimmed" size="xs" mt="xs">{t(`skill:${card.attack_name_2}.description`)}</Text>
                                                                )}
                                                                {card.ability_name && card.ability_name.length > 0 && (
                                                                    <>
                                                                        <Divider my="md" />
                                                                        <Badge color="orange"><Text size="xs">{t(`ability:${card.ability_name}.name`)}</Text></Badge>
                                                                        <Text c="dimmed" size="xs" mt="xs">{t(`ability:${card.ability_name}.description`)}</Text>
                                                                    </>
                                                                )}
                                                            </>
                                                        ) :
                                                            <>
                                                                <Text c="dimmed">{t(`rule:${card.attack_skill_name_1}`)}</Text>
                                                            </>}
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </Table>
                                </Box>
                            </ScrollArea>
                        </Card>
                    </Group>
                )}
            </InfiniteScroll>
        </Container>
    );
};

export default DecksPageClient;