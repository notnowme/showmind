/**
 * 방 목록 가져오기.
*/

import GameList from './game-list';

import { ChatRoom, User } from '@prisma/client'

import * as stylex from '@stylexjs/stylex'
import { styles } from '@/app/styles/index';

type UserInfo = Pick<User, 'id' | 'no' | 'nick' | 'imageUrl'>;

export type ChatRoomWithOwnerAndMembers = ChatRoom & {
    owner: UserInfo;
    members: UserInfo[];
}

interface GameRoomsProps {
    rooms: ChatRoomWithOwnerAndMembers[] | undefined;
}
const GameRooms = ({rooms}: GameRoomsProps) => {

    return (
        <ul {...stylex.props(styles.ols())}>
        {rooms && rooms.map(data => (
            <GameList key={data.roomId}
                roomId={data.roomId}
                title={data.title}
                nick={data.owner.nick}
                userNum={data.members.length}
                status={data.status}
            />
        ))}
        </ul>
    )
};

export default GameRooms;