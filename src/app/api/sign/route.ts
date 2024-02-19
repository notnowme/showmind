/*
    로그인
*/

import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

import * as bcrypt from 'bcryptjs';
import { signJwtAccessToken, signJwtRefreshToken } from "@/app/lib/jwt";

interface Body {
    id: string;
    pw: string;
}

export async function POST(req: Request) {
    const body: Body = await req.json();
    const {id,pw} = body;

    try {
        const user = await db.user.findFirst({
            where: {
                id
            }
        });

        // 유저가 없다면.
        if(!user) {
            console.log(`[SIGN_POST] - CANNOT FOUND USER WITH ID: ${id}`);
            return NextResponse.json({msg: 'No ID'});
        }

        // 비밀번호 복호화.
        const check = await bcrypt.compare(pw, user.password);

        if(check) {
            const { password, salt, joinAt, loginAt, provider, likes, roomId, imageKey, ...userInfo } = user;
            const accessToken = signJwtAccessToken(userInfo);
            const refreshToken = signJwtRefreshToken(userInfo);

            const result = {
                ...userInfo,
                accessToken,
            };
            
            // 로그인 시, 리프레시 토큰 새로 생성하여 저장.
            await db.token.upsert({
                where: {
                    id: user.id
                },
                update: {
                    token: refreshToken
                },
                create: {
                    token: refreshToken,
                    id: user.id
                }
            });
            await db.login_log.create({
                data: {
                    id: user.id,
                    login_date: new Date(),
                    status: true
                }
            });
            return NextResponse.json(result);
        } else {
            await db.login_log.create({
                data: {
                    id: user.id,
                    login_date: new Date(),
                    status: false
                }
            });
            return NextResponse.json({msg: 'Wrong Password'})
        }

    } catch(error) {
        console.error(`[SIGN_POST_ERROR]`, error);
        return NextResponse.json({msg: 'Internal Server Error' }, { status: 500} );
    }
}