// import { fetchPendingMeta } from "@/service/MetaService";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Macha } from "@metaworklabs/macha-dev-sdk/lib";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";

declare let window: any;

const useMachaAuth = () => {
  const clientDataRef = useRef<any>({});
  const $address = useAuthStore((state: any) => state.address);
  const $signer = useAuthStore((state: any) => state.signer);
  const $macha = useAuthStore((state: any) => state.macha);
  const $loadMacha = useAuthStore((state: any) => state.loadMacha);
  const $loadUserMetasMap = useUserStore(
    (state: any) => state.loadUserMetasMap
  );
  const $loadUserMetas = useUserStore((state: any) => state.loadUserMetas);

  const $loadUserApisMap = useUserStore((state: any) => state.loadUserApisMap);
  const $loadUserApis = useUserStore((state: any) => state.loadUserApis);

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
  }, []);

  const auth = async () => {
    // const macha = new Macha({
    //   address: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
    //   signer: browserSigner,
    // });
    // await macha.connectClient({
    //   owner: "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
    //   signer: browserSigner,
    // });
    // console.log("Macha init ", macha);
    // console.log("Macha Client ", macha.client);
    // console.log("Macha Client metasOwned ", macha.client?.metasOwned);
    // $loadMacha(macha);
  };

  useEffect(() => {
    if (browserSigner) auth();
  }, [$address, browserSigner]);

  // const fetchingMetas = async () => {
  //   fetchPendingMeta("0x4eff290c1a734411b39aaa96eabe1e25f0e223ae").then(
  //     (res) => {
  //       console.log("response penging", res);
  //       const allMetas = $macha?.client?.metasOwned?.data
  //         ? [...$macha?.client?.metasOwned?.data, ...res.data]
  //         : [$macha?.client?.metasOwned?.data, ...res.data];
  //       console.log("allMetas", allMetas);
  //       $loadUserMetas(allMetas);
  //       let userMetaMap: any = {};
  //       allMetas.filter((item: any, index: number) => {
  //         item?.state?.status == "PENDING"
  //           ? (userMetaMap[item._id.toString()] = item)
  //           : (userMetaMap[item?.id] = item);
  //       });
  //       console.log("userMetaMap", userMetaMap);
  //       $loadUserMetasMap(userMetaMap);
  //       return res.data;
  //     }
  //   );
  //   // return res;
  // };

  const fetchingApis = async () => {
    $loadUserApis($macha.client?.apisOwned?.data);
    let userApisMap: any = {};
    $macha.client?.apisOwned?.data.map((item: any, index: number) => {
      console.log("Api name ", item?.name);
      userApisMap[item?.id] = item;
    });
    $loadUserApisMap(userApisMap);
    return;
  };

  useEffect(() => {
    if ($macha) {
      console.log("Logging client ", $macha.client); // getting the right value
      console.log("Logging client metasOwned", $macha.client?.metasOwned); // coming null
      console.log("Metas Data array ", $macha?.client?.metasOwned?.data); // coming undefined
      // const pending = fetchingMetas();
      fetchingApis();
      // console.log("pending metas", pending);
    }
  }, [$macha]);

  const registerClient = async () => {
    const authPayload = {
      owner: $address
        ? $address.toLowerCase()
        : "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      signer: $signer,
    };
    const clientData = {
      name: clientDataRef.current["name"].value,
      description: clientDataRef.current["description"].value,
      image: "",
      admins: clientDataRef.current["admins"].value,
    };

    console.log(authPayload, clientData);
    await $macha.createClient(clientData, authPayload);
  };

  const registerPublisher = async () => {
    const publisherPayload = {
      id: "",
      owner: $address
        ? $address.toLowerCase()
        : "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
    };

    const authPayload = {
      owner: $address
        ? $address.toLowerCase()
        : "0x4eff290c1a734411b39aaa96eabe1e25f0e223ae",
      signer: $signer,
    };

    await $macha.createPublisher(publisherPayload, authPayload);
  };

  return {
    clientDataRef: clientDataRef,
    registerClient: registerClient,
    registerPublisher: registerPublisher,
  };
};
export default useMachaAuth;
