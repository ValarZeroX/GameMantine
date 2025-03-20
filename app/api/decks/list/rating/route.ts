// app/api/decks/list/rating/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Deck } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions";

interface DeckWithExtras extends Deck {
    isSaved: boolean;
    usageCount: number;
    averageRating: number;
}


interface DeckResponse {
    decks: DeckWithExtras[];
    nextCursor: number;
    endCursor: boolean;
}

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const cursor = parseInt(searchParams.get('cursor') || '0', 10);
        const sortBy = searchParams.get('sortBy') || 'averageRating';
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const card = searchParams.get('card');
        const validSortBy = ['averageRating', 'usageCount', 'createdAt'];
        const validSortOrder = ['asc', 'desc'];

        const queryOptions: any = { version: 0 };
        if (card) {
            queryOptions.OR = [
                { deckCards: card },
                { deckCards: { startsWith: `${card},` } },
                { deckCards: { endsWith: `,${card}` } },
                { deckCards: { contains: `,${card},` } },
            ];
        }

        // 驗證排序參數
        if (!validSortBy.includes(sortBy)) {
            return NextResponse.json({ message: '無效的排序方式' }, { status: 400 });
        }
        if (!validSortOrder.includes(sortOrder)) {
            return NextResponse.json({ message: '無效的排序順序' }, { status: 400 });
        }
        const totalDecks = await prisma.deck.groupBy({
            by: ['id'],
            where: queryOptions,
        });
        const totalDeckIds = totalDecks.map((deck) => deck.id);

        // 第一步
        const averageRatings = await prisma.deckRating.groupBy({
            by: ['deckId'],
            _avg: { rating: true },
            where: { deckId: { in: totalDeckIds } },
        });
        const averageRatingMap = new Map<string, number>();
        averageRatings.forEach((ar) => {
            averageRatingMap.set(ar.deckId, ar._avg.rating || 0);
        });
        const ratedDecks = averageRatings.map((ar) => ({
            deckId: ar.deckId,
            averageRating: ar._avg.rating || 0,
        }));

        const ratedDeckIds = averageRatings.map((ar) => ar.deckId);
        const unratedDeckIds = totalDeckIds.filter((id) => !ratedDeckIds.includes(id));

        const unratedDecks = unratedDeckIds.map((deckId) => ({
            deckId,
            averageRating: 0,
        }));

        let allDecks = [...ratedDecks, ...unratedDecks];

        allDecks.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.averageRating - a.averageRating;
            } else {
                return a.averageRating - b.averageRating;
            }
        });

        const paginatedDecks = allDecks.slice(cursor, cursor + limit);

        // let nextCursor: number | null = null;
        let nextCursor: number = cursor;
        let endCursor: boolean = false;
        if (cursor + limit < allDecks.length) {
            endCursor = false;
            nextCursor = cursor + limit;
        } else {
            endCursor = true;
        }

        const deckIds = paginatedDecks.map((u) => u.deckId);

        // 第二步
        const decks = await prisma.deck.findMany({
            where: { id: { in: deckIds } },
        });

        // 第三步
        const usageCounts = await prisma.deckUser.groupBy({
            by: ['deckId'],
            _count: { deckId: true },
            where: { deckId: { in: deckIds } },
        });

        const usageCountMap = new Map<string, number>();
        usageCounts.forEach((uc) => {
            usageCountMap.set(uc.deckId, uc._count.deckId || 0);
        });

        // 第四步：判斷用戶是否已收藏該 Deck
        let savedDeckIds = new Set<string>();
        if (session?.user?.id) {
            const savedDeckUsers = await prisma.deckUser.findMany({
                where: {
                    userId: session.user.id,
                    deckId: { in: deckIds },
                },
                select: { deckId: true },
            });
            savedDeckIds = new Set(savedDeckUsers.map((du) => du.deckId));
        }

        // 第五步：組裝結果
        const deckMap = new Map<string, Deck>();
        decks.forEach((deck) => {
            deckMap.set(deck.id, deck);
        });

        const decksWithExtras: DeckWithExtras[] = paginatedDecks.map((d) => {
            const deck = deckMap.get(d.deckId)!;
            const usageCount = usageCountMap.get(d.deckId) || 0;
            const averageRating = d.averageRating;
            const isSaved = savedDeckIds.has(d.deckId);
            return {
                ...deck,
                isSaved,
                usageCount,
                averageRating,
            };
        });

        const response: DeckResponse = {
            decks: decksWithExtras,
            nextCursor,
            endCursor,
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error fetching Decks:', error);
        return NextResponse.json({ message: '獲取牌組失敗' }, { status: 500 });
    }
}