import { StyledLi } from "@/styles/StyledComponents";
import Link from "next/link";
import { useRouter } from "next/router";
import IconImage from "../icons/IconImage";
import FlexRow from "../flex/FlexRow";

type Props = {
  options: any;
  gstyle?: any;
  icon?: any;
  value?: string;
  onChange?: any;
};

const NavTabs = ({ options, gstyle, icon, value, onChange }: Props) => {
  const router = useRouter();

  return (
    <>
      <ul className="navbar-nav justify-content-center d-flex align-items-center flex-row mt-2 mt-md-0">
        {options ? (
          options?.map((option: any) => {
            return (
              <StyledLi
                className={`nav-item  ms-2 ${
                  value === option.value ? "active" : ""
                }`}
                key={option.value}
                onClick={() => onChange(option.value)}
              >
                <Link
                  className=" d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 "
                  href={option.href}
                  style={gstyle}
                >
                  <FlexRow>
                    {icon && <IconImage slug={icon.slug} />}
                    {option.value}
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

export default NavTabs;
