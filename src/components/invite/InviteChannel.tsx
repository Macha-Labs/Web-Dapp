import useStreamChannelMembership from "@/hooks/stream/useStreamChannelMembership";
import { AuthContext } from "@/providers/AuthProvider";
import { Col, StyledCard} from "@/styles/StyledComponents";
import { Avatar, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ConnectWalletButton } from "../buttons/ConnectWalletButton";
import { ChatContext } from "@/providers/ChatProvider";
import { useRouter } from "next/router";
import MobileEmptyState from "../MobileEmptyState";


const InviteChannel = (props: any) => {
    const authContext = useContext(AuthContext);
    const chatContext = useContext(ChatContext);
    const hookStreamChannelMembership = useStreamChannelMembership();
    const toast = useToast();
    const router = useRouter();
    const [mobile,setMobile]=useState(false);


    useEffect(() => {
        console.log('channelid', props?.channelId);
        if (props?.channelId) {
            console.log('Route channel', props?.channelId);
            hookStreamChannelMembership.fetchChannel(props?.channelId);
        }
    }, [props?.channelId])


    const callBackMembership = () => {
        chatContext?.hookChannel?.fetch({id: props?.channelId});
        router.push('/chat');
    }

    const callBacks = {
        noLensProfile: async() => {
            toast({
                title: "Lens Profile not found",
                status: "error",
                duration: 3000,
                position: "bottom-right",
              });
        }
    }

    const TemplateLoaded = () => {
        return (
          <StyledCard className="p-4 invite">
            <Col className="hr-center">
              <Col className="m-b-1-5 hr-center text-center">
                <Avatar
                  size="xl"
                  name={hookStreamChannelMembership?.channel?.name}
                />
                <Text fontSize={18} className="m-t-1 m-b-1 center">
                  Use this invite link to join channel
                </Text>
                <Heading as="h5" size="lg">
                  {hookStreamChannelMembership?.channel?.name}
                </Heading>
              </Col>
              <Col className="w-70 m-b-1">
                {!authContext.address && <ConnectWalletButton size="lg" font={22}/>}
                {authContext.address && !authContext?.user?.lens?.id && (
                  <Button
                    className=""
                    size="lg"
                    variant="state_lens"
                    isLoading={authContext?.isLoadingLens}
                    onClick={() => {
                      authContext.connectLens(callBacks);
                    }}
                    style={{}}
                  >
                    <Text fontSize={22} paddingBottom={"0px"} marginBottom="0px" style={{marginBottom:"0px", paddingBottom:"0px", color:"#000"}}  >Sign In With Lens</Text>
                  </Button>
                )}
                {authContext.address &&
                  authContext?.user?.lens?.id &&
                  !authContext.xmtpClientAddress && (
                    <Button
                      className=""
                      size="lg"
                      variant="state_xmtp"
                      onClick={() => {
                        authContext.connectXmtp();
                      }}
                    >
                      <Text fontSize={22} paddingBottom={"0px"} marginBottom="0px" style={{marginBottom:"0px", paddingBottom:"0px"}}>Connect to XMTP</Text>
                    </Button>
                  )}
                {authContext?.isConnected && (
                  <Button
                    onClick={() => {
                      hookStreamChannelMembership.triggerMembership(
                        authContext?.address,
                        hookStreamChannelMembership.channel?.id,
                        callBackMembership
                      );
                    }}
                    isLoading={hookStreamChannelMembership.isLoading}
                    className=""
                    size="lg"
                    variant="state_brand"
                  >
                    <Text fontSize={22}>Join Channel</Text>
                  </Button>
                )}
              </Col>
              <Text fontSize={12}>
                By registering you agree to MetaWork Terms and Conditions
              </Text>
            </Col>
          </StyledCard>
        );
    }
    useEffect(()=>{
      if(window.innerWidth<1024){
        setMobile(true);
      }
    },[])
    return (
      mobile==false?(<>
            <div className="middle" >
              <TemplateLoaded />
              <img src="/assets/metawork-image-text logo.svg" style={{margin:"auto", marginTop:"50px", width:"200px"}}/>              
            </div>
        
        </>):<div style={{marginTop:"20%"}}><MobileEmptyState/></div>
    )
}

export default InviteChannel;