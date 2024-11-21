// app/[lng]/cards/CardsListClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Anchor,Title, Center, useMantineColorScheme, Loader, RangeSlider, Blockquote, Flex, Stack, Collapse, MultiSelectProps, Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table, Divider, MultiSelect, ScrollArea, Box } from '@mantine/core';
import { IconInfoCircle, IconSearch, IconFilter, IconFilterOff, IconListDetails, IconCategory, IconHeart, IconSword } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../i18n/client";
import classes from './CardsPage.module.css';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { pt, aspectImages, aspectStringToNumber, rarityStringToNumber, typeStringToNumber, rarityImages } from '@/lib/constants';

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

interface CardsListClientProps {
    lng: string;
}

const CardsListClient: React.FC<CardsListClientProps> = ({ lng }) => {

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
    const [isFilterOpen, setIsFilterOpen] = useLocalStorage<boolean>('isFilterOpen', true);
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

    // 無限滾動相關
    const [visibleCards, setVisibleCards] = useState<number>(20);

    const loadMoreCards = () => {
        setVisibleCards((prev) => prev + 20);
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
                throw new Error('無法取得卡片資料。');
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

    const icon = <IconInfoCircle />;

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.cards"), href: '#' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t('common:title.cards_title')}</Title>
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
                <Divider my="xs" label={t('common:advancedFiltering')}labelPosition="left" />
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
                    <Grid mt="md" columns={10}>
                        {filteredCards.slice(0, visibleCards).map((card) => (
                            <Grid.Col key={card.id} span={{ base: 5, sm: 2, md: 2, lg: 2 }}>
                                <Link href={`/${lng}/cards/${card.number}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
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
                                </Link>
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

export default CardsListClient;