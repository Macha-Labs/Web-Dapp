import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import ApiCreateModal from "@/components/studio/ApiCreateModal";
import ContractCreateModal from "@/components/studio/ContractCreateModal";
import ContractList from "@/components/studio/ContractList";
import useContractCreate from "@/hooks/studio/useContractCreate";
import { fetchAllMetas } from "@/service/MetaService";
import { style } from "@/styles/StyledConstants";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashBoard = () => {

  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [isPublisher, setIsPublisher] = useState<any>(false);

  const fetchmetas = async () => {
    const allMetas = await fetchAllMetas();
    setExploreMeta(allMetas.data);
  };
  const contractModal = useDisclosure();
  const metaModal = useDisclosure();
  const hookContractCreate = useContractCreate(contractModal);


  useEffect(() => {
    fetchmetas();
  }, []);

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

  const renderContracts = () => {
    return <>{<ContractList />}</>;
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
                value={"Contracts"}
                onChange={() => {}}
              />
              <Box
                cursor={"not-allowed"}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text
                  className="mb-0"
                  fontSize={style.font.h5}
                  color="#C6C6C6"
                  marginRight={style.margin.xxs}
                >
                  Functions
                </Text>
                <TagNative value="soon" lineHeight="0.8rem" size="sm" />
              </Box>
            </FlexRow>

            {/* {selectedNavTab == "Functions" && (
              <ButtonNative
                size="sm"
                text="Create Function"
                variant="state_brand"
                marginRight="0px"
                paddingLeft="sm"
                paddingRight="sm"
                onClick={() => {
                  metaModal.onOpen();
                }}
              />
            )} */}
          </FlexRow>
        </NavBlock>

        <FlexBody>
          <Box style={{ overflow: "hidden" }}>{renderContracts()}</Box>
        </FlexBody>
        <ContractCreateModal
          modal={contractModal}
          hookContractCreate={hookContractCreate}
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
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default DashBoard;
