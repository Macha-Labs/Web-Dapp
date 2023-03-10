import InviteChannel from "@/components/invite/InviteChannel";
import { StyledWindow } from "@/styles/StyledComponents";
import { useRouter } from 'next/router';

const Invite = () => {
    const router = useRouter();

    return (
        <StyledWindow>
            <InviteChannel channelId={router.query?.channelId ? router?.query?.channelId[0]: null} />
        </StyledWindow>
    )
}

export default Invite;