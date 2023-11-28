import React from "react";
import styling from "../../styles/Loader.module.css"; // Import the styles
import { Image } from "@chakra-ui/react";

const Loader1: React.FC = () => {
  return (
    //   <div className="spinner-container">
    //   <div className="spinner"></div>
    //   <img
    //     src="your-image-url.jpg"
    //     alt="Your Image"
    //     className="image"
    //   />
    // </div>
    <div className={styling.spinnerContainer}>
      <div className={styling.spinner}></div>
      <Image
        src="https://i.ibb.co/gWRssjK/Logo.png"
        alt="Your Image"
        className={styling.image}
        height={"300px"}
      />
    </div>
  );
};

export default Loader1;
