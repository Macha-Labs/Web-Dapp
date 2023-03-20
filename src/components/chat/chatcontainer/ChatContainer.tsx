import useChatChannelStore from "@/store/useChatChannelStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatNonDisplay from "./ChatNonDisplay";
import ChatWindow from "./ChatWindow";

const ChatContainer = () => {
  const $channel = useChatChannelStore((state: any) => state.channel);
  console.log("Rendering >>>>> ChatContainer", $channel);
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
