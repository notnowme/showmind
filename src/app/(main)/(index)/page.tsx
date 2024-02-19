/*
  루트 페이지
*/

'use client';


import { useEffect, useRef, useState } from 'react';

import { useSocket } from '@/app/providers/socket-provider';
import GameRooms, { ChatRoomWithOwnerAndMembers } from '@/app/components/game/game-rooms';
import CreateModal from '@/app/components/modal/create-modal';
import { useApi } from '@/app/hooks/useApi';

// import {
//   MdKeyboardDoubleArrowLeft as DoubleLeft,
//   MdKeyboardDoubleArrowRight as DoubleRight,
//   MdKeyboardArrowRight as Right,
//   MdKeyboardArrowLeft as Left
// } from 'react-icons/md'

import * as stylex from '@stylexjs/stylex'
import { styles } from '@/app/styles/index';
import useModal from '@/app/hooks/useModal';
export default function Home() {
  const { socket, isConnected } = useSocket();

  const [rooms, setRooms] = useState<ChatRoomWithOwnerAndMembers[]>();
  const { getManyRooms } = useApi();

  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, openModal, closeModal } = useModal(modalRef);

  useEffect(() => {
    if (isConnected) {
      socket?.emit('rooms', 'from next', (res: any) => {
        if (res && res.ok) {
          getManyRooms().then(result => {
            setRooms(result);
          })
        }
      })
    }
  }, [isConnected])
  return (
    <section {...stylex.props(styles.container())}>
        <div ref={modalRef}>
          <CreateModal
            isOpen={isOpen}
            onClose={closeModal}
          />
        </div>
      <header {...stylex.props(styles.top())}>
        <h1 {...stylex.props(styles.title())}>개설된 방 목록</h1>
        <button {...stylex.props(styles.btn())}
          onMouseDown={openModal}
        >
          방 만들기
        </button>
      </header>
      <div {...stylex.props(styles.list())}>
        <span {...stylex.props(styles.listText(306))}>방 제목</span>
        <span {...stylex.props(styles.listText(170))}>방장</span>
        <span {...stylex.props(styles.listText(50))}>인원</span>
        <span {...stylex.props(styles.listText(20))}>상태</span>
      </div>
      <GameRooms rooms={rooms} />
      <ul {...stylex.props(styles.pagination())}>
        {/* <DoubleLeft {...stylex.props(styles.pageText(false))} />
          <Left {...stylex.props(styles.pageText(false))} /> */}
        <li {...stylex.props(styles.pageText(true))}>1</li>
        <li {...stylex.props(styles.pageText(true))}>2</li>
        <li {...stylex.props(styles.pageText(true))}>3</li>
        <li {...stylex.props(styles.pageText(true))}>4</li>
        {/* <Right {...stylex.props(styles.pageText(false))} />
          <DoubleRight {...stylex.props(styles.pageText(false))} /> */}
      </ul>
    </section>
  );
};