import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import InputSearch from "@/_ui/input/InputSearch";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import MetaCreateModal from "@/components/studio/MetaCreateModal";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import useMeta from "@/hooks/studio/useMeta";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure } from "@chakra-ui/react";

const DashBoard = () => {
  const metaModal = useDisclosure();
  const hookMeta = useMeta();
  const $macha = useAuthStore((state: any) => state.macha);
  const $userMetas = useUserStore((state: any) => state.userMetas);


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
            <MetaTagFilter />
          </FlexRow>
          <ButtonMenu
            text="Sort By"
            options={sortOptions}
            icon={{
              slug: "icon-chevron-down",
            }}
          />
        </FlexRow>
        <FlexRow
          hrAlign="space-between"
          width="100%"
          flexWrap="wrap"
          // padding={style.body.padding}
        >
          {$userMetas && $userMetas.map((item: any, index: number) => {
            return (
              <MetaCard
                image={item.image ? item.image : "../assets/MetaCard.png"}
                heading={item.name}
                description={item.description}
                tags={item.tags ? item?.tags : ""}
                width="20%"
              />
            );
          })}
        </FlexRow>
      </FlexBody>
      {/* </FlexWindow> */}
      <MetaCreateModal hookMeta={hookMeta} metaModal={metaModal} />
    </>
  );
};

export default DashBoard;
