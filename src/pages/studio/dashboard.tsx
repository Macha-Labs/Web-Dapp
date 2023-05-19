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
import SearchAndFilter from "@/components/studio/SearchAndFilter";

export default function DashBoard() {
  const metaModal = useDisclosure();

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

      <FlexWindow>
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
          <SearchAndFilter />
          <FlexRow
            hrAlign="space-between"
            width="100%"
            flexWrap="wrap"
            // padding={style.body.padding}
          >
            {metaCardOptions.map((item, index) => {
              return (
                <MetaCard
                  image={item.image}
                  heading={item.heading}
                  description={item.description}
                  tags={item.tags}
                  width="20%"
                />
              );
            })}
          </FlexRow>
        </FlexBody>
      </FlexWindow>
      <ModalSlider
        event={metaModal}
        size="md"
        header={
          <FlexRow width="100%" hrAlign="space-between">
            <Text className="mb-0">Create Meta</Text>
            <IconImage slug="icon-close" onClick={() => metaModal.onClose()} />
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
    </>
  );
}
