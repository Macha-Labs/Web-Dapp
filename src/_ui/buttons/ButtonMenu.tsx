import { style } from "@/styles/StyledConstants";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";
import IconBase from "../icons/IconsBase";
import { useState } from "react";

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
              variant={variant ? variant : "state_default_hover"}
              as={Button}
              style={{
                borderRadius: `${style.card.borderRadius.button}`,
              }}
              rightIcon={icon && isOpen ? (
                <IconBase slug="icon-chevron-up" size="sm" style={icon.style} />
              ) : (
                isDisabled ?  <></> : <IconBase slug={icon.slug} size="sm" style={icon.style} />
              )}
              height={height ? height : "3rem"}
            >
              <FlexRow>
                {avatar && <IconBase slug={avatar} />}
                <Text
                  marginLeft={style.button.margin.default}
                  fontSize={"sm"}
                  className="mb-0"
                >
                  {text}
                </Text>
              </FlexRow>
            </MenuButton>
            <MenuList>
              {options.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={item.onClick ? () => {
                      item.onClick()
                      setIconOrientation(!iconOrientation)
                    } : () => { }}
                  >
                    <FlexRow hrAlign="space-between">
                      {item.img && (
                        <img
                          style={{ height: "25px", width: "25px" }}
                          src={item.img}
                        />
                      )}
                      {item.leftIcon && (
                        <IconBase slug={item.leftIcon} size={size} style={{}} />
                      )}
                      <FlexRow hrAlign="flex-start" width="90%" marginLeft={"sm"}>
                        {item.value}
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
