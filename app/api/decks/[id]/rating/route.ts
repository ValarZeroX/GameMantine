// app/api/decks/[id]/rating/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; // 確保路徑正確
import { prisma } from '@/lib/prisma'; // 引入 Prisma 客戶端


export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
      const { id } = await params;
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.id) {
          return NextResponse.json({ message: '未授權' }, { status: 401 });
      }

      const userId = session.user.id;
      const body = await request.json();
      const { rating, comment } = body;

      // 驗證輸入資料 (允許浮點數，範圍 0.0 - 5.0)
      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
          return NextResponse.json({ message: '評分無效' }, { status: 400 });
      }

      // 確保 Deck 存在
      const deck = await prisma.deck.findUnique({ where: { id } });
      if (!deck) {
          return NextResponse.json({ message: '找不到該牌組' }, { status: 404 });
      }

      // 創建或更新評價
      const deckRating = await prisma.deckRating.upsert({
          where: {
              userId_deckId: {
                  userId,
                  deckId: id,
              },
          },
          update: {
              rating,
              comment,
          },
          create: {
              userId,
              deckId: id,
              rating,
              comment,
          },
      });

      return NextResponse.json({ message: '評價已提交', deckRating }, { status: 200 });
  } catch (error) {
      console.error('提交評價時發生錯誤：', error);
      return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
  }
}

  // 新增 GET 方法
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // 確保 Deck 存在
        const deck = await prisma.deck.findUnique({ where: { id } });
        if (!deck) {
            return NextResponse.json({ message: '找不到該牌組' }, { status: 404 });
        }

        // 計算平均評分
        const averageRating = await prisma.deckRating.aggregate({
            _avg: {
                rating: true,
            },
            where: {
                deckId: id,
            },
        });

        // 計算評分數量
        const ratingCount = await prisma.deckRating.count({
            where: {
                deckId: id,
            },
        });

        return NextResponse.json({
            averageRating: averageRating._avg.rating || 0,
            ratingCount,
        }, { status: 200 });
    } catch (error) {
        console.error('獲取平均評分時發生錯誤：', error);
        return NextResponse.json({ message: '伺服器錯誤' }, { status: 500 });
    }
}