import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

const Pop = (props: any) => {
  return (
    <Popover placement={props?.placement ? props?.placement : "bottom"} size={props.size || 'md'}>
      <PopoverTrigger>{props?.trigger}</PopoverTrigger>
      <PopoverContent className="m-b-1">
        <PopoverBody>{props?.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default Pop;