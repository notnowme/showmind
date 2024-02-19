
import Image from 'next/image';

import { User } from '@prisma/client'

import * as stylex from '@stylexjs/stylex'
import { styles } from '@/app/styles/game-user';

import { FaPaintbrush } from 'react-icons/fa6'

type UserInfo = Pick<User, 'id' | 'no' | 'nick' | 'imageUrl'>;

interface GameUserProps {
    isDraw: boolean;
    user: UserInfo;
}

const GameUser = ({isDraw, user}:GameUserProps) => {
    return (
        <li {...stylex.props(styles.container())}>
            <div {...stylex.props(styles.nameDiv())}>
                <span {...stylex.props(styles.name())}>{user.nick}</span>
            </div>
            <div {...stylex.props(styles.infoDiv())}>
                <picture {...stylex.props(styles.img())}>
                    <Image src={user.imageUrl as string} alt='user-img' fill />
                </picture>
                <div {...stylex.props(styles.scoreDiv())}>
                    <span {...stylex.props(styles.name())}>맞힌 문제</span>
                    <span {...stylex.props(styles.score())}>0</span>
                </div>
            </div>
            {isDraw && <FaPaintbrush {...stylex.props(styles.icon())}/>}
        </li>
    )
};

export default GameUser;