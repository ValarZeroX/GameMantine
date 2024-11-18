// app/api/decks/user/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; // 確保路徑正確
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }

  try {
    const userDecks = await prisma.deckUser.findMany({
      where: { userId: session.user.id },
      include: { deck: true },
    });

    return NextResponse.json(userDecks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
  }
}