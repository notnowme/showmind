'use client';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'


import { RadioContext } from './RadioContext'

const RadioGroup = ({label, children, ...rest}: any) => {
    return (
        <fieldset {...stylex.props(styles.container())}>
            <RadioContext.Provider value={rest}>
                {children}
            </RadioContext.Provider>
        </fieldset>
    );
};

export default RadioGroup;

const styles = stylex.create({
    container: () => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        border: 'none',
        outline: 'none'
    })
})