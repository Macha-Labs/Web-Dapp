import FlexRow from "@/_ui/flex/FlexRow";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Image } from "@chakra-ui/react";
import CreatorCard from "../cards/CreatorCard";
import NftCard from "../cards/NftCard";

type Props = {
  modal: any;
  hookCreatorCreate: any;
};

const CreatorModal = ({ modal, hookCreatorCreate }: Props) => {
  return (
    <ModalWindow event={modal} size="6xl">
      {/* <NftCard
        heading="Rules on how a"
        subHeading="Quest Reward is calculated ?"
        state={false}
        // image="./assets/No_NFT_Claimed_Right.png"
        image="./assets/Quest_Rules_Right.png"
      /> */}
      <NftCard
        heading="Claim NFT"
        subHeading="Own your Macha Profile"
        state={true}
        image="./assets/No_NFT_Claimed_Right.png"
      />
      {/* <CreatorCard modal={modal} /> */}
    </ModalWindow>
  );
};

export default CreatorModal;
