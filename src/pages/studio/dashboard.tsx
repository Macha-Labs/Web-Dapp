import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ColoredCard from "@/components/studio/ColoredCard";
import MetaCard from "@/components/studio/MetaCard";
import MetaHorizontalCard from "@/components/studio/MetaHorizontalCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { dashboardModules } from "@/data/studio/constant";
import { displayImage } from "@/helpers/storage/lightHouseStorage";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { fetchAllMetas } from "@/service/studio/MetaService";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const metaModal = useDisclosure();
  const clientModal = useDisclosure();
  const hookMetaCreate = useMetaCreate();

  const $macha = useAuthStore((state: any) => state.macha);
  const $address = useAuthStore((state: any) => state.address);
  const $userMetas = useUserStore((state: any) => state.userMetas);
  const $userApis = useUserStore((state: any) => state.userApis);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState($userMetas);
  const [selectedNavTab, setSelectedNavTab] = useState("Your APIs");
  const [exploreMeta, setExploreMeta] = useState<any>([]);

  const handleFilter = (inputValue: string) => {
    const filtered = $userApis.filter((item: any) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };

  useEffect(() => {
    setFilteredData($userApis);
    setIsLoading(false);
  }, [$userApis]);

  useEffect(() => {
    fetchmetas();
  }, []);

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
      value: "Your APIs",
      href: "",
    },
    {
      value: "Explore APIs",
      href: "",
    },
    {
      value: "Explore Modules",
      href: "",
    },
  ];

  const renderBody = () => {
    if (!$address) return null;
    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              // width="30%"
              options={dashboardNav}
              gstyle={{ fontSize: `${style.font.h5}` }}
              value={selectedNavTab}
              onChange={setSelectedNavTab}
            />
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <FlexRow
            width="100%"
            hrAlign="space-between"
            paddingTop="2xl"
            marginTop={"subnav"}
          >
            <FlexRow
              width="100%"
              hrAlign="flex-start"
              // marginTop={style.margin.nav}
            >
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
            <ButtonNative
              size="sm"
              text="Create API"
              variant="state_brand"
              onClick={() => {
                metaModal.onOpen();
              }}
            />
          </FlexRow>
          {selectedNavTab == "Your APIs" && (
            <>
              <FlexRow
                hrAlign="flex-start"
                width="100%"
                flexWrap="wrap"
                // padding={style.body.padding}
                paddingTop="md"
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
                              item.state.status == "PENDING"
                                ? item._id
                                : item.id
                            }`
                          );
                        }}
                      />
                    );
                  })}
              </FlexRow>
            </>
          )}
          {selectedNavTab == "Explore APIs" && (
            <>
              <FlexRow
                hrAlign="flex-start"
                width="100%"
                flexWrap="wrap"
                paddingTop="md"
                // padding={style.body.padding}
              >
                {exploreMeta.map((item: any, index: number) => {
                  return (
                    <MetaHorizontalCard
                      key={index}
                      image={
                        item?.image ? item?.image : "https://bit.ly/dan-abramov"
                      }
                      heading={item?.name}
                      description={item?.description}
                      // tags={item.tags}
                      onCardClick={() => {
                        router.push({
                          pathname: "/studio/meta/[id]",
                          query: {
                            id:
                              item.state.status == "PENDING"
                                ? item._id
                                : item.id,
                          },
                        });
                      }}
                    />
                  );
                })}
              </FlexRow>
            </>
          )}
          {selectedNavTab == "Explore Modules" && (
            <>
              <FlexRow hrAlign="flex-start" marginTop={"md"} flexWrap="wrap">
                {dashboardModules.map((item: any, index: number) => {
                  return (
                    <ColoredCard
                      key={index}
                      heading={item.heading}
                      description={item.description}
                      image={item.image}
                      bg={item.bg}
                      borderColor={item.borderColor}
                    />
                  );
                })}
              </FlexRow>
            </>
          )}
        </FlexBody>
        {/* </FlexWindow> */}
        <ApiCreateModal modal={metaModal} hookMetaCreate={hookMetaCreate} />
      </>
    );
  };

  const renderNav = () => {
    return (
      <NavTop
        rightElem={
          <FlexRow width="fit-content">
            <NavButton
              marginRight={style.margin["sm"]}
              marginLeft={style.margin["sm"]}
            />
            {$address ? <WalletButton /> : <ConnectWalletButton />}
          </FlexRow>
        }
      />
    );
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default DashBoard;
