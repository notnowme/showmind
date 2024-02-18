import { authOptions } from "@/app/lib/auth";
import { ChatRoomProvider } from "@/app/providers/chat-provider";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { parse } from "url";



interface ShowLayoutProps {
    children: React.ReactNode;
}
interface Query {
    room: string
}


const ShowLayout = async({children}: ShowLayoutProps) => {
    const session = await getServerSession(authOptions);
    const headerList = headers();
    const url = headerList.get('x-url');
    if(!url) {
        console.log(`[CANNOT_GET_URL]`);
        return <></>;
    };
    const parsedUrl = parse(url, true);
    const query = parsedUrl.query;

    if(!session) {
        return <div>로그인하지 않음.</div>
    }

    return (
        <ChatRoomProvider>
            {children}
        </ChatRoomProvider>
    )
};

export default ShowLayout;