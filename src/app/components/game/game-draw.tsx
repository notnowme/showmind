/**
 * 게임 도화지 및 팔레트, 채팅창
*/
'use client';

import GameCanvas from './game-canvas';
import GameControl from './game-control';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';
import { DrawProvider } from '@/app/providers/draw-provider';

const GameDraw = () => {
    return (
        <section {...stylex.props(styles.container())}>
            <DrawProvider>
                <GameCanvas />
                <GameControl />
            </DrawProvider>
        </section>
    )
};

export default GameDraw;