import { helperIPFS, truncateAddress } from "@/helpers";
import { Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge } from "@chakra-ui/react";

const UserCard = (props: any) => {
  return (
    <StyledCard className="border state_hover">
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
    </StyledCard>
  );
};

export default UserCard;
