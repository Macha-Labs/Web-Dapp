export const dataPlugins: any = {
    'lens': {
      heading: "Lens",
      description:
        "Web3 social graph on the Polygon Proof-of-Stake blockchain",
      image: "logo-Lens",
      onClick: () => {},
      bg: "#061201",
      borderColor: "#1f2b11",
      route: "lens"
    },
    'farcaster': {
      heading: "Farcaster",
      description:
        "sufficiently decentralized social network built on Ethereum",
      image: "logo-Farcaster",
      onClick: () => {},
      bg: "#0d0914",
      borderColor: "#2a184d",
      route: "farcaster"
    },
    'mirror': {
      heading: "Mirror",
      description:
        "Home for web3 publishing",
      image: "logo-Mirror",
      onClick: () => {},
      bg: "#000c18",
      borderColor: "#00264f",
      route: "mirror"
    },
    'sound': {
      heading: "Sound.xyz",
      description:
        "Protocol and Tools for empowering artists and collectors",
      image: "logo-Sound.xyz",
      onClick: () => {},
      bg: "#1c1d24",
      borderColor: "#212122",
      route: "sound"
    },
    'poap': {
      heading: "POAP",
      description:
        "POAP, short for Proof of Attendance Protocol allows you to mint memories as digital mementos",
      image: "logo-Poap",
      onClick: () => {},
      bg: "#2b2324",
      borderColor: "#462b2f",
      route: "poap"
    },
};

export const dataPluginsArr = Object.keys(dataPlugins).map((key: string) => dataPlugins[key]);