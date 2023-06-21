import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import MetaCard from "@/components/studio/MetaCard";
import MetaCreateModal from "@/components/studio/MetaCreateModal";
import MetaHorizontalCard from "@/components/studio/MetaHorizontalCard";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { displayImage } from "@/helpers/storage/lightHouseStorage";
import useMetaCreate from "@/hooks/studio/useMetaCreate";
import { fetchAllMetas } from "@/service/StudioService";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavTop from "@/_ui/nav/NavTop";
import WalletButton from "@/components/buttons/WalletButton";
import NavTabs from "@/components/tabs/NavTabs";
import NavButton from "@/components/buttons/NavButton";
import ColoredCard from "@/components/studio/ColoredCard";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ClientCreateModal from "@/components/studio/ClientCreateModal";

const DashBoard = () => {
  const metaModal = useDisclosure();
  const clientModal = useDisclosure();
  const hookMetaCreate = useMetaCreate();
  const $macha = useAuthStore((state: any) => state.macha);
  const $address = useAuthStore((state: any) => state.address);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const $userMetas = useUserStore((state: any) => state.userMetas);
  const [filteredData, setFilteredData] = useState($userMetas);
  const [selectedNavTab, setSelectedNavTab] = useState("Your APIs");
  const [exploreMeta, setExploreMeta] = useState<any>([]);

  const handleFilter = (inputValue: string) => {
    const filtered = $userMetas.filter((item: any) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };

  useEffect(() => {
    setFilteredData($userMetas);
    setIsLoading(false);
  }, [$userMetas]);
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

  const modules = [
    {
      heading: "Macha Ads",
      description: "Access 1:1 encrypted wallet to wallet Messages",
      image: "logo-Macha",
      onClick: () => {},
      bg: "#030d22",
      borderColor: "#011f56",
    },
    {
      heading: "Lens Posts",
      description:
        "Search and interact with your Lens frens’ content on Lens Protocol.",
      image: "logo-Lens",
      onClick: () => {},
      bg: "#061201",
      borderColor: "#1f2b11",
    },
    {
      heading: "Farcaster Network",
      description:
        "Search, connect and interact anyone on decentralized social network",
      image: "logo-Farcaster",
      onClick: () => {},
      bg: "#0d0914",
      borderColor: "#2a184d",
    },
    {
      heading: "Paragraph Blog",
      description: "Explore and subscribe to Web3-powered newsletters.",
      image: "logo-Paragraph.xyz",
      onClick: () => {},
      bg: "#1b1c1e",
      borderColor: "#383838",
    },
    {
      heading: "Mirror Blogs",
      description:
        "Explore, read and distribute content on decentralized publisher.",
      image: "logo-Mirror",
      onClick: () => {},
      bg: "#000c18",
      borderColor: "#00264f",
    },
    {
      heading: "Sound Audio",
      description:
        "Discover new amazing music of your favorite artists/Unearth captivating new music from your beloved artists.",
      image: "logo-Sound.xyz",
      onClick: () => {},
      bg: "#1c1d24",
      borderColor: "#212122",
    },
    {
      heading: "POAP NFTs",
      description: "Mint, drop and collect POAPs, A bookmark to your memories.",
      image: "logo-Poap",
      onClick: () => {},
      bg: "#2b2324",
      borderColor: "#462b2f",
    },

    {
      heading: "MintKudos NFTs",
      description:
        "Create, send, and mint Kudos to celebrate your community’s achievements",
      image: "logo-MintKudos",
      onClick: () => {},
      bg: "#1c2724",
      borderColor: "#2b3c37",
    },
  ];

  const renderBody = () => {
    if (!$address) return null;
    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              width="30%"
              options={dashboardNav}
              gstyle={{ fontSize: `${style.font.h5}` }}
              value={selectedNavTab}
              onChange={setSelectedNavTab}
            />
            <ButtonNative
              size="sm"
              text="Create Client"
              variant="state_brand"
              onClick={() => {
                clientModal.onOpen();
              }}
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

            {/* <ButtonMenu
              text="Sort By"
              options={sortOptions}
              icon={{
                slug: "icon-chevron-down",
                marginLeft: "md",
              }}
            /> */}
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
                {modules.map((item) => {
                  return (
                    <ColoredCard
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
