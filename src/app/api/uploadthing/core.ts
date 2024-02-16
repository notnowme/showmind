/*
    uploadthing 이미지 파일 업로드.
*/

import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// 사용자 로그인 확인.
const handleAuth = async() => {
    const session = await getServerSession(authOptions);

    return session?.user.id;
};

export const ourFileRouter = {
    imageUploader: f({ image: {maxFileSize: '4MB', maxFileCount: 1} })
    .middleware(async() => {
        const user = await handleAuth();
        if(!user) {
            throw new UploadThingError("Unauthorized");
        }
        return {userId: user};
    })
    .onUploadComplete(async ({metadata, file}) => {
        console.log(`[UPLOAD_COMPLETE :: ${metadata.userId}]`);
        console.log(`[FILE_URL :: ${file.url}]`);

        await db.user.update({
            where: {
                id: metadata.userId
            },
            data: {
                imageKey: file.key,
                imageUrl: file.url
            }
        });

        return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;