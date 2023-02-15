import { logger } from "@/helpers/logger";
import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { useContext } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";

const ChatContainer = (channel: any) => {
    const chatProvider = useContext(ChatContext);
    const authContext = useContext(AuthContext) as AuthContextType;
    
    return (
        <>
             <ChatHeader 
                    hookChat={chatProvider.hookChat}
                    hookChannel={chatProvider.hookChannel}
                    hookMembers={chatProvider.hookMembers}
            />
             <ChatWindow  
                    hookChat={chatProvider.hookChat}
                    hookChannel={chatProvider.hookChannel}
                    address={authContext.address}
            />
             <ChatInput  
                    hookChat={chatProvider.hookChat}
            />
        </>
    )
}

export default ChatContainer;