import { helperIPFS, truncateAddress } from "@/helpers";
import { Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ModalSlider from "../modal/ModalSlider";
import UserProfile from "./UserProfile";

const UserFollowersCard = (props: any) => {
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
        <UserProfile user={selectedUser} />
      </ModalSlider>
    );
  };

  return (
    <StyledCard
      onClick={() => handleSelectedUser(props.user)}
    >
      <Row className="vr-center item m-b-0-5">
        <Avatar src={props.user?.lens?.image} className="m-r-0-5" size="sm">
          <AvatarBadge boxSize="0.7em" bg="green.500" />
        </Avatar>
        {props.user?.lens?.name ? (
          <h6>{props.user?.lens?.name}</h6>
        ) : (
          <h6>
            {props.user?.name
              ? props.user?.lens?.name
              : props.user?.lens?.handle}
          </h6>
        )}
      </Row>
      <TemplateProfile />
    </StyledCard>
  );
};

export default UserFollowersCard;
