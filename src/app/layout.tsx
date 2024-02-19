import type { Metadata } from "next";


import Nav from '@/app/components/nav/nav';
import NextSessionProvider from "@/app/providers/session-provider";
import { SocketProvider } from "@/app/providers/socket-provider";
import TokenVerify from "@/app/components/token-verify";

import "./globals.css"
import * as stylex from '@stylexjs/stylex'
import { colors } from '@/app/styles/token.stylex'

export const metadata: Metadata = {
  title: "SHOWMIND",
  description: "draw your mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NextSessionProvider>
          <SocketProvider>
            <TokenVerify />
            <main id="container" {...stylex.props(styles.container())}>
              <Nav />
              {children}
            </main>
          </SocketProvider>
        </NextSessionProvider>
      </body>
    </html>
  );
};

// 어떤 오류인지 모르겠지만, 절대 경로로 import 하려면
// 객체로 쓰지 말고 함수 형태로 써야 한다.
// 라이브러리 오류일 가능성이 높아 보임.
const styles = stylex.create({
  primary: () => ({
    color: colors.primary
  }),
  container: () => ({
    width: '1600px',
    height: '900px',
    backgroundColor: colors.dp01,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column'
  })
});