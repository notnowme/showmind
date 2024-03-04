import * as stylex from '@stylexjs/stylex';
import { colors, fontSizes } from '@/app/styles/token.stylex';
import CURSOR from './cursor.svg';
export const styles = stylex.create({
    container: () => ({
        width: '960px',
        height: '570px',
        position: 'relative'
    }),
    circle: (pos) => ({
        position: 'absolute',
        backgroundColor: 'tomato',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        left: '-15px',
        top: '-15px',
        transform: `translate(${pos.x}px, ${pos.y}px)`
    })
})