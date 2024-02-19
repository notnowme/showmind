import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async(req: Request) => {
    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
    }
    
    try {
        const user = await db.user.findFirst({
            where: {
                no: session.user.no
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