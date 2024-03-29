/**
 * 로그인 기록
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
        const result = await db.login_log.findMany({
            where: {
                id
            },
            orderBy: {
                login_date: 'desc'
            },
            take: 3
        });
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.error(`[DATA/LOGIN_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
};