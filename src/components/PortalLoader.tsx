import { Spinner } from "@chakra-ui/react";

type SpinnerProps = {
    size: string;
    thickness?: string;
    speed?: string;
    emptyColor?: string;
    color?: string;
}

const PortalLoader = (props: SpinnerProps) => {
    return (
        <Spinner {...props} />
    )
}
export default PortalLoader;