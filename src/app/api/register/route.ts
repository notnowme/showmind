/*
    가입
*/

import { db } from "@/app/lib/db";

import * as bcrypt from 'bcryptjs';

import { NextResponse } from "next/server";

interface SignUpBody {
    id: string;
    nick: string;
    pw: string;
}

export async function POST(req: Request) {
    try {
        const body: SignUpBody = await req.json();
        const { id, nick, pw } = body;

        // bcrypt로 salt 생성.
        const prevSalt = await bcrypt.genSalt();

        // 암호화.
        const hashedPassword = await bcrypt.hash(pw, prevSalt);

        // 가입.
        const user = await db.user.create({
            data: {
                id,
                nick,
                password: hashedPassword,
                provider: 'credentials',
                salt: prevSalt,
                imageUrl: "https://utfs.io/f/38a37af0-ae7f-4a91-9e09-a7d70004fb96-lxos5c.png"
            }
        });

        // 비밀번호를 제외한 모든 정보 담기.
        const { password, salt, ...result} = user;

        return NextResponse.json(result);

    } catch (error) {
        console.error(`[REGISTER_POST_ERROR]`, error);
        return new NextResponse(JSON.stringify({msg: 'Internal Server Error'}), { status: 500});
    }
}