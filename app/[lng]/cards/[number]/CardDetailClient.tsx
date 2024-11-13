// app/[lng]/cards/[number]/CardDetailClient.tsx
'use client';

import React from 'react';
import { Card, Image, Group, Text, Container, Grid, Badge } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from "../../../i18n/client";

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
    reprints?: string[] | null;
    rule?: string;
}

interface CardDetailClientProps {
    card: CardDetail;
    lng: string;
}

const CardDetailClient: React.FC<CardDetailClientProps> = ({ card, lng }) => {
    const { t } = useTranslation(lng, ['A1', 'common', 'skill', 'ability']);
    // console.log(card);
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
    return (
        <Container size="lg">
            <Grid mt="md" mb="md">
                <Grid.Col span={{ base: 12, sm: 4, md: 4, lg: 4 }}>
                    <Image
                        src={`/${lng}/${card.set}/${card.number}.webp`} // 使用絕對路徑
                        alt={t(`${card.number}.name`)}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8, md: 8, lg: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section withBorder>
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={800} size="xl" ml="md">{t(`${card.number}.name`)}</Text>
                                <Image
                                    src="/common/grass.webp" // 不受語系影響的圖片
                                    alt="Grass Icon"
                                    height={30}
                                    width={30}
                                    mr="md"
                                />
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
                            {card.dex.map((dex, index) => (
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
                                <Group>
                                    <Image
                                        src={rarityImages[card.rarity]}
                                        alt={`Rarity`}
                                    />
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:retreat')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Group>
                                    {card.retreat_aspects.map((aspect, index) => (
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
                                    <Image
                                        src={aspectImages[card.aspects]}
                                        alt={`Aspect`}
                                        height={30}
                                        width={30}
                                    />
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Text fw={800}>{t('common:weakness')}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
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
                            </Grid.Col>
                        </Grid>
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
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default CardDetailClient;