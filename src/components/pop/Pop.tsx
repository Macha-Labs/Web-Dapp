import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";

const Pop = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handlePopover = () => {
    
     setIsOpen(!isOpen);
  };
  return (
    <Popover
      isOpen={isOpen}
      onOpen={handlePopover}
      onClose={handlePopover}
      placement={props?.placement ? props?.placement : "top-start"}
    >
      <PopoverTrigger>{props?.trigger}</PopoverTrigger>
      <PopoverContent className="m-b-1">
        <PopoverBody>{props?.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default Pop;
