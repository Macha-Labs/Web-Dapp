import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { ethers, utils } from "ethers";
import omitDeep from "omit-deep";

const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};

// have not tested yet, possible area of issue
export const signedTypeData = async (
  domain: TypedDataDomain,
  types: Record<string, any>,
  value: Record<string, any>,
  address: any,
  fn?: any
) => {
  // remove the __typedname from the signature!
  let typedData = {
    "domain": omit(domain, "__typename"),
    "types": omit(types, "__typename"),
    "value": omit(value, "__typename"),
    "message": {
      "from": {
        "wallet": address
      },
      contents: "Posting on Lens"
    }
  }
  let text = JSON.stringify(typedData);
  var message = ethers.utils.toUtf8Bytes(
    "\x19Ethereum Signed Message:\n" + text.length + text
  );
  let msg = ethers.utils.keccak256(message);
  console.log("Here it the typed data message ", msg);
  try {
    console.log(address);
    return await fn.signMessage([
      address, 
      msg
    ]
    );
  } catch (error) {
    console.log("Error in signTypedData", error);
  }
};

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature);
};

export default signedTypeData;