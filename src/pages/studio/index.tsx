import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ContractCreateEditModal from "@/components/studio/ContractCreateEditModal";
import HomeDev from "@/components/studio/HomeDev";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useMacha from "@/hooks/studio/useMacha";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

const Home = () => {
  const hookMacha = useMacha();
  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const dashboardNav: any = [
    {
      value: "Home",
      href: "/studio",
    },
    {
      value: "Contracts",
      href: "/contracts",
    },
    // {
    //   value: "Functions",
    //   href: "",
    // },
  ];

  useEffect(() => {
    const network = async () => {
      switchNetwork?.(314159);
    };
    chain?.name == "Filecoin Calibration chaindata" ? () => {} : network();
  }, [chain]);

  const $address = useAuthStore((state: any) => state.address);

  const renderHome = () => {
    return <>{<HomeDev />}</>;
  };

  const renderBody = () => {
    return (
      <>
        <NavBlock marginTop={style.margin["nav"]}>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow hrAlign="flex-start" vrAlign="center">
              <Tabs
                width="fit-content"
                options={dashboardNav}
                gstyle={{ fontSize: `${style.font.h5}` }}
                value={"Home"}
                onChange={() => {}}
              />
            </FlexRow>
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>{renderHome()}</Box>
        </FlexBody>
        <ContractCreateEditModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
          isEdit={false}
        />
        <ApiCreateModal modal={metaModal} />
      </>
    );
  };

  const renderNav = () => {
    return <NavStudio />;
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navTop={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};
export default Home;
