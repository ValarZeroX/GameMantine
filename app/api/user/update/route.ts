// app/api/user/update/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth/authOptions";  // 确保此路径指向您的 NextAuth 配置
import { prisma } from '@/lib/prisma'; // 确保此路径指向您的 Prisma 客户端实例

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const { name, pokemonId } = await request.json();

  if (typeof name !== 'string' || typeof pokemonId !== 'string') {
    return NextResponse.json({ error: '无效的输入数据' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, pokemonId },
    });

    return NextResponse.json({ message: '更新成功', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}