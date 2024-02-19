import stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../token.stylex";

export const styles = stylex.create({
    modal: () => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 10
    }),
    container: () => ({
      width: '800px',
      borderRadius: '5px',
      backgroundColor: colors.dp02,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      alignItems: 'center'
    }),
    top: () => ({
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    }),
    title: () => ({
      color: colors.primary,
      fontSize: fontSizes.lgx2,
      fontWeight: 500
    }),
    btn: () => ({
      width: '80px',
      height: '30px',
      borderRadius: '5px',
      backgroundColor: colors.personal,
      color: 'black',
      fontSize: fontSizes.base,
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: {
        default: '0.8',
        ':hover': '1'
      }
    }),
    list: () => ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      backgroundColor: '#373737',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }),
    listText: (margin) => ({
      fontSize: fontSizes.lg,
      color: colors.secondary,
      marginRight: `${margin}px`
    }),
    pagination: () => ({
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      columnGap: '15px',
      alignItems: 'center',
      marginTop: '20px',
      padding: '7px',
      borderRadius: '5px',
      backgroundColor: colors.dp00
    }),
    pageText: (isText) => ({
      fontSize: isText ? fontSizes.base : fontSizes.lgx1,
      margin: isText ? '0px 4px' : '0px',
      color: {
        default: colors.secondary,
        ':hover': colors.personal
      },
      cursor: 'pointer'
    }),
    ols: () => ({
      width: '100%',
      flex: 'flex',
      flexDirection: 'column'
    })
  })