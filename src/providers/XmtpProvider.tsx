import { DecodedMessage} from "@xmtp/xmtp-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { logger, loggerInit } from "@/helpers/logger";
import useXmtp from "@/hooks/xmtp/useXmtp";

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

  /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
  // useEffect(() => {
  //   if (xmtpClientAddress) {
  //     const streamMessages = async () => {
  //       const newStream = await conversation.streamMessages();
  //       console.log("newStream", newStream);
  //       for await (const msg of newStream) {
  //         setMessages(prevMessages => {
  //           const messages = [...prevMessages];
  //           messages.unshift(msg);
  //           return messages;
  //         });
  //       }
  //     };
  //     streamMessages();
  //   }
  //   console.log("first");
  // }, [conversation, xmtpClientAddress, peerAddress]);


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
