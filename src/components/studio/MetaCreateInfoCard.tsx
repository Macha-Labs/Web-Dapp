import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import TagNative from "@/_ui/tag/TagNative";
import { truncateAddress } from "@/helpers";
import { Image, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  data?: any;
};

function MetaCreateInfoCard({ data }: Props) {
  console.log("metadata", data);
  return (
    <CardNative>
      <FlexRow width="80%" margin="0 0 20px 0">
        <FlexColumn width="20%" margin="0 20px 0 0">
          <Image src={data.metaImage} />
        </FlexColumn>
        <FlexColumn width="80%" hrAlign="flex-start" vrAlign="flex-start">
          <FlexRow vrAlign="center" width="fit-content">
            <Text className="m-b-0 me-2" fontSize={"2xl"} fontWeight={700}>
              {data.name}
            </Text>
            <TagNative variant="state_brand" value={data.state.status} />
          </FlexRow>
          <Text>{data.description}</Text>
          <FlexRow width="100%" hrAlign="space-between">
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                AUTHOR NAME
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Image src="../assets/Avatar.svg" />
                <Text className="m-b-0">{truncateAddress(data.owner)}</Text>
              </FlexRow>
            </FlexColumn>
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                SLUG
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{truncateAddress(data.ipfsCid)}</Text>
                <IconImage slug="icon-copy" />
              </FlexRow>
            </FlexColumn>
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                META ID
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{data.id}</Text>
                <IconImage slug="icon-copy" />
              </FlexRow>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </CardNative>
  );
}

export default MetaCreateInfoCard;
