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
  reprints?: { [key: string]: string[] } | null;
  rule?: string | null;
}

// 幫助函數：將字串轉換為陣列
const stringToArray = (str: string | null | undefined): string[] | number[] | undefined => {
  if (!str) return undefined;

  if (str.includes(',')) {
    return str.split(',');
  }

  if (!isNaN(Number(str))) {
    return [Number(str)];
  }

  return [str];
};

const fixInvalidJSON = (str: string): string => {
  let fixedStr = str;

  // 移除多餘的逗號
  fixedStr = fixedStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

  // 為未加引號的鍵名添加雙引號
  fixedStr = fixedStr.replace(/([{,]\s*)(\d+)\s*:/g, '$1"$2":');

  // 確保所有字符串值使用雙引號
  fixedStr = fixedStr.replace(/'([^']*)'/g, '"$1"');

  return fixedStr;
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
      reprints: {},
      attack_skill_1: card.attack_skill_1 ?? null,
      attack_skill_name_1: card.attack_skill_name_1 ?? null,
      attack_skill_2: card.attack_skill_2 ?? null,
      attack_skill_name_2: card.attack_skill_name_2 ?? null,
      ability_name: card.ability_name ?? null,
      ability_directions: card.ability_directions ?? null,
      rule: card.rule ?? null,
      attack_2: card.attack_2 ?? null, // 確保 attack_2 可以是 number 或 null
    };
    // console.log('keys:', card.reprints);
    if (card.reprints) {
      // 嘗試解析 reprints 字段
      let reprintsObj: { [key: string]: string[] };

      if (typeof card.reprints === 'string') {
        try {
          const fixedReprintsStr = fixInvalidJSON(card.reprints);
          reprintsObj = JSON.parse(fixedReprintsStr);
        } catch (parseError) {
          reprintsObj = {};
        }
      } else if (typeof card.reprints === 'object') {
        reprintsObj = card.reprints as { [key: string]: string[] };
      } else {
        reprintsObj = {};
      }

      const keys = Object.keys(reprintsObj);

      // 收集所有需要查詢的名稱
      const allNames: string[] = [];
      keys.forEach(key => {
        allNames.push(...reprintsObj[key]);
      });

      // 去除重複名稱
      const uniqueNames = Array.from(new Set(allNames));

      if (uniqueNames.length > 0) {
        // 查詢這些名稱對應的卡片編號
        const matchedCards = await prisma.card.findMany({
          where: {
            name: { in: uniqueNames },
          },
          select: { name: true, number: true },
        });

        // 建立名稱到編號的映射（多對一）
        const nameToNumberMap: { [key: string]: string[] } = {};
        matchedCards.forEach(card => {
          if (!nameToNumberMap[card.name]) {
            nameToNumberMap[card.name] = [];
          }
          nameToNumberMap[card.name].push(card.number);
        });

        // 構建新的 reprints 結構，將名稱替換為編號
        keys.forEach(key => {
          const numbers: string[] = [];
          reprintsObj[key].forEach(name => {
            if (nameToNumberMap[name]) {
              numbers.push(...nameToNumberMap[name]);
            }
          });
          processedCard.reprints![key] = numbers;
        });
      }
    }
    return NextResponse.json(processedCard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '無法取得卡片資料。' }, { status: 500 });
  }
}