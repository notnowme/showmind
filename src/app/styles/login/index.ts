import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

export const signStyles = stylex.create({
    form: () => ({
        marginTop: '40px',
    }),
    inputDiv: () => ({
        position: 'relative',
        width: '400px',
        marginBottom: '32px'
    }),
    input: () => ({
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%',
        height: '50px',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        backgroundColor: colors.dp03,
        paddingLeft: '10px',
        fontSize: fontSizes.base,
        fontWeight: 500,
        color: colors.primary,
        letterSpacing: '.1rem'
    }),
    label: () => ({
        fontSize: fontSizes.base,
        fontWeight: 500,
        color: colors.secondary,
    }),
    msg: (state) => ({
        fontSize: fontSizes.sm,
        color: state ? colors.clear : colors.error,
        marginLeft: '10px'
    }),
    text: (color) => ({
        fontSize: fontSizes.sm,
        color: color === 'done' ? colors.done : colors.third,
        fontWeight: 500,
        marginLeft: color === 'third' && '1rem',
        cursor: color === 'third' && 'pointer',
        textDecoration: {
            default: 'none',
            ':hover': color === 'third' && 'underline'
        }
    }),
    btn: () => ({
        marginBottom: '8px',
        width: '100%',
        height: '50px',
        outline: 'none',
        border: 'none',
        borderRadius: '5px',
        color: 'black',
        fontSize: fontSizes.lg,
        fontWeight: 500,
        backgroundColor: colors.personal,
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    }),
    line: () => ({
        width: '100%',
        height: '1px',
        backgroundColor: '#333',
        marginBottom: '40px'
    }),
    socialDiv: () => ({
        width: '400px',
        display: 'flex',
        justifyContent: 'space-around'
    }),
    social: () => ({
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#1E1E1E'
    })
})