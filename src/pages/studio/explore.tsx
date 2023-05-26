import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Nav from "@/_ui/nav/Nav";
import Navigation from "@/_ui/nav/Navigation";
import MetaCard from "@/components/studio/MetaCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { fetchAllMetas } from "@/service/StudioService";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useState, useEffect } from "react";

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
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };
  useEffect(() => {
    fetchmetas();
  }, []);

  const $userMetas = useUserStore((state: any) => state.userMetas);

  const handleFilter = (inputValue: string) => {
    const filtered = $userMetas.filter((item: any) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setExploreMeta(filtered);
  };
  const renderBody = () => {
    console.log("exploreMeta", exploreMeta);
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
                onChange={(e: any) => handleFilter(e.target.value)}
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
          {exploreMeta.map((item: any, index: number) => {
            return (
              <MetaCard
                key={index}
                image={item?.image ? item?.image : "https://bit.ly/dan-abramov"}
                heading={item?.name}
                description={item?.description}
                // tags={item.tags}
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
