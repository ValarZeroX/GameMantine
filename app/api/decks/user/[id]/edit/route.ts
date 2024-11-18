// app/api/decks/user/[id]/edit/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; // 確保路徑正確
import { prisma } from '@/lib/prisma'; // 引入 Prisma 客戶端
import type { DeckUser, Deck } from '@prisma/client'; // 正確導入 DeckUser 和 Deck 類型


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    const deckUserId = parseInt(id, 10);
    if (isNaN(deckUserId)) {
      return NextResponse.json({ message: '無效的牌組 ID' }, { status: 400 });
    }

    const deckUser: DeckUser | null = await prisma.deckUser.findUnique({
      where: { id: deckUserId },
      include: { deck: true }, // 包含 deck 關聯
    });

    if (!deckUser) {
      return NextResponse.json({ message: '牌組未找到' }, { status: 404 });
    }

    if (deckUser.userId !== session.user.id) {
      return NextResponse.json({ message: '禁止存取' }, { status: 403 });
    }

    return NextResponse.json(deckUser);
  } catch (error) {
    console.error('Error fetching DeckUser:', error);
    return NextResponse.json({ message: '獲取牌組失敗' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    const deckUserId = parseInt(id, 10);
    if (isNaN(deckUserId)) {
      return NextResponse.json({ message: '無效的牌組 ID' }, { status: 400 });
    }

    const deckUser: DeckUser | null = await prisma.deckUser.findUnique({
      where: { id: deckUserId },
      include: { deck: true }, // 包含 deck 關聯
    });

    if (!deckUser) {
      return NextResponse.json({ message: '牌組未找到' }, { status: 404 });
    }

    if (deckUser.userId !== session.user.id) {
      return NextResponse.json({ message: '禁止存取' }, { status: 403 });
    }

    const data = await request.json();
    const { deckName, deckCards } = data;

    if (!deckCards) {
      return NextResponse.json({ message: 'deckCards 是必須的' }, { status: 400 });
    }

    // 檢查是否已存在相同的 deckCards
    let deck: Deck | null = await prisma.deck.findFirst({
      where: { deckCards },
    });

    // 如果不存在，創建新的 Deck
    if (!deck) {
      deck = await prisma.deck.create({
        data: {
          deckCards,
        },
      });
    }

    // 更新 DeckUser 的 deckId 和 deckName
    await prisma.deckUser.update({
      where: { id: deckUserId },
      data: {
        deckId: deck.id,
        deckName: deckName || deckUser.deckName,
      },
    });

    return NextResponse.json({ message: '更新成功' }, { status: 200 });
  } catch (error) {
    console.error('Error updating DeckUser:', error);
    return NextResponse.json({ message: '更新牌組失敗' }, { status: 500 });
  }
}
