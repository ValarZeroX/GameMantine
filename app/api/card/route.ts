// app/api/cards/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 根據您的專案結構調整路徑

interface CardRequestBody {
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
  attack_aspects_1: number[];
  attack_skill_1?: string;
  attack_skill_name_1?: string;
  attack_2?: number;
  attack_name_2?: string;
  attack_aspects_2?: number[];
  attack_skill_2?: string;
  attack_skill_name_2?: string;
  ability_name?: string;
  ability_directions?: string;
  ability?: number;
  retreat: number;
  retreat_aspects: number[];
  weakness: number;
  weakness_value: number;
  illustrator: string;
  point: number;
  reprints?: string[];
  rule?: string;
}

// Helper function to convert arrays to comma-separated strings
const arrayToString = (arr: string[] | number[] | undefined): string | null => {
  if (!arr) return null;
  return arr.join(',');
};

// Helper function to handle string to array conversion on GET requests
const stringToArray = (str: string | null): string[] | number[] | null => {
  if (!str) return null;
  // Determine if it's a number array or string array
  return str.includes('-') ? str.split(',') : str.split(',').map(Number);
};

export async function POST(request: Request) {
  const body: CardRequestBody = await request.json();

  // 基本驗證
  if (
    !body.number ||
    !body.set ||
    !body.dex ||
    body.rarity === undefined ||
    !body.name ||
    body.type === undefined ||
    body.stage === undefined ||
    body.hp === undefined ||
    body.aspects === undefined ||
    body.attack_1 === undefined ||
    !body.attack_aspects_1 ||
    body.retreat === undefined ||
    !body.retreat_aspects ||
    body.weakness === undefined ||
    body.weakness_value === undefined ||
    !body.illustrator ||
    body.point === undefined
  ) {
    return NextResponse.json({ error: '所有必要欄位都是必填的。' }, { status: 400 });
  }

  // 檢查卡片是否已存在
  const existingCard = await prisma.card.findUnique({
    where: { number: body.number },
  });

  if (existingCard) {
    return NextResponse.json({ error: '卡片編號已存在。' }, { status: 400 });
  }

  try {
    // 創建新卡片
    const newCard = await prisma.card.create({
      data: {
        number: body.number,
        set: body.set,
        dex: arrayToString(body.dex) || '',
        rarity: body.rarity,
        name: body.name,
        type: body.type,
        stage: body.stage,
        hp: body.hp,
        aspects: body.aspects,
        attack_1: body.attack_1,
        attack_aspects_1: arrayToString(body.attack_aspects_1) || '',
        attack_skill_1: body.attack_skill_1 || null,
        attack_2: body.attack_2 || null,
        attack_aspects_2: arrayToString(body.attack_aspects_2) || null,
        attack_skill_2: body.attack_skill_2 || null,
        ability: body.ability || null,
        retreat: body.retreat,
        retreat_aspects: arrayToString(body.retreat_aspects) || '',
        weakness: body.weakness,
        weakness_value: body.weakness_value,
        illustrator: body.illustrator,
        point: body.point,
        reprints: arrayToString(body.reprints) || null,
      },
    });

    return NextResponse.json({ message: '卡片創建成功！', card: newCard }, { status: 201 });
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: '卡片創建失敗。' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const cards = await prisma.card.findMany();
    console.log(cards)
    // 處理多值欄位，將逗號分隔的字串轉換為陣列
    const processedCards = cards.map((card) => ({
      ...card,
      dex: stringToArray(card.dex),
      attack_aspects_1: stringToArray(card.attack_aspects_1) as number[] | string[],
      attack_aspects_2: stringToArray(card.attack_aspects_2 || null) as number[] | string[] | null,
      retreat_aspects: stringToArray(card.retreat_aspects) as number[] | string[],
      reprints: stringToArray(card.reprints || null) as string[] | null,
    }));

    return NextResponse.json(processedCards, { status: 200 });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: '無法取得卡片資料。' }, { status: 500 });
  }
}