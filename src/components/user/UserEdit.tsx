import { setMetaData } from "@/helpers/lens/lens";
import useLensProfileUpdate from "@/hooks/lens/useLensProfileUpdate";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { StyledRow } from "@/styles/StyledComponents";
import { Avatar, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const UserEdit = () => {
  const hookLensProfileUpdate = useLensProfileUpdate();

  const handleChange = (e: any, val: any) => {
    hookLensProfileUpdate.setUserLens({
      ...hookLensProfileUpdate?.userLens,
      [val]: e,
    });
  };

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

  return (
    <>
      <StyledRow className="hr-center w-100 m-b-1">
        <Avatar size="2xl" src={hookLensProfileUpdate?.userLens?.image} />
      </StyledRow>
      <LayoutInputs style={{ class: "m-b-1" }} />
      <LayoutInputs style={{ class: "m-b-1" }} />
      <LayoutInputs style={{ class: "m-b-1" }} />
    </>
  );
};
export default UserEdit;
