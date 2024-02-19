/**
 * 로그인 기록
 */

import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Body {
    id: string;
}

export const POST = async(req: Request) => {
    const body: Body = await req.json();
    const { id } = body;

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
        return NextResponse.json(result);
    } catch (error) {
        console.error(`[DATA/LOGIN_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
};