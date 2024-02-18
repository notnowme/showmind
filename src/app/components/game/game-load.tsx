import * as stylex from '@stylexjs/stylex';
import { colors, fontSizes } from '@/app/styles/token.stylex';
import Animation from '../loading-cat';

const GameLoad = () => {
    return (
        <div {...stylex.props(styles.container())}>
            <div {...stylex.props(styles.titleDiv())}>
                <h1 {...stylex.props(styles.title())}>방 정보를 가져오고 있어요</h1>
            </div>
        </div>
    )
};

export default GameLoad;

const styles = stylex.create({
    container: () => ({
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '430px',
        height: '250px',
        padding: '20px',
        borderRadius: '5px',
        zIndex: 15,
        backgroundColor: '#D9D9D9'
    }),
    titleDiv: () => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    title: () => ({
        fontSize: fontSizes.lgx1,
        fontWeight: 600,
        color: 'black'
    })
});