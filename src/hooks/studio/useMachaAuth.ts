import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { useEffect } from "react";

declare let window: any;

const useMachaAuth = () => {
  const $address = useAuthStore((state: any) => state.address);
  const $signer = useAuthStore((state: any) => state.signer);
  const $macha = useAuthStore((state: any) => state.macha);
  const $loadMacha = useAuthStore((state: any) => state.loadMacha);
  const $loadUserMetas = useUserStore((state: any) => state.loadUserMetas);

  const auth = async () => {
    const macha = new Macha({
      address: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      signer: $signer,
    });
    await macha.connectClient({
      owner: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
    });
    console.log("Macha init ", macha.client);
    $loadMacha(macha);
  };

  useEffect(() => {
    // if ($signer)
    auth();
  }, [$address, $signer]);

  useEffect(() => {
    if ($macha?.client?.metasOwned) {
      console.log("Logging client ", $macha);
      console.log("Metas Data array ", $macha?.client?.metasOwned?.data);
      $loadUserMetas($macha?.client?.metasOwned?.data);
    }
  }, [$macha?.timestamp]);

  return {};
};
export default useMachaAuth;
