
'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import RadioGroup from './radio/RadioGroup';
import Radio from './radio/Radio'

import { IoClose } from 'react-icons/io5'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'

interface CreateModalProps {
    isOpen: boolean
    onClose: Dispatch<SetStateAction<boolean>>;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {

    if (!isOpen) return null;

    const nameRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState('open');
    const [isPrivate, setIsPrivate] = useState(false);

    // 방 생성.
    const handleCreate = async () => {
        if (value === 'open') {
            const name = nameRef.current?.value;
            try {
                const res = await fetch('/api/game/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        isPrivate: false
                    })
                });
                const result = await res.json();
                console.log(result);
            } catch (error) {
                console.error(`[CREATE_ROOM_ERROR]`, error);
                return;
            }
        }
    };


    // 비밀번호 입력 온오프
    useEffect(() => {
        if (value === 'private') {
            setIsPrivate(true);
        } else {
            setIsPrivate(false);
        }
    }, [value])
    return (
        <div {...stylex.props(styles.modal())}>
            <div {...stylex.props(styles.create())}>
                <div {...stylex.props(styles.top())}>
                    <div {...stylex.props(styles.top())}>
                        <RadioGroup label="room" value={value} onChange={setValue}>
                            <Radio value="open">
                                <span {...stylex.props(styles.text())}>공개</span>
                            </Radio>
                            <Radio value="private">
                                <span {...stylex.props(styles.text())}>비공개</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                    <div>
                        <IoClose onClick={() => onClose(prev => !prev)}
                            {...stylex.props(styles.icon())} />
                    </div>
                </div>
                <div {...stylex.props(styles.inputDiv())}>
                    <div {...stylex.props(styles.textDiv())}>
                        <h1 {...stylex.props(styles.title())}>방 제목</h1>
                        <span {...stylex.props(styles.msg())}>방 제목을 입력해 주세요</span>
                    </div>
                    <input type='text' ref={nameRef}
                        {...stylex.props(styles.input())}
                    />
                </div>
                <div {...stylex.props(styles.inputDiv())}>
                    <div {...stylex.props(styles.textDiv())}>
                        <h1 {...stylex.props(styles.title(), styles.disabledText(isPrivate))}>비밀번호</h1>
                        <span {...stylex.props(styles.msg())}>비밀번호를 입력해 주세요</span>
                    </div>
                    <input type='text' disabled={!isPrivate} ref={pwRef}
                        {...stylex.props(styles.input(), styles.disbledInput(isPrivate))}
                    />
                </div>
                <button onClick={handleCreate}
                    {...stylex.props(styles.btn())}>
                    방 생성하기
                </button>
            </div>
        </div>
    )
};

export default CreateModal;

const styles = stylex.create({
    modal: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 10
    }),
    textDiv: () => ({
        display: 'flex',
        columnGap: '10px',
        alignItems: 'center'
    }),
    create: () => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        width: '600px',
        backgroundColor: colors.dp00,
        borderRadius: '5px'
    }),
    top: () => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    icon: () => ({
        width: '30px',
        height: '30px',
        color: {
            default: colors.secondary,
            ':hover': colors.personal
        },
        cursor: 'pointer'
    }),
    text: () => ({
        fontSize: fontSizes.base
    }),
    inputDiv: () => ({
        marginTop: '20px',
        marginBottom: '20px',
        width: '540px',
        backgroundColor: colors.dp00,
        display: 'flex',
        flexDirection: 'column'
    }),
    title: () => ({
        fontSize: fontSizes.lg,
        fontWeight: 500,
        color: colors.secondary,
        marginBottom: '5px'
    }),
    input: () => ({
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        border: 'none',
        outline: 'none',
        backgroundColor: colors.dp03,
        fontSize: fontSizes.base,
        color: colors.secondary,
        padding: '0px 10px'
    }),
    btn: () => ({
        marginTop: '20px',
        width: '540px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colors.personal,
        border: 'none',
        outline: 'none',
        color: 'black',
        fontSize: fontSizes.lg,
        fontWeight: 500,
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer'
    }),
    msg: () => ({
        fontSize: fontSizes.sm,
        color: colors.error
    }),
    disabledText: (state) => ({
        color: state ? colors.secondary : colors.done
    }),
    disbledInput: (state) => ({
        backgroundColor: state ? colors.dp03 : colors.dp01
    })
})