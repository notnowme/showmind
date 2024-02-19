'use client';

import GameUserList from '@/app/components/game/game-user-list';
import GameDraw from '@/app/components/game/game-draw';
import GameLoad from '@/app/components/game/game-load';

import useChatSocket from '@/app/hooks/useChatSocket';
import { useChatRoomInfo } from '@/app/providers/chat-provider';

import * as stylex from '@stylexjs/stylex'
import styles from '@/app/styles/show';

const Show = () => {
    const chatroom = useChatRoomInfo();

    const { handleLeave } = useChatSocket({ chatroom });

    return (
        <>
            {
                chatroom?.room
                    ?
                    <section {...stylex.props(styles.container())}>
                        <GameUserList member={chatroom?.room?.members.slice(0, 4)} />
                        <GameDraw />
                        {chatroom?.room.members.length >= 5 && <GameUserList member={chatroom?.room?.members.slice(4, 8)} />}
                        <button
                            {...stylex.props(styles.exit())}
                            onClick={handleLeave}
                        >
                            나가기
                        </button>
                    </section>

                    :
                    <GameLoad />
            }
        </>
    )
};
export default Show;