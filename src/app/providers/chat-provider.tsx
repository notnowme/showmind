/**
 * 방 정보를 부분 전역으로 쓰기 위해.
*/

'use client';

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState
} from 'react';

import { ChatRoomWithOwnerAndMembers } from '@/app/components/game/game-rooms';

interface ContextType {
    room: ChatRoomWithOwnerAndMembers | null;
    setRoom: Dispatch<SetStateAction<ChatRoomWithOwnerAndMembers | null>>;
}
const ChatRoomContext = createContext<ContextType | null>(null);

export const useChatRoomInfo = () => useContext(ChatRoomContext);

export const ChatRoomProvider = ({ children}: { children: React.ReactNode }) => {

    const [room, setRoom] = useState<ChatRoomWithOwnerAndMembers | null>(null);

    return (
        <ChatRoomContext.Provider value={{room, setRoom}}>
            {children}
        </ChatRoomContext.Provider>
    )
}