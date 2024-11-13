// app/api/card/[cardNumber]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 根據您的專案結構調整路徑

// 定義卡片介面
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
  attack_skill_1?: string | null;
  attack_skill_name_1?: string | null;
  attack_2?: number | null; // 修改為允許 null
  attack_name_2?: string | null;
  attack_aspects_2?: number[] | string[] | null;
  attack_skill_2?: string | null;
  attack_skill_name_2?: string | null;
  ability_name?: string | null;
  ability_directions?: string | null;
  ability?: string | null;
  retreat: number;
  retreat_aspects: number[] | string[];
  weakness: number;
  weakness_value: number;
  illustrator: string;
  point: number;
  reprints?: string[] | null;
  rule?: string | null;
}

// 幫助函數：將字串轉換為陣列
const stringToArray = (str: string | null | undefined): string[] | number[] | undefined => {
  if (!str) return undefined;

  // 如果字符串包含逗号，表示是一个以逗号分隔的数组
  if (str.includes(',')) {
    return str.split(',');
  }

  // 如果字符串不包含逗号，判断它是否是数字组成
  if (!isNaN(Number(str))) {
    return [Number(str)];
  }

  // 默认返回字符串的数组形式（例如 dex 字段）
  return [str];
};

export async function GET(request: Request, { params }: { params: Promise<{ cardNumber: string }> }) {
  const { cardNumber } = await params;

  try {
    // 根據 id 查詢卡片
    const card = await prisma.card.findUnique({
      where: { number: cardNumber },
    });

    if (!card) {
      return NextResponse.json({ error: '卡片不存在。' }, { status: 404 });
    }

    // 處理多值欄位，將逗號分隔的字串轉換為陣列
    const processedCard: CardDetail = {
      ...card,
      dex: stringToArray(card.dex) as string[],
      attack_aspects_1: stringToArray(card.attack_aspects_1) as number[] | string[],
      attack_aspects_2: stringToArray(card.attack_aspects_2) ?? undefined,
      retreat_aspects: stringToArray(card.retreat_aspects) as number[] | string[],
      reprints: stringToArray(card.reprints || null) as string[] | null,
      attack_skill_1: card.attack_skill_1 ?? null,
      attack_skill_name_1: card.attack_skill_name_1 ?? null,
      attack_skill_2: card.attack_skill_2 ?? null,
      attack_skill_name_2: card.attack_skill_name_2 ?? null,
      ability_name: card.ability_name ?? null,
      ability_directions: card.ability_directions ?? null,
      rule: card.rule ?? null,
      attack_2: card.attack_2 ?? null, // 確保 attack_2 可以是 number 或 null
    };

    return NextResponse.json(processedCard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '無法取得卡片資料。' }, { status: 500 });
  }
}