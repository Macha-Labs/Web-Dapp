import { Spinner, useColorMode } from "@chakra-ui/react";

type Props = {
  size: string;
  thickness?: string;
  speed?: string;
  emptyColor?: string;
  color?: string;
};

const Loader = (props: Props) => {
  const {colorMode} = useColorMode()
  return <Spinner color={colorMode == "light" ? "#282828" : ""} {...props} />;
};
export default Loader;
