import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useSocket } from "@/app/providers/socket-provider";
import { DrawType } from "@/app/providers/draw-provider";

type DrawTypeWithPos = DrawType & {
    points: number[];
}

const useDraw = () => {
    const [lines, setLines] = useState<DrawTypeWithPos[]>([]);

    const { socket, isConnected } = useSocket();
    const { data: session } = useSession();
    const query = useSearchParams();

    const handleDraw = (curLine: DrawTypeWithPos[]) => {
        if(!socket || !isConnected) {
            return;
        };
        const rid = query?.get('room');
        if(!rid) {
            return;
        }
        socket.emit('drawup', {rid, curLine}, (res: any) => {
            if(res) {
                console.log('ok')
            }
        });  
    };

    const handleNew = () => {
        if(!socket || !isConnected) {
            return;
        };
        const rid = query?.get('room');
        if(!rid) {
            return;
        }
        socket.emit('drawNew', {rid}, (res: any) => {
            console.log('deleted');
        });
    }

    useEffect(() => {
        if(!socket || !isConnected) {
            return;
        };
        socket.on('sendLine', (data: any) => {
            console.log(lines)
            setLines(prev => prev.concat(data));
        });
        socket.on('newLine', (data: any) => {
            setLines([]);
        });
    },[])

    return {
        handleDraw,
        handleNew,
        lines,
        setLines,
    }
};

export default useDraw;