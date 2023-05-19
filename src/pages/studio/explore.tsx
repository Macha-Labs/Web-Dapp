import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import SearchAndFilter from "@/components/studio/SearchAndFilter";

export default function DashBoard() {
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
  return (
    <>
      <Navigation />

      <FlexWindow>
        <FlexBody>
          <SearchAndFilter />
          <FlexRow
            hrAlign="space-between"
            width="100%"
            flexWrap="wrap"
            // padding={style.body.padding}
          >
            {exploreMetaOptions.map((item, index) => {
              return (
                <MetaCard
                  image={item.image}
                  heading={item.heading}
                  description={item.description}
                  tags={item.tags}
                  cardDirection="row"
                  width="30%"
                />
              );
            })}
          </FlexRow>
        </FlexBody>
      </FlexWindow>
    </>
  );
}
