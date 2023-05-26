import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import ModalSlider from "@/_ui/modal/ModalSlider";
import TagNative from "@/_ui/tag/TagNative";
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

function MetaTagFilter() {
  const filterModal = useDisclosure();
  return (
    <>
      <ButtonNative
        text="Filter"
        variant="state_brand"
        onClick={() => {
          filterModal.onOpen();
        }}
      />
      <ModalSlider
        event={filterModal}
        size="md"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Filter By</Text>
            <IconImage
              slug="icon-close"
              onClick={() => filterModal.onClose()}
            />
          </FlexRow>
        }
        children={
          <FlexColumn width="100%">
            <FlexColumn width="100%" vrAlign="flex-start" padding="10px 0px">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading
                  as="h6"
                  size="sm"
                  className="m-b-1"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                >
                  Access
                </Heading>
                <IconImage slug="icon-chevron-down" />
              </FlexRow>
              <FlexRow>
                <TagNative
                  value="Public"
                  margin="0px 10px"
                  variant="state_brand"
                  close={true}
                />
                <TagNative
                  value="Public"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
                <TagNative
                  value="Public"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
              </FlexRow>
            </FlexColumn>

            <FlexColumn width="100%" vrAlign="flex-start" padding="10px 0px">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading
                  as="h6"
                  size="sm"
                  className="m-b-1"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                >
                  Request Type
                </Heading>
                <IconImage slug="icon-chevron-down" />
              </FlexRow>
              <FlexRow>
                <TagNative
                  value="GraphQL"
                  variant="state_brand"
                  close={true}
                  margin="0px 10px"
                />
                <TagNative
                  value="GraphQL"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
                <TagNative
                  value="GraphQL"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
              </FlexRow>
            </FlexColumn>

            <FlexColumn width="100%" vrAlign="flex-start" padding="10px 0px">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading
                  as="h6"
                  size="sm"
                  className="m-b-1"
                  bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                  bgClip="text"
                >
                  Network
                </Heading>
                <IconImage slug="icon-chevron-down" />
              </FlexRow>
              <FlexRow>
                <TagNative
                  value="Ethereum"
                  margin="0px 10px"
                  variant="state_brand"
                  close={true}
                />
                <TagNative
                  value="Ethereum"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
                <TagNative
                  value="Ethereum"
                  margin="0px 10px"
                  variant="state_xmtp"
                  close={true}
                />
              </FlexRow>
            </FlexColumn>

            <ButtonNative variant="state_brand" width="100%" size="lg">
              Done
            </ButtonNative>
          </FlexColumn>
        }
      />
    </>
  );
}

export default MetaTagFilter;
