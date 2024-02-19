/**
 * 마이페이지, Props만 내려주는 부모 역할.
 */


import * as stylex from '@stylexjs/stylex'

import MyImage from "@/app/components/my/my-image";
import MyInfo from "@/app/components/my/my-info";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { User, Login_log } from '@prisma/client'

export type UserWithOutPw = Omit<User, 'password' | 'salt'>


const getData = async (userNo: number) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/my`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            no: userNo
        })
    });

    const result = await res.json();
    return result;
};

const getLoginData = async(id: string) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/data/login`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id
        })
    });
    const result = await res.json();
    return result;
}

const MyPage = async() => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return <div>로그인하지 않았음.</div>
    };

    const [user, loginData]: [UserWithOutPw, Login_log[]] = await Promise.all(
        [
            getData(session.user.no),
            getLoginData(session.user.id)
        ]
    );
    return (
        <div {...stylex.props(styels.container())}>
            <MyImage
                imageUrl={user.imageUrl as string}
            />
            <MyInfo
                user={user}
                loginData={loginData}
            />
        </div>
    )
};

export default MyPage;

const styels = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'flex',
        width: '660px',
        height: '520px',
        borderRadius: '5px',
        backgroundColor: '#272727',
        flexDirection: 'column'
    })
})