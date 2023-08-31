import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const User = () => {
  const router = useRouter();
  //   const hookSearch = useSearch();

  useEffect(() => {
    if (router.isReady) {
      // console.log(router.query.search)
      //   hookSearch._fetch(String(router.query.search));
    }
  }, [router.query.search]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta search={true} />;
  };

  const renderBody = () => {
    return <></>;
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default User;
