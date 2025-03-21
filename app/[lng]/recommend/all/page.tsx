// app/[lng]/recommend/all/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../../components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import RecommendAllPageClient from './RecommendAllPageClient';

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


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: '圖鑑進度總覽',
        description: translate('metadata.recommend_page_description'),
        keywords: translate('metadata.recommend_page_keywords'),
    };
}


type RecommendAllPageProps = { params: Promise<{ lng: string; }> };

const RecommendAllPage = async ({ params }: RecommendAllPageProps) => {
    const { lng } = await params;

    return (
        <Layout lng={lng}>
            <RecommendAllPageClient  lng={lng} />
        </Layout>
    );
};

export default RecommendAllPage;