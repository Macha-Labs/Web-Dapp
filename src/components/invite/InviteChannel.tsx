import useStreamChannelMembership from "@/hooks/stream/useStreamChannelMembership";
import { AuthContext } from "@/providers/AuthProvider";
import { Col, StyledCard} from "@/styles/StyledComponents";
import { Avatar, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { ConnectWalletButton } from "../buttons/ConnectWalletButton";
import { ChatContext } from "@/providers/ChatProvider";
import { useRouter } from "next/router";


const InviteChannel = (props: any) => {
    const authContext = useContext(AuthContext);
    const chatContext = useContext(ChatContext);
    const hookStreamChannelMembership = useStreamChannelMembership();
    const toast = useToast();
    const router = useRouter();


    useEffect(() => {
        console.log('channelid', props?.channelId);
        if (props?.channelId) {
            console.log('Route channel', props?.channelId);
            hookStreamChannelMembership.fetchChannel(props?.channelId);
        }
    }, [props?.channelId])


    const callBackMembership = () => {
        // TODO: Cannot access hookchatchannel.fetch since router.pathname is different here
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
            <StyledCard className="w-100 p-4">
            <Col className="hr-center">
                <Col className="m-b-2 hr-center text-center">
                    <Avatar size="xl" name={hookStreamChannelMembership?.channel?.name} />
                    <Text fontSize={18} className="m-t-1 m-b-1 center">Use this invite link to join channel</Text>
                    <Heading as="h5" size="lg">
                        {hookStreamChannelMembership?.channel?.name}
                    </Heading>
                </Col>
                <Col className="w-60 m-b-1">
                    {!authContext.address && <ConnectWalletButton />}
                    {(authContext.address && !authContext?.user?.lens?.id) && 
                    <Button 
                    className="" 
                    size="md" 
                    variant="state_lens" 
                    isLoading={authContext?.isLoadingLens} 
                    onClick={() => {authContext.connectLens(callBacks)}}>
                        Sign In With Lens
                    </Button>}
                    {authContext.address &&
                    authContext?.user?.lens?.id &&
                    !authContext.xmtpClientAddress && (
                        <Button
                        className=""
                        size="md"
                        variant="state_xmtp"
                        onClick={() => {
                            authContext.connectXmtp();
                        }}
                        >
                        Connect to XMTP
                        </Button>
                    )}
                    {authContext?.isConnected && 
                    <Button 
                    onClick={() => {
                        hookStreamChannelMembership.triggerMembership(
                            authContext?.address,
                            hookStreamChannelMembership.channel?.id,
                            callBackMembership
                            )}}
                        isLoading={hookStreamChannelMembership.isLoading} className="" size="md" variant="state_brand" >Join Channel</Button>}
                </Col>
                <Text fontSize={12}>By registering you agree to MetaWork Terms and Conditions</Text>
            </Col>
            </StyledCard>
        )
    }

    return (
        <>
            <div className="middle">
                
                    <TemplateLoaded />
                </div>
        
        </>
    )
}

export default InviteChannel;