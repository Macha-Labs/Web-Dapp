import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { StreamContext } from "@/providers/StreamProvider";
import { useContext } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = (channel: any) => {
    const chatProvider = useContext(ChatContext);
    const authContext = useContext(AuthContext) as AuthContextType;
    return (
        <>
            {chatProvider?.hookChannel?.channel ? 
                <>
                    <ChatHeader
                    hookChat={chatProvider.hookChat}
                    hookChannel={chatProvider.hookChannel}
                    hookMembers={chatProvider.hookMembers}
                    />
                    <ChatWindow
                        hookChat={chatProvider.hookChat}
                        hookChannel={chatProvider.hookChannel}
                        authContext={authContext}
                        address={authContext.address}
                    />
                    <ChatInput
                        hookChat={chatProvider.hookChat}
                    />
                </>
            :
                <ChatNonDisplay></ChatNonDisplay>
            }
                
        </>
    )
}

export default ChatContainer;