import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions";  // 根據您的項目結構調整路徑
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: '未授權' }, { status: 401 });
    }

    const { deckUserId, deckName, deckCards, userId } = await req.json();

    if (userId !== session.user.id) {
        return NextResponse.json({ message: '禁止存取' }, { status: 403 });
    }

    try {
        const updatedDeckUser = await prisma.deckUser.update({
            where: { id: deckUserId },
            data: {
                deckName,
                deck: {
                    update: {
                        deckCards,
                    },
                },
            },
        });
        return NextResponse.json(updatedDeckUser, { status: 200 });
    } catch (error) {
        console.error('Error updating DeckUser:', error);
        return NextResponse.json({ message: '更新牌組失敗' }, { status: 500 });
    }
}

// 您可以添加其他 HTTP 方法的處理，例如 GET, PUT 等