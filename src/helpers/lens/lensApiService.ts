import { utils } from "ethers";
import { signTypedData } from "@wagmi/core";

const omit = <T extends Record<string, any>, K extends keyof T>(obj: T, prop: K): Omit<T, K> => {
  const { [prop]: _, ...rest } = obj;
  return rest;
};

export const signedTypeData = async (
  domain: any,
  types: Record<string, any>,
  value: Record<string, any>
) => {
  let typedData = {
    domain: domain,
    types: types,
    value: value,
  };
  //console.log("Getting typed Data in service ", typedData);

  //@ts-ignore
  const result = signTypedData({
    domain: omit(domain, "__typename"),
    types: omit(types, "__typename"),
    value: omit(value, "__typename"),
  });
  return result;
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export default signedTypeData;
