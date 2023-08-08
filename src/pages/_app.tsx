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
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {useEffect} from "react"

const { chains, provider } = configureChains(
  [filecoinCalibration],
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
  const router = useRouter()
  useEffect(() => {
    console.log("router",router)
  },[router])
  return (
    <>
      <Head>
        <title>Macha</title>
        <meta name="description" content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Macha - Search Infrastructure for New Internet" />
        <meta property="og:description" content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ik.imagekit.io/macha/share.png" />
        <meta property="og:image:alt" content="Macha.ai" />
        <meta property="og:url" content="https://macha.ai" />
        <meta property="og:site_name" content="Macha" />
        <meta name="twitter:title" content="Macha - Search Infrastructure for New Internet" />
        <meta name="twitter:description" content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains." />
        <meta property="twitter:image" content="https://ik.imagekit.io/macha/share.png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:alt" content="Macha.ai" />
        <meta name="twitter:site" content="@Macha0x" />
        <meta name="twitter:creator" content="@Macha0x" />
        <meta name="twitter:card" content="summary" />
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
