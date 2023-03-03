import { StyledProfileBanner, Row, Col } from "@/styles/StyledComponents";
import { Avatar } from "@chakra-ui/react";

const LayoutProfileBanner = (props: any) => {
  return (
    <StyledProfileBanner>
      <Row>
        <Col className="w-100 bannerImage">{/* image banner */}</Col>
      </Row>
      {/* This is the profile picture */}
      <Row className="bannerAvatar hr-center w-100">
        <Avatar  src={props.profile?.image} size="2xl" />
      </Row>
    </StyledProfileBanner>
  );
};

export default LayoutProfileBanner;
