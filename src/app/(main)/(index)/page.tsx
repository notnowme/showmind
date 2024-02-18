/*
  루트 페이지
*/

'use client';

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from '@/app/styles/token.stylex'
import GameList from '@/app/components/game/game-list'

// import {
//   MdKeyboardDoubleArrowLeft as DoubleLeft,
//   MdKeyboardDoubleArrowRight as DoubleRight,
//   MdKeyboardArrowRight as Right,
//   MdKeyboardArrowLeft as Left
// } from 'react-icons/md'
import CreateModal from '@/app/components/modal/create-modal';
import { useEffect, useState } from 'react';
import { useSocket } from '@/app/providers/socket-provider';
import GameRooms, { ChatRoomWithOwnerAndMembers } from '@/app/components/game/game-rooms';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { socket, isConnected } = useSocket();

  const [rooms, setRooms] = useState<ChatRoomWithOwnerAndMembers[]>();
  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showModal) {
      setShowModal(true);
    }
  };
  const test = async() => {
    const res = await fetch('/api/data/game', {method: 'POST',});
    const result = await res.json();
    setRooms(result);
  }
  useEffect(() => {
    if(isConnected) {
      socket?.emit('rooms', 'from next', (res: any) => {
        if(res && res.ok) {
          test();
        }
      })
    }
  },[isConnected])
  return (
    <>
      <div {...stylex.props(styles.container())}>
        {showModal &&
          <div {...stylex.props(styles.modal())}>
            <CreateModal
              isOpen={showModal}
              onClose={setShowModal}
            />
          </div>
        }
        <div {...stylex.props(styles.top())}>
          <h1 {...stylex.props(styles.title())}>개설된 방 목록</h1>
          <button {...stylex.props(styles.btn())}
            onMouseDown={onClose}
          >
            방 만들기
          </button>
        </div>
        <div {...stylex.props(styles.list())}>
          <span {...stylex.props(styles.listText(306))}>방 제목</span>
          <span {...stylex.props(styles.listText(170))}>방장</span>
          <span {...stylex.props(styles.listText(50))}>인원</span>
          <span {...stylex.props(styles.listText(20))}>상태</span>
        </div>
        <GameRooms rooms={rooms}/>
        <div {...stylex.props(styles.pagination())}>
          {/* <DoubleLeft {...stylex.props(styles.pageText(false))} />
          <Left {...stylex.props(styles.pageText(false))} /> */}
          <span {...stylex.props(styles.pageText(true))}>1</span>
          <span {...stylex.props(styles.pageText(true))}>2</span>
          <span {...stylex.props(styles.pageText(true))}>3</span>
          <span {...stylex.props(styles.pageText(true))}>4</span>
          {/* <Right {...stylex.props(styles.pageText(false))} />
          <DoubleRight {...stylex.props(styles.pageText(false))} /> */}
        </div>
      </div>
    </>
  );
};


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
  container: () => ({
    width: '800px',
    borderRadius: '5px',
    backgroundColor: colors.dp02,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    alignItems: 'center'
  }),
  top: () => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  }),
  title: () => ({
    color: colors.primary,
    fontSize: fontSizes.lgx2,
    fontWeight: 500
  }),
  btn: () => ({
    width: '80px',
    height: '30px',
    borderRadius: '5px',
    backgroundColor: colors.personal,
    color: 'black',
    fontSize: fontSizes.base,
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: {
      default: '0.8',
      ':hover': '1'
    }
  }),
  list: () => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    backgroundColor: '#373737',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }),
  listText: (margin) => ({
    fontSize: fontSizes.lg,
    color: colors.secondary,
    marginRight: `${margin}px`
  }),
  pagination: () => ({
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    columnGap: '15px',
    alignItems: 'center',
    marginTop: '20px',
    padding: '7px',
    borderRadius: '5px',
    backgroundColor: colors.dp00
  }),
  pageText: (isText) => ({
    fontSize: isText ? fontSizes.base : fontSizes.lgx1,
    margin: isText ? '0px 4px' : '0px',
    color: {
      default: colors.secondary,
      ':hover': colors.personal
    },
    cursor: 'pointer'
  })
})