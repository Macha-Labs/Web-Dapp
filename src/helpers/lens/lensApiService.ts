import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
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
  addr,
  fn
) => {
  // remove the __typedname from the signature!
  let typedData = {
    "domain": omit(domain, "__typename"),
    "types": omit(types, "__typename"),
    "value": omit(value, "__typename"),
    "message": {
      "from": {
        "wallet": addr
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
    console.log(addr);
    return await fn.signMessage([
      addr, 
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