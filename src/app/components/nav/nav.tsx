/*
    nav
*/

'use client'

import Link from 'next/link';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex';

import { IoIosArrowDown } from 'react-icons/io'
import { useState } from 'react';
import UserModal from '../modal/user-modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Nav = () => {
    const [onDrop, setOnDrop] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

    const onClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!showModal) {
            setShowModal(true);
        }
    }

    // 세션 정보 가져오기.
    const { data: session } = useSession();

    // 로그인 여부 확인.
    const isLogin = session && session.user;

    return (
        <nav {...stylex.props(styles.nav())}>
            <Link href="/" {...stylex.props(styles.title())}>
                SHOWMIND
            </Link>
            {isLogin ? (
                // 로그인 후
                <>
                    <div {...stylex.props(styles.info(showModal))}
                        onMouseEnter={() => setOnDrop(true)}
                        onMouseLeave={() => setOnDrop(false)}
                        onMouseDown={(e) => onClose(e)}
                    >
                        <div {...stylex.props(styles.img())}>
                            <Image
                                src={session.user.imageUrl}
                                fill
                                alt="user-img"
                            />
                        </div>
                        <div {...stylex.props(styles.user())}>
                            <IoIosArrowDown {...stylex.props(styles.drop(onDrop), styles.onModalText(showModal || onDrop))} />
                        </div>
                    </div>
                    {showModal && <UserModal isOpen={showModal} onClose={setShowModal} />}
                </>
            ) : (
                // 로그인 전
                <>
                    <div {...stylex.props(styles.sign())}>
                        <Link href="/login" {...stylex.props(styles.text())}>
                            로그인
                        </Link>
                        <Link href="/register" {...stylex.props(styles.text())}>
                            회원 가입
                        </Link>
                    </div>
                </>
            )}
        </nav>
    )
};

export default Nav;

const styles = stylex.create({
    nav: () => ({
        position: 'relative',
        width: '100%',
        height: '60px',
        backgroundColor: colors.dp02,
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    title: () => ({
        color: colors.primary,
        fontSize: '2.4rem',
        marginLeft: '20px',
        fontWeight: '600'
    }),
    sign: () => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '40px',
        marginRight: '40px',
        height: '100%',
    }),
    text: () => ({
        fontSize: fontSizes.sm,
        cursor: 'pointer',
        color: {
            default: colors.secondary,
            ':hover': colors.personal
        }
    }),
    info: (state) => ({
        display: 'flex',
        marginRight: '40px',
        alignItems: 'center',
        backgroundColor: {
            default: state ? colors.dp00 : colors.dp01,
            ':hover': colors.dp00
        },
        borderRadius: '10px',
        padding: '5px',
        paddingRight: '20px'
    }),
    user: () => ({
        display: 'flex',
        flexDirection: 'column',
    }),
    img: () => ({
        position: 'relative',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#484848',
        marginRight: '15px',
        overflow: 'hidden',
    }),
    drop: (state) => ({
        fontSize: fontSizes.sm,
        color: colors.secondary,
        textAlign: 'right',
    }),
    onModal: (state) => ({
        // backgroundColor: state ? colors.dp00 : colors.dp01
    }),
    onModalText: (state) => ({
        marginTop: state ? '10px' : '0px'
    })
})