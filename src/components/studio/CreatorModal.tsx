import FlexRow from "@/_ui/flex/FlexRow";
// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Image } from "@chakra-ui/react";
import CreatorCard from "../cards/CreatorCard";

type Props = {
    modal: any;
    hookCreatorCreate: any
};

const CreatorModal = ({
    modal,
    hookCreatorCreate
}: Props) => {
    return (
        <ModalWindow
            event={modal}
            size="5xl"
        >
            <CreatorCard modal={modal} />
        </ModalWindow>
    );
};

export default CreatorModal;
