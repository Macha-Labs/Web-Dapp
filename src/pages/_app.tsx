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
import Script from "next/script";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, filecoinCalibration } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [filecoinCalibration],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "MetaWork",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  console.log("Rendering >>>>> APP");
  return (
    <>
      <Head>
        <title>Macha</title>
        <meta property="og:title" content="Macha" />
        <meta name="twitter:site" content="@Macha0x" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="http://app.macha.ai/studio/data/home" />
        <meta name="description" content="Building Interoperable Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:description" content="Building Interoperable Web" />
        <meta property="og:image" content="https://ik.imagekit.io/macha/Landing%20page/home/Landing%20Page%20Preview%20-%20V1.svg?updatedAt=1690804157282" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  <Component {...pageProps} />
                </ChakraProvider>
              </DataProvider>
            </AuthProvider>
          </IKContext>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
