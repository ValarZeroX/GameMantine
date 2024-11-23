// app/api/decks/list/route.ts

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
    nextCursor: number | null;
    endCursor: boolean;
}

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const cursor= parseInt(searchParams.get('cursor') || '0', 10);
        const sortOrder = searchParams.get('sortOrder') || 'desc'; // 默认降序
        const card = searchParams.get('card');

        // 定义可接受的排序顺序
        const validSortOrder = ['asc', 'desc'];

        // 初始化查询条件
        const queryOptions: any = { version: 0 };

        // 添加卡片过滤条件
        if (card) {
            queryOptions.OR = [
                { deckCards: card },
                { deckCards: { startsWith: `${card},` } },
                { deckCards: { endsWith: `,${card}` } },
                { deckCards: { contains: `,${card},` } },
            ];
        }


        // 验证排序顺序参数
        if (!validSortOrder.includes(sortOrder)) {
            return NextResponse.json({ message: '无效的排序顺序' }, { status: 400 });
        }
        const total = await prisma.deck.findMany({
            where: queryOptions,
        });

        // 获取所有版本为 0 的牌组 ID
        const totalDecks = await prisma.deck.findMany({
            where: queryOptions,
            orderBy: {
                createdAt: sortOrder as 'asc' | 'desc', // 根据 sortOrder 进行升序或降序排序
            },
            skip: cursor,
            take: limit,
        });

        let nextCursor: number = cursor;
        let endCursor: boolean = false;
        if (total.length > limit) {
            nextCursor =  cursor + limit;
        }

        if (cursor + limit > total.length) {
            endCursor = true;
        }

        const totalDeckIds = totalDecks.map((deck) => deck.id);

        // 计算每个牌组的收藏次数（usageCount）
        const usageCounts = await prisma.deckUser.groupBy({
            by: ['deckId'],
            _count: { deckId: true },
            where: { deckId: { in: totalDeckIds } },
        });

        // 创建 usageCount 的映射
        const usageCountMap = new Map<string, number>();
        usageCounts.forEach((uc) => {
            usageCountMap.set(uc.deckId, uc._count.deckId || 0);
        });

        // 获取平均评分
        const averageRatings = await prisma.deckRating.groupBy({
            by: ['deckId'],
            _avg: { rating: true },
            where: { deckId: { in: totalDeckIds } },
        });
        const averageRatingMap = new Map<string, number>();
        averageRatings.forEach((ar) => {
            averageRatingMap.set(ar.deckId, ar._avg.rating || 0);
        });

        // 获取使用次数
        const updatedUsageCounts = await prisma.deckUser.groupBy({
            by: ['deckId'],
            _count: { deckId: true },
            where: { deckId: { in: totalDeckIds } },
        });
        const updatedUsageCountMap = new Map<string, number>();
        updatedUsageCounts.forEach((uc) => {
            updatedUsageCountMap.set(uc.deckId, uc._count.deckId || 0);
        });

        // 判断用户是否已收藏该 Deck
        let savedDeckIds = new Set<string>();
        if (session?.user?.id) {
            const savedDeckUsers = await prisma.deckUser.findMany({
                where: {
                    userId: session.user.id,
                    deckId: { in: totalDeckIds },
                },
                select: { deckId: true },
            });
            savedDeckIds = new Set(savedDeckUsers.map((du) => du.deckId));
        }

        // 组装结果
        const deckMap = new Map<string, Deck>();
        totalDecks.forEach((deck) => {
            deckMap.set(deck.id, deck);
        });

        const decksWithExtras: DeckWithExtras[] = totalDecks.map((d) => {
            const deck = deckMap.get(d.id)!;
            const usageCount = updatedUsageCountMap.get(d.id) || 0;
            const averageRating = averageRatingMap.get(d.id) || 0;
            const isSaved = savedDeckIds.has(d.id);
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
        return NextResponse.json({ message: '获取牌组失败' }, { status: 500 });
    }
}