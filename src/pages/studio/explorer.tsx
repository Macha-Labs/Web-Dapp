import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavLeft from "@/_ui/nav/NavLeft";
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import NavTop from "@/_ui/nav/NavTop";
import MetaCard from "@/components/studio/MetaCard";
import MetaHorizontalCard from "@/components/studio/MetaHorizontalCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { fetchAllMetas } from "@/service/StudioService";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import ColoredCard from "@/components/studio/ColoredCard";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { Text } from "@chakra-ui/react";
import useNftStore from "@/store/useNftStore";
import useNftData from "@/hooks/studio/useNftData";
import MCard from "@/_sdk/MCard";

export default function explorer() {
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

  const [selectedNavTab, setSelectedNavTab] = useState("Your Metas");
  const hookNftData = useNftData();
  // const [totalNfts, setTotalNfts] = useState(0);
  // const [exploreMeta, setExploreMeta] = useState<any>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const { totalNfts } = await useNftData();
  //     setTotalNfts(totalNfts);
  //   }
  //   fetchData();
  // }, []);

  // const fetchmetas = async () => {
  //   const allMetas = await fetchAllMetas();
  //   setExploreMeta(allMetas.data);
  // };
  // useEffect(() => {
  //   fetchmetas();
  // }, []);

  // const $userMetas = useUserStore((state: any) => state.userMetas);

  // const router = useRouter();

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
              Your NFT's : {hookNftData.totalNfts}
            </Text>
          </FlexRow>
          <FlexRow flexWrap={"wrap"} hrAlign="flex-start">
            {hookNftData.nftData.map((item: any) => {
              return (
                <MCard
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
      <FlexWindow leftElem={<NavLeft />} rightElem={renderBody()}></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
