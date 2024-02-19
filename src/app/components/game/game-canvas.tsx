
import { useChatRoomInfo } from '@/app/providers/chat-provider';

import GameMenu from './game-menu';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';

const GameCanvas = () => {
    const chatroom = useChatRoomInfo();
    return (
        <div {...stylex.props(styles.drawing())}>
            <canvas {...stylex.props(styles.canvas())}>

            </canvas>
            <GameMenu />
            <span {...stylex.props(styles.roomTitle())}>{`현재 방: ${chatroom?.room?.title}`}</span>
            <div {...stylex.props(styles.time())}>
                <span {...stylex.props(styles.timeText())}>3:00</span>
            </div>
            <div {...stylex.props(styles.answer())}>
                <span {...stylex.props(styles.answerText())}>캐치마인드</span>
            </div>
        </div>
    )
};

export default GameCanvas;