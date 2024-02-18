import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Body {
    rid: string;
};

// 방 정보.
export const POST = async(req: Request) => {
    const body: Body = await req.json();
    const { rid } = body;
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

// 방 입장.
export const PUT = async(req: Request) => {
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

// 방 퇴장.
export const DELETE = async(req: Request) => {
    const body: Body = await req.json();
    const { rid } = body;
    try {
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({msg: 'Unauthorized'}, {status: 401});
        }
        console.log(session.user);
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
}