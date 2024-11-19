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
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        // 定義可接受的排序欄位和順序
        const validSortBy = ['averageRating', 'isSaved', 'createdAt'];
        const validSortOrder = ['asc', 'desc'];

        // 驗證排序參數
        if (!validSortBy.includes(sortBy)) {
            return NextResponse.json({ message: '無效的排序方式' }, { status: 400 });
        }
        if (!validSortOrder.includes(sortOrder)) {
            return NextResponse.json({ message: '無效的排序順序' }, { status: 400 });
        }

        // 基於排序方式選擇排序欄位
        let orderBy: any = {};
        if (sortBy === 'averageRating') {
            orderBy = { averageRating: sortOrder };
        } else if (sortBy === 'createdAt') {
            orderBy = { createdAt: sortOrder };
        } else if (sortBy === 'isSaved') {
            // 如果排序方式為 isSaved，將 isSaved 放在前面
            // Prisma 不支援直接排序虛擬屬性，因此需要進行後端排序
            // 這裡先撈取資料，再在 JS 層面排序
        }

        const queryOptions: any = {
            where: {
                version: 0, // 過濾 version 為 0 的牌組
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

        // 根據排序方式建立查詢
        if (sortBy === 'averageRating') {
            // 需要先計算平均評分
            // 先撈取基本資料
            const decks = await prisma.deck.findMany({
                ...queryOptions,
            }) as DeckWithCount[];

            let nextCursor: string | null = null;
            if (decks.length > limit) {
                const nextItem = decks.pop();
                nextCursor = nextItem ? nextItem.id : null;
            }

            // 獲取牌組 ID 列表
            const deckIds = decks.map(deck => deck.id);

            // 使用 groupBy 計算每個牌組的平均評分
            const averageRatings = await prisma.deckRating.groupBy({
                by: ['deckId'],
                _avg: {
                    rating: true,
                },
                where: {
                    deckId: { in: deckIds },
                },
            });

            // 將平均評分轉換為映射
            const averageRatingMap: Record<string, number> = {};
            averageRatings.forEach(ar => {
                averageRatingMap[ar.deckId] = ar._avg.rating || 0;
            });

            // 初始化 isSaved 為 false，並設置 usageCount 和 averageRating
            const decksWithExtras: DeckWithExtras[] = decks.map(deck => ({
                ...deck,
                isSaved: false,
                usageCount: deck._count.deckUsers,
                averageRating: averageRatingMap[deck.id] || 0, // 加入平均評分
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

            // 根據 averageRating 排序
            decksWithExtras.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.averageRating - b.averageRating;
                } else {
                    return b.averageRating - a.averageRating;
                }
            });

            const response: DeckResponse = {
                decks: decksWithExtras,
                nextCursor,
            };

            return NextResponse.json(response);

        } else if (sortBy === 'isSaved') {
            // 當排序方式為 isSaved 時，先獲取 isSaved 狀態並排序
            const decks = await prisma.deck.findMany({
                ...queryOptions,
            }) as DeckWithCount[];

            let nextCursor: string | null = null;
            if (decks.length > limit) {
                const nextItem = decks.pop();
                nextCursor = nextItem ? nextItem.id : null;
            }

            // 獲取牌組 ID 列表
            const deckIds = decks.map(deck => deck.id);

            // 使用 groupBy 計算每個牌組的平均評分
            const averageRatings = await prisma.deckRating.groupBy({
                by: ['deckId'],
                _avg: {
                    rating: true,
                },
                where: {
                    deckId: { in: deckIds },
                },
            });

            // 將平均評分轉換為映射
            const averageRatingMap: Record<string, number> = {};
            averageRatings.forEach(ar => {
                averageRatingMap[ar.deckId] = ar._avg.rating || 0;
            });

            // 初始化 isSaved 為 false，並設置 usageCount 和 averageRating
            const decksWithExtras: DeckWithExtras[] = decks.map(deck => ({
                ...deck,
                isSaved: false,
                usageCount: deck._count.deckUsers,
                averageRating: averageRatingMap[deck.id] || 0, // 加入平均評分
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

            // 排序：先按 isSaved，再按選擇的 sortOrder
            if (sortOrder === 'asc') {
                decksWithExtras.sort((a, b) => Number(a.isSaved) - Number(b.isSaved));
            } else {
                decksWithExtras.sort((a, b) => Number(b.isSaved) - Number(a.isSaved));
            }

            const response: DeckResponse = {
                decks: decksWithExtras,
                nextCursor,
            };

            return NextResponse.json(response);

        } else {
            // 排序方式為 createdAt
            queryOptions.orderBy = {
                createdAt: sortOrder,
            };

            const decks = await prisma.deck.findMany(queryOptions) as DeckWithCount[];

            let nextCursor: string | null = null;
            if (decks.length > limit) {
                const nextItem = decks.pop();
                nextCursor = nextItem ? nextItem.id : null;
            }

            // 獲取牌組 ID 列表
            const deckIds = decks.map(deck => deck.id);

            // 使用 groupBy 計算每個牌組的平均評分
            const averageRatings = await prisma.deckRating.groupBy({
                by: ['deckId'],
                _avg: {
                    rating: true,
                },
                where: {
                    deckId: { in: deckIds },
                },
            });

            // 將平均評分轉換為映射
            const averageRatingMap: Record<string, number> = {};
            averageRatings.forEach(ar => {
                averageRatingMap[ar.deckId] = ar._avg.rating || 0;
            });

            // 初始化 isSaved 為 false，並設置 usageCount 和 averageRating
            const decksWithExtras: DeckWithExtras[] = decks.map(deck => ({
                ...deck,
                isSaved: false,
                usageCount: deck._count.deckUsers,
                averageRating: averageRatingMap[deck.id] || 0, // 加入平均評分
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
        }

    } catch (error) {
        console.error('Error fetching Decks:', error);
        return NextResponse.json({ message: '獲取牌組失敗' }, { status: 500 });
    }
}