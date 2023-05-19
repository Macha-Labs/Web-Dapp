import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconImage from "@/_ui/icons/IconImage";
import InputSearch from "@/_ui/input/InputSearch";
// import ModalSlider from "@/_ui/modal/ModalSlider";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import ModalSlider from "@/_ui/modal/ModalSlider";
import TagNative from "@/_ui/tag/TagNative";

const DashBoard = () => {

  const metaModal = useDisclosure();
  const filterModal = useDisclosure();
  const dashboardNav: any = [
    {
      value: "Live Metas",
      href: "",
    },
    {
      value: "Others",
      href: "",
    },
  ];
  const data = [
    {
      label: "Name",
      value: "",
      onChange: () => {},
    },
  ];
  const data2 = [
    {
      label: "Description",
      value: "",
      onChange: () => {},
    },
  ];
  const data3 = [
    {
      label: "Attach",
      value: "",
      onChange: () => {},
    },
  ];
  const filterOptions = [
    {
      value: "Contract",
      onClick: () => {},
    },
    {
      value: "Rest",
      onClick: () => {},
    },
    {
      value: "Graph",
      onClick: () => {},
    },
  ];

  const metaCardOptions = [
    {
      image: "../assets/MetaCard.png",
      heading: "META_node1",
      description:
        "There is a description here, please mind the gap, something like this and more ...",
      tags: ["tag1", "tag2"],
    },
    {
      image: "../assets/MetaCard.png",
      heading: "META_node2",
      description:
        "There is a description here, please mind the gap, something like this and more ...",
      tags: ["tag1", "tag2"],
    },
    {
      image: "../assets/MetaCard.png",
      heading: "META_node3",
      description:
        "There is a description here, please mind the gap, something like this and more ...",
      tags: ["tag1", "tag2"],
    },
  ];

  return (
    <>
      <Navigation />

      {/* <FlexWindow> */}
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs
              options={dashboardNav}
              gstyle={{ fontSize: `${style.fontH5}`, fontWeight: "600" }}
            />
            <ButtonNative
              text="Create Metas"
              variant="state_brand"
              onClick={() => {
                metaModal.onOpen();
              }}
            />
          </FlexRow>
        </NavBlock>

        <FlexBody>
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
              options={filterOptions}
              icon={{
                slug: "icon-chevron-down",
              }}
            />
          </FlexRow>
          <FlexRow
            hrAlign="space-between"
            width="100%"
            // padding={style.body.padding}
          >
            {metaCardOptions.map((item, index) => {
              return (
                <MetaCard
                  image={item.image}
                  heading={item.heading}
                  description={item.description}
                  tags={item.tags}
                />
              );
            })}
          </FlexRow>
        </FlexBody>
      {/* </FlexWindow> */}

      <ModalSlider
        event={metaModal}
        size="md"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Create Meta</Text>
            <IconImage slug="icon-notification" />
          </FlexRow>
        }
        children={
          <FlexColumn width="100%">
            <StyledCol>
              <Heading as="h6" size="sm">
                Meta Name
              </Heading>
              <StyledCard className="m-b-1">
                <LayoutInputs data={data} style={{ class: "" }} />
              </StyledCard>
            </StyledCol>
            <StyledCol>
              <Heading as="h6" size="sm">
                Description
              </Heading>
              <StyledCard className="m-b-1">
                <LayoutInputs data={data} style={{ class: "" }} />
              </StyledCard>
            </StyledCol>
            <StyledCol>
              <Heading as="h6" size="sm">
                Attach Image for Meta
              </Heading>
              <StyledCard className="m-b-1">
                <LayoutInputs data={data} style={{ class: "" }} />
              </StyledCard>
            </StyledCol>
            <Button variant="state_brand" width="100%">
              Create Meta
            </Button>
          </FlexColumn>
        }
      />
      <ModalSlider
        event={filterModal}
        size="md"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Filter By</Text>
            <IconImage slug="icon-notification" />
          </FlexRow>
        }
        children={
          <FlexColumn width="100%">
            <StyledCol>
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
            </StyledCol>
            <StyledCol>
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
            </StyledCol>
            <StyledCol>
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
            </StyledCol>
            <Button variant="state_brand" width="100%">
              Done
            </Button>
          </FlexColumn>
        }
      />
    </>
  );
}

export default DashBoard;