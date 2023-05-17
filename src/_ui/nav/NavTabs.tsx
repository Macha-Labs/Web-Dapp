import { StyledLi } from "@/styles/StyledComponents";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  options: any;
};

const NavTabs = ({ options }: Props) => {
  const router = useRouter();

  return (
    <>
      <ul className="navbar-nav justify-content-center d-flex align-items-center flex-row mt-2 mt-md-0">
        {options ? (
          options?.map((option: any) => {
            return (
              <StyledLi
                className={`nav-item  ms-2 ${
                  router.pathname === `${option.href}` ? "active" : ""
                }`}
              >
                <Link
                  className=" d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 "
                  href={option.href}
                >
                  {option.value}
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
