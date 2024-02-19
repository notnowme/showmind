/**
 * 로그인 기록
 */

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async() => {

    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
    }
    
    try {
        const result = await db.login_log.findMany({
            where: {
                id: session.user.id
            },
            orderBy: {
                login_date: 'desc'
            },
            take: 3
        });
        console.log(result);
        return NextResponse.json(result);
    } catch (error) {
        console.error(`[DATA/LOGIN_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
};