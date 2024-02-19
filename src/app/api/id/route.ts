/*
    아이디 확인
*/

import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('chk');
    if (!id) {
        return NextResponse.json({ msg: 'CANNOT GET ID' }, { status: 400 });
    }
    try {
        const user = await db.user.findFirst({
            where: {
                id
            }
        });
        if (user) {
            return NextResponse.json({ msg: 'exists' }, {status: 409});
        } else {
            return NextResponse.json({ msg: 'ok' }, {status: 200});
        }
    } catch (error) {
        console.error(`[USER_POST_ERROR]`, error);
        return NextResponse.json(JSON.stringify({ msg: 'Internal Server Error' }), { status: 500 })
    }
}