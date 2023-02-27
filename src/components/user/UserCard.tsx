import { helperIPFS, truncateAddress } from "@/helpers";
import { Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ModalSlider from "../modal/ModalSlider";
import UserProfile from "./UserProfile";

const UserCard = (props: any) => {
  const modalProfile = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleSelectedUser = (user: any) => {
    modalProfile.onOpen();
    setSelectedUser(user);
  };

  const TemplateProfile = () => {
    console.log(selectedUser, "selectedUser");
    return (
      <ModalSlider event={modalProfile} size="lg">
        <UserProfile user={{ lens: selectedUser }} />
      </ModalSlider>
    );
  };
  return (
    <StyledCard
      onClick={() => {
        handleSelectedUser(props.user);
      }}
      className="border state_hover"
    >
      <Row className="vr-center item m-b-0-5">
        <Avatar
          src={helperIPFS(props?.user?.lens?.image)}
          className="m-r-0-5"
          size="sm"
        >
          <AvatarBadge boxSize="0.7em" bg="green.500" />
        </Avatar>
        {props.user?.lens?.name ? (
          <h6>{props.user?.lens?.name}</h6>
        ) : (
          <h6>{truncateAddress(props.user?.lens?.handle)}</h6>
        )}
      </Row>
      <TemplateProfile />
    </StyledCard>
  );
};

export default UserCard;
