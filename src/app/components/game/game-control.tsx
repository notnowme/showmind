import GameChat from './game-chat';
import GamePalette from './game-palette';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';


const GameControl = () => {
    return (
        <div {...stylex.props(styles.control())}>
            <GamePalette />
            <GameChat />
        </div>
    )
};

export default GameControl;