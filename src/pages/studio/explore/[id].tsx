import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import ContractDeleteModal from "@/components/studio/ContractDeleteModal";
import ContractEditModal from "@/components/studio/ContractEditModal";
import ContractInfoCard from "@/components/studio/ContractInfoCard";
import TxnTable from "@/components/studio/TxnTable";
import useMetaList from "@/hooks/meta/useMetasList";
import useContract from "@/hooks/studio/useContract";
import useContractCreate from "@/hooks/studio/useContractCreate";
import useContractTxn from "@/hooks/studio/useContractTxn";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  metaInfo: any;
};

const Explore = () => {
  const router = useRouter();
  const hookMetasList = useMetaList();
  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetchAll(router.query.id);
    }
  }, [router.query.id]);

  const renderNav = () => {
    return <NavStudio />;
  };

  const renderComponent = () => {
    return (
      <Box paddingTop="10rem">
        <FlexRow flexWrap={"wrap"} width="100%" vrAlign="flex-start">
          {hookMetasList.isLoading && (
            <>
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
            </>
          )}
          {!hookMetasList.isLoading &&
            hookMetasList?.metaAll &&
            hookMetasList?.metaAll?.map((item: any, index: any) => {
              return (
                <MCard
                  title={item?.meta?.data?.modified?.meta_title}
                  key={index}
                  image={item?.meta?.data?.modified?.meta_image}
                  width="30%"
                  description={item?.meta?.data?.modified?.meta_description}
                  onClick={() => {
                    router.push(`/search/meta/${item?._id}`);
                  }}
                />
              );
            })}
        </FlexRow>
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <>
        <>
          {" "}
          <NavBlock
            back={() => {
              router.back();
            }}
            marginTop={style.margin["nav"]}
          >
            <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading fontSize={style.font.h5} className="m-b-0">
                  {"Meta schema"}
                </Heading>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></Box>
              </FlexRow>
              {/* <Tabs
              width="40%"
              options={options}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.font.h5}` }}
            /> */}
            </FlexRow>
          </NavBlock>
          <FlexBody>{renderComponent()}</FlexBody>
        </>
      </>
    );
  };
  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navElem={renderNav()}
    ></FlexWindow>
  );
};

export default Explore;
