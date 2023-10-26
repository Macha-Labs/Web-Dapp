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
    const logs = await xmtp?.conversations?.stream();
    setXmtpLogs(logs);
    //console.log("connected to XMTP");
  };


  return {
    connectXmtp: connectXmtp,
    xmtpClient: xmtpClient,
    xmtpClientAddress: xmtpClientAddress,
    xmtpLogs: xmtpLogs,
  };
}

export default useXmtpAuth;
