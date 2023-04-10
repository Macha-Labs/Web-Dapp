import { useEffect, useRef, useState } from "react";
import { StreamChat } from "stream-chat";
import { config } from "../../config";
// import {storeAsyncData, getAsyncData} from "../../service/AsyncStorageService";
// import messaging from "@react-native-firebase/messaging";
import { logger } from "../../helpers/logger";

const useStreamAuth = () => {
  console.log('Rendering >>>>> useStreamClient');

  const [client, setClient] = useState<any>();
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>();
  const [streamUser, setStreamUser] = useState<any>();

  const connectToStream = async (address: any, user: any) => {
    // if (!?.isConnected) {
    //   logger("stream", "useStreamClient.connecttostream", "user not connected", [?.user]);
    //   return;
    // }
    setStreamUser(user);
    console.log("Logging user object calling connectToStream", address, user, user?.db?.tokens?.stream);
    
  };

  const createStreamClient = async() => {
    try {
      if (client?.user.id) {
        client.disconnect();
      }
      const newClient = StreamChat.getInstance(`${config.STREAM_APIKEY}`);
      const streamToken = streamUser?.db?.tokens;
      console.log("The stream token is ", streamToken.stream);
      await newClient.connectUser(
        {
          id: streamUser?.lens?.ownedBy.toLowerCase(),
          lensId: streamUser?.lens?.id,
          lensImage: streamUser?.lens?.image,
          lensName: streamUser?.lens?.name,
          lensHandle: streamUser?.lens?.handle,
          lensOwnedBy: streamUser?.lens?.ownedBy,
          dbId: streamUser?.db?.id,
        },
        streamUser?.db?.tokens?.stream
      );
      logger("stream", "Logging user object useStreamClient.connectToStream", "Connection made", [
        newClient.user,
        streamUser,
      ]);
      setClient(newClient);
    } catch (e) {
      logger(
        "stream",
        "useStreamClient.connectToStream",
        "Error in setting the stream client",
        [e]
      );
    }
  }

  useEffect(() => {
    if (streamUser?.db?.tokens?.stream)
      createStreamClient();
  }, [streamUser?.db?.tokens?.stream])

  return {
    client: client,
    connectToStream: connectToStream,
  };
};
export default useStreamAuth;
