'use client';
import React, { useState, useEffect, use } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Group, TextInput, ActionIcon, Card, Image, Text, Loader, Center, Grid, FloatingIndicator, UnstyledButton, Table } from '@mantine/core';
import { IconSearch, IconFilter, IconFilterOff, IconListDetails, IconCategory } from '@tabler/icons-react';
import { useTranslation } from "../../i18n/client";
import Link from 'next/link';
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

type CardsPageProps = { params: { lng: string } };

const CardsPage: React.FC<CardsPageProps> = ({ params }) => {
    const resolvedParams = use(params);
    const { lng } = resolvedParams;
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation(lng, 'A1');
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState('grid');
    const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  // 切換顯示模式和設置 active 狀態
  const toggleDisplayMode = (mode: 'grid' | 'list') => {
    setDisplayMode(mode);
    setActive(mode);
  };

    const setControlRef = (name: string) => (node: HTMLButtonElement) => {
        controlsRefs[name] = node;
        setControlsRefs(controlsRefs);
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`/api/card`);
                console.log(response)
                if (!response.ok) {
                    throw new Error('無法取得卡片資料。');
                }
                const data: Card[] = await response.json();
                setCards(data);
                setLoading(false);
            } catch (err: any) {
                console.log(err)
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return (
            <Layout lng={lng}>
                <Center style={{ height: 300 }}>
                    <Loader color="blue" size="xl" />
                </Center>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout lng={lng}>
                <div>錯誤: {error}</div>
            </Layout>
        );
    }

    const rows = cards.map((card) => (
        <Table.Tr key={card.id}>
            <Table.Td>{card.name}</Table.Td>
            <Table.Td>{card.type}</Table.Td>
            <Table.Td>{card.dex}</Table.Td>
            <Table.Td>{card.rarity}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Layout lng={lng}>
            <Group align="center" justify="space-between">
                <TextInput
                    placeholder="搜尋卡牌"
                    leftSection={<IconSearch size={16} />}
                    radius="md"
                    size="md"
                    styles={{
                        input: {
                            // 根據需要自訂樣式，例如設定寬度
                            width: 300,
                        },
                    }}
                />
                <Group>
                    <ActionIcon variant="default" size="lg" aria-label="FilterOff">
                        <IconFilterOff />
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" aria-label="Filter">
                        <IconFilter />
                    </ActionIcon>
                    <div className={classes.root} dir="ltr" ref={setRootRef}>
                        <FloatingIndicator
                            target={controlsRefs[active]}
                            parent={rootRef}
                            className={classes.indicator}
                        />
                        <div className={classes.controlsGroup}>
                            <UnstyledButton variant="default" size="lg" className={classes.control} aria-label="Category" onClick={() => {setActive('grid');toggleDisplayMode('grid')}} ref={setControlRef('grid')}
                                mod={{ active: active === 'grid' }}>
                                <IconCategory />
                            </UnstyledButton >
                            <UnstyledButton variant="default" size="lg" className={classes.control} aria-label="ListDetails" onClick={() =>{ {setActive('list');toggleDisplayMode('list');}}}
                                ref={setControlRef('list')}
                                mod={{ active: active === 'list' }}>
                                <IconListDetails />
                            </UnstyledButton >
                        </div>
                    </div>
                </Group>
            </Group>
            {displayMode === 'grid' ? (
            <Grid mt="md" mb="md">
                {cards.map((card) => (
                    <Grid.Col key={card.id} span={{ base: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1 }} >
                        <Link href={`/cards/${card.number}`} key={card.id} passHref style={{ textDecoration: 'none' }}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Image
                                        src={`/${lng}/${card.set}/${card.number}.webp`} // 假設圖片名稱與 card.number 相同
                                        alt={card.name}
                                    />
                                </Card.Section>
                                <Text fw={600} align="center" mt="md" mb="md">{t(`${card.number}.name`)}</Text>
                                {/* 其他卡牌資訊 */}
                            </Card>
                        </Link>
                    </Grid.Col>
                ))}
            </Grid>
            ) : (
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>名稱</Table.Th>
                        <Table.Th>Element name</Table.Th>
                        <Table.Th>Symbol</Table.Th>
                        <Table.Th>Atomic mass</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            )}
        </Layout>
    );
};

export default CardsPage;