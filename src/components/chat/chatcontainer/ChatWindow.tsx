import { useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import ChatMessage from "./ChatMessage";
import AutoSizer from "react-virtualized-auto-sizer";

const ChatWindow = (props: any) => {
  const messageListRef = useRef<any>();
  const itemsRef = useRef<any>([]);

  useEffect(() => {
    // Scroll to the bottom of the list when new items are added
    messageListRef.current?.scrollToItem(props.hookChannel.messages.length - 1);
  }, [props.hookChannel.messages]);

  const messageAreaHeight = props.hookChannel.messages.map((message: any, index: any) => {return itemsRef.current[index]?.clientHeight});

  const templateMessages = ({ index, style }: any) => {
    const message = props.hookChannel.messages[index];
    
    return (
      <div ref={el => itemsRef.current[index] = el}  style={style}>
        <ChatMessage
          message={message}
          hookChat={props.hookChat}
          authContext={props.authContext}
          key={`a-${message.id}`}
        />
      </div>
    )
  }


  return (
    <div className="body">
    <AutoSizer>
    {({ height, width }) => (
      <VariableSizeList
        ref={messageListRef}
        height={height}
        itemCount={props.hookChannel.messages.length}
        itemSize={(index: number) => messageAreaHeight[index]}
        width={width}>
        {templateMessages}
      </VariableSizeList>
    )}
    </AutoSizer>
    </div>

  );
};

export default ChatWindow;
