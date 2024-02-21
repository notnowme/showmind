/**
 * 그리는 부분 전역으로 쓰기 위해.
*/

'use client';

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState
} from 'react';

type Tool = "pen" | "eraser" | "paint";

export interface DrawType {
    tool: Tool;
    width: number;
    color: string;
}

export interface DrawContextType {
    drawing: DrawType;
    setDrawing: Dispatch<SetStateAction<DrawType>>;
}
const DrawContext = createContext<DrawContextType | null>(null);

export const useDrawInfo = () => useContext(DrawContext);

export const DrawProvider = ({ children }: { children: React.ReactNode }) => {

    const [drawing, setDrawing] = useState<DrawType>({
        tool: 'pen',
        width: 2,
        color: 'black'
    });

    return (
        <DrawContext.Provider value={{drawing, setDrawing}}>
            {children}
        </DrawContext.Provider>
    )
}