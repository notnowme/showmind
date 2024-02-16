/*
    stlyex의 스타일 모음.
*/

import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
    primary: {default: '#eee'}, // 메인 텍스트 컬러
    secondary: {default: '#ccc'}, // 부 텍스트 컬러
    third: {default: '#999'}, // 비 강조 텍스트 컬러
    done: {default: '#666'}, // 비활성화 텍스트 컬러
    error: {default: '#CF6679'}, // 에러
    clear: {default: '#03DAC6'}, // 완료 및 긍정 텍스트 컬러
    personal: {default: '#BB86FC'}, // 브랜드 컬러
    dp00: {default: '#1e1e1e'}, // 가장 밑에 있을 배경색
    dp01: {default: '#2a2a2a'},
    dp02: {default: '#242424'},
    dp03: {default: '#2D2D2D'}, // input
});

export const fontSizes = stylex.defineVars({
    xsm: '1.2rem',
    sm: '1.4rem',
    base: '1.6rem',
    md: '1.8rem',
    lg: '2rem',
    lgx1: '2.2rem',
    lgx2: '2.4rem',
    lgx3: '2.6rem',
});