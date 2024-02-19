import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

export const styles = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'flex',
        width: '660px',
        height: '520px',
        borderRadius: '5px',
        backgroundColor: '#272727',
        flexDirection: 'column'
    }),
    info: () => ({
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '80px',
        marginLeft: '30px',
        width: '600px',
        borderRadius: '5px',
        backgroundColor: '#1E1E1E',
        padding: '20px'
    }),
    user: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '3px'
    }),
    nickDiv: () => ({
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: '10px',
        paddingRight: '10px'
    }),
    nick: () => ({
        color: colors.secondary,
        fontSize: fontSizes.lgx2,
        fontWeight: 600
    }),
    icon: (size) => ({
        padding: '5px',
        backgroundColor: '#272727',
        color: colors.secondary,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '5px',
        marginLeft: '15px',
        cursor: 'pointer'
    }),
    id: () => ({
        color: colors.done,
        fontSize: fontSizes.base,
        marginLeft: '10px'
    }),
    scoreDiv: () => ({
        marginTop: '20px',
        display: 'flex',
        columnGap: '30px'
    }),
    score: () => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#272727',
        borderRadius: '5px',
        rowGap: '5px'
    }),
    cat: () => ({
        fontSize: fontSizes.lgx1,
        color: colors.third,
        fontWeight: 500
    }),
    point: () => ({
        fontSize: fontSizes.base,
        color: colors.secondary
    }),
    loginDiv: () => ({
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        alignItems: 'flex-start',
        width: '100%',
        padding: '20px',
        backgroundColor: '#272727',
        borderRadius: '5px'
    }),
    loginGroup: () => ({
        display: 'flex',
        flexDirection: 'column'
    }),
    login: () => ({
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
    }),
    bubble: () => ({
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: '#1E1E1E'
    }),
    status: (state) => ({
        color: state ? colors.clear : colors.error,
        fontSize: fontSizes.base
    }),
    loginText: () => ({
        fontSize: fontSizes.base,
        color: colors.secondary,
        marginLeft: '10px'
    }),
    title: () => ({
        marginTop: '20px',
        fontSize: fontSizes.lg,
        color: colors.third,
        fontWeight: 600
    }),
    input: () => ({
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        backgroundColor: colors.dp01,
        color: colors.secondary,
        fontSize: fontSizes.sm,
        width: '200px',
        height: '30px',
        paddingLeft: '7px'
    }),
    cancel: (state) => ({
        color: state ? colors.clear : colors.error
    })
})