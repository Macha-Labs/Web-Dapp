import React, { useEffect, useState } from "react";
import { Client, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { fetchSigner } from "@wagmi/core";
function useXmtp(PEER_ADDRESS: any) {
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [client, setClient] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  //   const PEER_ADDRESS = "0x937C0d4a6294cdfa575de17382c7076b579DC176"; //bot address

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
  }, [client, xmtpClientAddress]);

  const onSendMessage = async (address: any) => {
    console.log("message sent");
    const message = `gm ${address}`;
    await client.send(message);
  };

  const initXmtp = async function () {
    const signer = await fetchSigner();
    const xmtp = await Client.create(signer, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(PEER_ADDRESS);
    const conversationList = await xmtp.conversations.list();
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });

    setClient(conversation);
    setMessages(messages);
    setXmtpClientAddress(xmtp.address);
    setAllConversations(conversationList);
    console.log(messages, "messages");
    // const allConversations = await client.conversations.list();
    console.log("allConversations", await xmtp.conversations.list());
  };

  return {
    messages,
    xmtpClientAddress,
    initXmtp,
    onSendMessage,
    allConversations,
  };
}

export default useXmtp;
