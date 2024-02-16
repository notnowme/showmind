/*
    비밀번호 입력 컴포넌트.
*/
'use client';
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import stylex from "@stylexjs/stylex";
import { signStyles } from "@/app/(main)/(sign)/login/page";
import { colors } from "@/app/styles/token.stylex";

interface InputPwProps {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    passChk: string;
    setPassChk: Dispatch<SetStateAction<string>>;
    setIsChkPw: Dispatch<SetStateAction<boolean>>;
    id: string | undefined
    nick: string | undefined
}

const InputPw = ({password, setPassword, passChk, setPassChk, setIsChkPw, id, nick}: InputPwProps) => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if(password.length < 4) {
            setMsg("");
            setIsChkPw(false);
            return;
        }
        if(password !== passChk) {
            setMsg("비밀번호가 일치하지 않습니다.");
            setIsChkPw(false);
            return;
        }
        if(password === passChk) {
            setMsg("");
            setIsChkPw(true);
            return;
        }
    },[password, passChk]);
    return (
        <form>
            <div {...stylex.props(signStyles.inputDiv())}>
                <span {...stylex.props(signStyles.label())}>아이디</span>
                <input type='text' disabled={true} {...stylex.props(signStyles.input(), registerStyles.done())} defaultValue={id} />
                <span {...stylex.props(signStyles.label())}>닉네임</span>
                <input type='text' disabled={true} {...stylex.props(signStyles.input(), registerStyles.done())} defaultValue={nick} />
            </div>
            <div {...stylex.props(signStyles.inputDiv(), registerStyles.margin())}>
                <span {...stylex.props(signStyles.label())}>비밀번호</span>
                <span {...stylex.props(signStyles.msg(false))}>{msg}</span>
                <input type='password' autoComplete="off" {...stylex.props(signStyles.input())}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div {...stylex.props(signStyles.inputDiv(), registerStyles.margin())}>
                <span {...stylex.props(signStyles.label())}>비밀번호 확인</span>
                <input type='password' autoComplete="off" {...stylex.props(signStyles.input())}
                    value={passChk}
                    onChange={(e) => setPassChk(e.target.value)}
                />
            </div>
        </form>
    )
};

export default InputPw;

const registerStyles = stylex.create({
    margin: () => ({
        marginBottom: '20px'
    }),
    done: () => ({
        color: colors.done
    })
});