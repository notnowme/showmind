/*
    nextauth 로그인 인증
*/

import NextAuth from "next-auth/next";
import { authOptions } from '@/app/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };