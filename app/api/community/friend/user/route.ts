// app/api/community/friend/user/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/authOptions';


export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: '權限不足' }, { status: 401 });
    }

    try {
        const friends = await prisma.friend.findMany({
            where: {
                userId: session.user.id,
                type: 'friend',
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