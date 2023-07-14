import { Spinner } from "@chakra-ui/react";

type Props = {
  size: string;
  thickness?: string;
  speed?: string;
  emptyColor?: string;
  color?: string;
};

const Loader = (props: Props) => {
  return <Spinner {...props} />;
};
export default Loader;
