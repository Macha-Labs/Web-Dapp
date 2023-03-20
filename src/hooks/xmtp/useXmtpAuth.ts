import { fetchSigner } from "@wagmi/core";
import { Client } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";

function useXmtpAuth() {
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [xmtpClient, setXmtpClient] = useState<any>();
  const [xmtpLogs, setXmtpLogs] = useState<any>();

  const connectXmtp = async () => {
    const signer = await fetchSigner();
    const xmtp = await Client.create(signer, { env: "production" });
    setXmtpClient(xmtp);
    setXmtpClientAddress(xmtp.address);
    setXmtpLogs(xmtp?.conversations?.stream())
    console.log("connected to XMTP");
  };


  return {
    connectXmtp,
    xmtpClient,
    xmtpClientAddress,
    xmtpLogs,
  };
}

export default useXmtpAuth;
