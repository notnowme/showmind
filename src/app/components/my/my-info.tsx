/**
 * 유저 정보 페이지.
 */

import { UserWithOutPw } from '@/app/hooks/useServerApi';

import { Login_log } from '@prisma/client'

import * as stylex from '@stylexjs/stylex'
import { styles } from '@/app/styles/my-info'

import MyLogin from './my-login';
import MyResult from './my-result';
import MyNick from './my-nick';

interface MyInfoProps {
    user: UserWithOutPw
    loginData: Login_log[]
}

const MyInfo = ({user, loginData}:MyInfoProps) => {
    return (
        <div {...stylex.props(styles.info())}>
            <MyNick user={user} />
            <MyResult points={user.points} likes={user.likes}/>
            <MyLogin loginData={loginData} />
        </div>
    )
};

export default MyInfo;