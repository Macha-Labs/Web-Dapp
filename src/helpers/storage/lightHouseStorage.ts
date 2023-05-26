import lighthouse from "@lighthouse-web3/sdk";
import { config } from "@/config/index";

const progressCallback = (progressData: any) => {
  // let percentageDone: any = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
  console.log(progressData);
};

export const deploytoLightHouse = async (e: any) => {
  // Push file to lighthouse node
  // Both file and folder supported by upload function
  const output = await lighthouse.upload(
    e,
    config.LIGHTHOUSE_API_KEY,
    progressCallback
  );
  console.log("File Status:", output);
  /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

  console.log(
    "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
  );
  return output.data.Hash;
};

export const displayImage = (cid: string) => {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
};
