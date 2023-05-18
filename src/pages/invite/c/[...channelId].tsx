import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InviteChannel from "@/components/invite/InviteChannel";
import { useRouter } from 'next/router';

const Invite = () => {
    const router = useRouter();

    return (
      <FlexWindow
        style={{
          backgroundImage: `url("/assets/invitebg.png")`,
          backgroundRepeat:"no-repeat",
          backgroundPosition:"center",
          backgroundSize:"cover",
          height:"100vh"
        }}
      >
        <InviteChannel
          channelId={
            router.query?.channelId ? router?.query?.channelId[0] : null
          }
        />
      </Flex>
    );
}

export default Invite;