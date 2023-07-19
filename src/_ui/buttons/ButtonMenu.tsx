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
}: Props) => {
  return (
    <div style={{ marginLeft: `${marginLeft}`, marginRight: `${marginRight}`,width: "100%" }}>
      <Menu>
        <MenuButton
          variant={"state_default_hover"}
          as={Button}
          style={{
            borderRadius: `${style.card.borderRadius.button}`,
          }}
          rightIcon={
            icon ? (
              <IconBase slug={icon.slug} size="sm" style={icon.style} />
            ) : (
              <></>
            )
          }
          height={"35px"}
        >
          <FlexRow>
            {avatar && <img src={avatar} />}
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
                onClick={item.onClick ? item.onClick : () => {}}
              >
                <FlexRow hrAlign="space-between">
                  {item.img && (
                    <img
                      style={{ height: "25px", width: "25px" }}
                      src={item.img}
                    />
                  )}
                  {item.leftIcon && (
                    <IconImage slug={item.leftIcon} size={size} style={{marginLeft: "sm"}}/>
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
      </Menu>
    </div>
  );
};

export default ButtonMenu;
