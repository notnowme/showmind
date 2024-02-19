import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Body {
    rid: string;
};

// 방 입장.
export const PATCH = async(req: Request) => {
    const body: Body = await req.json();
    const { rid } = body;
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
        }
        const isJoined = await db.chatRoom.findFirst({
            where: {
                roomId: rid,
                members: {
                    some: {
                        id: session.user.id
                    }
                }
            }
        });
        if(isJoined) {
            return NextResponse.json({msg: 'Already joined'}, {status: 200});
        }
        const room = await db.chatRoom.update({
            where: {
                roomId: rid
            },
            data: {
                members: {
                    connect: {
                        id: session.user.id
                    },
                }
            }
        });
        return NextResponse.json(room, {status: 201});
    } catch (error) {
        console.error(`[CHAT_PUT_ERROR]`, error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500});
    }
};