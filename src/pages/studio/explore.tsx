import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import { fetchAllMetas } from "@/service/MetaService";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import ColoredCard from "@/components/cards/ColoredCard";
import { exploreModules } from "@/data/studio/constant";
import useAlchemy from "@/hooks/studio/useAlchemy";
import { Text } from "@chakra-ui/react";

export default function Explore() {
  const hookAlchemy = useAlchemy();
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Your Metas");

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

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };

  useEffect(() => {
    fetchmetas();
    hookAlchemy.alchemyData();
  }, []);

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
            {exploreModules.map((item: any, index: number) => {
              return (
                <ColoredCard
                  key={index}
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
