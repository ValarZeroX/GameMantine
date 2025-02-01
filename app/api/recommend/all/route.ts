// app/api/recommend/all/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';


export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ message: '缺少必要參數' }, { status: 400 });
        }

        const favoriteCards = await prisma.favoriteCard.findMany({
            where: {
                userId: userId,
            },
        });

        if (favoriteCards.length === 0) {
            return NextResponse.json({ message: '未找到收藏的卡牌数据' }, { status: 404 });
        }

        return NextResponse.json({ success: true, favoriteCards }, { status: 200 });

    } catch (error) {
        console.error('Error retrieving favorite cards:', error);
        return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
    }
}