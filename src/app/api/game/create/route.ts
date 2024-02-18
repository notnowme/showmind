/**
 * 방 생성.
 */

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { v4 as uuid } from 'uuid';

interface Body {
    name: string;
    isPrivate: boolean
}

export const POST = async(req: Request) => {
    const body: Body = await req.json();
    const { name, isPrivate } = body;

    try {
        const user = await getServerSession(authOptions);
        if(!user) {
            return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
        }
        const room = await db.chatRoom.create({
            data: {
                roomId: uuid(),
                userId: user.user.id,
                title: name,
                isPrivate,
                status: false,
                members: {
                    connect: {
                        id: user.user.id
                    }
                },
                createdAt: new Date()
            }
        });
        return NextResponse.json(room, {status: 200});
    } catch (error) {
        console.error(`[CREATE_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500});   
    }
}