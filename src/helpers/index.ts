export const helperIPFS = (ipfsLink: any) => {
  if (ipfsLink && ipfsLink.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${ipfsLink.split("ipfs://")[1]}`;
  }
  return ipfsLink;
};

export const truncateString = (address: any, size: any) => {
  if (address) {
    return address.slice(0, size) + "...";
  }
  return "";
};

export const truncateAddress = (address: any) => {
  if (address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
  return "";
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
