import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    id: string;
    nick: string;
}

// 닉네임 확인.
export const GET = async(req: NextRequest) => {
    const nick = req.nextUrl.searchParams.get('chk');
    if(!nick) {
        return NextResponse.json({msg: 'CANNOT GET NICK'}, {status: 400});
    }
    try {
        const user = await db.user.findFirst({
            where: {
                nick
            }
        });
        if(user) {
            return NextResponse.json({msg: 'exists'}, {status: 409});
        }
        return NextResponse.json({msg: 'ok'}, {status: 200});
    } catch (error) {
        console.error(`[NICK_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
};

// 닉네임 변경.
export const PATCH = async(req: Request) => {
    const body: Body = await req.json();
    const {id, nick} = body;

    try {
        await db.user.update({
            where: {
                id
            },
            data: {
                nick
            }
        });
        return NextResponse.json({msg: 'ok'}, {status: 200});
    } catch (error) {
        console.error(`[NICK_PATCH_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
};