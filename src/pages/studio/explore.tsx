import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Nav from "@/_ui/nav/Nav";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import MetaHorizontalCard from "@/components/studio/MetaHorizontalCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { fetchAllMetas } from "@/service/StudioService";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Network, Alchemy } from "alchemy-sdk";
import ColoredCard from "@/components/studio/ColoredCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { Text } from "@chakra-ui/react";

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
      heading: "Macha",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Macha",
      onClick: () => {},
      bg: "#030d22",
      borderColor: "#011f56",
    },
    {
      heading: "Lens",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Lens",
      onClick: () => {},
      bg: "#061201",
      borderColor: "#1f2b11",
    },
    {
      heading: "Farcaster",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Farcaster",
      onClick: () => {},
      bg: "#0d0914",
      borderColor: "#2a184d",
    },
    {
      heading: "Paragraph.xyz",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Paragraph.xyz",
      onClick: () => {},
      bg: "#1b1c1e",
      borderColor: "#383838",
    },
    {
      heading: "Mirror",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Mirror",
      onClick: () => {},
      bg: "#000c18",
      borderColor: "#00264f",
    },
    {
      heading: "Sound.xyz",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Sound.xyz",
      onClick: () => {},
      bg: "#1c1d24",
      borderColor: "#212122",
    },
    {
      heading: "POAP",
      description:
        "sample item description sample item description sample item description sample item description",
      image: "logo-Poap",
      onClick: () => {},
      bg: "#2b2324",
      borderColor: "#462b2f",
    },

    {
      heading: "MintKudos",
      description:
        "sample item description sample item description sample item description sample item description",
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
            <NavTabs
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
      <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
