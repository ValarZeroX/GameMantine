// app/[lng]/cards/[cardNumber]/CardDetailClient.tsx
'use client';

import React from 'react';
import { Breadcrumbs, Anchor, Title, Card, Image, Group, Text, Container, Grid, Badge, SimpleGrid, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from "../../../i18n/client";
import Link from 'next/link';

interface CardDetail {
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

interface CardDetailClientProps {
    card: CardDetail;
    lng: string;
}

const CardDetailClient: React.FC<CardDetailClientProps> = ({ card, lng }) => {
    const { t } = useTranslation(lng, ['pokemon', 'common', 'skill', 'ability', 'rule']);

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

    const items = [
        { title: t("common:navigation.home"), href: '/' },
        { title: t("common:navigation.cards"), href: '/cards' },
        { title: t(`${card.name}`), href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const evolutionStages: { [key: string]: string } = {
        '0': '基礎',
        '1': '1階進化',
        '2': '2階進化',
    };

    const { reprints } = card;

    const getSetFromNumber = (number: string): string => {
        // 使用正則表達式匹配從開頭到最後一個 "-" 之前的所有內容
        const lastDashIndex = number.lastIndexOf('-');
        if (lastDashIndex !== -1) {
          return number.substring(0, lastDashIndex);
        }
        return number; // 如果沒有 "-"，返回整個 number
      };

    return (
        <Container size="lg">
            <Breadcrumbs>{items}</Breadcrumbs>
            <Title order={1} mt="sm">{t('common:title.card_detail_title', { title: card.name })}</Title>
            <Grid mt="md" mb="md">
                <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                    <Image
                        src={`/${lng}/${card.set}/${card.number}.webp`} // 使用絕對路徑
                        alt={t(`${card.name}.name`)}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder>
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={800} size="xl" ml="md">{t(`${card.name}`)}</Text>
                                {card.type === 0 ? (
                                    <Image
                                        src={aspectImages[card.aspects]}
                                        alt="Aspect"
                                        height={30}
                                        width={30}
                                        mr="md"
                                    />
                                ) : null}
                            </Group>
                        </Card.Section>
                        <Grid mt="md" mb="md">
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:set')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Badge color="blue">({card.set}){t(`common:cardSet.${card.set}`)}</Badge>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:dex')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                {card.dex.filter((dex) => dex !== "NO").map((dex, index) => (
                                    <Badge color="blue" key={index}>({dex}){t(`common:cardDex.${dex}`)}</Badge>
                                ))}
                            </Grid.Col>
                        </Grid>
                        <Grid mt="md" mb="md">
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:type')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Badge color="blue">{t(`common:cardType.${card.type}`)}</Badge>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:stage')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Badge color="blue">{t(`common:cardStage.${card.stage}`)}</Badge>
                            </Grid.Col>
                        </Grid>
                        <Grid mt="md" mb="md">
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:rarity')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                {card.rarity !== 0 && (
                                    <Group>
                                        <Image
                                            src={rarityImages[card.rarity]}
                                            alt={`Rarity`}
                                        />
                                    </Group>
                                )}
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:retreat')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Group>
                                    {card.retreat_aspects.filter((aspect) => aspect !== 99).map((aspect, index) => (
                                        <Image
                                            key={index}
                                            src={aspectImages[aspect as number]}
                                            alt={`Aspect ${aspect}`}
                                            height={30}
                                            width={30}
                                        />
                                    ))}
                                </Group>
                            </Grid.Col>
                        </Grid>
                        <Grid mt="md" mb="md">
                            <Grid.Col span={2}><Text fw={800}>{t('common:hp')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Badge size="xl" circle variant="gradient"
                                    gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text fw={600}>{card.hp}</Text></Badge>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:illustrator')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Badge color="blue">{card.illustrator}</Badge>
                            </Grid.Col>
                        </Grid>
                        <Grid mt="md" mb="md">
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:aspects')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Group>
                                    {card.type === 0 ? (
                                        <Image
                                            src={aspectImages[card.aspects]}
                                            alt="Aspect"
                                            height={30}
                                            width={30}
                                            mr="md"
                                        />
                                    ) : null}
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:weakness')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                {card.weakness !== 10 && (
                                    <Group>
                                        <Image
                                            src={aspectImages[card.weakness]}
                                            alt={`Weakness`}
                                            height={30}
                                            width={30}
                                        />
                                        <Badge size="xl" circle variant="gradient"
                                            gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text fw={600}>{card.weakness_value}</Text></Badge>
                                    </Group>
                                )}
                            </Grid.Col>
                        </Grid>
                        {card.type === 0 ? (
                            <>
                                <Grid mt="md" mb="md">
                                    <Grid.Col span={2}>
                                        <Text fw={800}>{t('common:attack')}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <Group>
                                            {card.attack_aspects_1.map((aspect, index) => (
                                                <Image
                                                    key={index}
                                                    src={aspectImages[aspect as number]}
                                                    alt={`Aspect`}
                                                    height={30}
                                                    width={30}
                                                />
                                            ))}
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Badge color="blue"><Text fw={800}>{t(`skill:${card.attack_name_1}.name`)}</Text></Badge>
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Badge size="xl" circle variant="gradient"
                                            gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text fw={600}>{card.attack_1}</Text></Badge>
                                    </Grid.Col>
                                </Grid>
                                {card.attack_skill_name_1 && card.attack_skill_name_1.length > 0 && (
                                    <Grid>
                                        <Grid.Col span={2}>
                                            <Text fw={800}></Text>
                                        </Grid.Col>
                                        <Grid.Col span={10}>
                                            <Text c="dimmed">{t(`skill:${card.attack_name_1}.description`)}</Text>
                                        </Grid.Col>
                                    </Grid>
                                )}
                                {card.attack_aspects_2 && card.attack_aspects_2.length > 0 && (
                                    <Grid mt="md" mb="md">
                                        <Grid.Col span={2}>
                                            <Text fw={800}>{t('common:attack')}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Group>
                                                {card.attack_aspects_2.map((aspect, index) => (
                                                    <Image
                                                        key={index}
                                                        src={aspectImages[aspect as number]}
                                                        alt={`Aspect`}
                                                        height={30}
                                                        width={30}
                                                    />
                                                ))}
                                            </Group>
                                        </Grid.Col>
                                        <Grid.Col span={3}>
                                            <Badge color="blue"><Text fw={800}>{t(`skill:${card.attack_name_2}.name`)}</Text></Badge>
                                        </Grid.Col>
                                        <Grid.Col span={3}>
                                            <Badge size="xl" circle variant="gradient"
                                                gradient={{ from: 'red', to: 'violet', deg: 90 }}><Text fw={600}>{card.attack_2}</Text></Badge>
                                        </Grid.Col>
                                    </Grid>
                                )}
                                {card.attack_skill_name_2 && card.attack_skill_name_2.length > 0 && (
                                    <Grid>
                                        <Grid.Col span={2}>
                                            <Text fw={800}></Text>
                                        </Grid.Col>
                                        <Grid.Col span={10}>
                                            <Text c="dimmed">{t(`skill:${card.attack_name_2}.description`)}</Text>
                                        </Grid.Col>
                                    </Grid>
                                )}
                                {card.ability_name && card.ability_name.length > 0 && (
                                    <Grid mt="md" mb="md">
                                        <Grid.Col span={2}>
                                            <Text fw={800}>{t('common:ability')}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={4}>
                                            <Badge color="blue"><Text fw={800}>{t(`ability:${card.ability_name}.name`)}</Text></Badge>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Text c="dimmed">{t(`ability:${card.ability_name}.description`)}</Text>
                                        </Grid.Col>
                                    </Grid>
                                )}
                            </>
                        ) :
                            <>
                                <Text c="dimmed">{t(`rule:${card.attack_skill_name_1}`)}</Text>
                            </>}
                    </Card>
                </Grid.Col>
            </Grid>
            {reprints && Object.keys(reprints).length > 0 && (
                <SimpleGrid cols={1} spacing="md">
                    {Object.entries(evolutionStages).map(([stageKey, stageName]) => {
                        const stageReprints = reprints[stageKey];

                        // 檢查當前階段是否有 reprints
                        if (stageReprints && stageReprints.length > 0) {
                            return (
                                <Card key={stageKey} shadow="sm" padding="lg">
                                    <Card.Section withBorder>
                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Text fw={800} size="xl" ml="md">
                                                {stageName}
                                            </Text>
                                        </Group>
                                    </Card.Section>
                                    <Grid columns={10} mt="md">
                                        {stageReprints.map((number) => (
                                            <Grid.Col key={`${stageKey}-${number}`} span={{ base: 4, sm: 4, md: 2, lg: 2 }}>
                                                <Link href={`/${lng}/cards/${number}`} passHref style={{ textDecoration: 'none' }}>
                                                    <Image
                                                        radius="md"
                                                        src={`/${lng}/${getSetFromNumber(number)}/${number}.webp`}
                                                        alt={`${number}`}
                                                    />
                                                </Link>
                                                <Stack mt="md" align="center" gap="xs">
                                                    <Text fw={700} size="xs">
                                                        {t(`pokemon:${card.name}`)}
                                                    </Text>
                                                    <Text c="dimmed" size="xs">
                                                        {number}
                                                    </Text>
                                                </Stack>
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </Card>
                            );
                        }

                        return null;
                    })}
                </SimpleGrid>
            )}
        </Container>
    );
};

export default CardDetailClient;