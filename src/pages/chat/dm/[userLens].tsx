import React, { useEffect } from "react";
import useXmtp from "@/hooks/xmtp/useXmtp";
import { useAccount } from "wagmi";
import ChatContainer from "@/components/chat/chatcontainer/ChatContainer";
import ChatList from "@/components/chat/ChatList";
import Nav from "@/components/nav/Nav";
import {
  StyledWindow,
  StyledChatList,
  StyledChat,
} from "@/styles/StyledComponents";
import { truncateAddress } from "@/helpers";
import Link from "next/link";

function DirectMessage() {
  const address =
    typeof window !== "undefined" && window?.location?.href.split("#")[1];
  const hookXmtp = useXmtp(address);
  const { isConnected } = useAccount();
  console.log(address, "address");
  useEffect(() => {
    hookXmtp.initXmtp();
    console.log("init");
  }, [address]);

  return (
    // <div>
    //   <ul>
    //     {hookXmtp.messages.map((message, index) => (
    //       <li key={index}>{message.content}</li>
    //     ))}
    //   </ul>

    //   <button
    //     onClick={() => {
    //       hookXmtp.onSendMessage();
    //     }}
    //   >
    //     Send GM
    //   </button>
    // </div>
    <StyledWindow>
      <div className="right">
        {isConnected && !hookXmtp.xmtpClientAddress ? (
          <button onClick={hookXmtp.initXmtp}>Connect to XMTP</button>
        ) : (
          <StyledChatList>
            {hookXmtp.allConversations?.map((item: any, index: string) => {
              return (
                <div key={index}>
                  <Link href={`/chat/dm/address=#${item.peerAddress}`}>
                    {truncateAddress(item.peerAddress)}
                  </Link>
                </div>
              );
            })}
          </StyledChatList>
        )}
        <StyledChat>
          {hookXmtp.messages?.map((item, index) => {
            return <div key={index}>{item.content}</div>;
          })}
          <button onClick={() => hookXmtp.onSendMessage()}> Send GM</button>
        </StyledChat>
      </div>
    </StyledWindow>
  );
}

export default DirectMessage;
