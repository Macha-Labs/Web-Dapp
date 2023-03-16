import { StreamContext } from "@/providers/StreamProvider";
import { XmtpContext } from "@/providers/XmtpProvider";
import { useRouter } from "next/router";
import { useContext } from "react";

const useChatSelect = () => {
    const router = useRouter();
    const streamContext = useContext(StreamContext);
    const xmtpContext = useContext(XmtpContext);

    const _initiateChannel = () => {
        switch (router.pathname) {
          case "/chat":
            return streamContext?.initiate;
          case "/chat/dm":
            return xmtpContext.fetchXmtpConversation;
        }
      };

      
    return (
        {
            initiate: _initiateChannel() 
        }
    )
}

export default useChatSelect;