/**
 * 방 목록
*/

'use client';

import { useRouter } from 'next/navigation';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'

interface GameListProps {
    roomId: string;
    title: string;
    nick: string;
    userNum: number;
    status: boolean
}

const GameList = ({roomId, title, nick, userNum, status}: GameListProps) => {
    const router = useRouter();
    const handleMove = () => {
      // 인원 수나 비밀번호 등을 확인한 뒤 입장해야 됨.
      router.push(`/show?room=${roomId}`);
    }
    return (
        <li {...stylex.props(styles.infoContainer())}>
            <div {...stylex.props(styles.info())}>
                <div {...stylex.props(styles.infoSize(360))}>
                    <span onClick={handleMove}
                      {...stylex.props(styles.infoText(status))}>
                      {title}
                    </span>
                </div>
                <div {...stylex.props(styles.infoSize(210))}>
                    <span {...stylex.props(styles.infoText(status))}>{nick}</span>
                </div>
                <div {...stylex.props(styles.infoSize(85))}>
                    <span {...stylex.props(styles.infoText(status))}>{userNum}/8</span>
                </div>
                <div {...stylex.props(styles.infoSize(60))}>
                    <span {...stylex.props(styles.infoText(status))}>{status ? "진행" : "대기"}</span>
                </div>
            </div>
        </li>
    )
};

export default GameList;

const styles = stylex.create({
    infoContainer: () => ({
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    }),
    info: () => ({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: {
        default: colors.dp02,
        ':hover': colors.dp03
      }
    }),
    infoSize: (size) => ({
      width: `${size}px`
    }),
    infoText: (state) => ({
      fontSize: fontSizes.base,
      color: state ? colors.done : colors.secondary
    })
  })