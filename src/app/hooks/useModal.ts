'use client';

import { RefObject, useEffect, useState } from "react";


const useModal = (ref: RefObject<HTMLDivElement>) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    // 모달 바깥 영역 클릭 시 닫기.
    const handleOutsideClick = (e: any) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setIsOpen(prev => !prev);
        }
    };

    // 이벤트 등록
    useEffect(() => {
        if(isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[isOpen]);

    return {
        isOpen,
        openModal,
        closeModal
    }
};

export default useModal;