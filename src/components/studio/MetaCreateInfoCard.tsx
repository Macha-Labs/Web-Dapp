import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Divider, Image, Text, useToast } from "@chakra-ui/react";

type Props = {
  data?: any;
};

function MetaCreateInfoCard({ data }: Props) {
  console.log("metadata", data);
  const toast = useToast();
  return (
    <CardNative>
      <FlexRow width="80%">
        <FlexColumn width="28%" vrAlign="flex-start" marginRight={"md"}>
          <Image
            style={{
              borderRadius: style.card.borderRadius.image,
              height: "15rem",
              width: "15rem",
            }}
            alt="Meta-info"
            src={
              data?.image
                ? ` https://gateway.lighthouse.storage/ipfs/${data?.image}`
                : "https://bit.ly/dan-abramov"
            }
          />
        </FlexColumn>
        <FlexColumn width="80%" hrAlign="flex-start" vrAlign="flex-start">
          <FlexRow vrAlign="center" width="fit-content">
            <Text className="m-b-0 me-2" fontSize={"4xl"} fontWeight={700}>
              {data?.name}
            </Text>
            <TagNative
              marginTop="10px"
              variant="state_brand"
              value={data?.state?.status}
              size="sm"
            />
          </FlexRow>
          <Text className="m-b-0">{data?.description}</Text>
          <Divider borderColor="#004ad9" />
          <FlexRow width="100%" hrAlign="space-between">
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                AUTHOR NAME
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Image
                  src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                  marginRight={"10px"}
                  alt="meta-avatar"
                />
                <Text className="m-b-0">{truncateAddress(data?.owner)}</Text>
              </FlexRow>
            </FlexColumn>
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                CID
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{truncateAddress(data?.ipfsCid)}</Text>
                <IconBase
                  slug="icon-copy"
                  style={{ marginLeft: "sm" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npm i @metaworklabs/macha-dev-sdk"
                    );
                    toast({
                      title: "Copied To Clipboard",
                      status: "success",
                      duration: 3000,
                    });
                  }}
                />
              </FlexRow>
            </FlexColumn>
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                API ID
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{data?.id}</Text>
                <IconBase
                  slug="icon-copy"
                  style={{ marginLeft: "sm" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npm i @metaworklabs/macha-dev-sdk"
                    );
                    toast({
                      title: "Copied To Clipboard",
                      status: "success",
                      duration: 3000,
                    });
                  }}
                />
              </FlexRow>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </CardNative>
  );
}

export default MetaCreateInfoCard;