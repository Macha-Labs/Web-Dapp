import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import chains from "@/data/network";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Box, Divider, Image, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  data?: any;
};

function ContractInfoCard({ data }: Props) {
  console.log("metadata", data);
  const toast = useToast();
  const router = useRouter();

  return (
    <CardNative>
      <FlexRow width="100%">
        <FlexColumn width="28%" vrAlign="flex-start" marginRight={"md"}>
          <Image
            style={{
              borderRadius: style.card.borderRadius.image,
              height: "15rem",
              width: "15rem",
            }}
            alt="contract-info"
            src={
              data?.image
                ? data?.image
                : "https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826"
            }
          />
        </FlexColumn>
        <FlexColumn width="100%" hrAlign="flex-start" vrAlign="flex-start">
          <FlexRow vrAlign="center" width="fit-content">
            <Text className="m-b-0 me-2" fontSize={"4xl"} fontWeight={700}>
              {data?.name}
            </Text>
          </FlexRow>
          <Text className="m-b-0">{data?.description}</Text>
          <Divider borderColor="#004ad9" />
          <FlexRow width="100%" hrAlign="space-between">
            <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
              <Text fontWeight={700} className="m-b-0-5">
                Contract Address
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Image
                  src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826"
                  marginRight={"10px"}
                  alt="avatar"
                />
                <Text className="m-b-0">{truncateAddress(data?.address)}</Text>
                <IconBase
                  slug="icon-copy"
                  style={{ marginLeft: "sm" }}
                  onClick={() => {
                    navigator.clipboard.writeText(data?.address);
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
                Owner
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{truncateAddress(data?.owner)}</Text>
                <IconBase
                  slug="icon-copy"
                  style={{ marginLeft: "sm" }}
                  onClick={() => {
                    navigator.clipboard.writeText(data?.owner);
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
                Chain ID
              </Text>
              <FlexRow vrAlign="center" hrAlign="flex-start">
                <Text className="m-b-0">{data?.chain_id}</Text>
                <IconBase
                  slug="icon-copy"
                  style={{ marginLeft: "sm" }}
                  onClick={() => {
                    navigator.clipboard.writeText(data?.chain_id);
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
                Chain
              </Text>
              <Box onClick={() => router.push(`/search/network/${data?.chain_id}`)} cursor="pointer" _hover={{textDecoration: "underline"}}>
                <FlexRow vrAlign="center" hrAlign="flex-start">
                  <Text className="m-b-0">{chains[data?.chain_id]?.chainName}</Text>
                  <IconBase slug={chains[data?.chain_id]?.chainImage} style={{ marginLeft: "xxs" }} size="md" />
                </FlexRow>
              </Box>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </CardNative>
  );
}

export default ContractInfoCard;
