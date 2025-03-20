// app/api/user/update/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions"; 
import { prisma } from '@/lib/prisma'; 

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { name, pokemonId } = await request.json();

  if (typeof name !== 'string' || typeof pokemonId !== 'string') {
    return NextResponse.json({ error: '無效的輸入資料' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, pokemonId },
    });

    return NextResponse.json({ message: '更新成功', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('更新使用者資料失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}