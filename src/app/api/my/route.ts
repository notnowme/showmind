import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Body {
    no: number;
}
export const POST = async(req: Request) => {
    const body: Body = await req.json();
    const { no } = body;
    try {
        const user = await db.user.findFirst({
            where: {
                no
            }
        });
        if(!user) {
            return NextResponse.json({msg: 'Cannot Find User'}, {status: 401});
        }
        const {password, salt, roomId, ...result} = user;
        return NextResponse.json(result);
    } catch (error) {
        console.error(`[MY_POST_ERROR]`, error);
        return NextResponse.json({msg:'Internal Server Error'}, {status: 500})
    }
}