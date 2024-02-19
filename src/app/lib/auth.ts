/*
    nextauth의 옵션
*/

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                id: {type: 'text'},
                pw: {type: 'password'}
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sign`, {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            id: credentials?.id,
                            pw: credentials?.pw
                        })
                    });
                    const user = await res.json();
                    if(user.msg) {
                        // 에러를 발생시켜서 핸들링.
                        throw new Error(`${user.msg}`)
                    } else {
                        return user;
                    }
                } catch (error) {
                    if(error instanceof Error) {
                        throw new Error(`${error.message}`);
                    }
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user, trigger, session}) {
            // 세션 변경 시 함수.
            if(trigger === 'update') {
                if(session.modifyImg) {
                    token.imageUrl = session.modifyImg;
                };
                if(session.modifyNick) {
                    token.nick = session.modifyNick;
                }
            }
            return { ...token, ...user};
        },
        async session({session, token}) {
            session.user = token as any;
            return session;
        }
    }
}