import { RefObject, useEffect, useState } from "react";

const useScroll = (ref: RefObject<HTMLDivElement>) => {
    const [isScroll, setIsScroll] = useState(false);

    // 하단으로 이동
    const scrollToBottom = () => {
        ref.current?.scrollIntoView({ behavior: 'instant' });
    }
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver((els) => {
            els.forEach(el => {
                // 화면 감지
                if (el.isIntersecting) {
                    setIsScroll(false);
                } else {
                    setIsScroll(true);
                }
            });
        });
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        }
    }, []);

    return {
        isScroll,
        scrollToBottom
    }
};

export default useScroll;