import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconImage from "@/_ui/icons/IconImage";
import InputLabel from "@/_ui/input/InputLabel";
// import ModalSlider from "@/_ui/modal/ModalSlider";
import ModalSlider from "@/_ui/modal/ModalSlider";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import SearchAndFilter from "@/components/studio/SearchAndFilter";
import useMeta from "@/hooks/studio/useMeta";
import { style } from "@/styles/StyledConstants";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";

const DashBoard = () => {
  const metaModal = useDisclosure();
  const hookMeta = useMeta();

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
      {/* </FlexWindow> */}

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

            <InputLabel elementRef={(element: any) => hookMeta.metaOverview.current['metaName'] = element} inputType="text" labelText="Meta Name" placeholder="Name" />
            <InputLabel elementRef={(element: any) => hookMeta.metaOverview.current['metaDescription'] = element} inputType="text" labelText="Description" placeholder="Description" />
            <InputLabel inputType="file" labelText="Image" placeholder="Image" />

            <Link href="/studio/createMeta" style={{ width: "100%" }}>
              <Button variant="state_brand" width="100%">
                Create Meta
              </Button>
            </Link>
          </FlexColumn>
        }
      />
    </>
  );
};

export default DashBoard;
