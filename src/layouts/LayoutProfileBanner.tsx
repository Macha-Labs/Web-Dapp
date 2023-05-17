import { StyledProfileBanner, StyledRow, StyledCol } from "@/styles/StyledComponents";
import { Avatar } from "@chakra-ui/react";

const LayoutProfileBanner = (props: any) => {
  return (
    <StyledProfileBanner>
      <StyledRow>
        <StyledCol className="w-100 bannerImage">{/* image banner */}</StyledCol>
      </StyledRow>
      {/* This is the profile picture */}
      <StyledRow className="bannerAvatar hr-center w-100">
        <Avatar  src={props.profile?.image} size="2xl" />
      </StyledRow>
    </StyledProfileBanner>
  );
};

export default LayoutProfileBanner;
