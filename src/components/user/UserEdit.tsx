import { setMetaData } from "@/helpers/lens/lens";
import useLensProfileUpdate from "@/hooks/lens/useLensProfileUpdate";
import LayoutCardPannel from "@/layouts/LayoutCardPannel";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { Row } from "@/styles/StyledComponents";
import { Avatar, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const UserEdit = () => {
  const hookLensProfileUpdate = useLensProfileUpdate();

  const handleChange = (e: any, val: any) => {
    console.log(e, val, "eeeeeeee");
    hookLensProfileUpdate.setUserLens({
      ...hookLensProfileUpdate?.userLens,
      [val]: e,
    });
    console.log(hookLensProfileUpdate?.userLens, "hookLensProfileUpdate");
  };

  console.log("USerEdit reporting ser");

  const data = [
    {
      label: "Name",
      value: hookLensProfileUpdate?.userLens?.name,
      onChange: (e: any) => {
        handleChange(e, "name");
      },
      disabled: false,
    },
    {
      label: "Bio",
      value: hookLensProfileUpdate?.userLens?.bio,
      onChange: (e: any) => {
        handleChange(e, "bio");
      },
      disabled: false,
    },
    {
      label: "Address",
      value: hookLensProfileUpdate?.userLens?.ownedBy,
      onChange: (e: any) => {
        handleChange(e, "ownedBy");
      },
      disabled: true,
    },
    {
      label: "Handle",
      value: hookLensProfileUpdate?.userLens?.handle,
      onChange: (e: any) => {
        handleChange(e, "handle");
      },
      disabled: true,
    },
  ];

  console.log("DATA", hookLensProfileUpdate.userLens);

  return (
    <LayoutCardPannel
      header={
        <Row className="w-100 vr-center hr-between">
          <Heading as="h6" size="sm">
            Edit Profile
          </Heading>
          <Button
            onClick={() =>
              hookLensProfileUpdate.updateLensProfile().then((res: any) => {
                console.log(res, "res");
              })
            }
            variant="state_brand"
            size="sm"
          >
            Save Profile
          </Button>
        </Row>
      }
    >
      <Row className="hr-center w-100 m-b-1">
        <Avatar size="2xl" src={hookLensProfileUpdate?.userLens?.image} />
      </Row>
      <LayoutInputs data={data.slice(0, 2)} style={{ class: "m-b-1" }} />
      <LayoutInputs data={data.slice(2, 4)} style={{ class: "m-b-1" }} />
      <LayoutInputs data={data.slice(4)} style={{ class: "m-b-1" }} />
    </LayoutCardPannel>
  );
};
export default UserEdit;
