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
import ColoredCard from "@/components/cards/ColoredCard";
import MetaCard from "@/components/cards/MetaCard";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
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
  const hookMetaCreate = useMetaCreate();

  const $macha = useAuthStore((state: any) => state.macha);
  const $address = useAuthStore((state: any) => state.address);
  const $userMetas = useUserStore((state: any) => state.userMetas);
  const $userApis = useUserStore((state: any) => state.userApis);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<any>($userMetas);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Your APIs");
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
      value: "Explore",
      href: "",
    },
  ];

  const renderAPIs = () => {
    return (
      <>
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
                        cardView="horizontal"
                        heading={item.name}
                        description={item.description}
                        tags={item.tags ? item?.tags : ""}
                        onCardClick={() => {
                          router.push(
                            {
                              pathname: "/data-studio/api/[id]",
                              query: {
                                id:
                                  item.state.status == "PENDING"
                                    ? item._id
                                    : item.id,
                              },
                            },
                            `/data-studio/api/${
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
      </>
    )
  }

  const renderExplore = () => {
    return (
      <> 
         {selectedNavTab == "Explore" && (
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
      </>
    )
  }

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
          {renderAPIs()}
          {renderExplore()}
        </FlexBody>
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
