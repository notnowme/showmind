import NextAuth from 'next-auth';

declare module "next-auth" {
    interface Session {
        user: {
            no: number;
            id: string;
            nick: string;
            role: 'ADMIN' | 'MODERATOR' | 'NORMAL';
            points: number;
            imageUrl: string;
            accessToken: string;
        }
    }
}