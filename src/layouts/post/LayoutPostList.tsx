import { AuthContext } from "@/providers/AuthProvider";
import { StyledCol } from "@/styles/StyledComponents";
import { Heading, Image } from "@chakra-ui/react";
import { useContext } from "react";
import LayoutPostCard from "./LayoutPostCard";

interface Props {
  [key: string]: any;
}

const LayoutPostList = ({ ...props }) => {
  const authContext = useContext(AuthContext);
  console.log("User lens profile ", authContext?.user?.lens);
  const template = () => {
    if (props?.isLoading) {
      return <></>;
    } else if (props?.list?.length) {
      return (
        <>
          {props.list.map((item: any, index: any) => (
            <LayoutPostCard myId={authContext?.user?.lens?.id} item={item} key={index} />
          ))}
        </>
      );
    } else {
      return (
        <>
          <StyledCol className="flex-hr-vr-center">
            <Image src="/assets/nopost.png" className="w-40" alt="post" />
            <Heading className="m-b-1" size="lg">
              You have no posts yet
            </Heading>
            <Heading className="" size="xs">
              All posts from your lens feed will be displayed here
            </Heading>
          </StyledCol>
        </>
      );
    }
  };

  return <>{template()}</>;
};

export default LayoutPostList;
