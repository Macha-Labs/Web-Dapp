import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import IconImage from "../icons/IconImage";

type Props = {
  text?: string;
  size?: string;
  variant?: string;
  icon?: any;
  style?: any;
  options: any[];
  onClick?: any;
};

const ButtonMenu = ({ text, size, variant, icon, options, onClick }: Props) => {
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
        {text}
      </MenuButton>
      <MenuList>
        {options.map((item, index) => {
          return (
            <MenuItem onClick={item.onClick ? item.onClick : () => {}}>
              {item.value}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default ButtonMenu;
