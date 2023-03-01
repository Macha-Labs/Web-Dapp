import { helperIPFS, truncateAddress } from "@/helpers";
import { User$ } from "@/schema/user";
import { Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ModalSlider from "../modal/ModalSlider";
import UserProfile from "./UserProfile";

const UserCard = (props: any) => {
  const modalProfile = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any>();
  const user = new User$(props.user);

  const handleSelectedUser = (user: any) => {
    modalProfile.onOpen();
    setSelectedUser(user);
  };

  const TemplateProfile = () => {
    console.log(selectedUser, "selectedUser");
    return (
      <ModalSlider event={modalProfile} size="lg">
        <UserProfile user={selectedUser} />
      </ModalSlider>
    );
  };
  return (
    <StyledCard
      onClick={() => {
        handleSelectedUser(user);
      }}
      className="border state_hover"
    >
      <Row className="vr-center item m-b-0-5">
        <Avatar
          src={helperIPFS(user?.lens?.image)}
          className="m-r-0-5"
          size="sm"
        >
          <AvatarBadge boxSize="0.7em" bg="green.500" />
        </Avatar>
        {user?.lens?.name ? (
          <h6>{user?.lens?.name}</h6>
        ) : (
          <h6>{truncateAddress(user?.lens?.handle)}</h6>
        )}
      </Row>
      <TemplateProfile />
    </StyledCard>
  );
};

export default UserCard;
