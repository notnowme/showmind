/**
 * 유저 정보 페이지.
 */

'use client';
import { useEffect, useRef, useState } from 'react';

import { useSession } from "next-auth/react";
import { UserWithOutPw } from '@/app/(main)/my/page';
import { Login_log } from '@prisma/client'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from "@/app/styles/token.stylex";


import { FaPen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation';

import moment from 'moment';

interface MyInfoProps {
    user: UserWithOutPw
    loginData: Login_log[]
}

const MyInfo = ({user, loginData}:MyInfoProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [nick, setNick] = useState(user.nick);
    const [showInput, setShowInput] = useState(false);

    const { update } = useSession();
    const router = useRouter();

    // 취소 버튼
    const handleCancel = () => {
        setNick(user.nick);
        setShowInput(false);
    };

    // 닉네임 확인
    const nickCheck = async() => {
        try {
            const res = await fetch('/api/nick', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    nick
                })
            });
            if(res.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`[NICK_CHECK_ERROR]`, error);
            return false;
        }
    };

    // 닉네임 변경
    const nickChange = async() => {
        try {
            const res = await fetch('/api/nick', {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    id: user.id,
                    nick
                })
            });
            if(res.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`[NICK_CHANGE_ERROR]`, error);
            return false;
        }
    }
    const handleNickChange = async() => {
        // 닉네임 글자 수.

        // 닉네임 확인.
        const isExistsNick = await nickCheck();
        if(isExistsNick) {
            const isDoneChange = await nickChange();
            if(isDoneChange) {
                update({
                    modifyNick: nick
                });
                alert("변경했습니다.");
                handleCancel();
                router.refresh();
            } else {
                alert("실패했습니다.");
                return;
            }
        } else {
            alert('이미 있는 닉네임입니다.');
        }
        // 닉네임 변경.
    };
    useEffect(() => {
        if(showInput) {
            inputRef.current?.focus();
        }
    },[showInput])
    return (
        <div {...stylex.props(styels.info())}>
            <div {...stylex.props(styels.user())}>
                    { showInput
                        ? (
                            <div {...stylex.props(styels.nickDiv())}>
                                <input type="text" onChange={(e) => setNick(e.target.value)} value={nick} ref={inputRef}
                                    {...stylex.props(styels.input())} />
                                <div>
                                    <FaTimesCircle onClick={handleCancel}
                                        {...stylex.props(styels.icon(25), styels.cancel(false))} />
                                    <FaCheckCircle onClick={handleNickChange}
                                        {...stylex.props(styels.icon(25), styels.cancel(true))} />
                                </div>
                            </div>
                        )
                        : (
                            <div {...stylex.props(styels.nickDiv())}>
                                <h1 {...stylex.props(styels.nick())}>{user.nick}</h1>
                                <FaPen {...stylex.props(styels.icon(25))}
                                    onClick={()=>{
                                        setShowInput(true);
                                    }}
                                />
                            </div>
                        )
                    }
                <span {...stylex.props(styels.id())}>{user.id}</span>
            </div>
            <div {...stylex.props(styels.scoreDiv())}>
                <div {...stylex.props(styels.score())}>
                    <span {...stylex.props(styels.cat())}>포인트</span>
                    <span {...stylex.props(styels.point())}>{user.points}</span>
                </div>
                <div {...stylex.props(styels.score())}>
                    <span {...stylex.props(styels.cat())}>좋아요</span>
                    <span {...stylex.props(styels.point())}>{user.likes}</span>
                </div>
            </div>
            <h1 {...stylex.props(styels.title())}>로그인 기록</h1>
            <div {...stylex.props(styels.loginDiv())}>
                {loginData.map(data => (
                    <div key={data.no}>
                        <span {...stylex.props(styels.bubble(), styels.status(data.status))}>{data.status ? "성공" : "실패"}</span>
                        <span {...stylex.props(styels.loginText())}>{moment(data.login_date).format("YYYY-MM-DD HH:mm:ss")}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MyInfo;

const styels = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'flex',
        width: '660px',
        height: '520px',
        borderRadius: '5px',
        backgroundColor: '#272727',
        flexDirection: 'column'
    }),
    info: () => ({
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '80px',
        marginLeft: '30px',
        width: '600px',
        borderRadius: '5px',
        backgroundColor: '#1E1E1E',
        padding: '20px'
    }),
    user: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '3px'
    }),
    nickDiv: () => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px'
    }),
    nick: () => ({
        color: colors.secondary,
        fontSize: fontSizes.lgx2,
        fontWeight: 600
    }),
    icon: (size) => ({
        padding: '5px',
        backgroundColor: '#272727',
        color: colors.secondary,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '5px',
        marginLeft: '15px',
        cursor: 'pointer'
    }),
    id: () => ({
        color: colors.done,
        fontSize: fontSizes.base,
        marginLeft: '10px'
    }),
    scoreDiv: () => ({
        marginTop: '20px',
        display: 'flex',
        columnGap: '30px'
    }),
    score: () => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#272727',
        borderRadius: '5px',
        rowGap: '5px'
    }),
    cat: () => ({
        fontSize: fontSizes.lgx1,
        color: colors.third,
        fontWeight: 500
    }),
    point: () => ({
        fontSize: fontSizes.base,
        color: colors.secondary
    }),
    loginDiv: () => ({
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        alignItems: 'flex-start',
        width: '100%',
        padding: '20px',
        backgroundColor: '#272727',
        borderRadius: '5px'
    }),
    loginGroup: () => ({
        display: 'flex',
        flexDirection: 'column'
    }),
    login: () => ({
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    }),
    bubble: () => ({
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#1E1E1E'
    }),
    status: (state) => ({
        color: state ? colors.clear : colors.error,
        fontSize: fontSizes.base
    }),
    loginText: () => ({
        fontSize: fontSizes.base,
        color: colors.secondary,
        marginLeft: '10px'
    }),
    title: () => ({
        marginTop: '20px',
        fontSize: fontSizes.lg,
        color: colors.third,
        fontWeight: 600
    }),
    input: () => ({
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        backgroundColor: colors.dp01,
        color: colors.secondary,
        fontSize: fontSizes.sm,
        width: '200px',
        height: '30px',
        paddingLeft: '7px'
    }),
    cancel: (state) => ({
        color: state ? colors.clear : colors.error
    })
})