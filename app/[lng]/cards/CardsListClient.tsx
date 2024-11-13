// app/[lng]/cards/CardsListClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Collapse, MultiSelectProps, Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table, Divider, MultiSelect, ScrollArea, Box } from '@mantine/core';
import { IconSearch, IconFilter, IconFilterOff, IconListDetails, IconCategory, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from "../../i18n/client";
import classes from './CardsPage.module.css';


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
    ability?: number;
    retreat: number;
    retreat_aspects: number[] | string[];
    weakness: number;
    weakness_value: number;
    illustrator: string;
    point: number;
    reprints?: string[] | null;
    rule?: string;
}

interface CardsListClientProps {
    cards: Card[];
    lng: string;
}

const CardsListClient: React.FC<CardsListClientProps> = ({ cards, lng }) => {
    const { t } = useTranslation(lng, ['A1', 'common', 'skill', 'ability']);
    console.log(cards)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards);
    // const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState('grid');
    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false); // 新增狀態

    //過濾卡片
    const [selectedSets, setSelectedSets] = useState<string[]>([]);
    const [selectedDexs, setSelectedDexs] = useState<string[]>([]);
    const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string[]>([]);
    const [selectedWeakness, setSelectedWeakness] = useState<string[]>([]);
    const [selectedRetreat, setSelectedRetreat] = useState<string[]>([]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredCards(cards);
        } else {
            const filtered = cards.filter(card =>
                card.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredCards(filtered);
        }
    };

    // 切換顯示模式和設置 active 狀態
    const toggleDisplayMode = (mode: 'grid' | 'list') => {
        setDisplayMode(mode);
        setActive(mode);
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


    useEffect(() => {
        let filtered = cards;

        if (searchTerm) {
            filtered = filtered.filter(card =>
                card.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        setFilteredCards(filtered);
    }, [searchTerm, selectedSets, selectedDexs, selectedAspects, selectedRarity, selectedType, selectedWeakness, selectedRetreat, cards]);


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
            <div>
                <Text size="sm">{t(`common:${option.value}`)}</Text>
            </div>
        </Group>
    );

    const renderMultiSelectOptionRarity: MultiSelectProps['renderOption'] = ({ option }) => (
        <Group gap="sm">
            <Image src={`/common/${option.value}.webp`} alt={t(`common:${option.value}`)} height={20} width={20} />
            <div>
                <Text size="sm">{t(`common:${option.value}`)}</Text>
            </div>
        </Group>
    );


    return (
        <Container size="lg">
            <Group align="center" justify="space-between" mb="md">
                <TextInput
                    placeholder={t('common:search_card')}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    leftSection={<IconSearch size={16} />}
                    radius="md"
                    size="md"
                    styles={{
                        input: { width: 300 },
                    }}
                />
                <Group>
                    <ActionIcon variant="default" size="lg" >
                        <IconFilterOff />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={() => setIsFilterOpen((prev) => !prev)} >
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
            <Collapse in={isFilterOpen}>
                <Divider my="xs" label="一般搜尋" labelPosition="left" />
                <Group mb="md">
                    <MultiSelect
                        label={t('common:set')}
                        placeholder={t('common:set')}
                        data={seriesOptions}
                        searchable
                        clearable
                        value={selectedSets}
                        onChange={setSelectedSets}
                    />
                    <MultiSelect
                        label={t('common:dex')}
                        placeholder={t('common:dex')}
                        data={seriesOptionsDex}
                        searchable
                        clearable
                        value={selectedDexs}
                        onChange={setSelectedDexs}
                    />
                    <MultiSelect
                        label={t('common:aspects')}
                        placeholder={t('common:aspects')}
                        data={seriesOptionsAspects}
                        searchable
                        clearable
                        renderOption={renderMultiSelectOption}
                        value={selectedAspects}
                        onChange={setSelectedAspects}
                    />
                    <MultiSelect
                        label={t('common:rarity')}
                        placeholder={t('common:rarity')}
                        data={seriesOptionsRarity}
                        searchable
                        clearable
                        renderOption={renderMultiSelectOptionRarity}
                        value={selectedRarity}
                        onChange={setSelectedRarity}
                    />
                    <MultiSelect
                        label={t('common:type')}
                        placeholder={t('common:type')}
                        data={seriesOptionsType}
                        searchable
                        clearable
                        value={selectedType}
                        onChange={setSelectedType}
                    />
                    <MultiSelect
                        label={t('common:weakness')}
                        placeholder={t('common:weakness')}
                        data={seriesOptionsAspects}
                        searchable
                        clearable
                        renderOption={renderMultiSelectOption}
                        value={selectedWeakness}
                        onChange={setSelectedWeakness}
                    />
                    <MultiSelect
                        label={t('common:retreat')}
                        placeholder={t('common:retreat')}
                        data={seriesOptionsRetreat}
                        searchable
                        clearable
                        value={selectedRetreat}
                        onChange={setSelectedRetreat}
                    />
                </Group>
                <Divider my="xs" label="進階搜尋" labelPosition="left" />
            </Collapse>
            {displayMode === 'grid' ? (
                <Group mt="md" >
                    <Grid mt="md">
                        {filteredCards.map((card) => (
                            <Grid.Col key={card.id} span={{ base: 6, sm: 4, md: 3 }}>
                                <Link href={`/${lng}/cards/${card.number}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                                        <Card.Section>
                                            <Image
                                                src={`/${lng}/${card.set}/${card.number}.webp`}
                                                alt={t(`A1:${card.number}.name`)}
                                            />
                                        </Card.Section>
                                        <Group mt="md" mb="xs" align="center" justify="center">
                                            <Text fw={600}>{t(`A1:${card.number}.name`)}</Text>
                                        </Group>
                                        <Group align="center" justify="center">
                                            <Badge color="blue">{t(`common:cardSet.${card.set}`)}</Badge>
                                            {card.dex.map((dex, index) => (
                                                <Badge color="blue" key={index}>{t(`common:cardDex.${dex}`)}</Badge>
                                            ))}
                                        </Group>
                                    </Card>
                                </Link>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Group>
            ) : (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <ScrollArea>
                        <Box w={1060}>
                            <Table striped verticalSpacing="lg">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>{t('common:name')}</Table.Th>
                                        <Table.Th>{t('common:aspects')}</Table.Th>
                                        <Table.Th>{t('common:hp')}</Table.Th>
                                        <Table.Th>{t('common:stage')}</Table.Th>
                                        <Table.Th>{t('common:rarity')}</Table.Th>
                                        <Table.Th>{t('common:weakness')}</Table.Th>
                                        <Table.Th>{t('common:retreat')}</Table.Th>
                                        <Table.Th style={{ width: 300 }}>{t('common:attack')} & {t('common:ability')}</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {filteredCards.map((card) => (
                                        <Table.Tr key={card.number}>
                                            <Table.Td>{t(`A1:${card.number}.name`)}</Table.Td>
                                            <Table.Td>
                                                <Group>
                                                    <Image
                                                        src={aspectImages[card.aspects]}
                                                        alt="Element Aspect"
                                                        height={20}
                                                        width={20}
                                                    />
                                                </Group>
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
                                                <Group>
                                                    <Image
                                                        src={rarityImages[card.rarity]}
                                                        alt="Rarity"
                                                        height={20}
                                                        width={20}
                                                    />
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>
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
                                            </Table.Td>
                                            <Table.Td>
                                                <Group gap="xs">
                                                    {card.retreat_aspects.map((aspect, index) => (
                                                        <Image
                                                            key={index}
                                                            src={aspectImages[aspect as number]}
                                                            alt={`Aspect`}
                                                            height={20}
                                                            width={20}
                                                        />
                                                    ))}
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>
                                                <Group gap="xs">
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
                                                        <Group gap="xs">
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
                                                        <Badge color="blue"><Text size="xs">{t(`ability:${card.ability_name}.name`)}</Text></Badge>
                                                        <Text c="dimmed" size="xs" mt="xs">{t(`ability:${card.ability_name}.description`)}</Text>
                                                    </>
                                                )}
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Box>
                    </ScrollArea>
                </Card>
            )}
        </Container>
    );
};

export default CardsListClient;