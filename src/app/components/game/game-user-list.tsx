/**
 * 유저 컴포넌트
*/


import GameUser from './game-user';

import { User } from '@prisma/client'

import * as stylex from '@stylexjs/stylex'

type UserInfo = Pick<User, 'id' | 'no' | 'nick' | 'imageUrl'>;

interface GameUserListProps {
    member: UserInfo[]
}
const GameUserList = ({member}: GameUserListProps) => {

    return (
        <ul {...stylex.props(styles.container())}>
            { member && member.map(data => (
                <GameUser
                    key={data.id}
                    isDraw={false}
                    user={data}
                />
            ))
            }
        </ul>
    )
};

export default GameUserList;

const styles = stylex.create({
    container: () => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px'
    })
})