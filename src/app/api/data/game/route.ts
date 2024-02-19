/**
 * 방 목록 가져오기.
 */

import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        const room = await db.chatRoom.findMany({
            take: 5,
            include: {
                members: {
                    select: {
                        no: true,
                        id: true,
                        nick: true,
                        imageUrl: true
                    }
                },
                owner: {
                    select: {
                        no: true,
                        id: true,
                        nick: true,
                        imageUrl: true
                    }
                }
            }
        });
        return NextResponse.json(room, {status: 200});
    } catch (error) {
        console.error(`[DATA/GAME_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internel Server Error'}, {status: 500});
    }
}