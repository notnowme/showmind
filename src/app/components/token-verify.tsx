/*
    토큰 검증 및 갱신.
*/

'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";



const TokenVerify = () => {
    const {data: session} = useSession();
    useEffect(() => {
        if(session) {
            console.log(session.user.accessToken);
        }
    },[session])
    return <></>;
};

export default TokenVerify;