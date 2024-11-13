import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // 根据您的项目结构调整路径
import bcrypt from 'bcrypt'; // 用于密码加密和验证

export const authOptions: NextAuthOptions = {
  providers: [
    // Google 登录提供者
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Facebook 登录提供者
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // 自定义认证提供者（电子邮件和密码）
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "电子邮件", type: "email", placeholder: "your@email.com" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 查询数据库以验证用户
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password) {
          // 使用 bcrypt 比较密码
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
        }

        // 如果认证失败，返回 null
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        if (!user.email) {
            // 如果沒有 email，拒絕登入
            return false;
          }
          
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existingUser) {
          const accountExists = existingUser.accounts.some(
            (acc) =>
              acc.provider === account.provider &&
              acc.providerAccountId === account.providerAccountId
          );

          if (!accountExists) {
            // 自动连接新账户到现有用户
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login', // 指定自定义登录页面
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata);
    },
    warn(code) {
      console.warn('NextAuth warning:', code);
    },
    debug(code, metadata) {
      console.debug('NextAuth debug:', code, metadata);
    },
  }, 
};
