import { useEffect, useRef } from 'react';
import { VariableSizeList } from 'react-window';
import ChatMessage from "./ChatMessage";
import AutoSizer from "react-virtualized-auto-sizer";

const ChatWindow = (props: any) => {
  const messageListRef = useRef<any>();
  useEffect(() => {
    // Scroll to the bottom of the list when new items are added
    messageListRef.current.scrollToItem(props.hookChannel.messages.length - 1);
  }, [props.hookChannel.messages]);

  const messageAreaHeight = props.hookChannel.messages.map((message: any) => 100 + message.text.length);

  const templateMessages = ({ index, style }) => {
    const message = props.hookChannel.messages[index];
    return (
      <div style={style} className="body">
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
    <>
    <AutoSizer>
    {({ height, width }) => (
      <VariableSizeList
        ref={messageListRef}
        height={700}
        itemCount={props.hookChannel.messages.length}
        itemSize={(index: number) => messageAreaHeight[index]}
        width={1080}>
        {templateMessages}
      </VariableSizeList>
    )}
    </AutoSizer>
    </>

  );
};

export default ChatWindow;
