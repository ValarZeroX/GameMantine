// app/api/recommend/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FavoriteCardRequest {
    userId: string;
    cards: string[]; // 例如："A1-005,A1-006,A1-007,..."
    set: string; // 例如："A1"
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const set = searchParams.get('set');

        if (!userId || !set) {
            return NextResponse.json({ message: '缺少必要參數' }, { status: 400 });
        }

        const favoriteCard = await prisma.favoriteCard.findUnique({
            where: {
                userId_set: {
                    userId,
                    set,
                },
            },
        });

        if (!favoriteCard) {
            return NextResponse.json({ message: '未找到收藏的卡牌数据' }, { status: 404 });
        }

        return NextResponse.json({ success: true, favoriteCard }, { status: 200 });

    } catch (error) {
        console.error('Error retrieving favorite cards:', error);
        return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
    }
}

/**
 * 處理 POST 請求：儲存或更新使用者的 collectedCards
 */
export async function POST(request: Request) {
    try {
        const { userId, cards, set }: FavoriteCardRequest = await request.json();

        if (!userId || !cards || !set) {
            return NextResponse.json({ message: '缺少必要參數' }, { status: 400 });
        }

        // 验证 cards 是否为字符串数组
        if (!Array.isArray(cards) || !cards.every(card => typeof card === 'string')) {
            return NextResponse.json({ message: 'cards 參數格式部正確' }, { status: 400 });
        }

        // 使用 upsert 方法创建或更新 FavoriteCard 记录
        const favoriteCard = await prisma.favoriteCard.upsert({
            where: {
                userId_set: {
                    userId,
                    set,
                },
            },
            update: {
                mycards: cards,
            },
            create: {
                userId,
                set,
                mycards: cards,
            },
        });

        return NextResponse.json({ success: true, favoriteCard }, { status: 200 });
    } catch (error) {
        console.error('Error saving favorite cards:', error);
        return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
    }
}