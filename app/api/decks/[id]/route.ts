// app/api/decks/[id]/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; // 確保路徑正確
import { prisma } from '@/lib/prisma'; // 引入 Prisma 客戶端
// import type { DeckUser, Deck } from '@prisma/client'; // 正確導入 DeckUser 和 Deck 類型
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // console.log('id:', id);
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: '未授權' }, { status: 401 });
        }
        // 檢查該會員是否已經儲存過該牌組
        const existingDeckUser = await prisma.deckUser.findFirst({
            where: {
                userId: session.user.id,
                deckId: id,
            },
        });
        const response = {
            isSaved: !!existingDeckUser,
        };
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error updating DeckUser:', error);
        return NextResponse.json({ message: '更新牌組失敗' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // console.log('id:', id);
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: '未授權' }, { status: 401 });
        }

        const data = await request.json();
        const { deckName } = data;

        // 檢查該會員是否已經儲存過該牌組
        const existingDeckUser = await prisma.deckUser.findFirst({
            where: {
                userId: session.user.id,
                deckId: id,
            },
        });

        if (!existingDeckUser) {
            // 如果沒有儲存過，則幫他儲存
            await prisma.deckUser.create({
                data: {
                    userId: session.user.id,
                    deckId: id,
                    deckName: deckName,
                },
            });
            return NextResponse.json({ message: '牌組已儲存' }, { status: 200 });
        } else {
            console.log('牌組已經儲存過了');
            return NextResponse.json({ message: '牌組已儲存' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error updating DeckUser:', error);
        return NextResponse.json({ message: '更新牌組失敗' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        // console.log('id:', id);
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: '未授權' }, { status: 401 });
        }

        // 檢查該會員是否已經儲存過該牌組
        const existingDeckUser = await prisma.deckUser.findFirst({
            where: {
                userId: session.user.id,
                deckId: id,
            },
        });

        if (existingDeckUser) {
            // 如果已經儲存過，則刪除該筆資料
            await prisma.deckUser.delete({
                where: { id: existingDeckUser.id },
            });
            return NextResponse.json({ message: '牌組已刪除' }, { status: 200 });
        } else {
            return NextResponse.json({ message: '牌組未找到' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting DeckUser:', error);
        return NextResponse.json({ message: '刪除牌組失敗' }, { status: 500 });
    }
}