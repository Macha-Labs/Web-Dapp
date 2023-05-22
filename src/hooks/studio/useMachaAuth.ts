import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { useEffect } from "react";

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
    console.log("Macha init ", macha.client.data);
    console.log("Macha Client ", macha.client);
    console.log("Macha Client metasOwned ", macha.client?.metasOwned);

    $loadMacha(macha);
  };

  useEffect(() => {
    // if ($signer)
    auth();
  }, [$address, $signer]);

  useEffect(() => {
    console.log("Logging client ", $macha.client); // getting the right value
      console.log("Logging client metasOwned", $macha.client?.metasOwned); // coming null
      console.log("Metas Data array ", $macha?.client?.metasOwned?.data); // coming undefined
      $loadUserMetas($macha?.client?.metasOwned?.data);
  }, [$macha]);

  return {};
};
export default useMachaAuth;
