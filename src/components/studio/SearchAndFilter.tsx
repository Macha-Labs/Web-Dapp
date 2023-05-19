import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import IconImage from "@/_ui/icons/IconImage";
import InputSearch from "@/_ui/input/InputSearch";
import ModalSlider from "@/_ui/modal/ModalSlider";
import TagNative from "@/_ui/tag/TagNative";
import { StyledCol } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

export default function SearchAndFilter() {
  const filterModal = useDisclosure();
  const sortOptions = [
    {
      value: "A-Z",
      onClick: () => {},
    },
    {
      value: "Z-A",
      onClick: () => {},
    },
    {
      value: "Last Created",
      onClick: () => {},
    },
    {
      value: "Last Modified",
      onClick: () => {},
    },
  ];

  return (
    <>
      <FlexRow
        width="100%"
        hrAlign="space-between"
        padding={`${style.padding.md} 0rem`}
      >
        <FlexRow width="100%" hrAlign="flex-start">
          <FlexRow width="50%">
            <InputSearch
              size="lg"
              placeholder="Search Studio"
              icon={{ slug: "icon-search" }}
              marginRight={style.card.margin.default}
            />
          </FlexRow>
          <ButtonNative
            text="Filter"
            variant="state_brand"
            onClick={() => {
              filterModal.onOpen();
            }}
          />
        </FlexRow>
        <ButtonMenu
          text="Sort By"
          options={sortOptions}
          icon={{
            slug: "icon-chevron-down",
          }}
        />
      </FlexRow>
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
            <Button variant="state_brand" width="100%" marginTop={"10px"}>
              Done
            </Button>
          </FlexColumn>
        }
      />
    </>
  );
}
