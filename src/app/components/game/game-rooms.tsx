/**
 * 방 목록 가져오기.
*/

import { ChatRoom, User } from '@prisma/client'
import GameList from './game-list';

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
        <>
        {rooms && rooms.map(data => (
            <GameList key={data.roomId}
                roomId={data.roomId}
                title={data.title}
                nick={data.owner.nick}
                userNum={data.members.length}
                status={data.status}
            />
        ))}
        </>
    )
};

export default GameRooms;