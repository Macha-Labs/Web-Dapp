import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Nav from "@/_ui/nav/Nav";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { style } from "@/styles/StyledConstants";

export default function DashBoard() {
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
  const exploreMetaOptions = [
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
  const renderBody = () => {
    return (
      // <FlexWindow>
      <FlexBody>
        <FlexRow
          width="100%"
          hrAlign="space-between"
          // padding={`${style.padding.md} 0rem`}
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
          {exploreMetaOptions.map((item, index) => {
            return (
              <MetaCard
                key={index}
                image={item.image}
                heading={item.heading}
                description={item.description}
                tags={item.tags}
                cardDirection="row"
                width="30%"
                height="200px"
              />
            );
          })}
        </FlexRow>
      </FlexBody>
      // </FlexWindow>
    );
  };
  return (
    <>
      <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
