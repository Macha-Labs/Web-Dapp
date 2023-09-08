import FlexRow from "@/_ui/flex/FlexRow";
import TableNative from "@/_ui/table/TableNative";
import chains from "@/data/network";
import useXP from "@/hooks/studio/useXP";
import useAuthStore from "@/store/useAuthStore";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Td, Text, Th } from "@chakra-ui/react";
import { useEffect } from "react";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { projectSlugToLogo } from "@/data/ProjectData";

const UserXpTable = () => {
  const $address = useAuthStore((state: any) => state.address);
  const hookXP = useXP();

  useEffect(() => {
    hookXP._fetch();
  }, []);

  return (
    <Box position="relative" width={"100%"}>
      <>
        <Box
          opacity={!$address ? "0.4" : 1}
          width={"100%"}
          filter={!$address ? "blur(10px)" : ""}
        >
          <TableNative
            height="20rem"
            width={"100%"}
            disabled={!$address}
            overflow={$address && "scroll"}
            theadBackground={style.modal.bg.contractModal}
            theadBottomBorder="none"
            data={hookXP.XPList}
            theadChildren={
              <>
                <Th
                  style={{
                    textAlign: "left",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    color: "#8f8f8f",
                    fontWeight: "500",
                    paddingLeft: `${style.padding.xs}`,
                  }}
                >
                  Activities
                </Th>
                <Th
                  style={{
                    textAlign: "center",
                    fontSize: "1.25rem",
                    textTransform: "capitalize",
                    color: "#8f8f8f",
                    fontWeight: "500",
                  }}
                >
                  <FlexRow>
                    <Text mb={0} color="#8f8f8f" fontWeight="500">
                      XP
                    </Text>
                    <Image src={GlobalIcons["icon-bolt"]} />
                  </FlexRow>
                </Th>
              </>
            }
            tbodyChildren={(item: any, index: any) => {
              return (
                <>
                  <Td
                    style={{ textAlign: "left", padding: `${style.margin.xs}` }}
                  >
                    <FlexRow hrAlign="flex-start">
                      <Image
                        src={GlobalIcons[projectSlugToLogo[item?.project]]}
                        height="2rem"
                        marginRight={style.margin.xs}
                      />
                      <Text fontSize={style.font.h4} mb={0}>
                        {item?.title}
                      </Text>
                    </FlexRow>
                  </Td>
                  <Td
                    style={{
                      textAlign: "center",
                      padding: `${style.padding.xxs}`,
                    }}
                  >
                    <FlexRow>
                      <Text mb={0}>{item?.points}</Text>
                      <Image src={GlobalIcons["icon-bolt"]} />
                    </FlexRow>
                  </Td>
                </>
              );
            }}
          />
        </Box>
        {!$address && (
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "30%",
            }}
          >
            <ConnectWalletButton />
          </Box>
        )}
      </>
    </Box>
  );
};
export default UserXpTable;
