import Nav from "@/components/nav/Nav";
import AuthProvider from "@/providers/AuthProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import StreamProvider from "@/providers/StreamProvider";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { StyledWindow } from "../styles/StyledComponents";
import Chat from "./chat/Chat";

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
                  <Chat />
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
