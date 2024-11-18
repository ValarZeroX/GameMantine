// app/api/decks/user/[id]/edit/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; // 確保路徑正確
import { prisma } from '@/lib/prisma';

// 定義 DeckUser 的 TypeScript 接口
interface DeckUser {
  id: number;
  deckName: string;
  userId: number;
  deck: {
    id: number;
    deckCards: string; // 卡片號碼以逗號分隔
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 等待 params 以取得動態路由參數
    const { id } = await params;
    console.log(`Requested DeckUser ID: ${id}`);

    // 獲取當前用戶的會話
    const session = await getServerSession(authOptions);
    console.log(`session: ${session}`);
    if (!session?.user?.id) {
        console.log(`401: ${401}`);
      return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    // 確保 id 是有效的數字
    const deckUserId = parseInt(id, 10);
    if (isNaN(deckUserId)) {
      return NextResponse.json({ message: '無效的牌組 ID' }, { status: 400 });
    }

    // 從資料庫中查詢 DeckUser 及其相關的 Deck 資料
    const deckUser: DeckUser | null = await prisma.deckUser.findUnique({
      where: { id: deckUserId },
      include: { deck: true },
    });
    console.log(`Fetched DeckUser: ${JSON.stringify(deckUser)}`);

    // 如果找不到 DeckUser，返回 404 錯誤
    if (!deckUser) {
      return NextResponse.json({ message: '牌組未找到' }, { status: 404 });
    }

    // 確認該 DeckUser 屬於當前用戶
    if (deckUser.userId !== session.user.id) {
      return NextResponse.json({ message: '禁止存取' }, { status: 403 });
    }

    // 返回 DeckUser 資料
    return NextResponse.json(deckUser);
  } catch (error) {
    console.error('Error fetching DeckUser:', error);
    return NextResponse.json({ message: '獲取牌組失敗' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(`Updating DeckUser ID: ${id}`);

    // 獲取當前用戶的會話
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    // 確保 id 是有效的數字
    const deckUserId = parseInt(id, 10);
    if (isNaN(deckUserId)) {
      return NextResponse.json({ message: '無效的牌組 ID' }, { status: 400 });
    }

    // 從資料庫中查詢 DeckUser 及其相關的 Deck 資料
    const deckUser: DeckUser | null = await prisma.deckUser.findUnique({
      where: { id: deckUserId },
      include: { deck: true },
    });

    if (!deckUser) {
      return NextResponse.json({ message: '牌組未找到' }, { status: 404 });
    }

    // 確認該 DeckUser 屬於當前用戶
    if (deckUser.userId !== session.user.id) {
      return NextResponse.json({ message: '禁止存取' }, { status: 403 });
    }

    // 解析請求的 body
    const data = await request.json();
    const { deckName, deckCards } = data;

    if (!deckCards) {
      return NextResponse.json({ message: 'deckCards 是必須的' }, { status: 400 });
    }

    // 檢查是否已存在相同的 deckCards
    let deck = await prisma.deck.findFirst({
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