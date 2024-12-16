// app/api/community/friend/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/authOptions';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: '未授權' }, { status: 401 });
    }

    try {
        const { message, status } = await request.json();

        if (!message) {
            return NextResponse.json({ error: '訊息不可為空' }, { status: 400 });
        }

        const upsertedFriend = await prisma.friend.upsert({
            where: {
                userId_type: {
                    userId: session.user.id,
                    type: 'friend',
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        pokemonId: true,
                    }
                }
            },
            update: {
                message: message,
                status: status, // 更新為 true
                updatedAt: new Date(), // 確保 updatedAt 被更新
            },
            create: {
                userId: session.user.id,
                type: 'friend', // 預設為 'friend'
                message: message,
                status: status, // 預設為 true
            },
        });

        return NextResponse.json({ friend: upsertedFriend }, { status: 201 });
    } catch (error) {
        console.error('新增好友失敗:', error);
        return NextResponse.json({ error: '新增好友失敗' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    // const session = await getServerSession(authOptions);

    // if (!session?.user?.id) {
    //     return NextResponse.json({ error: '權限不足' }, { status: 401 });
    // }

    try {
        const friends = await prisma.friend.findMany({
            where: {
                // userId: session.user.id,
                status: 'true', // 確保 status 為 'true'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        pokemonId: true,
                    }
                }
            },
        });

        return NextResponse.json({ friends }, { status: 200 });
    } catch (error) {
        console.error('取好友失敗:', error);
        return NextResponse.json({ error: '取好友失敗' }, { status: 500 });
    }
}