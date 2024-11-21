// app/[lng]/decks/user/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import AboutPageClient from './AboutPageClient'; // 客戶端組件

// 获取卡片列表的函数
// async function fetchCards(): Promise<Card[] | null> {
//     try {
//         const response = await fetch(`${process.env.NEXTAUTH_URL}/api/card`);
//         // console.log(response);
//         if (!response.ok) {
//             return null;
//         }
//         const cards: Card[] = await response.json();
//         return cards;
//     } catch (error) {
//         console.error('Error fetching cards:', error);
//         return null;
//     }
// }

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.about_title'),
        description: translate('metadata.about_description'),
        keywords: translate('metadata.about_keywords'),
    };
}

type AboutPageProps = { params: Promise<{ lng: string; }> };

const AboutPage = async ({ params }: AboutPageProps) => {
    const { lng } = await params;

    // 使用同一个函数获取卡片数据
    // const cards = await fetchCards();

    // if (!cards) {
    //     // showNotification({
    //     //     title: '失敗',
    //     //     message: '無法取得卡片資料。',
    //     //     color: 'red',
    //     //     icon: <IconX size={16} />,
    //     // });
    //     return (
    //         <Layout lng={lng}>
    //             <div>無法取得卡片資料。</div>
    //         </Layout>
    //     );
    // }

    return (
        <Layout lng={lng}>
            <AboutPageClient  lng={lng} />
        </Layout>
    );
};

export default AboutPage;