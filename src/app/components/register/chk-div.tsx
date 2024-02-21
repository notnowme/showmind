/*
    회원 가입 시, 아이디 및 닉네임 중복 확인 컴포넌트.
*/

'use client';

import { forwardRef } from 'react';
import * as stylex from '@stylexjs/stylex'

import { colors, fontSizes } from '@/app/styles/token.stylex';
import { signStyles } from '@/app/styles/login';

interface ChkDivProps {
    forwardRef: React.Ref<HTMLInputElement>;
    chk: () => void;
    title: string;
    msg: string;
    isChk: boolean
}

const ChkDiv = forwardRef(({ forwardRef, chk, title, msg, isChk }: ChkDivProps, ref) => {
    return (
        <div {...stylex.props(signStyles.inputDiv())}>
            <span {...stylex.props(signStyles.label())}>{title}</span>
            <span {...stylex.props(signStyles.msg(isChk))}>{msg}</span>
            <input type='text' ref={forwardRef} {...stylex.props(signStyles.input())} />
            <button {...stylex.props(registerStyles.btn(isChk))}
                onClick={chk}
            >
                {title} 중복 확인
            </button>
        </div>
    )
});
ChkDiv.displayName = 'ChkDiv';
export default ChkDiv;

const registerStyles = stylex.create({
    btn: (state) => ({
        marginTop: '5px',
        width: '400px',
        height: '50px',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        color: colors.secondary,
        fontSize: fontSizes.base,
        fontWeight: 500,
        backgroundColor: '#2F3136',
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    })
});