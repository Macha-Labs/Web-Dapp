import InviteChannel from "@/components/invite/InviteChannel";
import { StyledWindow } from "@/styles/StyledComponents";
import { useRouter } from 'next/router';

const Invite = () => {
    const router = useRouter();

    return (
      <StyledWindow
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
      </StyledWindow>
    );
}

export default Invite;