import { Web3Storage } from "web3.storage";
import { config } from "@/config";

export const getAccessToken = () => {
  return config.WEB3STORAGE_TOKEN
}

export const makeStorageClient = () => {
  return new Web3Storage({ token: config.WEB3STORAGE_TOKEN, endpoint: new URL('https://api.web3.storage') })
}

export const makeFileObjects = async (objectBody: any) => {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!

  // const obj = { hello: 'world' }
  const blob = new Blob([JSON.stringify(objectBody)], { type: 'application/json' })

  const files = [
    new File([blob], 'file.json')
  ]

  return await uploadAtIpfsRoot(files);
}

export const storeFiles = async (files: any) => {
  const client = makeStorageClient();
  return client.put(files);
}

export const uploadAtIpfsRoot = (files: any) => {
  const client = makeStorageClient();
  return client.put(files, { wrapWithDirectory: false });
}