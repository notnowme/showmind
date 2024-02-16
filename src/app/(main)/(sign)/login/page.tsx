/*
    로그인 페이지
*/

'use client'

import { signIn } from 'next-auth/react'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';
import { useEffect, useRef, useState } from 'react';

const Login = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    
    const [idMsg, setIdMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");

    const handleSubmit = async(e: React.MouseEvent) => {
        e.preventDefault();
        setIdMsg("");
        setPwMsg("");
        try {
            const result = await signIn('credentials', {
                id: idRef?.current?.value,
                pw: pwRef?.current?.value,
                redirect: false,
                callbackUrl: '/'
            });
            if(result?.error) {
                if(result.error === 'No ID') {
                    setIdMsg("없는 아이디입니다.");
                } else if(result.error === 'Wrong Password') {
                    setPwMsg("비밀번호가 일치하지 않습니다.");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        idRef?.current?.focus();
    },[])
    return (
        <>
            <form {...stylex.props(signStyles.form())}>
                <div {...stylex.props(signStyles.inputDiv())}>
                    <label htmlFor='id' {...stylex.props(signStyles.label())}>아이디</label>
                    <span {...stylex.props(signStyles.msg(false))}>{idMsg}</span>
                    <input type="text" id='id' ref={idRef} {...stylex.props(signStyles.input())} />
                </div>
                <div {...stylex.props(signStyles.inputDiv())}>
                    <label htmlFor='pw' {...stylex.props(signStyles.label())}>비밀번호</label>
                    <span {...stylex.props(signStyles.msg(false))}>{pwMsg}</span>
                    <input type="text" id='pw' ref={pwRef} {...stylex.props(signStyles.input())} />
                    <span {...stylex.props(signStyles.text('done'))}>비밀번호를 잊으셨나요?</span>
                    <span {...stylex.props(signStyles.text('third'))}>비밀번호 찾기</span>
                </div>
                <div {...stylex.props(signStyles.inputDiv())}>
                    <button {...stylex.props(signStyles.btn())}
                        onClick={handleSubmit}
                    >
                        로그인
                    </button>
                    <span {...stylex.props(signStyles.text('done'))}>아직 가입하지 않으셨나요?</span>
                    <span {...stylex.props(signStyles.text('third'),)}>가입하기</span>
                </div>
            </form>
            <div {...stylex.props(signStyles.line())}></div>
            <div {...stylex.props(signStyles.socialDiv())}>
                <div {...stylex.props(signStyles.social())}>

                </div>
                <div {...stylex.props(signStyles.social())}>

                </div>
            </div>
        </>
    )
};

export default Login;

export const signStyles = stylex.create({
    form: () => ({
        marginTop: '40px',
    }),
    inputDiv: () => ({
        position: 'relative',
        width: '400px',
        marginBottom: '32px'
    }),
    input: () => ({
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%',
        height: '50px',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        backgroundColor: colors.dp03,
        paddingLeft: '10px',
        fontSize: fontSizes.base,
        fontWeight: 500,
        color: colors.primary,
        letterSpacing: '.1rem'
    }),
    label: () => ({
        fontSize: fontSizes.base,
        fontWeight: 500,
        color: colors.secondary,
    }),
    msg: (state) => ({
        fontSize: fontSizes.sm,
        color: state ? colors.clear : colors.error,
        marginLeft: '10px'
    }),
    text: (color) => ({
        fontSize: fontSizes.sm,
        color: color === 'done' ? colors.done : colors.third,
        fontWeight: 500,
        marginLeft: color === 'third' && '1rem',
        cursor: color === 'third' && 'pointer',
        textDecoration: {
            default: 'none',
            ':hover': color === 'third' && 'underline'
        }
    }),
    btn: () => ({
        marginBottom: '8px',
        width: '100%',
        height: '50px',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        color: 'black',
        fontSize: fontSizes.lg,
        fontWeight: 500,
        backgroundColor: colors.personal,
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    }),
    line: () => ({
        width: '100%',
        height: '1px',
        backgroundColor: '#333',
        marginBottom: '40px'
    }),
    socialDiv: () => ({
        width: '400px',
        display: 'flex',
        justifyContent: 'space-around'
    }),
    social: () => ({
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#1E1E1E'
    })
})