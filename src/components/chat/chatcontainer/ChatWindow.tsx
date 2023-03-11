import { useContext, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import useStreamChannelMessages from "@/hooks/stream/useStreamChannelMessages";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";

const ChatWindow = (props: any) => {
  const hookStreamChannelMessages = useStreamChannelMessages(
    props.chatContext?.hookChannel?.channel
  );
  const xmtpContext = useContext(XmtpContext);
  const messageListRef = useRef<any>();
  const [messages, setMessages] = useState<any>(
    hookStreamChannelMessages.messages
  );
  const itemsRef = useRef<any>([]);
  const router = useRouter();
  console.log('router query', router)

  useEffect(() => {
    // Scroll to the bottom of the list when new items are added
    // messageListRef.current?.scrollToItem(props.hookMessages?.messages.length - 1);
    if (messages) {
      const lastMsg = messages[messages?.length - 1];
      if (
        String(props.authContext.address).toLowerCase() ==
        String(lastMsg?.user?.id).toLowerCase()
      ) {
        messageListRef.current.scrollTop = messageListRef?.current?.scrollHeight;
      }
    }
  }, [messages]);


  useEffect(() => {
    if (router.pathname == '/chat') {
      setMessages(hookStreamChannelMessages.messages || []);
    }
  }, [hookStreamChannelMessages.messages])

  useEffect(() => {
    if (router.pathname == '/chat/dm') {
      setMessages(xmtpContext.messages || []);
    }
  }, [xmtpContext.messages])

  const messageAreaHeight = props.hookMessages?.messages?.map(
    (message: any, index: any) => {
      console.log(
        itemsRef?.current[index],
        itemsRef?.current[index]?.offsetHeight,
        itemsRef?.current[index]?.clientHeight
      );
      return itemsRef?.current[index]?.offsetHeight || 100;
    }
  );

  const templateMessages = ({ index, style }: any) => {
    const message = props.hookMessages?.messages[index];

    return (
      <div style={style}>
        <ChatMessage
          message={message}
          hookChat={{}}
          authContext={props.authContext}
          key={`a-${message.id}`}
        />
      </div>
    );
  };

  return (
    <>
      <div ref={messageListRef} className="body">
        {messages?.map((message: any, index: any) => {
          return (
            <div
              ref={el => (itemsRef.current[index] = el)}
              key={`message-${index}`}
            >
              <ChatMessage
                message={message}
                hookChat={props?.chatContext?.hookChat}
                authContext={props.authContext}
                hookMembers={props.chatContext.hookMembers}
                key={`a-${message.id}`}
              />
            </div>
          );
        })}
      </div>

      {/* {(itemsRef.current.length == props?.hookMessages?.messages?.length) &&
    <div className="body">
        <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            ref={messageListRef}
            height={height}
            itemCount={props.hookMessages.messages.length}
            itemSize={(index: number) => messageAreaHeight[index]}
            width={width}>
            {templateMessages}
          </VariableSizeList>
        )}
        </AutoSizer>
      </div>
    } */}
    </>
  );
};

export default ChatWindow;
