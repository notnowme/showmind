/**
 * 로딩 이미지 - 고양이
 */

'use client';

import Lottie from 'react-lottie-player';
import CAT from '@/app/lottie/cat-pencil.json';

const Animation = () => {
    return (
        <div>
            <Lottie
                loop
                animationData={CAT}
                play
                style={{width: 600, height: 600}}
            />
        </div>
    )
};

export default Animation;