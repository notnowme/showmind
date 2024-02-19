/*
    회원 가입 페이지
*/
'use client';
import { useEffect, useRef, useState } from 'react';


import ChkDiv from '@/app/components/register/chk-div';
import InputPw from '@/app/components/register/input-pw';

import * as stylex from '@stylexjs/stylex'
import { registerStyles } from '@/app/styles/register';

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
            const res = await fetch(`/api/id?chk=${idRef.current.value}`, {
                method: 'GET',
            });
            if(res.status === 200) {
                setId(idRef.current.value);
                setIdMsg("사용 가능한 아이디입니다.");
                setIsChkdId(true);
            } else if(res.status === 409) {
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
            const res = await fetch(`/api/nick?chk=${nickRef.current.value}`, {
                method: 'GET',
            });
            if(res.status === 200) {
                setNick(nickRef.current.value);
                setNickMsg("사용 가능한 닉네임입니다.");
                setIsChkNick(true);
            } else if(res.status === 409) {
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