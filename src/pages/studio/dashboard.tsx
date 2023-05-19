import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import { style } from "@/styles/StyledConstants";

const DashBoard = () => {

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

      <FlexWindow>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs
              options={dashboardNav}
              gstyle={{ fontSize: `${style.fontH5}`, fontWeight: "600" }}
            />
            <ButtonNative text="Create Metas" variant="state_brand" />
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
              <ButtonMenu
                text="Filter By"
                options={filterOptions}
                icon={{
                  slug: "icon-chevron-down",
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
      </FlexWindow>
    </>
  );
}

export default DashBoard;