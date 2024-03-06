// import TableNative from "@/_ui/list/Tablenative";
import ModalWindow from "@/_ui/modal/ModalWindow";
import CreatorCard from "../../_external/minter/CreatorCard";

type Props = {
  modal: any;
  hookCreatorCreate: any;
};

const CreatorModal = ({ modal, hookCreatorCreate }: Props) => {
  return (
    <ModalWindow event={modal} size="6xl">
      <CreatorCard modal={modal} />
    </ModalWindow>
  );
};

export default CreatorModal;
