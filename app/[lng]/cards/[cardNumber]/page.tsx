// app/[lng]/cards/[cardNumber]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CardDetailClient from './CardDetailClient'; // 引入客户端组件
import Layout from '../../../../components/Layout/Layout';
import { useTranslation } from "../../../i18n/index";

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

// 获取卡片详细数据的函数
async function fetchCardData(number: string): Promise<CardDetail | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/card/${number}`);
    if (!response.ok) {
      return null;
    }
    const card: CardDetail = await response.json();
    return card;
  } catch (error) {
    console.error('Error fetching card data:', error);
    return null;
  }
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: Promise<{ lng: string; cardNumber: string }> }): Promise<Metadata> {
  const { lng, cardNumber } = await params; // 使用 await 确保 params 被正确解析
  const translation = await useTranslation(lng, ['common', 'A1']);
  const { t: t } = translation;
  
  const card = await fetchCardData(cardNumber);

  if (!card) {
    return {
      title: '卡片未找到',
      description: '無法找到指定的卡片。',
    };
  }
  const pokemonName = t(`A1:${card.number}.name`)
  return {
    title: t('common:metadata.card_detail_title', { title: pokemonName }),
    description: t('common:metadata.card_detail_description', { title: pokemonName }), // 使用翻譯鍵並替換佔位符
    keywords: t('common:metadata.card_detail_keywords'),
  };
}

// 页面组件，作为服务器组件
type CardDetailPageProps = { params: Promise<{ lng: string; cardNumber: string }> };

const CardDetailPage = async ({ params }: CardDetailPageProps) => {
  const { lng, cardNumber } = await params; // 使用 await 确保 params 被正确解析

  // 使用同一个函数获取卡片数据
  const card = await fetchCardData(cardNumber);

  if (!card) {
    notFound();
  }

  return (
    <Layout lng={lng}>
      <CardDetailClient card={card} lng={lng} />
    </Layout>
  );
};

export default CardDetailPage;
