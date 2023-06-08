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
import IconBase from "../icons/IconsBase";

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
}: Props) => {
  return (
    <Menu>
      <MenuButton
        variant={"state_default_hover"}
        as={Button}
        style={{ borderRadius: `${style.card.borderRadius.button}` }}
        rightIcon={
          icon ? (
            <IconBase slug={icon.slug} size={icon.size} style={icon.style} />
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
            <MenuItem
              key={index}
              onClick={item.onClick ? item.onClick : () => {}}
            >
              {item.img && <img src={item.img} />}
              {item.leftIcon && <IconImage slug={item.leftIcon} />}
              {item.value}
              {item.rightIcon && <IconImage slug={item.rightIcon} />}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ButtonMenu;
