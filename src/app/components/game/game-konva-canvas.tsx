import { Stage, Layer, Line, Circle, KonvaNodeComponent } from 'react-konva';

import { useEffect, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawType, useDrawInfo } from '@/app/providers/draw-provider';
import { Layer as LayerComp } from 'konva/lib/Layer';
import { Stage as StageComp } from 'konva/lib/Stage'
import Konva from 'konva';
import { Circle as CircleComp, CircleConfig } from 'konva/lib/shapes/Circle';

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-konva';
import { useSocket } from '@/app/providers/socket-provider';
import { useSearchParams } from 'next/navigation';
import useDraw from '@/app/hooks/useDraw';

type DrawTypeWithPos = DrawType & {
    points: number[];
}

interface Paint {
    x: number,
    y: number
    targetColor: string;
    replaceColor: string;
}

const KonvaCanvas = () => {
    const drawInfo = useDrawInfo();
    const { socket, isConnected } = useSocket();
    const query = useSearchParams();

    const { handleDraw, lines, setLines } = useDraw();


    // 방 인원 모두에게 보여줄 선
    // const [lines, setLines] = useState<DrawTypeWithPos[]>([]);

    // 현재 그리고 있는 사람에게만 보일 선
    const [curLines, setCurLines] = useState<DrawTypeWithPos[]>([]);

    const layerRef = useRef<LayerComp>(null);

    const circleRef = useRef<KonvaNodeComponent<CircleComp, CircleConfig>>(null);

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // 그리고 있는지 변수 유지하기
    const isDrawStart = useRef(false);

    const isDrawing = useRef(false);

    // 마우스 벗어났을 시점의 좌표 기억
    const whenLeaveLine = useRef<DrawTypeWithPos[]>([]);

    useEffect(() => {
        if (drawInfo?.drawing.tool !== 'new') return;
        setLines([]);
        drawInfo.setDrawing(prev => ({
            ...prev,
            tool: 'pen'
        }));
    }, [drawInfo?.drawing.tool]);


    if (!drawInfo) {
        return null;
    }



    const { drawing } = drawInfo;


    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (drawing.tool === 'paint') return;
        isDrawing.current = true;
        isDrawStart.current = true;
        const pos = e.target.getStage()?.getPointerPosition();
        if (!pos) {
            return;
        }
        setCurLines([...curLines, {
            tool: drawing.tool,
            width: drawing.width,
            color: drawing.color,
            points: [pos.x, pos.y]
        }]);
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if (drawing.tool === 'paint') return;
        if (!isDrawStart.current) {
            return;
        }
        const stage = e.target.getStage()
        if (!stage) {
            return;
        }
        const point = stage.getPointerPosition();
        if (!point) {
            return;
        }
        let lastLine = curLines[curLines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lastLine.tool = drawing.tool;
        lastLine.width = drawing.width;
        lastLine.color = drawing.color;

        curLines.splice(curLines.length - 1, 1, lastLine);
        setCurLines(curLines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        isDrawStart.current = false;
        saveLines();
    };

    const saveLines = () => {
        // setLines(prev => prev.concat(curLines));
        handleDraw(curLines);
        setCurLines([]);
    };

    // useEffect(() => {
    //     const rid = query?.get('room');
    //     socket?.emit('drawup', {rid, lines}, (res: any) => {
    //         console.log('ok');
    //     });

    //     socket?.on('sendLine', (data: any) => {
    //         setLines(prev => prev.concat(data));
    //         console.log('hi')
    //     })
    // },[]);


    return (
        <Stage
            width={960} height={570}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer
                ref={layerRef}
            >
                {lines.map((line, i: number) => (
                    <Line key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.width}
                        tension={0.5}
                        lineCap="round"
                        lieJoin="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                    />
                ))}
                {curLines.map((line, i: number) => (
                    <Line key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.width}
                        tension={0.5}
                        lineCap="round"
                        lieJoin="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                    />
                ))}
            </Layer>
        </Stage>
    );
};
export default KonvaCanvas;