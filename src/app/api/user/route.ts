/*
    아이디 및 닉네임 확인
*/

import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";


interface Body {
    type: 'id' | 'nick';
    id?: string;
    nick?: string;
}

export async function POST(req: Request) {
    const body: Body = await req.json();
    const { id, nick, type } = body;
    try {
        if(type === 'id') {
            const user = await db.user.findFirst({
                where: {
                    id
                }
            });
            if(user) {
                return NextResponse.json({msg: 'exists'});
            } else {
                return NextResponse.json({msg: 'ok'});
            }
        } else {
            const user = await db.user.findFirst({
                where: {
                    nick
                }
            });
            if(user) {
                return NextResponse.json({msg: 'exists'});
            } else {
                return NextResponse.json({msg: 'ok'});
            }
        }
    } catch (error) {
        console.error(`[USER_POST_ERROR]`, error);
        return NextResponse.json(JSON.stringify({msg: 'Internal Server Error'}), {status: 500})
    }
}