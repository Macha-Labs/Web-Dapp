import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import CreatorCard from "@/components/cards/CreatorCard";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";

const Create = () => {
  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader />;
  };

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <CreatorCard />
      </Box>
    );
  };

  return (
    <>
      <FlexWindow
        view="both"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
};

export default Create;
