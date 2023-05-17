import { helperIPFS, truncateAddress } from "@/helpers";
import { StyledRow, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge, useDisclosure } from "@chakra-ui/react";

const UserCard = ({user}: any) => {
  
  return (
    <StyledCard
      className="state_hover"
    >
      <StyledRow className="vr-center item m-b-0-5">
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
      </StyledRow>
    </StyledCard>
  );
};

export default UserCard;
