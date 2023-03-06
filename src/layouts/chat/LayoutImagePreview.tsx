import { StyledImageView } from "@/styles/StyledComponents";
import { Image, Text } from "@chakra-ui/react";
import { useState } from "react";

const LayoutImagePreview = (props: any) => {
  const [openView, seOpenView] = useState(false);
  return (
    <>
      <StyledImageView onClick={() => seOpenView(!openView)} viewMode={openView}>
        <Image
          src={props.attachment?.thumb_url}
          alt={props.attachment?.name}
          width="500px"
        />
      </StyledImageView>

      <a href={props.attachment?.thumb_url} target="_blank" rel="noreferrer">
        <Text>{props.attachment.name}</Text>
      </a>
    </>
  );
};
export default LayoutImagePreview;