import { DownloadIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import {
  StyledCol,
  StyledIcon,
  StyledRow,
  StyledFileCard,
  StyledIframeView,
} from "@/styles/StyledComponents";
import { truncateString } from "@/helpers";
import IconImage from "@/_ui/icons/IconImage";
import { useState } from "react";

const LayoutFilePreview = (props: any) => {
  const [showMedia, setShowMedia] = useState(false);
  return (
    <>
      <StyledFileCard className="hr-between vr-center">
        <StyledRow
          onClick={() => setShowMedia(!showMedia)}
          className="vr-center"
        >
          <StyledCol className="w-100">
            <StyledRow>
              <IconImage
                path="IconDarkFiles.png"
                style={{ className: "m-r-0-5" }}
              />
              <Text fontSize="md">
                {props.attachment?.name?.length > 30
                  ? truncateString(props.attachment?.name)
                  : props.attachment?.name}
              </Text>
            </StyledRow>
          </StyledCol>
          <StyledCol>
            {showMedia && (
              <StyledIframeView onClick={() => setShowMedia(!showMedia)}>
                <iframe
                  onClick={() => setShowMedia(!showMedia)}
                  src={props.attachment?.thumb_url}
                  allowTransparency={false}
                  allowFullScreen
                />
              </StyledIframeView>
            )}
            <a
              href={props.attachment?.thumb_url}
              target="_blank"
              rel="noreferrer"
              download
            >
              <StyledIcon className="state-2-3">
                <DownloadIcon width="15" height="15" fill="#efefef" />
              </StyledIcon>
            </a>
          </StyledCol>
        </StyledRow>
      </StyledFileCard>
    </>
  );
};

export default LayoutFilePreview;
