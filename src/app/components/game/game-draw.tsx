/**
 * 게임 도화지 및 팔레트, 채팅창
*/

import GameCanvas from './game-canvas';
import GameControl from './game-control';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';

const GameDraw = () => {
    return (
        <section {...stylex.props(styles.container())}>
            <GameCanvas />
            <GameControl />
        </section>
    )
};

export default GameDraw;