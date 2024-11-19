// app/api/decks/list/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Deck } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions";

interface DeckWithExtras extends Deck {
    isSaved: boolean;
    usageCount: number;
}

interface DeckWithCount extends Deck {
    _count: {
        deckUsers: number;
    };
}

interface DeckResponse {
    decks: DeckWithExtras[];
    nextCursor: string | null;
}

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const cursor = searchParams.get('cursor');

        const queryOptions: any = {
            where: {
                version: 0, // 過濾 version 為 0 的牌組
            },
            orderBy: {
                updatedAt: 'desc', // 以 updatedAt 降序排序
            },
            take: limit + 1, // 多撈一筆以判斷是否有下一頁
            include: {
                _count: {
                    select: { deckUsers: true }, // 計算 deckUsers 的數量
                },
            },
        };

        if (cursor) {
            queryOptions.cursor = { id: cursor };
            queryOptions.skip = 1; // 跳過游標所在的那一筆
        }

        const decks = await prisma.deck.findMany(queryOptions) as DeckWithCount[];


        let nextCursor: string | null = null;
        if (decks.length > limit) {
            const nextItem = decks.pop();
            nextCursor = nextItem ? nextItem.id : null;
        }

        // 初始化 isSaved 為 false，並設置 usageCount
        const decksWithExtras: DeckWithExtras[] = decks.map(deck => ({
            ...deck,
            isSaved: false,
            usageCount: deck._count.deckUsers,
        }));

        // 如果用戶已登入，撈取該用戶已儲存的牌組 IDs
        if (session?.user?.id) {
            const savedDeckUsers = await prisma.deckUser.findMany({
                where: {
                    userId: session.user.id,
                    deckId: {
                        in: decks.map(deck => deck.id),
                    },
                },
                select: {
                    deckId: true,
                },
            });

            const savedDeckIds = new Set(savedDeckUsers.map(deckUser => deckUser.deckId));

            // 更新 isSaved 屬性
            decksWithExtras.forEach(deck => {
                if (savedDeckIds.has(deck.id)) {
                    deck.isSaved = true;
                }
            });
        }

        const response: DeckResponse = {
            decks: decksWithExtras,
            nextCursor,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching Decks:', error);
        return NextResponse.json({ message: '獲取牌組失敗' }, { status: 500 });
    }
}