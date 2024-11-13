//app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions"; // 根据您的项目结构调整路径

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };