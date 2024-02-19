'use client';
import { v4 as uuid } from 'uuid';

import { useEffect, useRef } from 'react';

import useMessage from '@/app/hooks/useMessage';
import useScroll from '@/app/hooks/useScroll';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-chat';


const GameChat = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const { msg, handleSend } = useMessage(inputRef);
    const { isScroll, scrollToBottom } = useScroll(chatEndRef);

    useEffect(() => {
        if (!isScroll) {
            scrollToBottom();
        }
    }, [msg, isScroll]);

    return (
        <div {...stylex.props(styles.chat())}>
            <ul {...stylex.props(styles.chatList())}>
                {msg.length > 0 &&
                    msg.map(data => (
                        // 키 값 랜덤 생성을 위한 uuid
                        <li key={uuid()}
                            {...stylex.props(styles.chatting())}>
                            <span {...stylex.props(styles.chatText(data.isUser))}>
                                {data.text}
                            </span>
                        </li>
                    ))
                }
                <div ref={chatEndRef}></div>
            </ul>
            <input type="text" ref={inputRef} onKeyDown={handleSend}
                {...stylex.props(styles.input())} />
        </div>
    )
};

export default GameChat;