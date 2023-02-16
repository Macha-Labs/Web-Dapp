import Nav from "@/components/nav/Nav";
import { StyledWindow } from "../styles/StyledComponents";
import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AuthProvider from "@/providers/AuthProvider";
import StreamProvider from "@/providers/StreamProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import User from "./user";

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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default Main;
