import { Col } from "@/styles/StyledComponents";
import { Heading, Image } from "@chakra-ui/react";
import LayoutCard from "../LayoutCard";
import LayoutPostCard from "./LayoutPostCard";
import LayoutPostLoading from "./LayoutPostLoading";

interface Props {
  [key: string]: any;
}

const LayoutPostList = ({ ...props }) => {
  const template = () => {
    if (props?.isLoading) {
      return <></>;
    } else if (props?.list?.length) {
      return (
        <>
          {props.list.map((item: any, index: any) => (
            <LayoutPostCard item={item} key={index} />
          ))}
        </>
      );
    } else {
      return (
        <>
          <Col className="flex-hr-vr-center">
            <Image src="/assets/nopost.png" className="w-40" />
            <Heading className="m-b-1" size="lg">
              You have no posts yet
            </Heading>
            <Heading className="" size="xs">
              All posts from your lens feed will be displayed here
            </Heading>
          </Col>
        </>
      );
    }
  };

  return <>{template()}</>;
};

export default LayoutPostList;
