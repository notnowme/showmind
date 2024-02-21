import { Stage, Layer, Line } from 'react-konva';

import { useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawType, useDrawInfo } from '@/app/providers/draw-provider';

type DrawTypeWithPos = DrawType & {
    points: number[];
}

const KonvaCanvas = () => {
    const drawInfo = useDrawInfo();


    // 방 인원 모두에게 보여줄 선
    const [lines, setLines] = useState<DrawTypeWithPos[]>([]);

    // 현재 그리고 있는 사람에게만 보일 선
    const [curLines, setCurLines] = useState<DrawTypeWithPos[]>([]);

    // 그리고 있는지 변수 유지하기
    const isDrawStart = useRef(false);

    const isDrawing = useRef(false);

    // 마우스 벗어났을 시점의 좌표 기억
    const whenLeaveLine = useRef<DrawTypeWithPos[]>([]);

    if (!drawInfo) {
        return null;
    }

    const { drawing } = drawInfo;

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {

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

    const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
        if(isDrawStart.current) {
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
            whenLeaveLine.current = curLines;
            saveLines();
            isDrawing.current = false;
        } else {
            isDrawing.current = false;
        }
    };

    const handleMousetEnter = (e: KonvaEventObject<MouseEvent>) => {
        if(isDrawStart.current) {
            setCurLines(whenLeaveLine.current.concat())
            whenLeaveLine.current = [];
            isDrawing.current = true;
        }
    };

    const saveLines = () => {
        setLines(prev => prev.concat(curLines));
        setCurLines([]);
    }

    return (
        <Stage width={960} height={570}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer>
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