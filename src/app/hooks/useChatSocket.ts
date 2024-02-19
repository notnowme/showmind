import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useApi } from "./useApi";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { ContextType } from "@/app/providers/chat-provider";
import { useSocket } from "@/app/providers/socket-provider";

interface Props {
    chatroom: ContextType | null;
}

const useChatSocket = ({chatroom}: Props) => {
    const router = useRouter();
    const query = useSearchParams();
    const { data: session } = useSession();
    const { socket, isConnected } = useSocket();
    const { joined, leaved, getRoom } = useApi();

    const handleLeave = () => {
        const rid = query?.get('room');
        if (!rid) {
            console.error(`[CANNOT_READ_ROOM_ID]`);
            return;
        }
        if (!session) {
            console.error('[USER_NOT_FOUND');
            return;
        }
        if(!socket) {
            console.error(`[SOCKET_NOT_FOUND]`);
            return; 
        }

        socket.emit('leaveRoom', { rid, user: session.user }, (res: any) => {
            if (res && res.ok) {
                leaved(rid).then(() => {
                    socket.emit('leaved', { rid, user: session.user });
                    router.push('/');
                })
            }
        });
    };

    useEffect(() => {
        history.pushState(null, "", "");
        const handleBack = async (event: any) => {
            const rid = query?.get('room');
            if (!rid) {
                console.error(`[CANNOT_READ_ROOM_ID]`);
                return;
            }
            if (!session) {
                console.error('[USER_NOT_FOUND');
                return;
            }
            handleLeave();
        };

        window.addEventListener('popstate', handleBack);
        return () => {
            window.removeEventListener('popstate', handleBack);
        }
    }, []);

    useEffect(() => {
        const rid = query?.get('room');

        if (!isConnected) return;
        if (!rid) {
            console.error(`[NOT_FOUND_ROOM_ID]`);
            return;
        }
        if (!socket) {
            console.error(`[NOT_FOUND_SOCKET]`);
            return;
        }
        if (!session) {
            console.error(`[NOT_FOUND_SESSION]`);
            return;
        }

        socket.emit('joinRoom', {rid, user: session.user}, (res: any) => {
            if(res && res.ok) {
                joined(rid).then(info => {
                    if (info.res === 201) {
                        getRoom(rid).then(result => {
                            chatroom?.setRoom(result);
                            socket.emit('joined', {rid, user: session.user})
                        })
                    } else if (info.res === 200) {
                        getRoom(rid).then(result => {
                            chatroom?.setRoom(result);
                        });
                    }
                })
            }
        });

        socket.on('joined', (data: any) => {
            console.log(`${data.nick} 님이 입장했어요`);
            getRoom(rid).then(result => {
                chatroom?.setRoom(result);
            });
        });

        socket.on('leaved', (data: any) => {
            console.log(`${data.nick} 님이 퇴장했어요`);
            getRoom(rid).then(result => {
                chatroom?.setRoom(result);
            });
        });
    },[session]);

    return {
        handleLeave
    }

};

export default useChatSocket;