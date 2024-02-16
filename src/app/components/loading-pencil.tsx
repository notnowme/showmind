/**
 * 로딩 이미지 - 연필
 */

'use client';

import Lottie from 'react-lottie-player';
import PENCIL from '@/app/lottie/pencil.json';

const Animation = () => {
    return (
        <div>
            <Lottie
                loop
                animationData={PENCIL}
                play
                style={{width: 150, height: 150, marginLeft: '20px'}}
            />
        </div>
    )
};

export default Animation;