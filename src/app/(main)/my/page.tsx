/**
 * 마이페이지, Props만 내려주는 부모 역할.
 */

import MyImage from "@/app/components/my/my-image";
import MyInfo from "@/app/components/my/my-info";

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { useServerApi } from '@/app/hooks/useServerApi';

import * as stylex from '@stylexjs/stylex'

const MyPage = async() => {
    const session = await getServerSession(authOptions);
    const { getUserInfo, getLoginData } = useServerApi();
    
    if(!session) {
        return <div>로그인하지 않았음.</div>
    };


    const [user, loginData] = await Promise.all(
        [
            getUserInfo(session.user.id),
            getLoginData(session.user.id)
        ]
    );
    if(user?.res !== 200 || loginData?.res !== 200) {
        return <div>정보를 가져오지 못함</div>
    }
    return (
        <section {...stylex.props(styels.container())}>
            <MyImage
                imageUrl={user.result.imageUrl as string}
            />
            <MyInfo
                user={user.result}
                loginData={loginData.result}
            />
        </section>
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