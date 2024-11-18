//app/api/decks/build/route.ts// app/api/decks/save/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SaveDeckRequest {
    deckCards: string;
    deckName: string;
    userId: string;
}

export async function POST(request: Request) {
    const { deckCards, deckName, userId }: SaveDeckRequest = await request.json();

    if (!deckCards || !userId) {
        return NextResponse.json({ message: '缺少必要參數' }, { status: 400 });
    }

    try {
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

        // 檢查 DeckUser 是否已存在
        const existingDeckUser = await prisma.deckUser.findUnique({
            where: {
                userId_deckId: {
                    userId: userId,
                    deckId: deck.id,
                },
            },
        });

        if (existingDeckUser) {
            return NextResponse.json({ message: '牌組已經儲存過了' }, { status: 200 });
        }

        // 創建 DeckUser 關聯
        await prisma.deckUser.create({
            data: {
                deckId: deck.id,
                userId,
                deckName,
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
    }
}