'use client';

import { useContext } from "react";
import { RadioContext } from "./RadioContext";

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'

const Radio = ({children, value, name, defaultChecked, disabled}: any) => {
    const group = useContext(RadioContext) as any;
    return (
        <label {...stylex.props(styles.radio(value === group.value))}>
            <input
                type="radio"
                value={value}
                name={name}
                disabled={disabled || group.disabled}
                checked={group.value !== undefined ? value === group.value : undefined}
                onChange={(e) => group.onChange && group.onChange(e.target.value)}
                hidden
            />
                {children}
        </label>
    )
};

export default Radio;

const styles = stylex.create({
    radio: (state) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '7px 14px',
        backgroundColor: state ? colors.dp03 : colors.dp00,
        color: colors.secondary,
        borderRadius: '5px',
        border: `1px solid ${colors.dp03}`
    }),
})