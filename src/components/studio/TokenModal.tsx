import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexRow from "@/_ui/flex/FlexRow";
import InputSearch from "@/_ui/input/InputSearch";
import ModalWindow from "@/_ui/modal/ModalWindow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text } from "@chakra-ui/react";
import TokenRow from "./TokenRow";
import useAlchemy from "@/hooks/studio/useAlchemy";

type Props = {
  modal: any;
  hookAlchemy: any;
};

const TokenModal = ({ modal, hookAlchemy }: Props) => {
  return (
    <ModalWindow
      event={modal}
      size="2xl"
      header={
        <>
          <Box
            style={{
              position: "absolute",
              right: "-1rem",
              top: "-0.5rem",
            }}
          >
            <Image
              src={GlobalIcons["icon-close"]}
              onClick={() => {
                modal.onClose();
              }}
              alt=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "7px",
                cursor: "pointer",
                width: "2rem",
                height: "2rem",
                background: `${style.icon.bg.default}`,
                borderRadius: "50%",
                boxShadow: `${style.icon.shadow.default}`,
              }}
            />
          </Box>
          <FlexRow hrAlign="space-between">
            <Text
              mb={0}
              fontSize={style.font.h4}
              fontWeight={style.fontWeight.dark}
            >
              My Tokens
            </Text>
            <FlexRow width="50%">
              <InputSearch
                height="40px"
                placeholder="Search Token"
                marginRight={style.margin.sm}
              />
              <ButtonMenu
                width="40%"
                size={"lg"}
                text="Highest"
                icon={{
                  slug: "icon-chevron-down",
                  style: "",
                }}
                options={[]}
              />
            </FlexRow>
          </FlexRow>
        </>
      }
    >
      <Box marginTop="1rem" marginBottom={style.margin.md} overflowY="scroll" height="20rem">
        {hookAlchemy.nftByAddress.map((nft: any, index: any) => {
          return <TokenRow key={index} title={nft.contract.name} symbol={nft.contract.symbol} tokenId={nft.tokenId} type={nft.contract.tokenType} />
        })}
      </Box>
    </ModalWindow>
  );
};
export default TokenModal;
