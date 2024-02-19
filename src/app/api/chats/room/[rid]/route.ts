
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

interface Props {
    rid: string;
};

// 방 정보.
export const GET = async(req: Request, {params}: {params: Props}) => {
    const rid = params.rid;
    if(!rid) {
        return NextResponse.json({msg: 'NOT FOUND A ROOM ID'}, {status: 400});
    }
    try {
        const room = await db.chatRoom.findFirst({
            where: {
                roomId: rid
            },
            include: {
                members: {
                    select: {
                        id: true,
                        no: true,
                        nick: true,
                        imageUrl: true
                    }
                },
                owner: {
                    select: {
                        id: true,
                        no: true,
                        nick: true,
                        imageUrl: true
                    }
                }
            }
        });
        if(!room) {
            return NextResponse.json({msg: 'Cannot find a room'}, {status: 404});
        }
        return NextResponse.json(room, {status: 200});
    } catch (error) {
        console.error(`[CHAT_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500});
    }
};