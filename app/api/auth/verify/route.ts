// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: '驗證令牌缺失。' }, { status: 400 });
  }

  try {
    // 查找驗證令牌
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: '驗證令牌無效。' }, { status: 400 });
    }

    // 檢查令牌是否過期
    if (new Date() > verificationToken.expires) {
      return NextResponse.json({ error: '驗證令牌已過期。' }, { status: 400 });
    }

    // 激活用戶
    const updatedUser = await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() }, // 修改此行
    });

    // 刪除驗證令牌
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: '電子郵件驗證成功！您現在可以登入。' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: '驗證過程中出現錯誤。' }, { status: 500 });
  }
}