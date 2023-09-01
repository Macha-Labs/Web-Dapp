import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexRow from "@/_ui/flex/FlexRow";
import InputSearch from "@/_ui/input/InputSearch";
import ModalWindow from "@/_ui/modal/ModalWindow";
import TableNative from "@/_ui/table/TableNative";
import { truncateAddress } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Avatar, Box, Image, MenuButton, Td, Text, Th } from "@chakra-ui/react";
import TokenRow from "./TokenRow";

type Props = {
  modal: any;
};

const TokenModal = ({ modal }: Props) => {
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
      <Box marginTop="1rem" marginBottom={style.margin.md}>
        <TokenRow />
        <TokenRow />
        <TokenRow />
      </Box>
    </ModalWindow>
  );
};
export default TokenModal;
