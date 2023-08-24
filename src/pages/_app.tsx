import { config } from "@/config/index";
import AuthProvider from "@/providers/AuthProvider";
import { DataProvider } from "@/providers/DataProvider";
import "@/styles/globals.css";
import theme from "@/styles/StyledChakraTheme";
import { ChakraProvider } from "@chakra-ui/react";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IKContext } from "imagekitio-react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import { filecoinCalibration, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";
import Header from "@/_ui/Head/Header";
import { XMTPProvider } from "@xmtp/react-sdk";

const { chains, provider } = configureChains(
  [filecoinCalibration, mainnet, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "MetaWork",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  console.log("Rendering >>>>> APP");
  const router = useRouter();
  useEffect(() => {
    console.log("router", router);
  }, [router]);
  return (
    <>
      <Header title="Macha" />
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${config.GOOGLE_ANALYTICS_ID}`}
        id="googleAnalytics"
      ></Script>
      <Script id="googleAnalyticsConfig">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${config.GOOGLE_ANALYTICS_ID}');`}
      </Script>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <IKContext urlEndpoint="https://ik.imagekit.io/macha">
            <AuthProvider>
              <DataProvider>
                <ChakraProvider theme={theme}>
                  <XMTPProvider>
                    <Component {...pageProps} />
                  </XMTPProvider>
                </ChakraProvider>
              </DataProvider>
            </AuthProvider>
          </IKContext>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
