export const helperIPFS = (ipfsLink: any) => {
  if (ipfsLink && ipfsLink.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${ipfsLink.split("ipfs://")[1]}`;
  }
  return ipfsLink;
};

export const truncateString = (address: any, size: any) => {
  if (address?.length > size) {
    return address.slice(0, size) + "...";
  }
  return address;
};

export const truncateAddress = (address: any) => {
  if (address?.length > 6) {
    return address?.slice(0, 6) + "..." + address?.slice(-4);
  }
  return address;
};
export const truncateLink = (address: any) => {
  if (address) {
    return address.slice(0, 10) + "..." + address.slice(-4);
  }
  return "";
};

const helperFile = async (e: any) => {
  const filePicked = e.target.files[0];
};

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

export const setDate = (d: string) => {
  const date = Date.parse(d);
  const milliDate = new Date(date);
  return milliDate.toLocaleDateString();
};

export const getItemFromLocal = (key: string) => {
  return localStorage.getItem(key);
};

export const setItemOnLocal = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const timeStampConversion = (unix_timestamp: any) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  if (!isNaN(date.getTime())) {
    let convertedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);

    let convertedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })?.format(date);

    return {
      date: convertedDate,
      time: convertedTime,
    };
  } else {
    return {
      date: "Jul 28, 2023",
      time: "10:59 AM",
    };
  }
};

export const UtcTimeStampConversion = (utc_time: any) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(utc_time);
  if (!isNaN(date.getTime())) {
    let convertedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);

    let convertedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })?.format(date);

    return {
      date: convertedDate,
      time: convertedTime,
    };
  } else {
    return {
      date: "Jul 28, 2023",
      time: "10:59 AM",
    };
  }
};
