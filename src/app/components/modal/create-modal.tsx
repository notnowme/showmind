
'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import RadioGroup from './radio/RadioGroup';
import Radio from './radio/Radio'

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'

import { IoClose } from 'react-icons/io5'


interface CreateModalProps {
    isOpen: boolean;
    onClose: Dispatch<SetStateAction<boolean>>;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState('open');
    const handleOutsideClick = (e: any) => {
        console.log('test')
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(prev => !prev);
        }
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
    }, [isOpen])
    useEffect(() => {
        console.log(value);
    },[value])
    return (
        <>
            {isOpen &&
                <div ref={modalRef} {...stylex.props(styles.create())}>
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
                                {...stylex.props(styles.icon())}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default CreateModal;

const styles = stylex.create({
    create: () => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        width: '600px',
        height: '400px',
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
    })
})