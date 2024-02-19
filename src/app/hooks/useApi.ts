import { ChatRoomWithOwnerAndMembers } from "@/app/components/game/game-rooms";

export const useApi = () => {
    // 방 입장
    const joined = async (rid: string) => {
        const res = await fetch(`/api/game/join`, {
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
        await fetch(`/api/game/leave`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rid
            })
        });
    };

    // 방 정보 하나 가져오기.
    const getRoom = async (rid: string) => {
        const res = await fetch(`/api/game/${rid}`, {
            method: 'GET',
            cache: 'no-store',
        });
        const result: ChatRoomWithOwnerAndMembers = await res.json();
        return result;
    };

    // 여러 방 정보 가져오기.
    const getManyRooms = async () => {
        const res = await fetch('/api/data/game', { method: 'GET', cache: 'no-store' });
        const result: ChatRoomWithOwnerAndMembers[] = await res.json();
        return result;
    };

    // 닉네임 확인
    const nickCheck = async (nick: string) => {
        try {
            const res = await fetch(`/api/nick?chk=${nick}`, {
                method: 'GET',
            });
            if (res.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(`[NICK_CHECK_ERROR]`, error);
            return false;
        }
    };

    // 닉네임 변경
    const nickChange = async (id: string, nick: string) => {
        try {
            const res = await fetch('/api/nick', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    nick
                })
            });
            if (res.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`[NICK_CHANGE_ERROR]`, error);
            return false;
        }
    }


    const handleNickChange = async (id: string, nick: string) => {
        // 닉네임 글자 수.

        // 닉네임 확인.
        const isExistsNick = await nickCheck(nick);
        if (isExistsNick) {
            const isDoneChange = await nickChange(id, nick);
            if (isDoneChange) {
                return true;
            } else {
                alert("실패했습니다.");
                return false;
            }
        } else {
            alert('이미 있는 닉네임입니다.');
            return false;
        }
    };

    return {
        joined,
        leaved,
        getRoom,
        getManyRooms,
        handleNickChange
    }
};