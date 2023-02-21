import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import Props from "imagekitio-react/dist/types/components/IKContext/props";

const Pop = (props: any) => {
    return (
        <Popover placement={props?.placement? props?.placement : "top-start"}>
                <PopoverTrigger>
                  {props?.trigger}
                </PopoverTrigger>
                <PopoverContent className="m-b-1">
                  <PopoverBody>
                    {props?.children}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
    )
}
export default Pop;