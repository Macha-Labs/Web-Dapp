import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

const PopoverNative = (props: any) => {
  return (
    <Popover
      placement={props?.placement ? props?.placement : "left-start"}
      size={props.size || "md"}
    >
      <PopoverTrigger>{props?.trigger}</PopoverTrigger>
      <PopoverContent className="m-b-1">
        <PopoverBody>{props?.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default PopoverNative;
