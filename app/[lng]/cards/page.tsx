// app/[lng]/cards/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import CardsListClient from './CardsListClient'; // 客戶端組件

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

// 获取卡片列表的函数
async function fetchCards(): Promise<Card[] | null> {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/card`);
        // console.log(response);
        if (!response.ok) {
            return null;
        }
        const cards: Card[] = await response.json();
        return cards;
    } catch (error) {
        console.error('Error fetching cards:', error);
        return null;
    }
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'A1');
    const { t: translate } = translation;

    return {
        title: translate('metadata.cards_page_title'),
        description: translate('metadata.cards_page_description'),
        keywords: translate('metadata.cards_page_keywords'),
    };
}

// 页面组件，作为服务器组件
type CardsPageProps = { params: Promise<{ lng: string; }> };

const CardsPage = async ({ params }: CardsPageProps) => {
    const { lng } = await params;

    // 使用同一个函数获取卡片数据
    const cards = await fetchCards();

    if (!cards) {
        // showNotification({
        //     title: '失敗',
        //     message: '無法取得卡片資料。',
        //     color: 'red',
        //     icon: <IconX size={16} />,
        // });
        return (
            <Layout lng={lng}>
                <div>無法取得卡片資料。</div>
            </Layout>
        );
    }

    return (
        <Layout lng={lng}>
            <CardsListClient cards={cards} lng={lng} />
        </Layout>
    );
};

export default CardsPage;