import { StyledLi } from "@/styles/StyledComponents";
import Link from "next/link";
import { useRouter } from "next/router";
import IconImage from "../icons/IconImage";
import FlexRow from "../flex/FlexRow";
import { Divider, Text } from "@chakra-ui/react";

type Props = {
  options: any;
  gstyle?: any;
  icon?: any;
  value?: string;
  onChange?: any;
  width?: string;
};

const NavTabs = ({ options, gstyle, icon, value, onChange, width }: Props) => {
  const router = useRouter();

  return (
    <>
      <ul
        className="navbar-nav justify-content-between d-flex align-items-center flex-row mt-2 mt-md-0"
        style={{ width: `${width ? width : "100%"}` }}
      >
        {options ? (
          options?.map((option: any, idx: any) => {
            return (
              <StyledLi
                className={`nav-item  ${
                  value === option.value ? "active" : ""
                }`}
                key={idx}
                onClick={() => onChange(option.value)}
              >
                <Link
                  className=" d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0  "
                  href={option.href}
                  style={gstyle}
                >
                  <FlexRow>
                    {icon && <IconImage slug={icon.slug} />}
                    {/* <Text fontSize={"xl"} className="m-b-0"> */}
                    {option.value}
                    {/* </Text> */}
                  </FlexRow>
                </Link>
                <Divider
                  borderColor={value === option.value ? "#197cec" : "#000408"}
                  borderWidth={"2px"}
                  borderRadius={"md"}
                  width={"98%"}
                  className="m-0 mt-1"
                />
              </StyledLi>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default NavTabs;
