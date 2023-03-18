import useChatChannelStore from "@/store/useChatChannelStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = () => {
  console.log("Rendering >>>>> ChatContainer");
  const $channel = useChatChannelStore((state: any) => state.channel);
  return (
    <>
      {$channel ? (
        <>
          <ChatHeader />
          <ChatWindow/>
          <ChatInput/>
        </>
      ) : (
        <ChatNonDisplay></ChatNonDisplay>
      )}
    </>
  );
};

export default ChatContainer;
