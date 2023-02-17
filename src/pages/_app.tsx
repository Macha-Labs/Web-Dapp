import AuthProvider from "@/providers/AuthProvider";
import { ChatProvider } from "@/providers/ChatProvider";
import StreamProvider from "@/providers/StreamProvider";
import '@/styles/globals.css';
import theme from "@/styles/StyledChakraTheme";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { IKContext } from "imagekitio-react";
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <IKContext urlEndpoint="https://ik.imagekit.io/metaworkLabs">
          <AuthProvider>
            <StreamProvider>
              <ChatProvider>
                <ChakraProvider theme={theme}>
                <Component {...pageProps} />
                </ChakraProvider>
              </ChatProvider>
            </StreamProvider>
          </AuthProvider>
        </IKContext> 
      </RainbowKitProvider>
    </WagmiConfig>
  </>
  )
}
