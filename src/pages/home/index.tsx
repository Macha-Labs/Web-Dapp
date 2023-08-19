import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";

import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import CarouselSlide from "@/components/studio/CarouselSlide";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box } from "@chakra-ui/react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {

    const renderBody = () => {
        return (
            <Box paddingX={style.padding.xxs}>
                <Carousel
                    autoPlay
                    // showIndicators={false}
                    showArrows={false}
                    showStatus={false}
                    stopOnHover={true}
                    infiniteLoop
                    interval={3000}
                // renderArrowPrev={(onClickHandler, hasPrev) =>
                //   hasPrev && (
                //     <Box
                //       style={{
                //         position: "absolute",
                //         zIndex: 2,
                //         top: "calc(50% - 15px)",
                //         cursor: "pointer",
                //         left: "15px"
                //       }}
                //       onClick={onClickHandler}
                //     >
                //       <IconImage
                //         slug="icon-chevron"
                //         size="sm"
                //       />
                //     </Box>
                //   )
                // }
                // renderArrowNext={(onClickHandler, hasNext) =>
                //   hasNext && (
                //     <Box
                //       style={{
                //         position: "absolute",
                //         zIndex: 2,
                //         top: "calc(50% - 15px)",
                //         cursor: "pointer",
                //         right: "15px"
                //       }}
                //       onClick={onClickHandler}
                //     >
                //       <IconImage
                //         slug="icon-chevron-next"
                //         size="sm"
                //       />
                //     </Box>
                //   )
                // }
                >
                    <CarouselSlide
                        title="LENS"
                        description="POSTS • PROFILES • CHATS"
                        avatarImage={GlobalIcons["logo-Lens"]}
                        bgGrid="/assets/explore/lens%20carousal%20bg%20grid.svg"
                        bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
                        bannerImage="/assets/explore/lens%20carousal%20right%20full%20image.svg"
                    />
                    <CarouselSlide
                        title="POAP"
                        description="MINT • DROP • CONNECT"
                        avatarImage={GlobalIcons["logo-Poap"]}
                        bgGrid="/assets/explore/poap%20carousal%20bg%20grid.svg"
                        bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
                        bannerImage="/assets/explore/poap%20carousal%20right%20full%20image.svg"
                    />
                    <CarouselSlide
                        title="MIRROR"
                        description="BLOGS • NFTs • MINT"
                        avatarImage={GlobalIcons["logo-Mirror"]}
                        bgGrid="/assets/explore/mirror%20carousal%20bg%20grid.svg"
                        bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
                        bannerImage="/assets/explore/mirror%20carousal%20right%20full%20image.svg"
                    />
                </Carousel>
            </Box>
        );
    };

    const renderNavLeft = () => {
        return <NavLeft />;
    };

    const renderNavTop = () => {
        return <NavMeta />;
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
}
