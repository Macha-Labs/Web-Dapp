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
import ApiList from "@/components/studio/ApiList";
import ContractList from "@/components/studio/ContractList";
import MetaTagFilter from "@/components/studio/MetaTagFilter";
import { dashboardModules } from "@/data/studio/constant";
import { displayImage } from "@/helpers/storage/lightHouseStorage";
import useApiCreate from "@/hooks/studio/useApiCreate";
import useTransaction from "@/hooks/studio/useTransaction";
import { fetchAllMetas } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashBoard = () => {

  const $macha = useAuthStore((state: any) => state.macha);
  const $address = useAuthStore((state: any) => state.address)

  const router = useRouter();

  const [selectedNavTab, setSelectedNavTab] = useState<string>("Contracts");
  const [exploreMeta, setExploreMeta] = useState<any>([]);

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();

    setExploreMeta(allMetas.data);
  };



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
      value: "Contracts",
      href: ""
    }
    ,{
      value: "APIs",
      href: "",
    },
  ];

  const renderAPIs = () => {
    return (
      <>
        {selectedNavTab == "APIs" && (
          <ApiList />
        )}
      </>
    );
  };

  const renderContracts = () => {
    return (
      <>
      {selectedNavTab == "Contracts" && (
        <ContractList />
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
    );
  };

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
          {renderContracts()}
          {renderAPIs()}
        </FlexBody>
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
