

import * as stylex from '@stylexjs/stylex';
import { colors, fontSizes } from '@/app/styles/token.stylex';

import { HiMiniPencil } from 'react-icons/hi2';
import { RiPaintFill } from 'react-icons/ri';
import { BsFillEraserFill } from 'react-icons/bs'

import GameMenu from './game-menu';
import GameChat from './game-chat';
import { useChatRoomInfo } from '@/app/providers/chat-provider';


const GameDraw = () => {
    const chatroom = useChatRoomInfo();
    return (
        <div {...stylex.props(styles.container())}>
            <div {...stylex.props(styles.drawing())}>
                <GameMenu />
                <span {...stylex.props(styles.roomTitle())}>{`현재 방: ${chatroom?.room?.title}`}</span>
                <div {...stylex.props(styles.time())}>
                    <span {...stylex.props(styles.timeText())}>3:00</span>
                </div>
                <div {...stylex.props(styles.answer())}>
                    <span {...stylex.props(styles.answerText())}>캐치마인드</span>
                </div>
            </div>
            <div {...stylex.props(styles.control())}>
                <div {...stylex.props(styles.palatte())}>
                    <div {...stylex.props(styles.item())}>
                        <div {...stylex.props(styles.paint())}>
                            <HiMiniPencil {...stylex.props(styles.icon())}/>
                            <RiPaintFill {...stylex.props(styles.icon())}/>
                            <BsFillEraserFill {...stylex.props(styles.icon())}/>
                        </div>
                        <div {...stylex.props(styles.deleteDiv())}>
                            <span {...stylex.props(styles.deleteText())}>전체 지우기</span>
                        </div>
                    </div>
                    <div {...stylex.props(styles.colorDiv())}>

                    </div>
                </div>
                <GameChat />
            </div>
        </div>
    )
};

export default GameDraw;

const styles = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '15px'
    }),
    roomTitle: () => ({
        position: 'absolute',
        left: 0,
        top: '-30px',
        fontSize: fontSizes.lg,
        color: colors.primary,
        fontWeight: 500
    }),
    drawing: () => ({
        position: 'relative',
        width: '100%',
        height: '570px',
        borderRadius: '5px',
        backgroundColor: '#D9D9D9',
    }),
    answer: () => ({
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150px',
        height: '30px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        top: '10px',
        left: '10px'
    }),
    answerText: () => ({
        fontSize: fontSizes.base,
        color: 'black',
        fontWeight: 500
    }),
    time: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: '#D9D9D9'
    }),
    timeText: () => ({
        color: 'black',
        fontSize: fontSizes.lg,
        fontWeight: 600
    }),
    control: () => ({
        display: 'flex',
        columnGap: '60px',
        width: '100%',
        height: '170px',
    }),
    palatte: () => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        width: '320px',
        height: '100%',
        borderRadius: '5px',
        rowGap: '20px',
        backgroundColor: colors.dp00
    }),
    item: () => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),
    paint: () => ({
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '150px',
        height: '25px',
        backgroundColor: colors.dp01,
        borderRadius: '5px'
    }),
    icon: () => ({
        width: '20px',
        height: '20px',
        color: colors.secondary
    }),
    deleteDiv: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '25px',
        padding: '3px',
        borderRadius: '5px',
        backgroundColor: colors.dp01
    }),
    deleteText: () => ({
        fontSize: fontSizes.sm,
        color: colors.third
    }),
    colorDiv: () => ({
        width: '100%',
        height: '100px',
        borderRadius: '5px',
        backgroundColor: colors.dp01
    })
})