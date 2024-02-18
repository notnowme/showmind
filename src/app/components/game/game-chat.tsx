'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import * as stylex from '@stylexjs/stylex';
import { colors, fontSizes } from '@/app/styles/token.stylex';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/app/providers/socket-provider';
import { v4 as uuid } from 'uuid';

interface Msg {
    text: string;
    isUser: boolean;
}

const GameChat = () => {
    const { socket, isConnected } = useSocket();

    const query = useSearchParams();
    const { data: session } = useSession();

    const inputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [msg, setMsg] = useState<Msg[]>([]);
    const [isScroll, setIsScroll] = useState(false);

    const handleSend = (e: React.KeyboardEvent) => {
        if(!socket || !isConnected) {
            return;
        }
        const rid = query?.get('room');
        if(!rid) {
            return;
        }
        if(!inputRef.current) {
            return;
        }
        if(e.key !== 'Enter') {
            return;
        }
        const msg = inputRef.current.value;
        if(msg.length === 0) {
            // 글자 수 확인
            return;
        }

        socket.emit("msg", {rid, msg, user: session?.user});
        inputRef.current.value = "";
    };

    // 소켓
    useEffect(() => {
        if(!socket || !isConnected) {
            return;
        };
        socket.on("joined", (data: any) => {
            const text = `[${data.nick} 님이 입장했습니다]`;
            const content: Msg = {
                text,
                isUser: false
            }
            setMsg(prev => [...prev, content]);
        });

        socket.on("leaved", (data: any) => {
            const text = `[${data.nick} 님이 퇴장했습니다]`;
            const content: Msg = {
                text,
                isUser: false
            }
            setMsg(prev => [...prev, content]);
        });

        socket.on("msg", (data: any) => {
            const { msg, user } = data;
            const text = `${user.nick}: ${msg}`;
            const content: Msg = {
                text,
                isUser: true
            }
            setMsg(prev => [...prev, content]);
        });
    },[]);

    // 하단으로 이동
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({behavior: 'instant'});
    }

    // 채팅 스크롤 밑으로.
    useEffect(() => {
        if(!chatEndRef.current) return;
        const observer = new IntersectionObserver((els) => {
            els.forEach(el => {
                // 화면 감지
                if(el.isIntersecting) {
                    setIsScroll(false);
                } else {
                    setIsScroll(true);
                }
            });
        });
        observer.observe(chatEndRef.current);
        return () => {
            observer.disconnect();
        }
    },[]);

    useEffect(() => {
        if(!isScroll) {
            scrollToBottom();
        }
    },[msg, isScroll])
    return (
        <div {...stylex.props(styles.chat())}>
            <div {...stylex.props(styles.chatList())}>
                {msg.length > 0 &&
                    msg.map(data => (
                        <div key={uuid()}
                            {...stylex.props(styles.chatting())}>
                            <span {...stylex.props(styles.chatText(data.isUser))}>
                                {data.text}
                            </span>
                        </div>
                    ))
                }
                <div ref={chatEndRef}></div>
            </div>
            <input type="text" ref={inputRef} onKeyDown={handleSend}
                {...stylex.props(styles.input())} />
        </div>
    )
};

export default GameChat;

const styles = stylex.create({
    chat: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        width: '580px',
        height: '100%',
        borderRadius: '5px',
    }),
    chatList: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        width: '100%',
        height: '100%',
        maxHeight: '120px',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: colors.dp02,
        overflowX: 'hidden',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
            width: '7px'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: colors.dp03,
            borderRadius: '10px',
        }
    }),
    chatting: () => ({
        width: '100%'
    }),
    chatText: (state) => ({
        color: state ? colors.secondary : colors.done,
        fontSize: fontSizes.base,
    }),
    input: () => ({
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colors.dp00,
        color: colors.secondary,
        fontSize: fontSizes.base,
        outline: 'none',
        border: 'none',
        padding: '0 10px'
    })
})