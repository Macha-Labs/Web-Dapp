import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavLeft from "@/_ui/nav/NavLeft";
import Tabs from "@/_ui/tabs/Tabs";
import { style } from "@/styles/StyledConstants";
import { useState } from "react";
import MCard from "@/_sdk/MCard";
import useNftData from "@/hooks/studio/useNftData";
import { Text } from "@chakra-ui/react";

export default function Explorer() {
  const [selectedNavTab, setSelectedNavTab] = useState("Your Metas");
  const hookNftData = useNftData();
  
  const dashboardNav: any = [
    {
      value: "",
      href: "",
    },
    {
      value: "",
      href: "",
    },
  ];

  const renderBody = () => {
    console.log("exploreMeta", hookNftData);
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
          <FlexRow hrAlign="flex-start">
            <Text fontSize={"lg"} fontWeight={600}>
              Your NFT&apos;s : {hookNftData.totalNfts}
            </Text>
          </FlexRow>
          <FlexRow flexWrap={"wrap"} hrAlign="flex-start">
            {hookNftData.nftData.map((item: any, index: number) => {
              return (
                <MCard
                  key={index}
                  title={item.nftName}
                  image={item.imageUrl}
                  floorPrice={item.floorPrice}
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
      <FlexWindow navLeft={<NavLeft />} rightElem={renderBody()}></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
