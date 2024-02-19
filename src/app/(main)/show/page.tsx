'use client';

import { useEffect, useState } from 'react';

import { useSocket } from '@/app/providers/socket-provider';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { ChatRoomWithOwnerAndMembers } from '@/app/components/game/game-rooms';

import GameUserList from '@/app/components/game/game-user-list';
import GameDraw from '@/app/components/game/game-draw';
import GameLoad from '@/app/components/game/game-load';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';
import { useChatRoomInfo } from '@/app/providers/chat-provider';

const Show = () => {
    const [isJoin, setIsJoin] = useState(false);
    const { data: session } = useSession();
    
    const query = useSearchParams();
    const router = useRouter();
    
    const { socket, isConnected } = useSocket();
    const chatroom = useChatRoomInfo();

    // 방 입장
    const joined = async (rid: string) => {
        const res = await fetch(`/api/chats/join`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rid
            })
        });
        const result = await res.json();
        return {
            res: res.status,
            result
        };
    };
    
    // 방 퇴장
    const leaved = async (rid: string) => {
        await fetch(`/api/chats/leave`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rid
            })
        });
    }
    
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
                    setIsJoin(false);
                    socket.emit('leaved', { rid, user: session.user });
                    router.push('/');
                })
            }
        });
    };


    // 방 정보 가져오기.
    const getRoom = async (rid: string) => {
        const res = await fetch(`/api/chats/room/${rid}`, {
            method: 'GET',
            cache: 'no-store',
        });
        const result: ChatRoomWithOwnerAndMembers = await res.json();
        return result;
    };

    // 소켓
    useEffect(() => {
        const rid = query?.get('room');
        if (!isConnected) return;

        if (!rid) {
            console.error(`[CANNOT_READ_ROOM_ID]`);
            return;
        }
        if (!socket) {
            console.error(`[SOCKET_NOT_FOUND]`);
            return;
        }
        if (!session) {
            console.error('[USER_NOT_FOUND');
            return;
        }

        // 최초 입장.
        if (!isJoin) {
            socket.emit('joinRoom', { rid, user: session.user }, (res: any) => {
                if (res && res.ok) {
                    joined(rid).then((info) => {
                        if (info.res === 201) {
                            getRoom(rid).then(result => {
                                chatroom?.setRoom(result);
                                setIsJoin(true);
                                socket.emit('joined', { rid, user: session.user })
                            })
                        } else if (info.res === 200) {
                            getRoom(rid).then(result => {
                                chatroom?.setRoom(result);
                                setIsJoin(true);
                            })
                        }
                    });
                }
            });
        }

        socket.on('joined', (data: any) => {
            console.log(`${data.nick} 님이 입장했어요`);
            getRoom(rid).then(result => {
                chatroom?.setRoom(result);
            })
        });
        
        socket.on('leaved', (data: any) => {
            console.log(`${data.nick} 님이 퇴장했어요`);
            getRoom(rid).then(result => {
                chatroom?.setRoom(result);
            });
        })

    }, [session])

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

    return (
        <>
            {chatroom?.room ? (
                <div {...stylex.props(styles.container())}>
                    <GameUserList member={chatroom?.room?.members.slice(0, 4)}/>
                    <GameDraw />
                    { chatroom?.room.members.length >= 5 && <GameUserList member={chatroom?.room?.members.slice(4, 8)}/>}
                    <button {...stylex.props(styles.exit())}
                        onClick={handleLeave}>나가기</button>
                </div>

            ) : ( <GameLoad /> )}
        </>
    )
};
export default Show;

const styles = stylex.create({
    container: () => ({
        position: 'relative',
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: '200px 960px 200px',
        gridColumnGap: '40px',
        width: '1450px',
        height: '740px',
    }),
    exit: () => ({
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '80px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colors.error,
        border: 'none',
        outline: 'none',
        color: 'black',
        fontSize: fontSizes.base,
        fontWeight: 500,
        textAlign: 'center',
        cursor: 'pointer',
        opacity: {
            default: '0.8',
            ':hover': '1'
        }
    })
})