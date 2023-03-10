import { StyledIcon } from "@/styles/StyledComponents";
import React from "react";
import { IKImage } from "imagekitio-react";
import { style } from "@/styles/StyledConstants";
function IconImage(props: any) {
  return (
    <StyledIcon
      className={props.style?.className}
      onClick={props.onClick}
    >
      <IKImage
        path={`/icons/${props.path}`}
        transformation={[
          {
            height: props?.size ? props?.size : "25",
            width: props?.size ? props?.size : "25",
          },
        ]}
      />
    </StyledIcon>
  );
}

export function Landing(props: any) {
  return (
    <>
      <IKImage
        path={`/landingPage/${props.path}`}
        // transformation={[
        //   {
        //     height: props?.height ? props?.height : "25",
        //     width: props?.width ? props?.width : "25",
        //   },
        // ]}
        className={props?.className}
        // style={{ borderRadius: 23 }}
      />
      {/* {console.log("lessgoo",props?.className)} */}
      {/* <style jsx>{`
        @media screen and (max-width: 770px) {
          .aboutUs{
            height:{props.height}
          }
          .aboutUs {
            height:100px;
          }
        }
      `}</style> */}
    </>
  );
}

export default IconImage;
