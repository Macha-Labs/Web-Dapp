import { config } from "../../config";
import { AuthContext, AuthContextType } from "../../providers/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { StreamChat } from "stream-chat";
// import {storeAsyncData, getAsyncData} from "../../service/AsyncStorageService";
// import messaging from "@react-native-firebase/messaging";
import { logger } from "../../helpers/logger";

const useStreamClient = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  const [client, setClient] = useState<any>();
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>();

  const connectToStream = async () => {
    if (!authContext?.user?.lens?.id) {
      logger("stream", "connecttostream", "user.lens error", [
        authContext?.user,
      ]);
      return;
    } else if (!authContext?.user?.db?.tokens?.stream) {
      logger("stream", "connecttostream", "user.db error", [authContext?.user]);
      return;
    }
    try {
      if (client?.user) {
        client.disconnect();
      }
      const newClient = StreamChat.getInstance(`${config.STREAM_APIKEY}`);
      logger("stream", "connectToStream", "StreamAuth Step 1", [
        newClient,
        authContext?.user,
      ]);

      await newClient.connectUser(
        {
          id: authContext.address.toLowerCase(),
          lensId: authContext?.user?.lens?.id,
          lensImage: authContext?.user?.lens?.image,
          lensName: authContext.user?.lens?.name,
          lensHandle: authContext?.user?.lens?.handle,
          lensOwnedBy: authContext?.user?.lens?.ownedBy,
          dbId: authContext?.user?.db?.id,
        },
        authContext?.user?.db?.tokens?.stream
      );
      logger("stream", "connectToStream", "StreamAuth Step 2", [
        newClient.user,
        authContext?.user,
      ]);
      setClient(newClient);
    } catch (e) {
      logger(
        "stream",
        "connectToStream",
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
