import useChatMessages from "@/hooks/chat/useChatMessages";
import { AuthContext } from "@/providers/AuthProvider";
import { ChatContext } from "@/providers/ChatProvider";
import { useContext, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { StyledDateTag, StyledMoveToBottom } from '@/styles/StyledComponents';
import IconImage from '@/components/icons/IconImage';
import ModalSlider from "@/components/modal/ModalSlider";
import UserProfile from "@/components/user/UserProfile";
import { useDisclosure } from "@chakra-ui/react";
import { useChatMembersStore } from "@/store/useChatMembersStore";
import useChatChannelStore from "@/store/useChatChannelStore";
import useChatMessagesStore from "@/store/useChatMessagesStore";

const ChatWindow = (props: any) => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  // 
  const messageListRef = useRef<any>();
  const hookChatMessages = useChatMessages();
  const itemsRef = useRef<any>([]);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false)
  const [dataTag, setDateTag] = useState('')
  const [dateTagVisible, setDateTagVisible] = useState(false)
  const [scrollTo, setScrollTo] = useState('')
  const [prevMsgCount, setPrevMsgCount]= useState(0)
  const [unReadMsg, setUnReadMsg] = useState(0)
  const [selectedUser, setSelectedUser] = useState<any>();
  const modalProfile = useDisclosure();
  const $memberAll = useChatMembersStore((state: any) => state.memberAll);
  const $channel = useChatChannelStore((state: any) => state.channel);
  const $messages = useChatMessagesStore((state: any) => state.messages);

  useEffect(() => {
    hookChatMessages.load();
    hookChatMessages.watch();
  }, [$channel?.id])


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
      setUnReadMsg(0)
      setPrevMsgCount($messages?.length)
    }
  }

  useEffect(() => {
   setPrevMsgCount($messages?.length)
   scrollToBottom()
  }, [])

  useEffect(() => {
   if(!isScrollAtBottom){
      setUnReadMsg($messages?.length - prevMsgCount)
    }else{
      setUnReadMsg(0)
      setPrevMsgCount($messages?.length)
    }
    // Scroll to the bottom of the list when new items are added
    if (messageListRef && messageListRef.current && $messages) {
      const lastMsg =
      $messages[
        $messages?.length - 1
        ];
      if (
        String(authContext.address).toLowerCase() ==
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
            setUnReadMsg(0)
            setPrevMsgCount($messages?.length)
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
  }, [$messages]);


  const executeScroll = (id: any) => {
    itemsRef.current[id].scrollIntoView();
    setScrollTo(id);
  };

  const handleSelectedUser = (user: any) => {
    console.log($memberAll)
    if ($memberAll) {
      console.log($memberAll)
      const userProfile = $memberAll?.filter(
        (profile: any) =>
          String(profile.address).toLowerCase() ==
          String(user.lensOwnedBy).toLowerCase()
      )[0];
      modalProfile.onOpen();
      setSelectedUser(userProfile);
    }
  };


  const TemplateProfile = () => {
    return (
      <ModalSlider event={modalProfile} size="lg">
        <UserProfile user={selectedUser} />
      </ModalSlider>
    );
  };
  
  return (
    <>
    <StyledDateTag visible={`${dateTagVisible ? 'visible': 'hidden'} `} >{dataTag}</StyledDateTag> 
    <div ref={messageListRef} className="body">
          {$messages?.map((message: any, index: any) => {
          return (
            <div
              ref={el => (itemsRef.current[message.id] = el)}
              key={`message-${index}`}
            >
              <ChatMessage
                message={message}
                hookChat={chatContext?.hookChat}
                authContext={authContext}
                key={`a-${message.id}`}
                handleDateTag={handleDateTag}
                executeScroll={executeScroll}
                scrollToId={scrollTo}
                handleSelectedUser={handleSelectedUser}
              />
            </div>
          );
        })}
    </div>

    {
        selectedUser && <TemplateProfile />
    }

    <StyledMoveToBottom onClick={scrollToBottom} visible={`${!isScrollAtBottom ? 'visible': 'hidden'} `} >
        { unReadMsg != 0 && <span>{unReadMsg}</span> }
        <IconImage path="IconDarkArrowDown.png" size="xl" />
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
