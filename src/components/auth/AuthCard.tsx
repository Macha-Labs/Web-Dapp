import IconImage from "@/_ui/icons/IconImage";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { AuthContext } from "@/providers/AuthProvider";
import { StyledCard, StyledCol } from "@/styles/StyledComponents";
import { Heading, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import MobileEmptyState from "../MobileEmptyState";

const AuthCard = () => {
  //console.log("Rendering >>>>> AuthCard");
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setMobile(true);
    }
  }, []);
  return mobile == false ? (
    <div className="middle">
      <StyledCard className="w-100 p-4 state_highlight invite">
        <StyledCol className="hr-center">
          <StyledCol className="m-b-2 hr-center">
            <IconImage
              slug="Logo.png"
              size="3xl"
              style={{ className: "m-b-1" }}
            />
            <Heading as="h5" size="lg">
              Log in to MetaWork
            </Heading>
          </StyledCol>
          <StyledCol className="w-60">
            {!authContext.address && <ConnectWalletButton />}
          </StyledCol>
        </StyledCol>
      </StyledCard>
    </div>
  ) : (
    <MobileEmptyState />
  );
};

export default AuthCard;
