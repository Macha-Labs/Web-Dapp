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
        <></>
      );
    }
  };

  return <>{template()}</>;
};

export default LayoutPostList;
