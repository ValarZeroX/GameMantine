// app/api/decks/user/[id]/detail/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 引入 Prisma 客戶端
import type { Deck } from '@prisma/client';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params;
        // 撈取特定 Deck，包含 deckUsers 和 deckRatings 的關聯資料
        const deck = await prisma.deck.findUnique({
            where: { id: id },
        });
        // 如果 Deck 未找到，返回 404 錯誤
        if (!deck) {
            return NextResponse.json(
                { message: '未找到指定的牌組' },
                { status: 404 }
            );
        }

        const cardNumbers = deck.deckCards.split(',').map(num => num.trim());

        // 根據卡片號碼撈取對應的 Card 資料
        const cards = await prisma.card.findMany({
            where: {
                number: { in: cardNumbers },
            },
        });

        // 返回撈取到的 Deck 資料和對應的 Card 資料
        return NextResponse.json({ deck, cards }, { status: 200 });
    } catch (error) {
        console.error('獲取牌組時發生錯誤:', error);
        return NextResponse.json(
            { message: '獲取牌組失敗，請稍後再試' },
            { status: 500 }
        );
    }
}