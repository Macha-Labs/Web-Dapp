import Nav from "@/components/nav/Nav";
import { StyledWindow } from "../styles/StyledComponents";
import React from "react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AuthProvider from "@/providers/AuthProvider";
import StreamProvider from "@/providers/StreamProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import User from "./user";
import { IKContext } from "imagekitio-react";
import Chat from "./chat";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/StyledChakraTheme";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Portal",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function Main() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <IKContext urlEndpoint="https://ik.imagekit.io/metaworkLabs">
          <AuthProvider>
            <StreamProvider>
              <ChatProvider>
                <ChakraProvider theme={theme}>
                  <Chat />
                </ChakraProvider>
              </ChatProvider>
            </StreamProvider>
          </AuthProvider>
        </IKContext>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Main;
