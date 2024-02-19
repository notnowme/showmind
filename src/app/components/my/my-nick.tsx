'use client';

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useApi } from "@/app/hooks/useApi";

import { UserWithOutPw } from "@/app/hooks/useServerApi";

import stylex from "@stylexjs/stylex";
import { styles } from '@/app/styles/my-info'

import { FaPen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface Props {
    user: UserWithOutPw
}

const MyNick = ({user}:Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showInput, setShowInput] = useState(false);
    const [nick, setNick] = useState(user.nick);

    const router = useRouter();

    const { update } = useSession();

    const { handleNickChange } = useApi();

    // 취소 버튼
    const handleCancel = () => {
        setNick(user.nick);
        setShowInput(false);
    };

    const handleClick = async() => {
        const result = await handleNickChange(user.id, nick);
        if(result) {
            await update({
                modifyNick: nick
            });
            alert("변경했습니다.");
            handleCancel();
            router.refresh();
        }
    };

    useEffect(() => {
        if(showInput) {
            inputRef.current?.focus();
        }
    },[showInput])

    return (
        <div {...stylex.props(styles.user())}>
            {showInput
                ? (
                    <div {...stylex.props(styles.nickDiv())}>
                        <input type="text" onChange={(e) => setNick(e.target.value)} value={nick} ref={inputRef}
                            {...stylex.props(styles.input())} />
                        <div>
                            <FaTimesCircle onClick={handleCancel}
                                {...stylex.props(styles.icon(25), styles.cancel(false))} />
                            <FaCheckCircle onClick={handleClick}
                                {...stylex.props(styles.icon(25), styles.cancel(true))} />
                        </div>
                    </div>
                )
                : (
                    <div {...stylex.props(styles.nickDiv())}>
                        <h1 {...stylex.props(styles.nick())}>{user.nick}</h1>
                        <FaPen {...stylex.props(styles.icon(25))}
                            onClick={() => {
                                setShowInput(true);
                            }}
                        />
                    </div>
                )
            }
            <span {...stylex.props(styles.id())}>{user.id}</span>
        </div>
    )
};

export default MyNick;