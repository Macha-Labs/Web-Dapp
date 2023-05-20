import { useEffect, useState } from "react";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import useAuthStore from "@/store/useAuthStore";

const useMachaAuth = () => {
  const $address = useAuthStore((state: any) => state.address);
  const $signer = useAuthStore((state: any) => state.signer);
  const $loadMacha = useAuthStore((state: any) => state.loadMacha);

  const auth = () => {
      const macha = new Macha({
        address: $address?.toLowerCase(),
        signer: $signer,
      });
      console.log("Macha init ", macha);
      $loadMacha(macha);
  };

  useEffect(() => {
    if ($signer && $address) {
        auth();
    }
  }, [$address, $signer])

  return {};
};
export default useMachaAuth;
