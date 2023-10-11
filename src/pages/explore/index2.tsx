import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import ContractList from "@/components/studio/ContractList";
import useMetaList from "@/hooks/meta/useMetasList";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useContractList from "@/hooks/studio/useContractList";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Explore() {
  const hookAlchemy = useAlchemy();
  const router = useRouter();
  const hookMetasList = useMetaList();
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Your Metas");
  const hookContractList = useContractList();

  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetchMore();
    }
  }, []);

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <Box marginTop={style.margin.xxxl}>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Indexing Contracts
            </Heading>
          </FlexColumn>
          <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
            <ContractList data={hookContractList.filterData} />
          </FlexRow>
        </Box>
      </Box>
    );
  };

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader />;
  };

  return (
    <>
      <FlexWindow
        view="both"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
