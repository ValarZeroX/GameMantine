// app/api/cards/count/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 根據您的專案結構調整路徑

// Helper function to convert arrays to comma-separated strings
const arrayToString = (arr: string[] | number[] | undefined): string | null => {
  if (!arr || arr.length === 0) return null;
  return arr.join(',');
};

// 幫助函數：將字串轉換為陣列
const stringToArray = (str: string | null): string[] | number[] | null => {
  if (!str) return null;

  const split = str.split(',');

  // 判斷所有項目是否均為數字
  const allNumbers = split.every(item => !isNaN(Number(item)));

  if (allNumbers) {
    return split.map(item => Number(item));
  }

  return split;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sets = url.searchParams.get('sets'); // e.g., 'A1,A2'

    let where = {};

    if (sets) {
      const setsArray = sets.split(',');
      where = { set: { in: setsArray } };
    }

    const cards = await prisma.card.findMany({
      where,
      orderBy: { number: 'asc' },
    });

    // 處理多值欄位，將逗號分隔的字串轉換為陣列
    const processedCards = cards.map((card) => ({
      ...card,
      dex: stringToArray(card.dex),
      attack_aspects_1: stringToArray(card.attack_aspects_1) as number[] | string[],
      attack_aspects_2: stringToArray(card.attack_aspects_2 || null) as number[] | string[] | null,
      retreat_aspects: stringToArray(card.retreat_aspects) as number[] | string[],
      reprints: card.reprints ? (card.reprints as { [key: string]: string[] }) : null,
    }));

    // 初始化計數物件
    const countsPerDex: { 
      [dex: string]: { 
        [rarity: number]: number; 
      } 
    } = {};

    // 遍歷每張卡片，根據 dex 和 rarity 進行分類計數
    processedCards.forEach(card => {
      card.dex?.forEach(dex => {
        if (typeof dex !== 'string') return; // 確保 dex 為字串

        if (!countsPerDex[dex]) {
          countsPerDex[dex] = {};
        }

        const rarity = card.rarity;

        if (!countsPerDex[dex][rarity]) {
          countsPerDex[dex][rarity] = 0;
        }

        countsPerDex[dex][rarity] += 1;
      });
    });

    return NextResponse.json(countsPerDex, { status: 200 });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: '無法取得卡片資料。' }, { status: 500 });
  }
}