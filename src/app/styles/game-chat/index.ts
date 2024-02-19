import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

export const styles = stylex.create({
    chat: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        width: '580px',
        height: '100%',
        borderRadius: '5px',
    }),
    chatList: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5px',
        width: '100%',
        height: '100%',
        maxHeight: '120px',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: colors.dp02,
        overflowX: 'hidden',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
            width: '7px'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: colors.dp03,
            borderRadius: '10px',
        }
    }),
    chatting: () => ({
        width: '100%'
    }),
    chatText: (state) => ({
        color: state ? colors.secondary : colors.done,
        fontSize: fontSizes.base,
    }),
    input: () => ({
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colors.dp00,
        color: colors.secondary,
        fontSize: fontSizes.base,
        outline: 'none',
        border: 'none',
        padding: '0 10px'
    })
})