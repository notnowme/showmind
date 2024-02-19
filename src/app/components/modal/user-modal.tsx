
/*
유저 정보 모달창
*/
'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";

import { FaUser } from 'react-icons/fa'
import { PiSignOutBold } from 'react-icons/pi'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';

interface UserModalProps {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;

}

const UserModal = ({isOpen, onClose}: UserModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // 바깥쪽 영역 클릭했을 시 모달창 닫기
    const handleOutsideClick = (e: any) => {
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(prev => !prev);
        }
    };

    // mypage로 이동
    const handleMypage = () => {
        onClose(prev => !prev);
        router.push('/my');
    };

    // 로그아웃
    const handleSignOut = async() => {
        onClose(prev => !prev);
        await signOut({redirect: false}).then(() => {
            router.push('/');
        });
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    },[isOpen])
    return (
        <>
        {isOpen && (
            <div ref={modalRef} {...stylex.props(styles.modal())}>
                <div {...stylex.props(styles.box())}
                    onClick={handleMypage}
                >
                    <FaUser {...stylex.props(styles.icon())}/>
                    <span {...stylex.props(styles.text())}>마이페이지</span>
                </div>
                <div {...stylex.props(styles.box())}
                    onClick={handleSignOut}
                >
                    <PiSignOutBold {...stylex.props(styles.icon())}/>
                    <span {...stylex.props(styles.text())}>로그아웃</span>
                </div>
            </div>
        )}
        </>
    )
};

export default UserModal;

const styles = stylex.create({
    modal: () => ({
        position: 'absolute',
        top: '60px',
        right: '30px',
        backgroundColor: colors.dp00,
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5px',
        rowGap: '5px'
    }),
    box: () => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        columnGap: '5px',
        padding: '5px',
        borderRadius: '5px',
        backgroundColor: {
            default: colors.dp00,
            ':hover': '#333'
        },
        cursor: 'pointer'
    }),
    icon: () => ({
        width: '18px',
        height: '18px',
        color: colors.third
    }),
    text: () => ({
        fontSize: fontSizes.base,
        color: {
            default: colors.third,
            ':hover': colors.primary
        },
        fontWeight: 500
    })
});