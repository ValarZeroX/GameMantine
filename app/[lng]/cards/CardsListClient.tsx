// app/[lng]/cards/CardsListClient.tsx
'use client';

import React, { useState } from 'react';
import { Group, TextInput, ActionIcon, Card, Image, Text, Grid, Badge, FloatingIndicator, UnstyledButton, Container, Table } from '@mantine/core';
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
    const { t } = useTranslation(lng, ['A1', 'common', 'skill']);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards);
    // const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState('grid');
    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

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

    const setControlRef = (name: string) => (node: HTMLButtonElement) => {
        controlsRefs[name] = node;
        setControlsRefs(controlsRefs);
    };

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
                    <ActionIcon variant="default" size="lg" onClick={() => toggleDisplayMode('filter')}>
                        <IconFilterOff />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={() => toggleDisplayMode('filter')}>
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
            {displayMode === 'grid' ? (
                <Grid>
                    {filteredCards.map((card) => (
                        <Grid.Col key={card.id} span={{ base: 6, sm: 4, md: 3 }}>
                            <Link href={`/${lng}/cards/${card.id}`} passHref style={{ textDecoration: 'none' }}>
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
                                        <Badge color="blue">{t(`common:cardDex.${card.dex}`)}</Badge>
                                    </Group>
                                </Card>
                            </Link>
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Table>
                        <thead>
                            <tr>
                                <th>{t('common:name')}</th>
                                <th>{t('common:stage')}</th>
                                <th>{t('common:aspect')}</th>
                                <th>{t('common:type')}</th>
                                <th>{t('common:attack_1')}</th>
                                <th>{t('common:attack_2')}</th>
                                <th>{t('common:retreat')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCards.map((card) => (
                                <tr key={card.id}>
                                    <td>{t(`A1:${card.number}.name`)}</td>
                                    <td>{t(`common:stage_${card.stage}`)}</td>
                                    <td>{t(`common:aspect_${card.aspects}`)}</td>
                                    <td>{t(`common:type_${card.type}`)}</td>
                                    <td>{t(`common:attack_${card.attack_1}`)}</td>
                                    <td>{card.attack_2 ? t(`common:attack_${card.attack_2}`) : '-'}</td>
                                    <td>{card.retreat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Container>
    );
};

export default CardsListClient;