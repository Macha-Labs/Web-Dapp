import { fetchSigner } from "@wagmi/core";
import { Client } from "@xmtp/xmtp-js";
import { useState } from "react";

function useXmtpAuth() {
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [xmtpClient, setXmtpClient] = useState<any>();

  const connectXmtp = async () => {
    const signer = await fetchSigner();
    const xmtp = await Client.create(signer, { env: "production" });
    setXmtpClient(xmtp);
    setXmtpClientAddress(xmtp.address);
    console.log("connected to XMTP");
  };

  return {
    connectXmtp,
    xmtpClient,
    xmtpClientAddress,
  };
}

export default useXmtpAuth;
