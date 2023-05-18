import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import IconImage from "../icons/IconImage";
import FlexRow from "../flex/FlexRow";
import { style } from "@/styles/StyledConstants";

type Props = {
  text?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  onClick?: any;
  avatar?: string;
  leftIcon?: string;
  rightIcon?: string;
};

const ButtonMenu = ({
  text,
  size,
  variant,
  icon,
  options,
  onClick,
  avatar,
  leftIcon,
  rightIcon,
}: Props) => {
  return (
    <Menu>
      <MenuButton
        variant={"state_default_hover"}
        as={Button}
        rightIcon={
          icon ? (
            <IconImage slug={icon.slug} size={icon.size} style={icon.style} />
          ) : (
            <></>
          )
        }
      >
        <FlexRow>
          {avatar && <img src={avatar} />}
          <Text marginLeft={style.button.margin.default} className="mb-0">
            {text}
          </Text>
        </FlexRow>
      </MenuButton>
      <MenuList>
        {options.map((item, index) => {
          return (
            <MenuItem onClick={item.onClick ? item.onClick : () => {}}>
              {avatar && <img src={avatar} />}
              {leftIcon && <IconImage slug={leftIcon} />}
              {item.value}
              {rightIcon && <IconImage slug={rightIcon} />}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ButtonMenu;
