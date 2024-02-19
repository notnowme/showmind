/*
    로그인 페이지
*/

'use client'
import { useEffect, useRef, useState } from 'react';

import { signIn } from 'next-auth/react'

import * as stylex from '@stylexjs/stylex'
import { signStyles } from '@/app/styles/login';

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