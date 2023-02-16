import { DownloadIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { StyledIcon, Row, StyledFileCard } from "@/styles/StyledComponents";
import { truncateString } from "@/helpers";

const LayoutFilePreview = props => {
  return (
    <>
      <StyledFileCard className="hr-between vr-center">
        <Row className="vr-center">
          {/* <FileIcon width="20" height="20" fill="#efefef" className="m-r-1" /> */}
          <Text fontSize="md">
            {props.attachment?.name?.length > 30
              ? truncateString(props.attachment?.name)
              : props.attachment?.name}
          </Text>
        </Row>
        <StyledIcon>
          <a
            href={`https://ipfs.io/ipfs/${props.attachment?.thumb_url}/${props.attachment?.name}`}
            target="_blank"
            download
          >
            <StyledIcon className="state-2-3">
              <DownloadIcon width="15" height="15" fill="#efefef" />
            </StyledIcon>
          </a>
        </StyledIcon>
      </StyledFileCard>
    </>
  );
};

export default LayoutFilePreview;
