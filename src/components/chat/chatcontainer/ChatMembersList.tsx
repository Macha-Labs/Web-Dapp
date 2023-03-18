import { Avatar, AvatarBadge, Heading, useDisclosure } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { Col, Row, StyledCard } from "@/styles/StyledComponents";
import styled from "styled-components";
import { truncateAddress } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import ModalSlider from "@/components/modal/ModalSlider";
import UserProfile from "@/components/user/UserProfile";
import IconImage from "@/components/icons/IconImage";
import { useChatMembersStore } from "@/store/useChatMembersStore";
import { ChatContext } from "@/providers/ChatProvider";
import useChatChannelStore from "@/store/useChatChannelStore";

interface Props {
  [key: string]: any;
}

const Container = styled.div`
  .item {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background: ${style.button.bg.default};
    }
  }
`;

const ChatMembersList = (props: any) => {
  console.log("Rendering >>>>> ChatMembersList");
  const modalProfile = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any>();
  const $members = useChatMembersStore((state: any) => state.members);
  const chatContext = useContext(ChatContext);
  const $channel = useChatChannelStore((state: any) => state.channel);

  useEffect(() => {
    chatContext?.hookMembers.load($channel);
  }, [])


  const handleSelectedUser = (user: any) => {
    modalProfile.onOpen();
    props.modal.onClose();
    setSelectedUser(user);
  };

  const template = (heading: any, users: any) => {
    return (
      
      
        <Col className="m-b-1">
        {users?.length ? (
          <>
             <div>
                {users?.map((item: any, index: any) => (
                  <StyledCard key={index} className="state_hover m-b-0-5">
                    <Row
                  
                  className="hr-between vr-center"
                  onClick={() => {
                    console.log(item, "itemmmmm");
                    handleSelectedUser(item);
                  }}
                >
                  <Row className="vr-center">
                    <Avatar src={item?.lens?.image} className="m-r-0-5" size="sm">
                      {heading == "Online" ? (
                        <AvatarBadge boxSize="0.7em" bg="green.500" />
                      ) : (
                        <></>
                      )}
                    </Avatar>
                    <h6>
                      {item?.lens?.name
                        ? item?.lens?.name
                        : item?.lens?.handle
                        ? item?.lens?.handle
                        : truncateAddress(item?.lens?.ownedBy)}
                    </h6>
                  </Row>
                  <IconImage
                  path="IconBrandChat.png"
                  style={{ className: "m-l-0-5" }}
                  size="xs"
                />
                </Row>
                  </StyledCard>
                
              ))}
                </div>
          </>
        ) : (
          <></>
        )}
      </Col>
    );
  };

  const TemplateProfile = () => {
    return (
     <>
       {selectedUser && <ModalSlider event={modalProfile} size="lg">
          <UserProfile user={selectedUser} />
        </ModalSlider>}
     </>
    );
  };

  return (
    <>
    {props.modal?.isOpen && 
      <ModalSlider
      size="sm"
      event={props?.modal} 
      header={
        <>
          <Heading as="h6" size="sm">Members</Heading>
        </>            
      }>
         {template("Online", $members?.onlineUsers)}

          {template("Offline", $members?.offlineUsers)}

      </ModalSlider>
     
    
    }
      
    {modalProfile?.isOpen && <TemplateProfile />}
      
    </>
  );
};

export default ChatMembersList;
