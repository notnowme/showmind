"use client";

import * as stylex from '@stylexjs/stylex';
import { styles } from '@/app/styles/game-draw';

import { HiMiniPencil } from 'react-icons/hi2';
import { RiPaintFill } from 'react-icons/ri';
import { BsFillEraserFill } from 'react-icons/bs'
import { useRef } from 'react';
import { useDrawInfo } from '@/app/providers/draw-provider';

const GamePalette = () => {
    const drawInfo = useDrawInfo();
    if(!drawInfo) { 
        return null;
    }
    const { drawing, setDrawing } = drawInfo;
    const nowIsPen = drawing.tool === 'pen';
    const nowIsEraser = drawing.tool === 'eraser';
    const nowIsPaint = drawing.tool === 'paint';

    const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDrawing(prev => ({
            ...prev,
            width: Number(e.target.value)
        }))
    }
    return (
        <div {...stylex.props(styles.palatte())}>
            <div {...stylex.props(styles.item())}>
                <div {...stylex.props(styles.paint())}>
                    <HiMiniPencil {...stylex.props(styles.icon(nowIsPen))} onClick={() => setDrawing(prev => ({...prev, tool: 'pen'}))}/>
                    <RiPaintFill {...stylex.props(styles.icon(nowIsPaint))} />
                    <BsFillEraserFill {...stylex.props(styles.icon(nowIsEraser))} onClick={() => setDrawing(prev => ({...prev, tool: 'eraser'}))}/>
                </div>
                <div {...stylex.props(styles.deleteDiv())}>
                    <span {...stylex.props(styles.deleteText())}>전체 지우기</span>
                </div>
            </div>
            <div {...stylex.props(styles.colorDiv())}>
                <input type="range" min={1} max={15} defaultValue={2} onChange={handleWidth}/>
            </div>
        </div>
    )
};

export default GamePalette;