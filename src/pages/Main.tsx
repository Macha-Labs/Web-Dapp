import Nav from "@/components/nav/Nav";
import { StyledWindow } from "../styles/StyledComponents";
import React from "react";
import Chat from "./chat/Chat";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AuthProvider from "@/providers/AuthProvider";
import StreamProvider from "@/providers/StreamProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import User from "./User/User";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StreamProvider>
              <ChatProvider>
                <StyledWindow>
                  <div className="left">
                    <Nav />
                  </div>

                  <div className="right">
                    <User />
                  </div>
                </StyledWindow>
              </ChatProvider>
            </StreamProvider>
          </AuthProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Main;
