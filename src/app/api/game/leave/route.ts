import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Body {
    rid: string;
};

// 방 퇴장.
export const PATCH = async(req: Request) => {
    const body: Body = await req.json();
    const { rid } = body;
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
        }

        const room = await db.chatRoom.update({
            where: {
                roomId: rid
            },
            data: {
                members: {
                    disconnect: {
                        id: session.user.id
                    },
                }
            }
        });
        return NextResponse.json(room, {status: 200});
    } catch (error) {
        console.error(`[CHAT_DELETE_ERROR]`, error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500});
    }
};