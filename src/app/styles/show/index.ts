import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

const styles = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: '200px 960px 200px',
        gridColumnGap: '40px',
        width: '1450px',
        height: '740px',
    }),
    exit: () => ({
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '80px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colors.error,
        border: 'none',
        outline: 'none',
        color: 'black',
        fontSize: fontSizes.base,
        fontWeight: 500,
        textAlign: 'center',
        cursor: 'pointer',
        opacity: {
            default: '0.8',
            ':hover': '1'
        }
    })
});

export default styles;