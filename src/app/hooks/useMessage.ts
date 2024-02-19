import { RefObject, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useSocket } from "@/app/providers/socket-provider";

interface Msg {
    text: string;
    isUser: boolean;
}

const useMessage = (ref: RefObject<HTMLInputElement>) => {
    const [msg, setMsg] = useState<Msg[]>([]);

    const { socket, isConnected } = useSocket();
    const { data: session } = useSession();
    const query = useSearchParams();

    const handleSend = (e: React.KeyboardEvent) => {
        if(!socket || !isConnected) {
            return;
        }
        const rid = query?.get('room');
        if(!rid) {
            return;
        }
        if(!ref.current) {
            return;
        }
        if(e.key !== 'Enter') {
            return;
        }
        const msg = ref.current.value;
        if(msg.length === 0) {
            // 글자 수 확인
            return;
        }

        socket.emit("msg", {rid, msg, user: session?.user});
        ref.current.value = "";
    };

    useEffect(() => {
        if(!socket || !isConnected) {
            return;
        };
        socket.on("joined", (data: any) => {
            const text = `[${data.nick} 님이 입장했습니다]`;
            const content: Msg = {
                text,
                isUser: false
            }
            setMsg(prev => [...prev, content]);
        });

        socket.on("leaved", (data: any) => {
            const text = `[${data.nick} 님이 퇴장했습니다]`;
            const content: Msg = {
                text,
                isUser: false
            }
            setMsg(prev => [...prev, content]);
        });

        socket.on("msg", (data: any) => {
            const { msg, user } = data;
            const text = `${user.nick}: ${msg}`;
            const content: Msg = {
                text,
                isUser: true
            }
            setMsg(prev => [...prev, content]);
        });
    },[]);

    return {
        msg,
        handleSend
    }
};

export default useMessage;