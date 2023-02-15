import { Row } from "@/styles/StyledComponents";
import { Heading, Icon } from "@chakra-ui/react";

const ChatHeader = props => {
  return (
    <div className="header hr-between vr-center">
      <Row className="w-100 h-100 hr-between vr-center">
        <Heading as="h4" size="sm">
          #{props?.hookChannel?.channel?.name}
        </Heading>
        <div>
          <Row className="vr-center">
            <Icon className="m-r-0-5">
              {/* <PinIcon width="25" height="25" fill="#efefef" onClick={() => {}}></PinIcon> */}
            </Icon>
            <Icon className="m-r-0-5">
              {/* <SearchIcon width="25" height="25" fill="#efefef"></SearchIcon>/ */}
            </Icon>
            <Icon className="" onClick={() => {}}>
              {/* <UserIcon width="25" height="25" fill="#efefef"></UserIcon> */}
            </Icon>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default ChatHeader;
