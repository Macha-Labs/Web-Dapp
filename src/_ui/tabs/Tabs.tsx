import { StyledLi } from "@/styles/StyledComponents";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FlexRow from "../flex/FlexRow";
import IconImage from "../icons/IconImage";

type Props = {
  options: any;
  gstyle?: any;
  icon?: any;
  value?: string;
  onChange?: any;
  width?: string;
};

const Tabs = ({ options, gstyle, icon, value, onChange, width }: Props) => {
  const router = useRouter();

  return (
    <>
      <ul
        className="navbar-nav justify-content-start d-flex align-items-center flex-row mt-2 mt-md-0"
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
                style={{ marginRight: `${style.margin["md"]}` }}
              >
                <Link
                  className=" d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0  "
                  href={option.href}
                  style={gstyle}
                >
                  <FlexRow>
                    {icon && <IconImage slug={icon.slug} />}
                    <Text fontSize={"lg"} fontWeight={600} className="m-b-0">
                      {option.value}
                    </Text>
                  </FlexRow>
                </Link>
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

export default Tabs;
