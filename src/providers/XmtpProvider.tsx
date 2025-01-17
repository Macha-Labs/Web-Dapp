import { logger, loggerInit } from "@/helpers/logger";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export type XmtpContextType = {
  fetchXmtpConversation: any | undefined;
  initiate: any | undefined;
  logs: any | undefined;
  remove: () => void;
  conversation: any | undefined;
};

export const XmtpContext = createContext<XmtpContextType>({
  fetchXmtpConversation: () => {},
  initiate: () => {},
  logs: null,
  remove: () => {},
  conversation: null,  
});

export const XmtpProvider = ({ children }: any) => {
  //console.log('Rendering >>>>> XmtpProvider');
  const authContext = useContext(AuthContext);
  const [conversation, setConversation] = useState<any>();  
  const [logs, setLogs] = useState<any>();

  const _initiate = (conversation: any) => {
    setConversation(conversation);
  }

  const _remove = () => {
    setConversation(null)
  }

  const _watch = () => {
    // Breaking logs loop
    logs?.return();
    // Reading new logs
    if (conversation) {
      const streamMessages = async () => {
        const newLog = await conversation?.xmtpRaw?.streamMessages();
        //console.log('Logs for conversations', conversation, newLog)
        setLogs(newLog);
      };
      streamMessages();
    }
    //console.log("first");
  }
  

  const _newConversation = async (channel: any) => {
    loggerInit('XMTPProvider.fetchXmtpConversation');
    const result = {}
    logger('xmtp', 'XMTPProvider.fetchXmtpConversation', 'Conversation is', [result])
    setConversation(result);
  };

  return (
    <XmtpContext.Provider
      value={{
        fetchXmtpConversation: _newConversation,
        initiate: _initiate,
        remove: _remove,
        logs: logs,
        conversation: conversation,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};
