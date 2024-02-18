/**
 * socket을 전역으로 쓰기 위해.
 */

"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => { return useContext(SocketContext)};

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io('http://localhost:5000');

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });
        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
};