import React, { useEffect, useState } from "react";
import { Client, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { fetchSigner } from "@wagmi/core";


function useXmtp() {
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [client, setClient] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [xmtpSign, setXmtpSign] = useState<any>();

   /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
    useEffect(() => {
      if (xmtpClientAddress) {
        const streamMessages = async () => {
          const newStream = await client.streamMessages();
          for await (const msg of newStream) {
            setMessages(prevMessages => {
              const messages = [...prevMessages];
              messages.unshift(msg);
              return messages;
            });
          }
        };
        streamMessages();
      }
      console.log("first");
    }, [client, xmtpClientAddress, peerAddress]);
    const connectXmtp = async () => {
      const signer = await fetchSigner();
      setXmtpSign(signer);
      const xmtp = await Client.create(signer, { env: "production" });
      const PEER_ADDRESS = "0x937C0d4a6294cdfa575de17382c7076b579DC176"; //bot address
      const conversation = await xmtp.conversations.newConversation(
        peerAddress ? peerAddress : PEER_ADDRESS
      );
      const conversationList = await xmtp.conversations.list();
      const messages = await conversation.messages({
        direction: SortDirection.SORT_DIRECTION_DESCENDING,
      });
  
      setClient(conversation);
      setMessages(messages);
      setXmtpClientAddress(xmtp.address);
      setAllConversations(conversationList);
      console.log(messages, "messages");
      console.log(xmtpClientAddress, xmtp, "client Address");
      // const allConversations = await client.conversations.list();
      console.log("allConversations", await xmtp.conversations.list());
    };
  


  const fetchXmtpConversation = async (peerAddress: any) => {
    const xmtp = await Client.create(xmtpSign, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(peerAddress);
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });
    setMessages(messages);
  };


  const sendXmtpMessage = async () => {
    await client.send("gm ser");
  };
  

  return {
    connectXmtp,
    client,
    allConversations,
    xmtpClientAddress,
    setPeerAddress,
    messages,
    fetchXmtpConversation,
    sendXmtpMessage,
  };
}

export default useXmtp;
