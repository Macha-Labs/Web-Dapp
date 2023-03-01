import { utils } from "ethers";
import { signTypedData } from "@wagmi/core";
import omitDeep from 'omit-deep';


const omit = (object: any, name: any) => {
  return omitDeep(object, name);
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
  console.log("Getting typed Data in service ", typedData);
  const result = signTypedData({
    domain: omit(domain, '__typename'),
    types: omit(types, '__typename'),
    value: omit(value, '__typename')
  }
  );
  return result;
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export default signedTypeData;
