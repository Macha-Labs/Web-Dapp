import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare let window: any;

const useMachaAuth = () => {
  const $address = useAuthStore((state: any) => state.address);
  const $signer = useAuthStore((state: any) => state.signer);
  const $macha = useAuthStore((state: any) => state.macha);
  const $loadMacha = useAuthStore((state: any) => state.loadMacha);
  const $loadUserMetasMap = useUserStore(
    (state: any) => state.loadUserMetasMap
  );
  const $loadUserMetas = useUserStore((state: any) => state.loadUserMetas);

  let provider;
  let signer;
  const [browserSigner, setBrowserSigner] = useState<any>();
  const [machaClient, setMachaClient] = useState<any>();

  const setInit = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = await provider.getSigner();
      setBrowserSigner(signer);
    }
  };

  useEffect(() => {
    setInit();
  }, [])

  const auth = async () => {
    const macha = new Macha({
      address: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      signer: browserSigner,
    });
    await macha.connectClient({
      owner: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      signer: browserSigner
    });
    console.log("Macha init ", macha);
    console.log("Macha Client ", macha.client);
    console.log("Macha Client metasOwned ", macha.client?.metasOwned);

    $loadMacha(macha);
  };

  useEffect(() => {
    if (browserSigner)
    auth();
  }, [$address, browserSigner]);

  useEffect(() => {
    console.log("Logging client ", $macha.client); // getting the right value
    console.log("Logging client metasOwned", $macha.client?.metasOwned); // coming null
    console.log("Metas Data array ", $macha?.client?.metasOwned?.data); // coming undefined
    $loadUserMetas($macha?.client?.metasOwned?.data);
    let userMetaMap: any = {};
    $macha?.client?.metasOwned?.data.filter((item: any, index: number) => {
      userMetaMap[item.id] = item;
    });
    $loadUserMetasMap(userMetaMap);
  }, [$macha]);

  return {};
};
export default useMachaAuth;
