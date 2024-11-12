// app/api/card/[id]/route.ts

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

// 幫助函數：將字串轉換為陣列
const stringToArray = (str: string | null): string[] | number[] | null => {
    if (!str) return null;
  
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // console.log('Fetching card with ID:', id);
    // 根據 id 查詢卡片
    const card = await prisma.card.findUnique({
      where: { id: Number(id) }, // 將字符串 id 轉換為數字
    });
    

    if (!card) {
      return NextResponse.json({ error: '卡片不存在。' }, { status: 404 });
    }
    console.log(card)
    // 處理多值欄位，將逗號分隔的字串轉換為陣列
    const processedCard: CardDetail = {
      ...card,
      dex: stringToArray(card.dex) as string[],
      attack_aspects_1: stringToArray(card.attack_aspects_1) as number[] | string[],
      attack_aspects_2: stringToArray(card.attack_aspects_2 || null) as number[] | string[] | null,
      retreat_aspects: stringToArray(card.retreat_aspects) as number[] | string[],
      reprints: stringToArray(card.reprints || null) as string[] | null,
    };
    console.log(processedCard)
    return NextResponse.json(processedCard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '無法取得卡片資料。' }, { status: 500 });
  }
}