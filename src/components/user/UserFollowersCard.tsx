import { helperIPFS, truncateAddress } from "@/helpers";
import { Row, StyledCard } from "@/styles/StyledComponents";
import { Avatar, AvatarBadge } from "@chakra-ui/react";

const UserFollowersCard = (props: any) => {
  const userData = props.user?.wallet?.defaultProfile;
  return (
    <StyledCard className="border">
      <Row className="vr-center item m-b-0-5">
        <Avatar
          src={userData.picture?.original?.url}
          className="m-r-0-5"
          size="sm"
        >
          <AvatarBadge boxSize="0.7em" bg="green.500" />
        </Avatar>
        {props.user?.lens?.name ? (
          <h6>{props.user?.lens?.name}</h6>
        ) : (
          <h6>{userData.name ? userData.name : userData.handle}</h6>
        )}
      </Row>
    </StyledCard>
  );
};

export default UserFollowersCard;
