/*
    회원 가입 페이지
*/
'use client';
import { useEffect, useRef, useState } from 'react';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';
import ChkDiv from '@/app/components/register/chk-div';
import InputPw from '@/app/components/register/input-pw';

import { IoIosArrowForward } from 'react-icons/io'

const Register = () => {
    const idRef = useRef<HTMLInputElement | null>(null);
    const nickRef = useRef<HTMLInputElement | null>(null);

    const [id, setId] = useState("");
    const [nick, setNick] = useState("");

    const [password, setPassword] = useState("");
    const [passChk, setPassChk] = useState("");

    const [isChkId, setIsChkdId] = useState(false);
    const [isChkNick, setIsChkNick] = useState(false);
    const [isChkPw, setIsChkPw] = useState(false);

    const [next, setNext] = useState(false);

    const [idMsg, setIdMsg] = useState("");
    const [nickMsg, setNickMsg] = useState("");

    // 아이디 중복 확인
    const chkId = async() => {
        if(!idRef.current) {
            return;
        }

        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    id: idRef.current.value,
                    type: 'id'
                })
            });
            const result = await res.json();
            if(result.msg === 'ok') {
                setId(idRef.current.value);
                setIdMsg("사용 가능한 아이디입니다.");
                setIsChkdId(true);
            } else {
                setIdMsg("이미 가입된 아이디입니다.");
                setIsChkdId(false);
            }
        } catch (error) {
            console.error(`[REGISTER]`, error);
        }
    }
    const chkNick = async() => {
        if(!nickRef.current) {
            return;
        }
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    nick: nickRef.current.value,
                    type: 'nick'
                })
            });
            const result = await res.json();
            if(result.msg === 'ok') {
                setNick(nickRef.current.value);
                setNickMsg("사용 가능한 닉네임입니다.");
                setIsChkNick(true);
            } else {
                setNickMsg("이미 가입된 닉네임입니다.");
                setIsChkNick(false);
            }
        } catch (error) {
            console.error(`[REGISTER]`, error);
        }
    }

    // 다음 정보 입력 폼 보여주기
    const showNext = () => {
        if(!isChkId) {
            alert('아이디 확인을 해주세요.');
            idRef.current?.focus();
            return;
        }
        if(!isChkNick) {
            alert('닉네임 확인을 해주세요.');
            nickRef.current?.focus();
            return;
        }
        if(isChkId && isChkNick) {
            setNext(true);
        }
    }
    // 가입하기
    const signUp = async() => {
        if(!id || !nick || !password) {
            console.error('SOMETHING ERROR');
            return;
        }
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    id,
                    nick,
                    pw: password
                })
            });
            if(res.status === 200) {
                console.log('done!');
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
            <div {...stylex.props(registerStyles.stepDiv())}>
                <span {...stylex.props(registerStyles.text(), registerStyles.step(true))}>아이디 및 닉네임 확인</span>
                {/* <span {...stylex.props(registerStyles.text(), registerStyles.step(true))}>▶</span> */}
                <IoIosArrowForward {...stylex.props(registerStyles.text(), registerStyles.step(true))} />
                <span {...stylex.props(registerStyles.text(), registerStyles.step(next))}>비밀번호 입력</span>
            </div>
            {!next ? (
                <>
                    <ChkDiv
                        forwardRef={idRef}
                        chk={chkId}
                        title="아이디"
                        msg={idMsg}
                        isChk={isChkId}
                    />
                    <ChkDiv
                        forwardRef={nickRef}
                        chk={chkNick}
                        title="닉네임"
                        msg={nickMsg}
                        isChk={isChkNick}
                    />
                </>
            ) : (
                <InputPw
                    password={password}
                    passChk={passChk}
                    setPassword={setPassword}
                    setPassChk={setPassChk}
                    setIsChkPw={setIsChkPw}
                    id={id}
                    nick={nick}
                />
            )}
            {!next ? (
                <button {...stylex.props(registerStyles.btn(), registerStyles.next(isChkId && isChkNick))}
                    disabled={!isChkId || !isChkNick}
                    onClick={showNext}
                >
                    다음
                </button>
            ) : (
                <button {...stylex.props(registerStyles.btn(), registerStyles.next(isChkPw))}
                    disabled={!isChkPw}
                    onClick={signUp}
                >
                    가입하기
                </button>
            )}
        </>
    )
};

export default Register;

const registerStyles = stylex.create({
    stepDiv: () => ({
        marginTop: '40px',
        marginBottom: '40px',
        width: '400px',
        display: 'flex',
        justifyContent: 'center'
    }),
    text: () => ({
        fontSize: fontSizes.base,
        marginRight: '20px'
    }),
    step: (state) => ({
        color: state ? colors.secondary : colors.done
    }),
    btn: () => ({
        marginTop: '5px',
        width: '400px',
        height: '50px',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        color: colors.secondary,
        fontSize: fontSizes.lg,
        fontWeight: 500,
        backgroundColor: '#2F3136',
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    }),
    next: (state) => ({
        backgroundColor: state ? colors.personal : '#2a2a2a',
        color: state ? 'black' : colors.done,
    }),
    margin: () => ({
        marginBottom: '20px'
    }),
    done: () => ({
        color: colors.done
    })
});