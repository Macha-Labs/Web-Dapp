import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import Nav from "@/_ui/nav/Nav";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import MetaCard from "@/components/studio/MetaCard";
import MetaCreateModal from "@/components/studio/MetaCreateModal";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { displayImage } from "@/helpers/storage/lightHouseStorage";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const metaModal = useDisclosure();
  const hookMeta = useMetaCreate();
  const $macha = useAuthStore((state: any) => state.macha);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const $userMetas = useUserStore((state: any) => state.userMetas);
  const [filteredData, setFilteredData] = useState($userMetas);

  const handleFilter = (inputValue: string) => {
    const filtered = $userMetas.filter((item: any) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData($userMetas);
    setIsLoading(false);
  }, [$userMetas]);

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

  const renderBody = () => {
    return (
      <>
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
                marginLeft: "md",
              }}
            />
          </FlexRow>
          <FlexRow
            hrAlign="space-between"
            width="100%"
            flexWrap="wrap"
            // padding={style.body.padding}
          >
            {isLoading && (
              <FlexRow height="500px">
                <Loader size="lg" />
              </FlexRow>
            )}
            {!isLoading &&
              filteredData &&
              filteredData.map((item: any, index: number) => {
                return (
                  <MetaCard
                    key={index}
                    image={
                      item.image
                        ? displayImage(item.image)
                        : "https://bit.ly/dan-abramov"
                    }
                    heading={item.name}
                    description={item.description}
                    tags={item.tags ? item?.tags : ""}
                    width="20%"
                    onCardClick={() => {
                      router.push(
                        {
                          pathname: "/studio/meta/[id]",
                          query: {
                            id:
                              item.state.status == "PENDING"
                                ? item._id
                                : item.id,
                          },
                        },
                        `/studio/meta/${
                          item.state.status == "PENDING" ? item._id : item.id
                        }`
                      );
                    }}
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

  return <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>;
};

export default DashBoard;
