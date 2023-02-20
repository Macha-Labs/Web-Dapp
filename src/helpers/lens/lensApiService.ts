import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { ethers, utils } from "ethers";
import omitDeep from "omit-deep";
import { useSignTypedData } from 'wagmi';



const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

// have not tested yet, possible area of issue
export const signedTypeData = async (
  domain: any,
  types: Record<string, any>,
  value: Record<string, any>,
) => {
  // const { data, isError, isLoading, isSuccess, signTypedData } =
  //   useSignTypedData({
  //     domain,
  //     types,
  //     value,
  //   })
  // remove the __typedname from the signature!
  let typedData = {
    "domain": omit(domain, "__typename"),
    "types": omit(types, "__typename"),
    "value": omit(value, "__typename"),
  }
  const { data, isError, isLoading, isSuccess, signTypedData } = useSignTypedData(typedData);
  console.log("Getting data", data);
  return await signTypedData();
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export default signedTypeData;