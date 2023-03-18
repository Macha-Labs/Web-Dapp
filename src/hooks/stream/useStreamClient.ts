import { useRef, useState } from "react";
import { StreamChat } from "stream-chat";
import { config } from "../../config";
// import {storeAsyncData, getAsyncData} from "../../service/AsyncStorageService";
// import messaging from "@react-native-firebase/messaging";
import { logger } from "../../helpers/logger";

const useStreamClient = () => {
  console.log('Rendering >>>>> useStreamClient');

  const [client, setClient] = useState<any>();
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>();

  const connectToStream = async (address: any, user: any) => {
    // if (!?.isConnected) {
    //   logger("stream", "useStreamClient.connecttostream", "user not connected", [?.user]);
    //   return;
    // }
    console.log("Logging user object calling connectToStream", address);
    try {
      if (client?.user.id) {
        client.disconnect();
      }
      const newClient = StreamChat.getInstance(`${config.STREAM_APIKEY}`);

      await newClient.connectUser(
        {
          id: address.toLowerCase(),
          lensId: user?.lens?.id,
          lensImage: user?.lens?.image,
          lensName: user?.lens?.name,
          lensHandle: user?.lens?.handle,
          lensOwnedBy: user?.lens?.ownedBy,
          dbId: user?.db?.id,
        },
        user?.db?.tokens?.stream
      );
      logger("stream", "Logging user object useStreamClient.connectToStream", "Connection made", [
        newClient.user,
        user,
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
  };

  return {
    client: client,
    connectToStream: connectToStream,
  };
};
export default useStreamClient;
