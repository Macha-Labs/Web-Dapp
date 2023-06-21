import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import { fetchAllMetas } from "@/service/studio/MetaService";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import ColoredCard from "@/components/studio/ColoredCard";
import { Text } from "@chakra-ui/react";
import { Alchemy, Network } from "alchemy-sdk";

export default function DashBoard() {
  const settings = {
    apiKey: "vnA-7rIYqhwArKLfBN_qAu7XCquJ0Sw-", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  const alchemydata = async () => {
    // Print owner's wallet address:
    const ownerAddr = "vitalik.eth";
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

    const nftsForOwner = await alchemy.nft.getNftsForOwner("vitalik.eth");
    console.log("number of NFTs found:", nftsForOwner.totalCount);
    console.log("...");

    // Print contract address and tokenId for each NFT:
    for (const nft of nftsForOwner.ownedNfts) {
      console.log("===");
      console.log("contract address:", nft.contract.address);
      console.log("token ID:", nft.tokenId);
    }
    console.log("===");

    // Fetch metadata for a particular NFT:
    console.log("fetching metadata for a Crypto Coven NFT...");
    const response = await alchemy.nft.getNftMetadata(
      "0x5180db8F5c931aaE63c74266b211F580155ecac8",
      "1590"
    );

    // Uncomment this line to see the full api response:
    console.log(response);

    // Print some commonly used fields:
    console.log("NFT name: ", response.title);
    console.log("token type: ", response.tokenType);
    // console.log("tokenUri: ", response.tokenUri.gateway);
    // console.log("image url: ", response.rawMetadata.image);
    console.log("time last updated: ", response.timeLastUpdated);
    console.log("===");
  };

  const dashboardNav: any = [
    {
      value: "Studio",
      href: "",
    },
    {
      value: "",
      href: "",
    },
  ];

  const [selectedNavTab, setSelectedNavTab] = useState("Your Metas");

  const modules = [
    {
      heading: "Macha Ads",
      description: "Access 1:1 encrypted wallet to wallet Messages",
      image: "logo-Macha",
      onClick: () => {},
      bg: "#030d22",
      borderColor: "#011f56",
    },
    {
      heading: "Lens Posts",
      description:
        "Search and interact with your Lens frens’ content on Lens Protocol.",
      image: "logo-Lens",
      onClick: () => {},
      bg: "#061201",
      borderColor: "#1f2b11",
    },
    {
      heading: "Farcaster Network",
      description:
        "Search, connect and interact anyone on decentralized social network",
      image: "logo-Farcaster",
      onClick: () => {},
      bg: "#0d0914",
      borderColor: "#2a184d",
    },
    {
      heading: "Paragraph Blog",
      description: "Explore and subscribe to Web3-powered newsletters.",
      image: "logo-Paragraph.xyz",
      onClick: () => {},
      bg: "#1b1c1e",
      borderColor: "#383838",
    },
    {
      heading: "Mirror Blogs",
      description:
        "Explore, read and distribute content on decentralized publisher.",
      image: "logo-Mirror",
      onClick: () => {},
      bg: "#000c18",
      borderColor: "#00264f",
    },
    {
      heading: "Sound Audio",
      description:
        "Discover new amazing music of your favorite artists/Unearth captivating new music from your beloved artists.",
      image: "logo-Sound.xyz",
      onClick: () => {},
      bg: "#1c1d24",
      borderColor: "#212122",
    },
    {
      heading: "POAP NFTs",
      description: "Mint, drop and collect POAPs, A bookmark to your memories.",
      image: "logo-Poap",
      onClick: () => {},
      bg: "#2b2324",
      borderColor: "#462b2f",
    },

    {
      heading: "MintKudos NFTs",
      description:
        "Create, send, and mint Kudos to celebrate your community’s achievements",
      image: "logo-MintKudos",
      onClick: () => {},
      bg: "#1c2724",
      borderColor: "#2b3c37",
    },
  ];
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };
  useEffect(() => {
    fetchmetas();
    alchemydata();
  }, []);

  const $userMetas = useUserStore((state: any) => state.userMetas);

  const router = useRouter();

  const handleFilter = (inputValue: string) => {
    const filtered = $userMetas.filter((item: any) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setExploreMeta(filtered);
  };
  const renderBody = () => {
    console.log("exploreMeta", exploreMeta);
    return (
      <>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              width="15%"
              options={dashboardNav}
              gstyle={{ fontSize: `${style.font.h5}` }}
              value={selectedNavTab}
              onChange={setSelectedNavTab}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Text fontSize={"xl"} fontWeight={600} className="m-b-0">
              Use Module
            </Text>
            <Text>
              Create content like posts, places, products, events and more
              across web3 by choosing one of the module from over 8+ protocols.
            </Text>
          </FlexColumn>
          <FlexRow hrAlign="flex-start" marginTop={"md"} flexWrap="wrap">
            {modules.map((item) => {
              return (
                <ColoredCard
                  heading={item.heading}
                  description={item.description}
                  image={item.image}
                  bg={item.bg}
                  borderColor={item.borderColor}
                />
              );
            })}
          </FlexRow>
        </FlexBody>
      </>
    );
  };
  return (
    <>
      <FlexWindow navElem={<NavTop />} bodyElem={renderBody()}></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
