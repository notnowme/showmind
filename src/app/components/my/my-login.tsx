
import moment from 'moment';

import { Login_log } from '@prisma/client'

import stylex from "@stylexjs/stylex";
import { styles } from '@/app/styles/my-info'

const MyLogin = ({ loginData }: { loginData: Login_log[] }) => {
    return (
        <>
            <h1 {...stylex.props(styles.title())}>로그인 기록</h1>
            <ul {...stylex.props(styles.loginDiv())}>
                {loginData.map(data => (
                    <li key={data.no}>
                        <span {...stylex.props(styles.bubble(), styles.status(data.status))}>{data.status ? "성공" : "실패"}</span>
                        <span {...stylex.props(styles.loginText())}>{moment(data.login_date).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MyLogin;