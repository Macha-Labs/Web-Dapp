import {createContext, useContext, useEffect, useState} from "react";
import useStreamClient from "../hooks/stream/useStreamClient";
import useStreamUserChannels from "../hooks/stream/useStreamUserChannels";
import {AuthContext, AuthContextType} from "./AuthProvider";

export type StreamContextType = {
    client: any | undefined;
    hookChannels: any | undefined;
};

export const StreamContext = createContext<StreamContextType>({
    client: null,
    hookChannels: [],
});

const StreamProvider = ({children}: any) => {
    const [client, setClient] = useState<any>();    
    const authContext = useContext(AuthContext) as AuthContextType;
    const hookStreamClient = useStreamClient();
    const hookChannels = useStreamUserChannels();

    

    useEffect(() => {
        if (authContext?.user?.lens?.id) {
            hookStreamClient.connectToStream();
        }
    }, [authContext?.user?.lens?.id]);

    useEffect(() => {
        if (hookStreamClient.client?.user?.id) {
            setClient(hookStreamClient.client);
            hookChannels.fetchUserChannels(
                hookStreamClient.client,
            );
        }
    }, [hookStreamClient.client?.user?.id]);


    return (
        <StreamContext.Provider
            value={{
                client: client,
                hookChannels: hookChannels,
            }}
        >
            {children}
        </StreamContext.Provider>
    );
};
export default StreamProvider;
