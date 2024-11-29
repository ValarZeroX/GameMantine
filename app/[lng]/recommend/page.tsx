// app/[lng]/cards/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import RecommendPageClient from './RecommendPageClient'; // 客戶端組件

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


// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.recommend_page_title'),
        description: translate('metadata.recommend_page_description'),
        keywords: translate('metadata.recommend_page_keywords'),
    };
}

// 页面组件，作为服务器组件
type RecommendPageProps = { params: Promise<{ lng: string; }> };

const RecommendPage = async ({ params }: RecommendPageProps) => {
    const { lng } = await params;

    return (
        <Layout lng={lng}>
            <RecommendPageClient  lng={lng} />
        </Layout>
    );
};

export default RecommendPage;