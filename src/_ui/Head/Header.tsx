import Head from "next/head";
import React from "react";

const Header = (props: any) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta
        name="description"
        content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:title"
        content="Macha - Search Infrastructure for New Internet"
      />
      <meta
        property="og:description"
        content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains."
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/assets/share.png" />
      <meta property="og:image:alt" content="Macha.ai" />
      <meta property="og:url" content="https://macha.ai" />
      <meta property="og:site_name" content="Macha" />
      <meta
        name="twitter:title"
        content="Macha - Search Infrastructure for New Internet"
      />
      <meta
        name="twitter:description"
        content="Search Infrastructure to search anything from apps and NFTs to protocols and content across multiple chains."
      />
      <meta property="twitter:image" content="/assets/share.png" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:image:alt" content="Macha.ai" />
      <meta name="twitter:site" content="@Macha0x" />
      <meta name="twitter:creator" content="@Macha0x" />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
