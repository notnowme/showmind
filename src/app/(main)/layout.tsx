/*
  루트 레이아웃 페이지
  모든 페이지가 container 스타일을 공유해야 함.
*/

import * as stylex from '@stylexjs/stylex'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div {...stylex.props(styles.container())}>
        {children}
    </div>
  );
}

const styles = stylex.create({
    container: () => ({
        width: '100%',
        height: '840px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    })
})