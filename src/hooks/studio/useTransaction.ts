import { useEffect, useState } from "react";
import { transactionData } from "@/service/ApiService";
import { ethers } from "ethers";

const useTransaction = () => {
  const [transactionDetails, setTransactionDetails] = useState<any>();
  const [methodParams, setMethodParams] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = async (transactionHash: any) => {
    transactionData(transactionHash).then((res: any) => {
      console.log("contract not", res);
      setIsLoading(false);
      setTransactionDetails([
        {
          key: "Block Hash",
          value: res.data[0].transaction.block_hash,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Block%20hash.svg?updatedAt=1689916345836",
        },
        {
          key: "Block Number",
          value: res.data[0].transaction.block_number,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Block%20number.svg?updatedAt=1689916347507",
        },
        {
          key: "Gas Used	",
          value: res.data[0].transaction.gas_used,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-gas-used.svg?updatedAt=1689916350375",
        },
        {
          key: "Gas Price	",
          value: parseInt(res.data[0].transaction.gas_price,16),
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-gas-price.svg?updatedAt=1689916350473",
        },
        {
          key: "From",
          value: res.data[0].transaction.from,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-from.svg?updatedAt=1689916350154",
        },
        {
          key: "To",
          value: res.data[0].transaction.to,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-to.svg?updatedAt=1689916345659",
        },
        {
          key: "Txn Hash	",
          value: res.data[0].transaction.txn_hash,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-Txn%20Hash.svg?updatedAt=1689916345026",
        },
        {
          key: "Method Name",
          value: res.data[0].transaction.method_name,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-method%20name.svg?updatedAt=1689916350456",
        },
        {
          key: "Method Id",
          value: res.data[0].transaction.method_id,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-method-id.svg?updatedAt=1689916345583",
        },
        {
          key: "Status",
          value: res.data[0].transaction.status,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-status.svg?updatedAt=1689916345160",
        },
        {
          key: "Time Stamp",
          value: res.data[0].timestamp,
          src: "https://ik.imagekit.io/metaworkLabs/icons/svg/miscellaneous_icons/coloured-square-timestamp.svg?updatedAt=1689916345664",
        },
      ]);
      setMethodParams(res.data[0].transaction.method_params);
    });
  };

  return {
    transactionDetails: transactionDetails,
    methodParams: methodParams,
    isLoading: isLoading,
    _fetch: _fetch,
  };
};

export default useTransaction;
