import { useEffect, useRef, useState } from 'react';
import { VariableSizeList } from 'react-window';
import ChatMessage from "./ChatMessage";
import AutoSizer from "react-virtualized-auto-sizer";
import { StyledDateTag, StyledMoveToBottom } from '@/styles/StyledComponents';
import useStreamChannelActions from '@/hooks/stream/useStreamChannelActions';
import IconImage from '@/components/icons/IconImage';

const ChatWindow = (props: any) => {
  const hookStreamChannelMessages = useStreamChannelActions(props.chatContext?.hookChannel?.channel);
  const messageListRef = useRef<any>();
  const itemsRef = useRef<any>([]);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false)
  const [dataTag, setDateTag] = useState('')
  const [dateTagVisible, setDateTagVisible] = useState(false)
  const [scrollTo, setScrollTo] = useState('')


  const handleDateTag = (date: any) => {
    const todayIn = new Date();
    const msgDateIn = new Date(date);
    const msgDateString = msgDateIn.toDateString();
    const todayString = todayIn.toDateString();

    let dateTagString = `${msgDateIn.toLocaleDateString("en-us", {
      day: "numeric",
      month: "long",
    })}`;

    if (msgDateString == todayString) {
      dateTagString = "Today";
    }

    setDateTag(dateTagString);
  };

  const scrollToBottom = () => {
    if (messageListRef && messageListRef.current && !isScrollAtBottom) {
      messageListRef.current.scrollTop = messageListRef?.current?.scrollHeight;
      setIsScrollAtBottom(true);
    }
  }

  useEffect(() => {

   // console.log('isScrollAtBottom', isScrollAtBottom);
    
  }, [isScrollAtBottom])

  useEffect(() => {
    // Scroll to the bottom of the list when new items are added
    if (messageListRef && messageListRef.current) {
      const lastMsg =
        hookStreamChannelMessages?.messages[
          hookStreamChannelMessages?.messages.length - 1
        ];
      if (
        String(props.authContext.address).toLowerCase() ==
        String(lastMsg?.user.id).toLowerCase()
      ) {
        messageListRef.current.scrollTop =
          messageListRef?.current?.scrollHeight;
      } else if (isScrollAtBottom) {
        messageListRef.current.scrollTop =
          messageListRef?.current?.scrollHeight;
      }
      let showtag: any;
      messageListRef.current.addEventListener(
        "scroll",
        (event: any) => {
          setDateTagVisible(true);
          const { scrollHeight, scrollTop, clientHeight } = event.target;
          if (Math.abs(scrollHeight - clientHeight - scrollTop) < 10) {
            setIsScrollAtBottom(true);
          } else {        
            setIsScrollAtBottom(false);
          }

          clearTimeout(showtag);
          showtag = setTimeout(() => {
            setDateTagVisible(false);
          }, 2000);
        },
        false
      );
      return function cleanup() {
        setDateTagVisible(false);
        if (messageListRef && messageListRef.current) {
          messageListRef.current.removeEventListener("scroll", () => {}, false);
        }
      };
    }
  }, [hookStreamChannelMessages?.messages]);

  useEffect(() => {
    scrollToBottom()
  }, []);

  const executeScroll = (id: any) => {
    itemsRef.current[id].scrollIntoView() 
    setScrollTo(id)
  }
  // const messageAreaHeight = props.hookMessages?.messages.map((message: any, index: any) => {
  //   console.log(itemsRef?.current[index], itemsRef?.current[index]?.offsetHeight, itemsRef?.current[index]?.clientHeight);
  //   return (itemsRef?.current[index]?.offsetHeight ) || 100;
  // });

  // const templateMessages = ({ index, style }: any) => {
  //   const message = props.hookMessages?.messages[index];
    
  //   return (
  //     <div  style={style}>
  //       <ChatMessage
  //         message={message}
  //         hookChat={{}}
  //         authContext={props.authContext}
  //         key={`a-${message.id}`}
         
  //       />
  //     </div>
  //   )
  // }


  return (
    <>
    <StyledDateTag visible={`${dateTagVisible ? 'visible': 'hidden'} `} >{dataTag}</StyledDateTag> 
    <div ref={messageListRef} className="body">
          {hookStreamChannelMessages?.messages.map((message: any, index: any) => {
            return (
              <div ref={el => itemsRef.current[message.id] = el}  key={`message-${index}`}>
                <ChatMessage
                  message={message}
                  hookChat={props?.chatContext?.hookChat}
                  authContext={props.authContext}
                  hookMembers={props.chatContext.hookMembers}
                  key={`a-${message.id}`}
                  handleDateTag={handleDateTag}
                  executeScroll={executeScroll}
                  scrollToId={scrollTo}
                />
              </div>
            )
          })}
    </div>
  <StyledMoveToBottom onClick={scrollToBottom} visible={`${!isScrollAtBottom ? 'visible': 'hidden'} `} >
   <IconImage path="IconDarkFiles.png" size="30" />
   </StyledMoveToBottom>
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
