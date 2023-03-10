import { useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import ChatMessage from "./ChatMessage";
import AutoSizer from "react-virtualized-auto-sizer";
import useStreamChannelMessages from '@/hooks/stream/useStreamChannelMessages';

const ChatWindow = (props: any) => {
  const hookStreamChannelMessages = useStreamChannelMessages(props.chatContext?.hookChannel?.channel);
  const messageListRef = useRef<any>();
  const itemsRef = useRef<any>([]);

  useEffect(() => {
    // Scroll to the bottom of the list when new items are added
   // messageListRef.current?.scrollToItem(props.hookMessages?.messages.length - 1);
   const lastMsg = hookStreamChannelMessages?.messages[hookStreamChannelMessages?.messages.length - 1]
   if(String(props.authContext.address).toLowerCase() == String(lastMsg.user.id).toLowerCase()){
     messageListRef.current.scrollTop = messageListRef?.current?.scrollHeight
   }
  }, [hookStreamChannelMessages?.messages]);

  const messageAreaHeight = props.hookMessages?.messages.map((message: any, index: any) => {
    console.log(itemsRef?.current[index], itemsRef?.current[index]?.offsetHeight, itemsRef?.current[index]?.clientHeight);
    return (itemsRef?.current[index]?.offsetHeight ) || 100;
  });

  const templateMessages = ({ index, style }: any) => {
    const message = props.hookMessages?.messages[index];
    
    return (
      <div  style={style}>
        <ChatMessage
          message={message}
          hookChat={{}}
          authContext={props.authContext}
          key={`a-${message.id}`}
        />
      </div>
    )
  }


  return (
    <>
    <div ref={messageListRef} className="body">
          {hookStreamChannelMessages?.messages.map((message: any, index: any) => {
            return (
              <div ref={el => itemsRef.current[index] = el}  key={`message-${index}`}>
                <ChatMessage
                  message={message}
                  hookChat={props?.chatContext?.hookChat}
                  authContext={props.authContext}
                  key={`a-${message.id}`}
                />
              </div>
            )
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
