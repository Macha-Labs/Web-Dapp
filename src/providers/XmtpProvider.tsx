import { DecodedMessage} from "@xmtp/xmtp-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { logger, loggerInit } from "@/helpers/logger";

export type XmtpContextType = {
  fetchXmtpConversation: (text: string) => void;
  sendXmtpMessage: any | undefined;
  conversation: any | undefined;
};

export const XmtpContext = createContext<XmtpContextType>({
  fetchXmtpConversation: () => {},
  sendXmtpMessage: () => {},
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


  

  const fetchXmtpConversation = async (channel: any) => {
    loggerInit('XMTPProvider.fetchXmtpConversation');
    const result = await authContext?.xmtpClient.conversations.newConversation(
      channel?.id
    );
    logger('xmtp', 'XMTPProvider.fetchXmtpConversation', 'Conversation is', [result])
    setConversation(result);
  };

  

  const sendXmtpMessage = async (data: any) => {
    return await conversation.send(data.text);
  };

  return (
    <XmtpContext.Provider
      value={{
        fetchXmtpConversation: fetchXmtpConversation,
        sendXmtpMessage: sendXmtpMessage,
        conversation: conversation,
      }}
    >
      {children}
    </XmtpContext.Provider>
  );
};
