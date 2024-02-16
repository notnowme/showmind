/*
    JWT
*/

import jwt, { JwtPayload } from 'jsonwebtoken';

type SignOption = {
    expiresIn?: string | number;
};

const DEFUALT_SIGN_OPTION: SignOption = {
    expiresIn: "1h"
}

// AccessToken 생성
export const signJwtAccessToken = (payload: JwtPayload, options: SignOption = DEFUALT_SIGN_OPTION) => {
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key!, options);
    return token;
};

// Token 검증
export const verifyJwt = (token: string) => {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch(error) {
        console.log(`[JWT_ERROR]`, error);
        return null;
    }
};

// RefreshToken 생성, 암호키를 다르게 함.
export const signJwtRefreshToken = (payload: JwtPayload) => {
    const secret_key = process.env.REFRESH_SECRET_KEY;
    const options: SignOption = {
        expiresIn: "336h" // 2주일
    }
    const token = jwt.sign(payload, secret_key!, options);
    return token;
}

// 토큰 검증.
export const verifyJwtRefrsh = (token: string) => {
    try {
        const secret_key = process.env.REFRESH_SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(`[JWT_REFRESH_ERROR]`, error);
        return null;
    }
};
