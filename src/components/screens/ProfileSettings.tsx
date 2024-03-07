import { dataProfileArr } from "@/data/dataProfile";
import CardPrompt from "@/_ui/cards/CardPrompt";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import TabsNative from "@/_ui/tabs/TabsNative";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProfileSettings() {
  return (
    <>
      <Box height={"80%"}>
        <Heading size="xl">Profile</Heading>
        <FlexRow>
          <TabsNative options={dataProfileArr}></TabsNative>
        </FlexRow>
        <FlexColumn hrAlign="start" width="100%" vrAlign="start">
          <Heading size="md">Connected Accounts</Heading>
        </FlexColumn>
        <CardPrompt />
      </Box>
    </>
  );
}
