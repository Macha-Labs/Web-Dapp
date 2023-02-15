import Nav from "@/components/nav/Nav";
import { StyledWindow } from "@/styles/StyledComponents";
import React from "react";
import Chat from "./chat/Chat";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AuthProvider from "@/providers/AuthProvider";

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
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            <Nav />
            <ConnectButton />
            <Chat />
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default Main;
