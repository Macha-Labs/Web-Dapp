import { logger } from "@/helpers/logger";
import useStreamChannel from "@/hooks/stream/useStreamChannel";
import useUserStore from "@/store/useUserStore";
import { createContext, useEffect } from "react";
import useStreamClient from "../hooks/stream/useStreamClient";

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
    console.log('Rendering >>>>> StreamProvider');
    const hookStreamClient = useStreamClient();
    const hookStreamChannel = useStreamChannel(hookStreamClient.client);
    const $connected = useUserStore((state: any) => state.connected);
   

    useEffect(() => {
        if ($connected && !hookStreamClient?.client) {
            hookStreamClient.connectToStream();
        }
    }, [$connected]);


    // useEffect(() => {
    //     if ($connected && hookStreamClient.client?.user?.id) {
    //         hookStreamChannels.fetchUserChannels(hookStreamClient.client);
    //     }
    // }, [hookStreamClient.client?.user?.id]);

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
                client: hookStreamClient.client,
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
