import { Network } from "alchemy-sdk";

const chains: any = {
  1: {
    chainName: "Ethereum",
    chainImage: "logo-Ethereum",
    about: `Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet.`,
    team: [
      {
        name: "Vitalik Buterin",
        designation: "Founder",
      },
      {
        name: "Péter Szilágyi",
        designation: "Core Developer",
      },
      {
        name: "Aya Miyaguchi",
        designation: "Executive Director",
      },
    ],
    rpcUrl: "https://mainnet.infura.io/v3/",
    links: [
      {
        title: "github.com/ethereum",
        link: "https://github.com/ethereum",
      },
      {
        title: "Discord",
        link: "https://discord.gg/CetY6Y4",
      },
      {
        title: "Reddit",
        link: "https://www.reddit.com/r/ethereum",
      },
      {
        title: "Twitter",
        link: "https://twitter.com/ethereum",
      },
      {
        title: "ethereum.foundation",
        link: "https://ethereum.foundation/",
      },
      {
        title: "ethereum.org",
        link: "https://ethereum.org/en/",
      },
    ],
    wallets: [
      {
        title: "Trust Wallet",
        link: "https://trustwallet.com/",
      },
      {
        title: "Zerion",
        link: "https://zerion.io/",
      },
      {
        title: "Tally Ho",
        link: "https://tallyho.org/",
      },
      {
        title: "Coinbase Wallet",
        link: "https://wallet.coinbase.com/",
      },
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
      {
        title: "Safe",
        link: "https://safe.global/",
      },
    ],
    alchemyChain: Network.ETH_MAINNET
  },
  137: {
    chainName: "Polygon",
    chainImage: "logo-Polygon",
    about: `Polygon is a web3 scaling platform that allows developers to build secure high-throughput apps on Ethereum while minimizing costs to end-users.`,
    team: [
      {
        name: "Jaynti Kanani",
        designation: "Co-Founder",
      },
      {
        name: "Sandeep Nailwal",
        designation: "Co-Founder",
      },
      {
        name: "Anurag Arjun",
        designation: "Co-Founder",
      },
      {
        name: "Mihailo Bjelic",
        designation: "Co-Founder",
      },
      {
        name: "David Schwartz",
        designation: "Co-founder, Polygon ID & Polygon Hermez",
      },
      {
        name: "Jordi Baylina",
        designation: "Co-founder, Polygon ID & Polygon Hermez",
      },
      {
        name: "Antoni Martin",
        designation: "Co-founder, Polygon ID & Polygon Hermez",
      },
      {
        name: "Brendan Farmer",
        designation: "Co-founder, Polygon Zero",
      },
      {
        name: "Daniel Lubarov",
        designation: "Co-founder, Polygon Zero",
      },
      {
        name: "Bobbin Threadbare",
        designation: "Co-founder, Polygon Miden",
      },
    ],
    rpcUrl: "https://polygon-rpc.com",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/0xPolygon",
      },
      {
        title: "polygon.technology",
        link: "https://polygon.technology/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.MATIC_MAINNET
  },
  10: {
    chainName: "Optimism",
    chainImage: "logo-Optimism",
    about: `OP Mainnet is a Layer 2 Optimistic Rollup network designed to utilize the strong security guarantees of Ethereum while reducing its cost and latency.`,
    team: [],
    rpcUrl: "https://optimism.meowrpc.com",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/optimismWeb3",
      },
      {
        title: "optimism.io",
        link: "https://www.optimism.io/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.OPT_MAINNET
  },
  8453: {
    chainName: "Base",
    chainImage: "logo-Base",
    about: `Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.`,
    team: [],
    rpcUrl: "https://base.publicnode.com",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/BuildOnBase",
      },
      {
        title: "base.org",
        link: "https://base.org/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.ETH_GOERLI
  },
  314: {
    chainName: "Filecoin Mainnet",
    chainImage: "logo-filecoin",
    about: `Mainnet is the live production network that all nodes on the Filecoin network are connected to. It never resets.`,
    team: [],
    rpcUrl: "https://api.node.glif.io",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/Filecoin",
      },
      {
        title: "filecoin.io",
        link: "https://filecoin.io/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.ETH_GOERLI
  },
  314159: {
    chainName: "Filecoin Calibration Testnet",
    chainImage: "logo-filecoin",
    about: `The Filecoin testnet is a live test network for interoperable implementations of the Filecoin protocol.`,
    team: [],
    rpcUrl: "https://filecoin-calibration.chainup.net/rpc/v1",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/Filecoin",
      },
      {
        title: "filecoin.io",
        link: "https://filecoin.io/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.ETH_GOERLI
  },
  80001: {
    chainName: "Polygon Mumbai Testnet",
    chainImage: "logo-Polygon",
    about: `The Polygon testnet is a live test network for interoperable implementations of the Polygon protocol.`,
    team: [],
    rpcUrl: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
    links: [
      {
        title: "Twitter",
        link: "https://twitter.com/0xPolygon",
      },
      {
        title: "polygon.technology",
        link: "https://polygon.technology/",
      },
    ],
    wallets: [
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
    ],
    alchemyChain: Network.MATIC_MUMBAI
  },
  5: {
    chainName: "Goerli",
    chainImage: "logo-Ethereum",
    about: `Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet.`,
    team: [
      {
        name: "Vitalik Buterin",
        designation: "Founder",
      },
      {
        name: "Péter Szilágyi",
        designation: "Core Developer",
      },
      {
        name: "Aya Miyaguchi",
        designation: "Executive Director",
      },
    ],
    rpcUrl: "https://ethereum-goerli.publicnode.com",
    links: [
      {
        title: "github.com/ethereum",
        link: "https://github.com/ethereum",
      },
      {
        title: "Discord",
        link: "https://discord.gg/CetY6Y4",
      },
      {
        title: "Reddit",
        link: "https://www.reddit.com/r/ethereum",
      },
      {
        title: "Twitter",
        link: "https://twitter.com/ethereum",
      },
      {
        title: "ethereum.foundation",
        link: "https://ethereum.foundation/",
      },
      {
        title: "ethereum.org",
        link: "https://ethereum.org/en/",
      },
    ],
    wallets: [
      {
        title: "Trust Wallet",
        link: "https://trustwallet.com/",
      },
      {
        title: "Zerion",
        link: "https://zerion.io/",
      },
      {
        title: "Tally Ho",
        link: "https://tallyho.org/",
      },
      {
        title: "Coinbase Wallet",
        link: "https://wallet.coinbase.com/",
      },
      {
        title: "Metamask",
        link: "https://metamask.io/",
      },
      {
        title: "Safe",
        link: "https://safe.global/",
      },
    ],
    alchemyChain: Network.ETH_GOERLI
  },
};

export default chains;
