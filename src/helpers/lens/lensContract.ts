import { ethers } from "ethers";
// import { getSigner } from './lensApiService';

import { lensPeripheryAbi } from "../../contracts/lens/lensPeripheryDataProvider";

export const LENS_HUB_CONTRACT = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";
export const LENS_PERIPHERY_CONTRACT =
  "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f";
export const FOLLOW_NFT_CONTRACT = "0xb0298c5540f4cfb3840c25d290be3ef3fe09fa8c";

// export const lensPeriphery = new ethers.Contract(
//   LENS_PERIPHERY_CONTRACT,
//   lensPeripheryAbi,
//   getSigner()
// );
