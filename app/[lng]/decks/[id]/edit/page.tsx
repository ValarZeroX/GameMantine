// app/[lng]/decks/edit/page.tsx

import React from 'react';
import { Metadata } from 'next';
import Layout from '../../../../../components/Layout/Layout';
import { useTranslation } from '../../../../i18n/index';
// import { showNotification } from "@mantine/notifications";
import { IconX } from '@tabler/icons-react';
import EditDecksPageClient from './EditDecksPageClient'; 

interface DeckUser {
    id: number;
    deckName: string;
    deck: {
        id: number;
        deckCards: string; // 卡片號碼以逗號分隔
    };
}

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

// async function fetchDeckUser(id: string): Promise<DeckUser | null> {
//     try {
//         // 獲取當前請求的主機名稱
//         const baseUrl = process.env.NEXTAUTH_URL;
//         const response = await fetch(`${baseUrl}/api/decks/user/${id}/edit`);
        
//         if (!response.ok) {
//             return null;
//         }
//         const deckUser: DeckUser = await response.json();
//         return deckUser;
//     } catch (error) {
//         console.error('Error fetching DeckUser:', error);
//         return null;
//     }
// }

// async function fetchDeckCards(deckCards: string): Promise<Card[]> {
//     try {
//         const cardNumbers = deckCards.split(',');
//         const response = await fetch('/api/card');
//         if (!response.ok) {
//             return [];
//         }
//         const allCards: Card[] = await response.json();
//         const selectedCards = allCards.filter(card => cardNumbers.includes(card.number));
//         return selectedCards;
//     } catch (error) {
//         console.error('Error fetching deck cards:', error);
//         return [];
//     }
// }


export async function generateMetadata({ params }: { params: Promise<{ lng: string; id: string }> }): Promise<Metadata> {
    const { lng } = await params;

    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.decks_edit_title'),
        description: translate('metadata.decks_edit_description'),
        keywords: translate('metadata.decks_edit_keywords'),
    };
}

type EditDecksPageProps = { params: Promise<{ lng: string; id: string  }> };

const EditDecksPage = async ({ params }: EditDecksPageProps) => {
    const { lng, id } = await params;

    // const deckUser = await fetchDeckUser(id);
    // if (!deckUser) {
    //     return (
    //         <Layout lng={lng}>
    //             <div>無法取得牌組資料。</div>
    //         </Layout>
    //     );
    // }

    // const initialDeckCards = await fetchDeckCards(deckUser.deck.deckCards);


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
            <EditDecksPageClient  lng={lng} />
        </Layout>
    );
};

export default EditDecksPage;