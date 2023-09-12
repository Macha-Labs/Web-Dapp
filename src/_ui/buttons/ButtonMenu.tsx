import { style } from "@/styles/StyledConstants";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import IconBase from "../icons/IconsBase";
import { useState } from "react";
import Image from "next/image";

type Props = {
  text?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  onClick?: any;
  avatar?: string;
  img?: string;
  leftIcon?: string;
  rightIcon?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  isDisabled?: boolean;
};

const ButtonMenu = ({
  text,
  size,
  variant,
  icon,
  options,
  onClick,
  avatar,
  img,
  leftIcon,
  rightIcon,
  marginLeft,
  marginRight,
  width,
  height,
  isDisabled,
}: Props) => {
  const [iconOrientation, setIconOrientation] = useState<boolean>(true);
  const { colorMode } = useColorMode();
  return (
    <div
      style={{
        marginLeft: `${marginLeft}`,
        marginRight: `${marginRight}`,
        width: `${width ? width : "100%"}`,
      }}
    >
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              isDisabled={isDisabled}
              variant={variant ? variant : colorMode == "light" ? "state_default_hover_light" : "state_default_hover"}
              as={Button}
              // backgroundColor: `${colorMode == "light" ? "#ffffff" : ""}`,
              // backgroundColor={colorMode == "light" ? "#ffffff" : ""}
              style={{
                borderRadius: `${style.card.borderRadius.button}`,
                backgroundColor: `${colorMode == "light" ? "#ffffff" : ""
                  }`,
              }}
              rightIcon={
                icon && isOpen ? (
                  <IconBase
                    slug="icon-chevron-up"
                    size="sm"
                    style={icon.style}
                  />
                ) : isDisabled ? (
                  <></>
                ) : (
                  <IconBase slug={icon.slug} size="sm" style={icon.style} />
                )
              }
              height={height ? height : "3rem"}
            >
              <FlexRow>
                {avatar && <IconBase slug={avatar} />}
                <Text
                  marginLeft={style.button.margin.default}
                  fontSize={"sm"}
                  className="mb-0"
                  color={colorMode == "light" ? "#000" : ""}
                >
                  {text}
                </Text>
              </FlexRow>
            </MenuButton>
            <MenuList
              style={{
                background: `${colorMode == "light" ? "#ffff" : ""}`,
              }}
            >
              {options.map((item, index) => {
                return (
                  <MenuItem
                    style={{
                      background: `${colorMode == "light" ? "#ffff" : ""}`,
                    }}
                    key={index}
                    onClick={
                      item.onClick
                        ? () => {
                          item.onClick();
                          setIconOrientation(!iconOrientation);
                        }
                        : () => { }
                    }
                  >
                    <FlexRow hrAlign="space-between">
                      {item.img && (
                        <Image
                          style={{ height: "25px", width: "25px" }}
                          src={item.img}
                          alt="item.img"
                        />
                        // <img
                        //   style={{ height: "25px", width: "25px" }}
                        //   src={item.img}
                        //   alt="item.img"
                        // />
                      )}
                      {item.leftIcon && (
                        <IconBase slug={item.leftIcon} size={size} style={{}} />
                      )}
                      <FlexRow
                        hrAlign="flex-start"
                        width="90%"
                        marginLeft={"sm"}
                      >
                        <Text
                          color={colorMode == "light" ? "#000" : ""}
                          mb={0}
                        >
                          {item.value}
                        </Text>
                        {item.rightIcon && <IconImage slug={item.rightIcon} />}
                      </FlexRow>
                    </FlexRow>
                  </MenuItem>
                );
              })}
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};

export default ButtonMenu;
