import { User, Login_log } from '@prisma/client'

export type UserWithOutPw = Omit<User, 'password' | 'salt' | 'roomId'>

export const useServerApi = () => {

    // 유저 정보.
    const getUserInfo = async(id: string) => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/data/my`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id
            }),
            cache: 'no-store'
        });
        const result: UserWithOutPw = await res.json();
        return {
            res: res.status,
            result
        }
    };
    
    // 로그인 정보.
    const getLoginData = async(id: string) => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/data/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id
            }),
            cache: 'no-store'
        });
        const result: Login_log[] = await res.json();
        return {
            res: res.status,
            result
        }
    }

    return {
        getLoginData,
        getUserInfo
    }
}

