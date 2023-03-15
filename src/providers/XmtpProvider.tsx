import { logger, loggerInit } from "@/helpers/logger";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";

export type XmtpContextType = {
  fetchXmtpConversation: (text: string) => void;
  initiate: (text: string) => void;
  remove: () => void;
  conversation: any | undefined;
};

export const XmtpContext = createContext<XmtpContextType>({
  fetchXmtpConversation: () => {},
  initiate: () => {},
  remove: () => {},
  conversation: null,  
});

export const XmtpProvider = ({ children }: any) => {
  console.log('Rendering >>>>> XmtpProvider');
  const authContext = useContext(AuthContext);
  const [conversation, setConversation] = useState<any>();  

  const _initiate = (conversation: any) => {
    setConversation(conversation)
  }

  const _remove = () => {
    setConversation(null)
  }
  

  const _newConversation = async (channel: any) => {
    loggerInit('XMTPProvider.fetchXmtpConversation');
    const result = await authContext?.xmtpClient.conversations.newConversation(
      channel?.id
    );
    logger('xmtp', 'XMTPProvider.fetchXmtpConversation', 'Conversation is', [result])
    setConversation(result);
  };



  return (
    <XmtpContext.Provider
      value={{
        fetchXmtpConversation: _newConversation,
        initiate: _initiate,
        remove: _remove,
        conversation: conversation,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};
