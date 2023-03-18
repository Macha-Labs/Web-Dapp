import useXmtpChannelNew from "@/hooks/xmtp/useXmtpChannelNew";
import useUserStore from "@/store/useUserStore";
import { Col } from "@/styles/StyledComponents";
import { Button, Heading, Image, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import ModalSlider from "../modal/ModalSlider";
import UserFollowersCard from "../user/UserFollowersCard";

const ChatNewDm = (props: any) => {
    const hookXmtpChannelNew = useXmtpChannelNew();
    const toast = useToast();
    const $followers = useUserStore((state: any) => state.followers);
    
    const callback = {
        success: () => {
            props.modal.onClose();
        },
        error: () => {
            toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 3000,
                position: "bottom-right",
              });
        }
    }


    const TemplateFollowers = () => {
        return (
          <Col className="p-v-1">
            {/* <Heading as="h6" size="sm" className="m-b-1">Lens Followers</Heading> */}
            { $followers?.length
                ?
                <>
                    {$followers?.map((item: any, index: any) => {
                        return <div className="m-b-1"><UserFollowersCard user={item} key={index} /></div>;
                    })}
                </>
             : (
              <>
                <Col className="flex-hr-vr-center">
                      <Image
                        src="/assets/nofollow.png"
                        className="w-40 m-b-2 m-t-1"
                      />
                      <Heading className="" size="xs">
                        Your lens followers will be displayed here
                      </Heading>
                    </Col>
              </>
            )}
          </Col>
        );
      };
    

    return (
        <ModalSlider event={props.modal} size="sm" header={<Heading as="h6" size="sm">New Inbox</Heading>}>
            <InputGroup size='md'>
            <Input
                placeholder='Search with address or lens handle'
                ref={hookXmtpChannelNew.input}
            />
            <InputRightElement width='4.5rem'>
                <Button variant="state_brand" size='xs' onClick={() => {hookXmtpChannelNew.validate(callback)}}>
                    Search
                </Button>
            </InputRightElement>
            </InputGroup>

            < TemplateFollowers />
        </ModalSlider>
    )
}

export default ChatNewDm;