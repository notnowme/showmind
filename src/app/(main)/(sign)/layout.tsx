/*
    로그인 페이지 레이아웃
*/
'use client';

import { usePathname } from 'next/navigation';

import * as stylex from '@stylexjs/stylex'
import { colors } from '@/app/styles/token.stylex';

interface LoginLayOutProps {
    children: React.ReactNode
}

const LoginLayOut = ({ children }: LoginLayOutProps) => {
    const pathName = usePathname();

    return (
        <div {...stylex.props(styles.container())}>
            <h1 {...stylex.props(styles.title())}>
                {pathName === '/login' ? '로그인' : '회원 가입'}
            </h1>
            {children}
        </div>
    )
};

export default LoginLayOut;

const styles = stylex.create({
    container: () => ({
        width: '480px',
        height: '640px',
        borderRadius: '5px',
        backgroundColor: colors.dp02,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
    }),
    title: () => ({
        color: colors.primary,
        fontSize: '3rem',
        fontWeight: 600,
    })
});