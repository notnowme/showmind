/**
 * 유저 정보.
*/

import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

type Body = {
    id: string
}

export const POST = async(req: Request) => {
    const body: Body = await req.json();
    const { id } = body;
    if(!id) {
        return NextResponse.json({msg: 'Unauthorized'}, {status: 400});
    }
    try {
        const user = await db.user.findFirst({
            where: {
                id
            }
        });
        if(!user) {
            return NextResponse.json({msg: 'Cannot Find User'}, {status: 401});
        }
        const {password, salt, roomId, ...result} = user;
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.error(`[MY_POST_ERROR]`, error);
        return NextResponse.json({msg:'Internal Server Error'}, {status: 500})
    }
}