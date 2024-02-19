import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

export const registerStyles = stylex.create({
    stepDiv: () => ({
        marginTop: '40px',
        marginBottom: '40px',
        width: '400px',
        display: 'flex',
        justifyContent: 'center'
    }),
    text: () => ({
        fontSize: fontSizes.base,
        marginRight: '20px'
    }),
    step: (state) => ({
        color: state ? colors.secondary : colors.done
    }),
    btn: () => ({
        marginTop: '5px',
        width: '400px',
        height: '50px',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        color: colors.secondary,
        fontSize: fontSizes.lg,
        fontWeight: 500,
        backgroundColor: '#2F3136',
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    }),
    next: (state) => ({
        backgroundColor: state ? colors.personal : '#2a2a2a',
        color: state ? 'black' : colors.done,
    }),
    margin: () => ({
        marginBottom: '20px'
    }),
    done: () => ({
        color: colors.done
    })
});