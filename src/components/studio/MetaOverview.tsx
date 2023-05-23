import ImageCarousal from "@/_ui/carousal/ImageCarousal";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { Text } from "@chakra-ui/react";
import React from "react";
import MetaCreateInfoCard from "./MetaCreateInfoCard";
import { metaCreateInfoData } from "@/data/constantData";

type Props = {
  metaInfo: any;
};

function MetaOverview({ metaInfo }: Props) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = Date.parse(metaInfo.state.updatedAt);
  let updatedat = new Date(date);
  let date2 = Date.parse(metaInfo.state.createdAt);
  let createdat = new Date(date2);
  return (
    <>
      <MetaCreateInfoCard data={metaInfo} />
      <FlexRow>
        <FlexColumn width="60%" vrAlign="flex-start">
          <Text>{metaInfo.description}</Text>
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
              <Text>{createdat.toLocaleDateString()}</Text>
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
              <Text>{updatedat.toLocaleDateString()}</Text>
            </FlexColumn>
          </FlexRow>
          {/* <FlexRow width="50%" hrAlign="flex-start">
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
          </FlexRow> */}
        </FlexColumn>
        <FlexColumn width="40%">
          <ImageCarousal />
        </FlexColumn>
      </FlexRow>
    </>
  );
}

export default MetaOverview;
