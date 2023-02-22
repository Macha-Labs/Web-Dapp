import { utils } from "ethers";
import { omitDeep } from "@patomation/omit-deep";
import { signTypedData } from "@wagmi/core";

const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

export const signedTypeData = async (
  domain: any,
  types: Record<string, any>,
  value: Record<string, any>
) => {
  let typedData = {
    domain: omit(domain, "__typename"),
    types: omit(types, "__typename"),
    value: omit(value, "__typename"),
  };
  // // const result = await signTypedData(typedData);
  // return result;
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export default signedTypeData;
