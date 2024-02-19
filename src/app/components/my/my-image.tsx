/** 
 * 유저 프로필 이미지 컴포넌트.
*/
'use client';

import { uploadFiles } from "@/app/utils/uploadthing";

import { useRef, useState } from "react";

import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import * as stylex from '@stylexjs/stylex'
import { colors, fontSizes } from "@/app/styles/token.stylex";

import { FaPen } from 'react-icons/fa'

import Animation from "@/app/components/loading-pencil";

interface MyImageProps {
    imageUrl: string
}

const MyImage = ({ imageUrl }: MyImageProps) => {
    const uploadRef = useRef<HTMLInputElement>(null);

    const [changeImg, setChangeImg] = useState(false);
    const [img, setImg] = useState('');
    const [showModify, setShowModify] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { update } = useSession();

    // 이미지 미리 보기 없애기.
    const imgReset = () => {
        URL.revokeObjectURL(img);
        setImg('');
        setChangeImg(false);
    }

    // 이미지 미리 보기 설정.
    const handleImg = (e: React.ChangeEvent<{ files: FileList | null }>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            URL.revokeObjectURL(img);

            setImg(URL.createObjectURL(file));
            setChangeImg(true);
        }
    }

    // 이미지 업로드.
    const handleImgUpload = async () => {
        try {
            setLoading(true);
            if (uploadRef.current && uploadRef.current.files && uploadRef.current.files.length > 0) {
                const files = [uploadRef.current.files[0]];
                const res = await uploadFiles("imageUploader", {
                    files
                })
                imgReset();
                setLoading(false);
                // session의 이미지 주소 갱신.
                update(
                    {
                        modifyImg: res[0].url
                    }
                )
                router.refresh();
            }
        } catch (error) {
            console.log('error!', error);
        }
    };

    // 이미지 수정 버튼 클릭.
    const handleClick = () => {
        if(!changeImg) uploadRef?.current?.click();
    };
    return (
        <div {...stylex.props(styels.image())}
            onMouseEnter={() => setShowModify(true)}
            onMouseLeave={() => setShowModify(false)}
        >
            <Image
                src={changeImg ? img : imageUrl}
                fill alt="user-image"
            />
            {showModify && !changeImg &&
                <FaPen {...stylex.props(styels.modify())}
                    onClick={handleClick}
                />
            }
            {changeImg && !loading &&
                <div {...stylex.props(styels.confirm())}>
                    <button {...stylex.props(styels.btn(true))}
                        onClick={imgReset}
                    >
                        취소
                    </button>
                    <button {...stylex.props(styels.btn(false))}
                        onClick={handleImgUpload}
                    >
                        변경
                    </button>
                </div>
            }
            { loading && <Animation /> }
            <input type="file" ref={uploadRef} accept="image/jpeg, image/jpg, image/png" onChange={handleImg} hidden />
        </div>

    )
};

export default MyImage;

const styels = stylex.create({
    image: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        backgroundColor: '#1E1E1E',
        top: '-50px',
        left: '30px',
        overflow: 'hidden',
        objectFit: 'cover'
    }),
    modify: () => ({
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '5px',
        padding: '35px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: colors.primary,
        cursor: 'pointer',
        zIndex: 10
    }),
    confirm: () => ({
        position: 'absolute',
        width: '80px',
        height: '20px',
        display: 'flex',
        columnGap: '10px',
        bottom: '5px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '12px'
    }),
    btn: (state) => ({
        padding: '1px',
        width: '35px',
        height: '20px',
        borderRadius: '5px',
        color: {
            default: colors.secondary,
            ':hover': colors.primary
        },
        fontSize: fontSizes.sm,
        backgroundColor: state ? colors.error : colors.dp00,
        opacity: {
            default: '0.8',
            ':hover': '1'
        },
        cursor: 'pointer',
        outline: 'none',
        border: 'none'
    }),
});

