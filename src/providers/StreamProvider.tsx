import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannel: any | undefined;
    reloadChannel: () => void;
    initiate: (channel: any) => void;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannel: {},
    reloadChannel: () => {},
    initiate: (channel: any) => {}
});

const StreamProvider = ({children}: any) => {
    const authContext = useContext(AuthContext)    
    const hookStreamChannel = useStreamChannel(authContext.streamClient);   

    const reloadChannel = () => {
        hookStreamChannel.setUpChannel(hookStreamChannel?.channel?.id)
    }

    const initiate = async (channel: any) => {
        logger(
          "channel",
          "StreamProvider.initiate",
          "Getting Channel from Stream",
          [channel]
        );
        hookStreamChannel?.setUpChannel(channel?.id)
      };


    return (
        <StreamContext.Provider
            value={{
                client: authContext?.streamClient,
                hookChannel: hookStreamChannel,
                reloadChannel:  reloadChannel,
                initiate: initiate,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
