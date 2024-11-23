// app/api/decks/list/usage/route.ts

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
        const sortBy = searchParams.get('sortBy') || 'usageCount';
        const sortOrder = searchParams.get('sortOrder') || 'desc';
        const card = searchParams.get('card');

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

        // 获取所有版本为 0 的牌组 ID
        const totalDecks = await prisma.deck.findMany({
            where: queryOptions,
            select: { id: true },
        });
        const totalDeckIds = totalDecks.map((deck) => deck.id);

        // 计算每个牌组的收藏次数（usageCount）
        const usageCounts = await prisma.deckUser.groupBy({
            by: ['deckId'],
            _count: { deckId: true },
            where: { deckId: { in: totalDeckIds } },
        });

        // 创建 usageCount 的映射
        // const usageCountMap = new Map<string, number>();
        // usageCounts.forEach((uc) => {
        //     usageCountMap.set(uc.deckId, uc._count.deckId || 0);
        // });

        // 生成有收藏次数的牌组列表
        const usedDecks = usageCounts.map((uc) => ({
            deckId: uc.deckId,
            usageCount: uc._count.deckId || 0,
        }));

        // 找出没有收藏次数的牌组
        const usedDeckIds = usageCounts.map((uc) => uc.deckId);
        const unusedDeckIds = totalDeckIds.filter((id) => !usedDeckIds.includes(id));

        // 为没有收藏的牌组设置 usageCount 为 0
        const unusedDecks = unusedDeckIds.map((deckId) => ({
            deckId,
            usageCount: 0,
        }));

        // 合并所有牌组
        let allDecks = [...usedDecks, ...unusedDecks];

        // 按收藏次数排序
        allDecks.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.usageCount - a.usageCount;
            } else {
                return a.usageCount - b.usageCount;
            }
        });

        // 实现分页
        const paginatedDecks = allDecks.slice(cursor, cursor + limit);

        let nextCursor: number = cursor;
        let endCursor: boolean = false;
        if (cursor + limit < allDecks.length) {
            endCursor = false;
            nextCursor = cursor + limit;
        } else {
            endCursor = true;
        }

        const deckIds = paginatedDecks.map((d) => d.deckId);

        // 获取 Deck 数据
        const decks = await prisma.deck.findMany({
            where: { id: { in: deckIds } },
        });

        // 获取平均评分
        const averageRatings = await prisma.deckRating.groupBy({
            by: ['deckId'],
            _avg: { rating: true },
            where: { deckId: { in: deckIds } },
        });
        const averageRatingMap = new Map<string, number>();
        averageRatings.forEach((ar) => {
            averageRatingMap.set(ar.deckId, ar._avg.rating || 0);
        });

        // 判断用户是否已收藏该 Deck
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

        // 组装结果
        const deckMap = new Map<string, Deck>();
        decks.forEach((deck) => {
            deckMap.set(deck.id, deck);
        });

        const decksWithExtras: DeckWithExtras[] = paginatedDecks.map((d) => {
            const deck = deckMap.get(d.deckId)!;
            const usageCount = d.usageCount;
            const averageRating = averageRatingMap.get(d.deckId) || 0;
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
        return NextResponse.json({ message: '获取牌组失败' }, { status: 500 });
    }
}