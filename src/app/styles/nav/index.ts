import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';

export const styles = stylex.create({
    nav: () => ({
        position: 'relative',
        width: '100%',
        height: '60px',
        backgroundColor: colors.dp02,
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    title: () => ({
        color: colors.primary,
        fontSize: '2.4rem',
        marginLeft: '20px',
        fontWeight: '600'
    }),
    sign: () => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '40px',
        marginRight: '40px',
        height: '100%',
    }),
    text: () => ({
        fontSize: fontSizes.sm,
        cursor: 'pointer',
        color: {
            default: colors.secondary,
            ':hover': colors.personal
        }
    }),
    info: (state) => ({
        display: 'flex',
        marginRight: '40px',
        alignItems: 'center',
        backgroundColor: {
            default: state ? colors.dp00 : colors.dp01,
            ':hover': colors.dp00
        },
        borderRadius: '10px',
        padding: '5px',
        paddingRight: '20px'
    }),
    user: () => ({
        display: 'flex',
        flexDirection: 'column',
    }),
    img: () => ({
        position: 'relative',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#484848',
        marginRight: '15px',
        overflow: 'hidden',
    }),
    drop: (state) => ({
        fontSize: fontSizes.sm,
        color: colors.secondary,
        textAlign: 'right',
    }),
    onModal: (state) => ({
        // backgroundColor: state ? colors.dp00 : colors.dp01
    }),
    onModalText: (state) => ({
        marginTop: state ? '10px' : '0px'
    })
})