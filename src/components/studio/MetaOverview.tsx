import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { setDate } from "@/helpers";
import { Text } from "@chakra-ui/react";
import MetaCreateInfoCard from "./MetaCreateInfoCard";

type Props = {
  metaInfo: any;
};

function MetaOverview({ metaInfo }: Props) {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <MetaCreateInfoCard data={metaInfo} />
      <FlexRow vrAlign="flex-start" marginTop={"xl"}>
        <FlexColumn width="60%" vrAlign="flex-start">
          <Text>{metaInfo?.description}</Text>
          <FlexRow width="50%" hrAlign="flex-start">
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg, #197cec 100%, #004889 100%
                )"
                fontWeight={600}
                bgClip="text"
              >
                CREATED
              </Text>
              <Text>{setDate(metaInfo?.state?.updatedAt)}</Text>
            </FlexColumn>
            <FlexColumn vrAlign="flex-start" width="50%">
              <Text
                bgGradient="linear(
                  100.07deg, #197cec 100%, #004889 100%
                )"
                fontWeight={600}
                bgClip="text"
              >
                LAST MODIFIED
              </Text>
              <Text>{setDate(metaInfo?.state?.createdAt)}</Text>
            </FlexColumn>
          </FlexRow>
        </FlexColumn>
        <FlexColumn width="40%">{/* <ImageCarousal /> */}</FlexColumn>
      </FlexRow>
    </>
  );
}

export default MetaOverview;
