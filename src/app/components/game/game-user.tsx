
import Image from 'next/image';

import { User } from '@prisma/client'

import { FaPaintbrush } from 'react-icons/fa6'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';

type UserInfo = Pick<User, 'id' | 'no' | 'nick' | 'imageUrl'>;

interface GameUserProps {
    isDraw: boolean;
    user: UserInfo;
}

const GameUser = ({isDraw, user}:GameUserProps) => {
    return (
        <div {...stylex.props(styles.container())}>
            <div {...stylex.props(styles.nameDiv())}>
                <span {...stylex.props(styles.name())}>{user.nick}</span>
            </div>
            <div {...stylex.props(styles.infoDiv())}>
                <div {...stylex.props(styles.img())}>
                    <Image src={user.imageUrl as string} alt='user-img' fill />
                </div>
                <div {...stylex.props(styles.scoreDiv())}>
                    <span {...stylex.props(styles.name())}>맞힌 문제</span>
                    <span {...stylex.props(styles.score())}>0</span>
                </div>
            </div>
            {isDraw && <FaPaintbrush {...stylex.props(styles.icon())}/>}
        </div>
    )
};

export default GameUser;

const styles = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        width: '200px',
        backgroundColor: colors.dp00,
        borderRadius: '5px',
        padding: '10px',
    }),
    nameDiv: () => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    }),
    name: () => ({
        fontSize: fontSizes.base,
        color: colors.secondary,
        fontWeight: 500
    }),
    infoDiv: () => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px'
    }),
    img: () => ({
        position: 'relative',
        width: '70px',
        height: '70px',
        borderRadius: '5px',
        overflow: 'hidden',
        backgroundColor: colors.dp01
    }),
    scoreDiv: () => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '10px',
        width: '100px',
        height: '70px',
        borderRadius: '5px'
    }),
    score: () => ({
        fontSize: fontSizes.lg,
        color: colors.secondary,
        fontWeight: 600
    }),
    icon: () => ({
        position: 'absolute',
        width: '20px',
        height: '20px',
        color: colors.personal,
        right: '-10px',
        top: '-10px'
    })
});