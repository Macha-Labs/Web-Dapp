import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { logger } from "../helpers/logger";
import useLensAuth from "../hooks/lens/useLensAuth";
import { User$, UserDb$ } from "../schema/user";
// import { removeAsyncData } from "../service/AsyncStorageService";
import { useAccount, useDisconnect } from "wagmi";
import { putStreamToken } from "../service/StreamService";
import { findOrCreateUser } from "../service/UserService";
import useLensProfile from "@/hooks/lens/useLensProfile";
import { fetchSigner } from "@wagmi/core";
import { Client, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";

export type AuthContextType = {
  signer: any | undefined;
  address: any | undefined;
  connectWallet: () => void;
  connectLens: (param?: any) => void;
  disconnectWallet: () => void;
  user: any | undefined;
  setUser: (param: any) => void;
  isConnected: boolean | undefined;
  isLoadingLens: boolean | undefined;
  connectXmtp: () => void;
  client: any;
  allConversations: any;
  xmtpClientAddress: any;
  setPeerAddress: Dispatch<SetStateAction<string>>;
  messages: DecodedMessage[];
  fetchXmtpConversation: (peerAddress: any) => void;
  sendXmtpMessage: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  signer: null,
  address: "",
  connectWallet: () => {},
  connectLens: param => {},
  disconnectWallet: () => {},
  user: null,
  setUser: param => {},
  isConnected: false,
  isLoadingLens: false,
  connectXmtp: () => {},
  client: undefined,
  allConversations: undefined,
  xmtpClientAddress: undefined,
  setPeerAddress: () => {},
  messages: [],
  fetchXmtpConversation: (peerAddress: any) => {},
  sendXmtpMessage: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [signer, setSigner] = useState<any>("");
  const [user, setUser] = useState<any>(new User$(null, null, null));
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isLoadingLens, setLoadingLens] = useState<any>(false);
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [client, setClient] = useState<any>();
  const [allConversations, setAllConversations] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [xmtpSign, setXmtpSign] = useState<any>();

  /**
   * @description Initiating Hooks
   *
   *
   **/
  const hookLensProfile = useLensProfile();
  const hookLensAuth = useLensAuth();

  /**
   * @description Internal Function to get user from lens
   *
   *
   **/
  const _fetchUserFromLens = async () => {
    if (!address) {
      logger("auth", "_fetchUserFromLens", "Address not found", [user]);
      return;
    }
    if (address != user.lens.ownedBy) {
      setLoadingLens(true);
      const lensProfile = await hookLensProfile.getOwnedProfiles(address); // getting user lens profile
      try {
        if (lensProfile) {
          const tokens: any | { accessToken: string; refreshToken: string } =
            await hookLensAuth.connectToLens(address);
          logger("auth", "_fetchUserFromLens", "Logging the lens auth tokens", [
            tokens,
          ]);
          setLoadingLens(false);
          if (tokens?.accessToken) {
            user.setLensDirect({
              ...lensProfile,
              accessToken: tokens["accessToken"],
              refreshToken: tokens["refreshToken"],
            });
          } else {
            user.setLensDirect(lensProfile);
          }
        } else {
          throw Error(`Couldn't find Lens Profile with address ${address}`);
        }
      } catch (error) {
        logger(
          "auth",
          "_fetchUserFromLens",
          "Error in fetching userData from Lens",
          [error]
        );
      }
    }
  };

  /**
   * @description Internal Function to get user from DB
   *
   *
   **/
  const _fetchUserFromDB = async () => {
    if (address) {
      // fetching the userData from the Database
      findOrCreateUser({ address: address.toLowerCase() }).then((data: any) => {
        user.setDb(data);
        logger(
          "auth",
          "AuthProvider._fetchUserFromDB",
          "Response from findOrCreateUser",
          [data]
        );
        putStreamToken({ userAddress: address.toLowerCase() }).then(
          (res: any) => {
            logger(
              "auth",
              "useEffect[user.db.id]",
              "response from putStreamToken api",
              [res]
            );
            user.setDb(res);
          }
        );
      });
    }
  };

  /**
   * @description Internal Function to get address from WAGMI
   *
   *
   **/
  const _fetchSignerFromWagmi = async () => {
    setSigner(await fetchSigner());
  };

  /**
   * @description Function to connect to wallet
   *
   *
   **/
  const connectWallet = async () => {
    logger("auth", "connectWallet", "Trigger connectWallet", []);
  };

  /**
   * @description Function to disconnect from wallet
   *
   *
   **/
  const disconnectWallet = async () => {
    disconnect();
  };

  /**
   * @description Function to connect to XMTP to enable messaging
   *
   *
   **/
  useEffect(() => {
    if (xmtpClientAddress) {
      const streamMessages = async () => {
        const newStream = await client.streamMessages();
        for await (const msg of newStream) {
          setMessages(prevMessages => {
            const messages = [...prevMessages];
            messages.unshift(msg);
            return messages;
          });
        }
      };
      streamMessages();
    }
    console.log("first");
  }, [client, xmtpClientAddress, peerAddress]);
  const connectXmtp = async () => {
    const signer = await fetchSigner();
    setXmtpSign(signer);
    const xmtp = await Client.create(signer, { env: "production" });
    const PEER_ADDRESS = "0x937C0d4a6294cdfa575de17382c7076b579DC176"; //bot address
    const conversation = await xmtp.conversations.newConversation(
      peerAddress ? peerAddress : PEER_ADDRESS
    );
    const conversationList = await xmtp.conversations.list();
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });

    setClient(conversation);
    setMessages(messages);
    setXmtpClientAddress(xmtp.address);
    setAllConversations(conversationList);
    console.log(messages, "messages");
    console.log(xmtpClientAddress, xmtp, "client Address");
    // const allConversations = await client.conversations.list();
    console.log("allConversations", await xmtp.conversations.list());
  };

  const fetchXmtpConversation = async (peerAddress: any) => {
    const xmtp = await Client.create(xmtpSign, { env: "production" });
    const conversation = await xmtp.conversations.newConversation(peerAddress);
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });
    setMessages(messages);
  };
  const sendXmtpMessage = async () => {
    await client.send("gm ser");
  };

  useEffect(() => {
    logger("auth", "useEffect", "Portal 1: Current user address", [address]);
    if (address) {
      _fetchSignerFromWagmi();
      _fetchUserFromDB();
    }
  }, [address]);

  useEffect(() => {
    if (user) logger("auth", "useEffect", "Logging user object", [user]);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        signer: signer,
        address: address?.toLowerCase(),
        connectWallet: connectWallet,
        connectLens: _fetchUserFromLens,
        disconnectWallet: disconnectWallet,
        user: user,
        setUser: setUser,
        isConnected: address && user?.lens?.id && user?.db?.id && xmtpClientAddress,
        isLoadingLens: isLoadingLens,
        connectXmtp,
        client,
        allConversations,
        xmtpClientAddress,
        setPeerAddress,
        messages,
        fetchXmtpConversation,
        sendXmtpMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
