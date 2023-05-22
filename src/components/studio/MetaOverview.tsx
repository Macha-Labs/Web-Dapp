import ImageCarousal from "@/_ui/carousal/ImageCarousal";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { Text } from "@chakra-ui/react";
import React from "react";
import MetaCreateInfoCard from "./MetaCreateInfoCard";
import { metaCreateInfoData } from "@/data/constantData";

function MetaOverview() {
  return (
    <>
      <MetaCreateInfoCard data={metaCreateInfoData} />
      <FlexRow>
        <FlexColumn width="60%" vrAlign="flex-start">
          <Text>
            META_node’s automated options market enables best-in-class pricing
            based on realtime supply and demand, providing fully-featured
            peer-to-pool trading and capital efficiency to DeFi options.
            Premia's automated opdemand, providing fully-featured peer-to-pool
            trading and capital efficiency to DeFi options.
          </Text>
          <FlexRow width="50%" hrAlign="flex-start">
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                CREATED
              </Text>
              <Text>20-05-23</Text>
            </FlexColumn>
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                LAST MODIFIED
              </Text>
              <Text>5 min ago</Text>
            </FlexColumn>
          </FlexRow>
          <FlexRow width="50%" hrAlign="flex-start">
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                REQUEST TYPE
              </Text>
              <Text>GRAPHQL</Text>
            </FlexColumn>
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
              >
                NETWORK
              </Text>
              <Text>5 min ago</Text>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
        <FlexColumn width="40%">
          <ImageCarousal />
        </FlexColumn>
      </FlexRow>
    </>
  );
}

export default MetaOverview;
