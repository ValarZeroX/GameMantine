// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '@/lib/elasticemail';
// import { sendVerificationEmail } from '@/lib/mailer';
import { randomBytes } from 'crypto';

interface RegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  lng: string;
}

export async function POST(request: Request) {
  const { email, password, confirmPassword, name, lng }: RegisterRequestBody = await request.json();
  // 基本驗證
  if (!email || !password || !confirmPassword) {
    return NextResponse.json({ error: '所有欄位都是必填的。' }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({ error: '密碼不匹配。' }, { status: 400 });
  }
  // 檢查用戶是否已存在
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: '電子郵件已被註冊。' }, { status: 400 });
  }

  // 密碼哈希
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // 創建新用戶
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    // 生成驗證令牌
    const token = randomBytes(32).toString('hex');

    // 儲存驗證令牌
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24小時後過期
      },
    });
    // 發送驗證郵件
    await sendVerificationEmail(email, token, lng);
    return NextResponse.json({ message: '註冊成功！請檢查您的郵件進行驗證。' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '註冊失敗。' }, { status: 500 });
  }
}