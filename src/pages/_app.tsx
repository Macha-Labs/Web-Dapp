import Header from "@/_ui/Head/Header";
import { config } from "@/config/index";
import AuthProvider from "@/providers/AuthProvider";
import { DataProvider } from "@/providers/DataProvider";
import theme from "@/styles/StyledChakraTheme";
import "@/styles/globals.css";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { XMTPProvider } from "@xmtp/react-sdk";
import "bootstrap/dist/css/bootstrap.min.css";
import { IKContext } from "imagekitio-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import {
  filecoin,
  filecoinCalibration,
  goerli,
  optimism,
  polygon,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [
    filecoinCalibration,
    mainnet,
    polygon,
    polygonMumbai,
    goerli,
    optimism,
    filecoin,
  ],
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
  //console.log("Rendering >>>>> APP");
  const router = useRouter();
  useEffect(() => {
    //console.log("router", router);
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
        <ThirdwebProvider
          activeChain="ethereum"
          clientId="e7c2ac7e9931a273c03ce80bba2dd8b5"
        >
          <ChakraProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <RainbowKitProvider chains={chains} theme={darkTheme()}>
                <IKContext urlEndpoint="https://ik.imagekit.io/macha">
                  <AuthProvider>
                    <DataProvider>
                      <XMTPProvider>
                        <Component {...pageProps} />
                      </XMTPProvider>
                    </DataProvider>
                  </AuthProvider>
                </IKContext>
              </RainbowKitProvider>
            </ThemeProvider>
          </ChakraProvider>
        </ThirdwebProvider>
      </WagmiConfig>
    </>
  );
}
