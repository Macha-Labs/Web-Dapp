import { StyledProfileBanner, Row, Col } from "@/styles/StyledComponents";
import { Avatar } from "@chakra-ui/react";

const LayoutProfileBanner = (props: any) => {
  return (
    <StyledProfileBanner>
      <Row>
        <Col className="w-100 bannerImage">{/* image banner */}</Col>
      </Row>
      {/* This is the profile picture */}
      <Avatar className="bannerAvatar" src={props.profile?.image} size="2xl" />
    </StyledProfileBanner>
  );
};

export default LayoutProfileBanner;
