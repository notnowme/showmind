/*
    nav
*/

'use client'
import { useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

import UserModal from '@/app/components/modal/user-modal';
import useModal from '@/app/hooks/useModal';

import * as stylex from '@stylexjs/stylex'
import { styles } from '@/app/styles/nav';

import { IoIosArrowDown } from 'react-icons/io'

const Nav = () => {
    const [onDrop, setOnDrop] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const { isOpen, openModal, closeModal } = useModal(modalRef)

    // 세션 정보 가져오기.
    const { data: session } = useSession();

    // 로그인 여부 확인.
    const isLogin = session && session.user;

    return (
        <header {...stylex.props(styles.nav())}>
            <Link href="/" {...stylex.props(styles.title())}>
                SHOWMIND
            </Link>
            {isLogin ? (
                // 로그인 후
                <>
                    <nav {...stylex.props(styles.info(isOpen))}
                        onMouseEnter={() => setOnDrop(true)}
                        onMouseLeave={() => setOnDrop(false)}
                        onMouseDown={openModal}
                    >
                        <picture {...stylex.props(styles.img())}>
                            <Image
                                src={session.user.imageUrl}
                                fill
                                alt="user-img"
                            />
                        </picture>
                        <div {...stylex.props(styles.user())}>
                            <IoIosArrowDown {...stylex.props(styles.drop(onDrop), styles.onModalText(isOpen || onDrop))} />
                        </div>
                        <div ref={modalRef}>
                            <UserModal isOpen={isOpen} onClose={closeModal} />
                        </div>
                    </nav>
                </>
            ) : (
                // 로그인 전
                <nav {...stylex.props(styles.sign())}>
                    <Link href="/login" {...stylex.props(styles.text())}>
                        로그인
                    </Link>
                    <Link href="/register" {...stylex.props(styles.text())}>
                        회원 가입
                    </Link>
                </nav>
            )}
        </header>
    )
};

export default Nav;