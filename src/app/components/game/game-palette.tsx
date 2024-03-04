"use client";

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';

import { HiMiniPencil } from 'react-icons/hi2';
import { RiPaintFill } from 'react-icons/ri';
import { BsFillEraserFill } from 'react-icons/bs'
import { useDrawInfo } from '@/app/providers/draw-provider';
import useDraw from '@/app/hooks/useDraw';

const GamePalette = () => {
    const drawInfo = useDrawInfo();
    if(!drawInfo) { 
        return null;
    }
    const { drawing, setDrawing } = drawInfo;
    const { handleNew } = useDraw();
    const nowIsPen = drawing.tool === 'pen';
    const nowIsEraser = drawing.tool === 'eraser';
    const nowIsPaint = drawing.tool === 'paint';

    const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDrawing(prev => ({
            ...prev,
            width: Number(e.target.value)
        }))
    };

    // 전체 지우기.
    const colors = [
        '#000000', '#D9D9D9', '#FF0000', '#FF5E00', '#FFBB00',
        '#FFE400', '#ABF200', '#1DDB16', '#00D8FF', '#0054FF',
        '#0100FF', '#5F00FF', '#FF00DD', '#FF007F'
    ]
    return (
        <div {...stylex.props(styles.palatte())}>
            <div {...stylex.props(styles.item())}>
                <div {...stylex.props(styles.paint())}>
                    <HiMiniPencil {...stylex.props(styles.icon(nowIsPen), styles.iconColor(nowIsPen, drawing.color))} onClick={() => setDrawing(prev => ({...prev, tool: 'pen'}))}/>
                    <RiPaintFill {...stylex.props(styles.icon(nowIsPaint))} onClick={() => setDrawing(prev => ({...prev, tool: 'paint'}))}/>
                    <BsFillEraserFill {...stylex.props(styles.icon(nowIsEraser))} onClick={() => setDrawing(prev => ({...prev, tool: 'eraser'}))}/>
                </div>
                <div onClick={handleNew}
                    {...stylex.props(styles.deleteDiv())}>
                    <span {...stylex.props(styles.deleteText())}>전체 지우기</span>
                </div>
            </div>
            <div {...stylex.props(styles.colorDiv())}>
                <div>
                    <input type="range" min={1} max={15} defaultValue={2} onChange={handleWidth}/>
                </div>
                <div {...stylex.props(styles.colorIconDiv())}>
                    {colors.map((color, index) => (
                        <div key={index}
                            onClick={() => setDrawing(prev => ({...prev, color}))}
                            {...stylex.props(styles.colorIcon(color))} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default GamePalette;