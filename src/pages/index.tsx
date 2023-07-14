import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import Tabs from "@/_ui/tabs/Tabs";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import WalletButton from "@/components/buttons/WalletButton";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ApiList from "@/components/studio/ApiList";
import ContractList from "@/components/studio/ContractList";
import useApiCreate from "@/hooks/studio/useApiCreate";
import { fetchAllMetas } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashBoard = () => {

  const $address = useAuthStore((state: any) => state.address)
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Contracts");
  const [exploreMeta, setExploreMeta] = useState<any>([]);

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();

    setExploreMeta(allMetas.data);
  };
  const modal = useDisclosure()
  const hookApiCreate = useApiCreate();

  useEffect(() => {
    fetchmetas();
  }, []);


  const dashboardNav: any = [
    {
      value: "Contracts",
      href: ""
    }
    , {
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
            <ButtonNative
              size="sm"
              text="Create Contract"
              variant="state_brand"
              onClick={() => {
                modal.onOpen();
              }}
            />
          </FlexRow>
        </NavBlock>

        <FlexBody>
          {renderContracts()}
          {renderAPIs()}
        </FlexBody>
        <ApiCreateModal modal={modal} hookApiCreate={hookApiCreate} />
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
