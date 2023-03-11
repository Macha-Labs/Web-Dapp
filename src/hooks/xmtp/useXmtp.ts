import React, { useEffect, useState } from "react";
import { Client, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { fetchSigner } from "@wagmi/core";

function useXmtp() {
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [xmtpClient, setXmtpClient] = useState<any>();

  const connectXmtp = async () => {
    const signer = await fetchSigner();
    const xmtp = await Client.create(signer, { env: "production" });
    setXmtpClient(xmtp);
    setXmtpClientAddress(xmtp.address);
  };

  return {
    connectXmtp,
    xmtpClient,
    xmtpClientAddress,
  };
}

export default useXmtp;
