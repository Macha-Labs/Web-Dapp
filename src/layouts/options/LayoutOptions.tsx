import IconImage from "@/_ui/icons/IconImage";
import { StyledOptionsCard, StyledRow } from "@/styles/StyledComponents";
import { Text } from "@chakra-ui/react";

const LayoutOptions = (props: any) => {
  return (
    <StyledOptionsCard className={props.style?.className}>
      {props.options.length ? (
        <>
          {props.options?.map((item: any, index: any) => {
            if (
              (item.name === "Delete Channel" ||
                item.name === "Permissions" ||
                item.name === "Members" ||
                item.name === "Edit Channel" ||
                item.name === "Clear Chat" ||
                item.name === "Manage Members") &&
              props.channelAdmin !== props.userId
            ) {
              return null;
            }
            if (
              item.name === "Mute Chat" &&
              !props?.channelRawData?.disconnected &&
              props.channelRawData?.muteStatus().muted
            ) {
              return null;
            }
            if (
              item.name === "UnMute Chat" &&
              !props?.channelRawData?.disconnected &&
              !props.channelRawData?.muteStatus().muted
            ) {
              return null;
            }
            if (
              item.name === "Leave Channel" &&
              props.channelAdmin == props.userId
            ) {
              return null;
            }
            return (
              <StyledRow
                className="item m-b-0-5 hr-between"
                key={index}
                onClick={() => {
                  item.onPress();
                }}
              >
                <StyledRow className="vr-center">
                  <IconImage slug={item.icon} size={item.size} />
                  <Text fontSize="md" className="m-l-0-5">
                    {item.name}
                  </Text>
                </StyledRow>
                <StyledRow></StyledRow>
              </StyledRow>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </StyledOptionsCard>
  );
};

export default LayoutOptions;
