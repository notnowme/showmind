/**
 * 게임 메뉴.
*/
'use client';

import { useSession } from 'next-auth/react';

import { useChatRoomInfo } from '@/app/providers/chat-provider';

import * as stylex from '@stylexjs/stylex';
import { colors, fontSizes } from '@/app/styles/token.stylex';

const GameMenu = () => {
    const { data: session } = useSession();
    const chatroom = useChatRoomInfo();
    if (!chatroom) {
        return;
    }
    const { room } = chatroom;
    const isOwner = room?.owner.id === session?.user.id;
    const isStart = room?.members.length !== 1;
    return (
        <div {...stylex.props(styles.container())}>
            <div {...stylex.props(styles.titleDiv())}>
                <h1 {...stylex.props(styles.title())}>게임 시작을 기다리고 있어요</h1>
            </div>
            <div {...stylex.props(styles.infoDiv())}>
                <span {...stylex.props(styles.infoText(500))}>현재 방에 있는 인원</span>
                <span {...stylex.props(styles.infoText(600))}>
                    {room?.members.length} / 8
                </span>
            </div>
            {isOwner ?
                <div {...stylex.props(styles.btnDiv())}>
                    <button {...stylex.props(styles.btn(isStart))}>시작하기</button>
                    <span {...stylex.props(styles.btnText(isStart))}>
                        {isStart
                            ? "시작할 수 있어요"
                            : "최소 2명 이상이 있어야 시작할 수 있어요"
                        }
                    </span>
                </div>
                :
                <div {...stylex.props(styles.btnDiv())}>
                    <span {...stylex.props(styles.btnText(isStart))}>
                        방장이 게임을 시작할 때까지 기다려 주세요
                    </span>
                </div>
            }
        </div>
    )
};

export default GameMenu;

const styles = stylex.create({
    container: () => ({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '430px',
        height: '250px',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        zIndex: 15
    }),
    titleDiv: () => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    title: () => ({
        fontSize: fontSizes.lgx1,
        fontWeight: 600,
        color: 'black'
    }),
    infoDiv: () => ({
        marginTop: '40px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    infoText: (size) => ({
        fontSize: fontSizes.lg,
        color: 'black',
        fontWeight: size
    }),
    btnDiv: () => ({
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    btn: (state) => ({
        width: '80px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: state ? colors.personal : colors.done,
        border: 'none',
        outline: 'none',
        color: state ? 'black' : colors.third,
        fontSize: fontSizes.base,
        fontWeight: 500,
        textAlign: 'center'
    }),
    btnText: (state) => ({
        marginTop: '5px',
        color: state ? 'black' : colors.error,
        fontSize: fontSizes.sm,
        fontWeight: 500
    })
});