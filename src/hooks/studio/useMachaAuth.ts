import useAuthStore from "@/store/useAuthStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { useEffect } from "react";

declare let window: any;

const useMachaAuth = () => {
  const $address = useAuthStore((state: any) => state.address);
  const $signer = useAuthStore((state: any) => state.signer);
  const $loadMacha = useAuthStore((state: any) => state.loadMacha);

  const auth = () => {
      const macha = new Macha({
        address: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
        signer: $signer,
      });
      console.log("Macha init ", macha);
      $loadMacha(macha);
  };

  useEffect(() => {
    // if ($signer)
      auth();
  }, [$address, $signer])

  return {};
};
export default useMachaAuth;
