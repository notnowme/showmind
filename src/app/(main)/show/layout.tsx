import { authOptions } from "@/app/lib/auth";
import { ChatRoomProvider } from "@/app/providers/chat-provider";
import { getServerSession } from "next-auth";

const ShowLayout = async({children}: {children: React.ReactNode}) => {
    const session = await getServerSession(authOptions);

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