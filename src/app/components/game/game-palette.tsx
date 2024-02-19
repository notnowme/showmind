import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';

import { HiMiniPencil } from 'react-icons/hi2';
import { RiPaintFill } from 'react-icons/ri';
import { BsFillEraserFill } from 'react-icons/bs'

const GamePalette = () => {
    return (
        <div {...stylex.props(styles.palatte())}>
            <div {...stylex.props(styles.item())}>
                <div {...stylex.props(styles.paint())}>
                    <HiMiniPencil {...stylex.props(styles.icon())} />
                    <RiPaintFill {...stylex.props(styles.icon())} />
                    <BsFillEraserFill {...stylex.props(styles.icon())} />
                </div>
                <div {...stylex.props(styles.deleteDiv())}>
                    <span {...stylex.props(styles.deleteText())}>전체 지우기</span>
                </div>
            </div>
            <div {...stylex.props(styles.colorDiv())}>

            </div>
        </div>
    )
};

export default GamePalette;