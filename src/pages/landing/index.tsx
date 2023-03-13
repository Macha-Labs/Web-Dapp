import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Landing } from "../../components/icons/IconImage";

const LandingPage = () => {
  const sliderText = [
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
    "Lens Protocol: 76K Users",
  ];

  return (
    <>
      <div className="d-flex flex-column h-100 text-center bodyBackground">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top py-3 navBar pt-md-4 pb-md-2">
          <div className="container-fluid d-flex flex-column flex-md-row align-items-center">
            <div className=" d-flex flex-column flex-md-row">
              <div className="col">
                <Link href="/">
                  <Image
                    className="headerLogo"
                    src="/assets/metawork-image-text logo.svg"
                    alt="logo"
                    width={170}
                    height={62}
                    // width={246}
                  />
                </Link>
              </div>
              <ul className="navbar-nav justify-content-center d-flex align-items-center flex-row mt-2 mt-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link hiring d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 navigationBold"
                    href="/"
                  >
                    Product
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link  d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 navigationBold"
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center" id="">
              <div className="row overflow-hidden flex-md-row position-relative mx-2 hideOnMobile">
                <div className="column align-items-center">
                  <Link
                    className="text-muted"
                    href="https://twitter.com/metaworklabs"
                    target="_blank"
                  >
                    <img
                      className="twitterLogo"
                      src="/assets/brand-twitter.svg"
                      alt="twitter"
                    />
                  </Link>
                </div>
              </div>
              <Button variant="state_brand">Beta Soon</Button>
            </div>
          </div>
        </nav>

        <div className="container-fluid g-0 d-flex w-100 h-100 mt-5 mt-md-0 flex-column paddingBox2">
          <div className="d-flex justify-content-center align-items-center">
            <div className="desktopHero ">
              <div className="col mt-md-5">
                <h1 className="heroHeading highlight alignLeftText">
                  Web3 HQ <br /> For Teams & Guilds{" "}
                </h1>
                <div className="heroPara mt-5">
                  <p className=" mb-4 mb-md-0">
                    Private and Secured Decentralized - Workspace Suite inbuilt
                    with encryption and token gating technologies for Teams,
                    Enterprises, and Guilds
                  </p>
                </div>
              </div>
              <div className="column d-flex justify-content-end">
                <img
                  className="img-fluid"
                  src="./assets/heroimage.png"
                  alt="metawork_chat"
                />
              </div>
            </div>
            <div className="mobileHero">
              <div className="col mt-5">
                <h1 className="heroHeading highlight mt-5">
                  Web3 HQ <br /> For Teams & Guilds{" "}
                </h1>
              </div>
              <div className="column d-flex justify-content-end">
                <img
                  className="img-fluid"
                  src="./assets/heroimagemobile.png"
                  alt="metawork_chat"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row paddingBox justify-content-between align-items-center mt-md-5 w-100">
          <div className="heroPara hideOnDesktop">
            <p className=" mb-4 mb-md-0">
              Private and Secured Decentralized - Workspace Suit inbuilt with
              encryption and token gating technologies for Teams, Enterprises,
              and Guilds
            </p>
          </div>
          {/* <div>
            <button className="btn btn-dark-blue ps-4 pe-2 d-flex justify-content-between align-items-center">
              <Text> Download App</Text>
              <img
                src="./assets/base-chevronNext.svg"
                className="ms-md-4 ms-2 chevron"
                alt="asdf"
              />
            </button>
          </div> */}
        </div>
        <div className="platform py-md-4 py-2 d-flex flex-wrap flex-row justify-content-between align-items-center sectionSpacing paddingBox">
          <div className="d-flex flex-wrap flex-row justify-content-between align-items-center stripSection flex-grow-1">
            <h1 className="stripHeading">Ed-Tech</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading">Teams</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading">DAOs</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading me-md-3">Enterprises</h1>
          </div>
          <div className="d-flex flex-wrap flex-row justify-content-between align-items-center stripSection flex-grow-1">
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage hideOnMobile"
            />
            <h1 className="stripHeading">Guilds</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading">Events</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading">Social</h1>
            <img
              src="/assets/star.svg"
              alt="patform img"
              className="stripImage"
            />
            <h1 className="stripHeading">Startups</h1>
          </div>
        </div>
        <div className="container-fluid g-0 d-flex w-100 h-100  flex-column paddingBox">
          <div className="row justify-content-center sectionSpacing">
            <div className="col">
              <h1 className="subHeading">Secured Decentralized</h1>
            </div>
          </div>
          {/* <div className="mb-md-5 mb-4">
            <h1 className="m-0 display-3 heading">
              <strong>
                <span className="highlight">Web3 Collaboration</span>
              </strong>
            </h1>
          </div> */}
          <div className="mb-md-5">
            <h1 className="m-0 sectionWorkspaceHeading">
              <strong>
                <span className="highlight">Workspace Suit</span>
              </strong>
            </h1>
          </div>
          <div className="mb-md-5 mb-4 d-flex  flex-column flex-md-row justify-content-center align-items-center">
            <div className="d-flex my-3">
              <div className="borderBox d-flex align-items-center p-md-3 p-2 justify-content-center workspaceSuit mx-2 chatBanner">
                <div>
                  <img src="/assets/brand-chat.svg" className="suitIcons" />
                </div>
                <div className="d-flex flex-column ps-3 justify-content-center align-items-center">
                  <h1 className="suitHeading">Chat</h1>
                  <button className="suitButton">Live</button>
                </div>
              </div>
              <div className="borderBox d-flex align-items-center p-md-3 p-2 justify-content-center workspaceSuit mx-2 chatBanner">
                <div>
                  <img src="/assets/brand-drive.svg" className="suitIcons" />
                </div>
                <div className="d-flex flex-column ps-3 justify-content-center align-items-center">
                  <h1 className="suitHeading">Drive</h1>
                  <button className="suitButton">Soon</button>
                </div>
              </div>
            </div>
            <div className="d-flex ">
              <div className="borderBox d-flex align-items-center p-md-3 p-2 justify-content-center workspaceSuit mx-2 chatBanner">
                <div>
                  <img src="/assets/brand-file.svg" className="suitIcons" />
                </div>
                <div className="d-flex flex-column ps-3 justify-content-center align-items-center">
                  <h1 className="suitHeading">Docs</h1>
                  <button className="suitButton">Soon</button>
                </div>
              </div>
              <div className="borderBox d-flex align-items-center p-md-3 p-2 justify-content-center workspaceSuit mx-2 chatBanner">
                <div>
                  <img src="/assets/brand-mail.svg" className="suitIcons" />
                </div>
                <div className="d-flex flex-column ps-3 justify-content-center align-items-center">
                  <h1 className="suitHeading">Mail</h1>
                  <button className="suitButton">Soon</button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 chatBanner borderBox">
            <Landing path="workspaceSuitWeb.png" />
          </div>

          <div className="sectionSpacing">
            <h1 className="m-0 display-3 heading">
              <strong>
                <span className="subHeading">
                  Move From Curent Workspace For
                </span>
              </strong>
            </h1>
          </div>
          <div className="mb-md-5 mb-4">
            <h1 className="m-0 sectionWorkspaceHeading">
              <strong>
                <span className="highlight">Better Privacy & Ownership</span>
              </strong>
            </h1>
          </div>
          <div className="row d-flex justify-content-center">
            <p className="movePara">
              Become a part of new Decentralized workspace with your Social
              Identity, to utilize more private and encrypted chats with secured
              token gating channels and spaces accessed with specific utilities
              assigned in your wallets.
            </p>
          </div>
          <div className="d-flex justify-content-center mt-md-5 mt-4">
            <img src="/assets/web3Messaging.png" alt="tokenngating" />
          </div>

          <div className="d-flex justify-content-md-between mt-md-5 mt-4 mb-md-3 flex-column flex-md-row ">
            <div className="col-md-6 d-flex justify-content-md-start justify-content-center mb-2 ">
              <div className=" overflow-hidden cardGlass position-relative m-0 py-3 px-4">
                <h1 className="highlight mt-3 glassCardHeading">
                  Web3 login with Wallet and Decentralized Identity
                </h1>
                <Landing
                  path="loginImage.png"
                  className="LoginMetaMask p-md-4 pt-2 mt-md-5"
                />
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-md-end justify-content-center mb-2 mt-3 mt-md-0">
              <div className="overflow-hidden cardGlass position-relative m-0 py-3 px-4 d-flex flex-column justify-content-start">
                <h1 className="highlight mt-3 glassCardHeading">
                  Showcase the web3 profile with Lens Protocol
                </h1>
                <img
                  src="/assets/lens profile img.png"
                  alt="LoginMetaMask"
                  className="LoginMetaMask p-md-4 pt-3"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-md-between mt-md-5 mt-3 mb-3 flex-column flex-md-row ">
            <div className="col-md-6 d-flex justify-content-md-start justify-content-center mb-2">
              <div className="overflow-hidden cardGlass position-relative m-0 py-3 px-4 ">
                <h1 className="highlight mt-3 glassCardHeading">
                  Join NFT gated channels and participate in conversation
                </h1>
                <img
                  src="/assets/NFT gating img.png"
                  alt="LoginMetaMask"
                  className="LoginMetaMask p-md-4 pt-3"
                />
              </div>
            </div>

            <div className="col-md-6 d-flex mt-3 mt-md-0 justify-content-md-end justify-content-center mb-2">
              <div className="overflow-hidden cardGlass position-relative m-0 py-3 px-4">
                <h1 className="highlight mt-3 glassCardHeading">
                  Share File on IPFS
                </h1>
                <img
                  src="./assets/fileipfs.png"
                  alt="LoginMetaMask"
                  className="LoginMetaMask p-md-4 mt-md-5 pt-3 pt-md-0"
                />
              </div>
            </div>
          </div>
          <div className="hideOnMobile">
            <div className="d-flex justify-content-md-between align-items-center flex-column flex-md-row mt-md-3">
              <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                <img
                  className="Brandlogo"
                  src="./assets/dark-community.svg"
                  alt="metawork_chat"
                />
                <h3 className="mt-md-3 mt-2 cardHeading">
                  Participate in Guilds
                </h3>
              </div>
              <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                <img
                  className="Brandlogo"
                  src="./assets/dark-sheildUser.svg"
                  alt="metawork_chat"
                />
                <h3 className="mt-md-3 mt-2 cardHeading">
                  NFT Profiles
                  <br /> & Avatars
                </h3>
              </div>
              <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                <img
                  className="Brandlogo"
                  src="./assets/dark-sheildCheck.svg"
                  alt="metawork_chat"
                />
                <h3 className="mt-md-3 mt-2 cardHeading">
                  Encrypted Messaging
                </h3>
              </div>
              <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                <img
                  className="Brandlogo"
                  src="./assets/dark-wallet.svg"
                  alt="metawork_chat"
                />
                <h3 className="mt-md-3 mt-2 cardHeading">
                  Secured Crypto Payments
                </h3>
              </div>
            </div>
          </div>
          <div className="hideOnDesktop">
            <div className="d-flex justify-content-md-between align-items-center flex-column flex-md-row mt-md-3">
              <div className="d-flex">
                <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                  <img
                    className="Brandlogo"
                    src="./assets/dark-community.svg"
                    alt="metawork_chat"
                  />
                  <h3 className="mt-md-3 mt-2 cardHeading">
                    Participate in Guilds
                  </h3>
                </div>
                <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                  <img
                    className="Brandlogo"
                    src="./assets/dark-sheildUser.svg"
                    alt="metawork_chat"
                  />
                  <h3 className="mt-md-3 mt-2 cardHeading">
                    NFT Profiles & Avatars
                  </h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                  <img
                    className="Brandlogo"
                    src="./assets/dark-sheildCheck.svg"
                    alt="metawork_chat"
                  />
                  <h3 className="mt-md-3 mt-2 cardHeading">
                    Encrypted Messaging
                  </h3>
                </div>
                <div className="d-flex flex-column align-items-md-start align-items-center divCard mt-4 mt-md-0">
                  <img
                    className="Brandlogo"
                    src="./assets/dark-wallet.svg"
                    alt="metawork_chat"
                  />
                  <h3 className="mt-md-3 mt-2 cardHeading">
                    Secured Crypto Payments
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0 sectionSpacing">
            <div className="d-flex justify-content-center">
              <div className="d-flex justify-content-center">
                <h1 className="subHeading">Teams & Guilds Powered with</h1>
              </div>
            </div>
            <div className="mb-md-5 mb-4">
              <h1 className="m-0 sectionWorkspaceHeading">
                <strong>
                  <span className="highlight">Web3 Collaboration</span>
                </strong>
              </h1>
            </div>

            {/* <div className="d-flex flex-row justify-content-md-between justify-content-center mb-4 flex-wrap">
              <div className="partners">
                <img
                  // className="i"
                  
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/spheron-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/metapaas -white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/lighthouse-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/flaq-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/code8-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/nammaBlockchain-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partners">
                <img
                  // className="i"
                  src="./assets/zebuLive-white.png"
                  alt="metawork_chat"
                />
              </div>{" "}
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="d-flex flex-row justify-content-between mb-4 partnersContainer flex-wrap">
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/trikon-color.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/gamingGeeks-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/wagame-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/codedu-white-horizontal.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/befikra-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners">
                  <img
                    // className="i"
                    src="./assets/codedu-white-horizontal.png"
                    src="./assets/sosTechInc-white.png"
                    alt="metawork_chat"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-md-between justify-content-center flex-wrap">
              <div className="partnersBig d-flex justify-content-center">
                <img
                  className="partnersImg "
                  src="./assets/filecoin-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partnersBig d-flex justify-content-center">
                <img
                  className="partnersImg "
                  src="./assets/lens-color.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partnersBig d-flex justify-content-center">
                <img
                  className="partnersImg "
                  src="./assets/xmtp-white.png"
                  alt="metawork_chat"
                />
              </div>
              <div className="partnersBig d-flex justify-content-center">
                <img
                  className="partnersImg "
                  src="./assets/huddle01-white.png"
                  alt="metawork_chat"
                />
              </div>
            </div> */}
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row justify-content-center mb-md-2 flex-wrap px-md-1 px-md-0 partners1stContainer">
                <div className="partners me-2 mt-md-3">
                  <img
                    // className="i"
                    src="./assets/particleNetwork-color.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-md-3 me-md-2">
                  <img
                    // className="i"
                    src="./assets/spheron-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-2 mt-3">
                  <img
                    // className="i"
                    src="./assets/metapaas -white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 me-md-2">
                  <img
                    // className="i"
                    src="./assets/lighthouse-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-2 mt-3">
                  <img
                    // className="i"
                    src="./assets/flaq-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 me-md-2">
                  <img
                    // className="i"
                    src="./assets/code8-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-2 mt-3">
                  <img
                    // className="i"
                    src="./assets/nammaBlockchain-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 me-md-2">
                  <img
                    // className="i"
                    src="./assets/zebuLive-white.png"
                    alt="metawork_chat"
                  />
                </div>

                <div className="partners me-2 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/trikon-color.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/gamingGeeks-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-2 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/wagame-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/codedu-white-horizontal.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-2 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/befikra-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partners me-0 mt-3 mx-md-1">
                  <img
                    // className="i"
                    src="./assets/sosTechInc-white.png"
                    alt="metawork_chat"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row justify-content-center flex-wrap partners1stContainer">
                <div className="partnersBig d-flex justify-content-center mt-3">
                  <img
                    className="partnersImg "
                    src="./assets/filecoin-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partnersBig d-flex justify-content-center mt-3 mx-3">
                  <img
                    className="partnersImg "
                    src="./assets/lens-color.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partnersBig d-flex justify-content-center mt-3">
                  <img
                    className="partnersImg "
                    src="./assets/xmtp-white.png"
                    alt="metawork_chat"
                  />
                </div>
                <div className="partnersBig d-flex justify-content-center mt-3 mx-3 ">
                  <img
                    className="partnersImg "
                    src="./assets/huddle01-white.png"
                    alt="metawork_chat"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="borderBox p-5 sectionSpacing d-flex backgroundDarkCard">
            <div className="d-flex align-items-start justify-content-center flex-column">
              <h1 className="helpHeading">Want to know more?</h1>
              <p className="alignLeftText helpPara mt-4">
                Schedule a meeting with our team and ask anything about creating
                your own Communities and HQs on MetaWork.
              </p>
              <Link target="_blank" href="https://cal.com/metaworklabs">
                <button className="btn btn-dark-blue mt-4 px-4  d-flex">
                  Schedule Meeting
                </button>
              </Link>
            </div>

            <div className=" me-5 hideOnMobile d-md-flex align-items-md-center">
              <img src="./assets/schedule meeting.png" alt="calender" />
            </div>
          </div>

          <div
            className="d-flex justiWeb3 HQ
For Teafy-content-between  flex-column flex-md-row"
          >
            <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5  bottomSocialLinksWidth">
              <Link
                target="_blank"
                href="https://twitter.com/metaworklabs"
                className=" d-flex flex-grow-1 justify-content-between"
              >
                <div className="d-flex align-items-center ">
                  <img
                    src="./assets/base-twitter.svg"
                    className="footerlogoos"
                    alt="twitterlogo"
                  />
                  <h2 className="bottomLinks mt-1 ps-4">Twitter</h2>
                </div>
                <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
              </Link>
            </div>
            <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5  bottomSocialLinksWidth">
              <Link
                target="_blank"
                href="https://medium.com/@metaworklabs"
                className=" d-flex flex-grow-1 justify-content-between"
              >
                <div className="d-flex align-items-center ">
                  <img
                    src="./assets/base-medium.svg"
                    className="footerlogoos"
                    alt="twitterlogo"
                  />
                  <h2 className="bottomLinks mt-1 ps-4">Medium</h2>
                </div>
                <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
              </Link>
            </div>
            <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5  bottomSocialLinksWidth">
              <Link
                target="_blank"
                href="https://github.com/metaworklabs"
                className=" d-flex flex-grow-1 justify-content-between"
              >
                <div className="d-flex align-items-center ">
                  <img
                    src="./assets/base-github.svg"
                    className="footerlogoos"
                    alt="twitterlogo"
                  />
                  <h2 className="bottomLinks mt-1 ps-4">Github</h2>
                </div>
                <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
              </Link>
            </div>
          </div>
          <footer className="d-flex justify-content-between align-items-center sectionSpacing mb-md-5">
            <img
              src="./assets/metawork-image-text logo.svg"
              alt="MetaworkImg"
              className="footerLogoMetaworks"
            />
            <h4 className="footerText">Copyright Metawork Labs PTE LTD</h4>
          </footer>
        </div>
      </div>
      <style jsx>{`
        .hideOnDesktop {
          display: none;
        }
        .container-fluid {
          padding-right: 0px;
          padding-left: 0px;
        }
        .bodyBackground {
          background-color: #000511;
          color: white;
        }

        .paddingBox {
          padding: 0% 8% 0% 8%;
        }
        .paddingBox2 {
          padding: 6% 0% 0% 8%;
          /* overflow: hidden; */
        }
        .navBar {
          opacity: 1;
          padding: 1% 8%;
          background-color: #000511;
        }

        .metaContainer {
          margin: 10%;
        }

        .buidl {
          padding: 7%;
        }

        .respText {
          margin-top: 5%;
          text-align: start;
        }
        .glassCardHeading {
          font-size: 35px;
          text-align: left;
          font-weight: 600;
        }
        .cardGlass {
          position: relative;
          height: 500px;
          width: 95%;
          background: radial-gradient(
            farthest-corner at 90% 90%,
            #001765,
            rgb(11, 32, 73, 0.15)
          );
          border: 1px solid #246bfd;
          background-blend-mode: lighten;
          backdrop-filter: blur(10px);
          /* Note: backdrop-filter has minimal browser support */
          border-radius: 16px;
        }
        .iconCardGlass {
          position: relative;
          background: radial-gradient(
            farthest-corner at 63% 71%,
            rgba(62, 104, 211, 0.4),
            rgba(7, 71, 190, 0.066)
          );
          background-blend-mode: lighten;
          backdrop-filter: blur(10px);
          /* Note: backdrop-filter has minimal browser support */
          border-radius: 2px;
        }

        .buidlCard {
          padding: 1rem !important;
          height: 7vw;
          width: 14vw;
          border-radius: 4px;
        }

        .buidlCardImg {
          width: 10vw;
        }

        .cardText {
          text-align: start;
          font-size: 1.3vw;
        }
        .footerList {
          justify-content: end;
        }

        /* Images */
        .navImg {
          height: 35px;
        }

        .glassImg {
          width: 70px;
        }

        .outerCircle {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .innerCircle {
          position: absolute;
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          margin: -60px 0px 0px -60px;
          z-index: 3;
        }

        .circleImg {
          height: inherit;
        }

        .sideCircleIcon3 {
          width: 6vw;
          height: 6vw;
        }

        .sideCircleIcon2 {
          position: relative;
          width: 7vw;
          height: 7vw;
        }

        .sideCircleIcon1 {
          position: relative;
          width: 8vw;
          height: 8vw;
        }

        .sideImg1 {
          position: absolute;
          width: 6vw;
          height: 6vw;
        }

        .sideImg2 {
          position: absolute;
          width: 5.5vw;
          height: 5.5vw;
        }

        .sideImg3 {
          position: absolute;
          width: 5vw;
          height: 5vw;
        }

        .metaChat {
          width: 80%;
        }

        .chatBanner {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          overflow: hidden;
          /* border: 10px solid; */
          border-image-slice: 1;
          /* border-width: 2px; */
          border-radius: 30px;
          /* border-image-source: linear-gradient(
    141.09deg,
    rgba(53, 60, 84, 0.5) 11.08%,
    rgba(32, 108, 255, 0.38) 89.68%
  ); */
        }

        .footerImg {
          width: 4vw;
        }

        .footerIcons {
          width: 2vw;
        }

        /* Responsive Fonts */
        .heading {
          font-weight: 700;
        }

        .subHeading {
          font-size: 2vw;
        }
        .glassText {
          font-size: 1.4vw;
          opacity: 0.8;
        }
        .fixBottomText {
          position: absolute;
          bottom: 0;
        }
        .sectionWorkspaceHeading {
          font-size: 72px;
        }

        .highlight {
          background: -webkit-linear-gradient(
            270deg,
            rgb(25, 124, 236),
            rgb(0, 74, 217)
          );
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ecosystemCardHeading {
          font-size: 30px;
          font-weight: 600;
          text-align: left;
        }

        .ecosystemCardPara {
          font-size: 20px;
        }
        .ecosystemCard {
          width: 45%;
        }
        .borderBox {
          border: 1px solid rgba(32, 108, 255, 0.38);
          border-radius: 20px;
        }
        .sectionHeading {
          font-size: 72px;
        }
        .btn {
          font-size: 20px;
          font-weight: 600;
          padding-top: 15px;
          padding-bottom: 15px;
        }
        .btn-dark-blue {
          /* background: #7474BF;  fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            rgb(25, 124, 236),
            rgb(0, 74, 217)
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            rgb(25, 124, 236),
            rgb(0, 74, 217)
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          color: #fff;
          border-radius: 12px;
        }
        .twitterLogo {
          height: 45px;
        }

        .hiring {
          color: #348ac7;
        }

        .subHeading {
          font-size: 36px;
          font-weight: 600;
        }
        .heroHeading {
          font-size: 126px;
          font-weight: 600;
          line-height: 125px;
        }
        .platform {
          background: linear-gradient(
            120deg,
            rgb(15, 38, 119),
            rgb(9, 45, 170),
            rgb(6, 58, 240)
          );
        }
        .sectionSpacing {
          margin-top: 110px;
        }
        .stripHeading {
          font-size: 28px;
          font-weight: 600;
          text-align: left;
        }
        .platformsubheading {
          font-size: 45px;
          font-weight: 600;
          text-align: left;
        }
        .platformCard {
          background: rgb(2, 10, 33, 0.8);
          width: 400px;
          border-radius: 10px;
        }

        .alignLeftText {
          text-align: left;
        }
        .brandLogo {
          height: 30px;
        }
        .fileLogo {
          height: 50px;
        }
        .ecoImage {
          height: 550px;
        }
        .cardHeading {
          font-weight: 600;
          font-size: 30px;
          text-align: left;
        }

        .cardDesc {
          font-size: 20px;
          text-align: left;
        }

        .cardHeading2 {
          font-weight: 600;
          font-size: 36px;
        }

        .cardDesc2 {
          font-size: 24px;
          text-align: left;
        }
        .divCard {
          width: 250px;
        }
        .socialCard {
          width: 370px;
          border-radius: 16px;
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          padding: 25px 30px;
        }

        .partners {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          overflow: hidden;
          border: 2px solid rgba(32, 108, 255, 0.38);
          /* border-image-slice: 1;
  border-width: 2px; */
          border-radius: 10px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 60px;
          /* border-image-source: linear-gradient(
    141.09deg,
    rgba(53, 60, 84, 0.5) 11.08%,
    rgba(32, 108, 255, 0.38) 89.68%
  ); */
        }
        .partnersBig {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          overflow: hidden;
          border: 2px solid rgba(32, 108, 255, 0.38);
          /* border-image-slice: 1;
  border-width: 2px; */
          border-radius: 16px;
          padding: 15px 5px;
          width: 250px;
        }
        .partnersImg {
          height: 48px;
        }
        .partnersContainer {
          width: 75%;
        }
        .bottomLinks {
          font-size: 32px;
          font-weight: 600;
        }
        .backgroundDarkCard {
          background-color: #00081a;
        }

        .buttonCard {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          overflow: hidden;
          border-image-slice: 1;
          border-radius: 10px;
          padding: 20px 30px;
          border: 1px solid rgba(32, 108, 255, 0.38);
        }

        .arrowDarkCard {
          height: 30px;
        }
        .LoginMetaMask {
          width: 100%;
        }

        .subSectionHeading {
          font-size: 30px;
          color: rgb(255, 255, 255, 1);
        }

        .backgroundDarkGradient {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
        }
        .backedByImg {
          width: 30vw;
        }
        .backedByDiv {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          overflow: hidden;
          border: 2px solid rgba(32, 108, 255, 0.38);
          border-radius: 16px;
          padding: 8px 25px;
        }
        .ecosystemImage {
          height: 425px;
        }

        .teamMembers {
          background: linear-gradient(
            120deg,
            rgba(13, 33, 71, 0.66),
            rgba(11, 32, 73, 0.15)
          );
          border: 1px solid rgba(32, 108, 255, 0.38);
          border-radius: 14px;
          padding: 10px;
          width: 281px;
        }

        .teamMembersHeading {
          font-size: 22px;
          font-weight: 600;
        }
        .teamMembersSubHeading {
          font-weight: 600;
          font-size: 18px;
          color: rgb(255, 255, 255, 0.7);
        }
        .heroPara {
          // width: 60%;
          font-size: 24px;
          text-align: left;
        }
        .workspaceSuit {
          width: 190px;
        }
        .suitHeading {
          font-size: 32px;
          font-weight: 600;
          flex: 1;
          align-items: center;
        }
        .suitButton {
          background: linear-gradient(
            120deg,
            rgba(36, 59, 155),
            rgba(36, 59, 135, 0%)
          );
          overflow: hidden;
          border-image-slice: 1;
          border-radius: 10px;
          /* margin-top:3px; */
          padding: 2px 4px;
          font-size: 12px;
          width: 50px;
          /* border: 1px solid rgba(32, 108, 255, 0.38); */
        }
        .movePara {
          font-size: 22px;
          width: 60%;
        }
        .helpHeading {
          font-size: 48px;
          text-align: left;
          font-weight: 600;
        }
        .helpPara {
          font-size: 20px;
          /* font-weight: 600; */
          width: 70%;
        }
        .navigationBold {
          font-weight: 600;
        }
        .mobileHero {
          display: none;
        }
        .desktopHero {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .bottomSocialLinks {
          cursor: pointer;
        }
        .bottomSocialLinksWidth {
          width: 30%;
        }
        .footerText {
          font-size: 20px;
        }
        .chevron {
          width: 29px;
        }

        .aboutPara {
          font-size: 30px;
        }
        .footerlogoos {
          width: 30px;
        }
        /* Media queries */
        /* breakpoints to use
1) below 320px
2) below 768px and above 375px
3) above 1024px
*/
        @media (max-width: 770px) {
          .respText div h1 strong {
            font-size: 50px;
          }
        }

        @media (max-width: 426px) {
          .heroHeading {
            font-size: 10px;
          }
          .respText {
            text-align: center;
          }

          .bodyBackground {
            padding: 0%;
          }

          .sideCircleIcon1,
          .sideCircleIcon2,
          .sideCircleIcon3 {
            width: 70px;
            height: 70px;
          }

          .sideImg1,
          .sideImg2,
          .sideImg3 {
            width: 55px;
            height: 55px;
          }

          .backedByImg {
            width: 38vw;
          }

          .buidlCard {
            height: 19vw;
            width: 37vw;
          }

          .buidlCardImg {
            width: 23vw;
          }

          .metaChat {
            width: 100%;
          }

          .navImg {
            width: 9vw;
          }
          .upperCol {
            margin-bottom: 15px;
          }
          .lowerCol {
            margin-top: 15px;
          }
          .cardText {
            text-align: start;
            font-size: 3.3vw;
          }
          .glassText {
            font-size: 3.4vw;
          }
          .footerList {
            width: 100%;
            justify-content: center;
            font-size: 11px;
          }
          .footerIcons,
          .footerImg {
            width: 6vw;
          }
          .footerName {
            font-size: 5vw;
          }
          .cardGlass {
            width: 100%;
          }
        }

        @media screen and (max-width: 770px) {
          .sectionWorkspaceHeading {
            font-size: 40px;
          }
          .hideOnDesktop {
            display: block;
          }
          .partners1stContainer {
            width: 320px;
          }
          .heroHeading {
            font-size: 50px;
            font-weight: 700;
            line-height: 50px;
          }
          .mobileHero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .desktopHero {
            display: none;
          }
          .heroPara {
            width: 100%;
            font-size: 14px;
            text-align: center;
          }
          .bottomSocialLinks {
            cursor: pointer;
          }
          .bottomSocialLinksWidth {
            width: 100%;
          }
          .footerLogoMetaworks {
            width: 40%;
          }
          .footerText {
            font-size: 10px;
          }
          .hideOnMobile {
            display: none;
          }
          .helpHeading {
            font-size: 24px;
            text-align: left;
            font-weight: 600;
          }
          .helpPara {
            font-size: 16px;
            width: 100%;
          }
          .partnersContainer {
            width: 100%;
          }
          .ecosystemCard {
            width: 100%;
          }
          .paddingBox2 {
            padding: 4% 4% 4% 4%;
            /* overflow: hidden; */
          }
          .paddingBox {
            padding: 0% 4% 0% 4%;
          }
          .btn {
            font-size: 14px;
            font-weight: 600;
            padding-top: 7px;
            padding-bottom: 7px;
          }
          .chevron {
            width: 20px;
          }
          .btn-dark-blue {
            border-radius: 10px;
          }
          .sectionSpacing {
            margin-top: 64px;
          }
          .stripHeading {
            font-size: 16px;
            font-weight: 600;
            text-align: left;
          }
          .stripImage {
            width: 14px;
          }
          .stripsSection {
            width: 100%;
          }
          .suitHeading {
            font-size: 26px;
            font-weight: 600;
            flex: 1;
            align-items: center;
          }
          .suitIcons {
            width: 48px;
          }
          .suitButton {
            border-radius: 10px;
            /* margin-top:3px; */
            padding: 2px 4px;
            font-size: 10px;
            width: 50px;
            /* border: 1px solid rgba(32, 108, 255, 0.38); */
          }
          .workspaceSuit {
            width: 150px;
          }
          .borderBox {
            border-radius: 12px;
          }
          .subHeading {
            font-size: 18px;
            font-weight: 600;
          }
          .movePara {
            font-size: 14px;
            width: 100%;
          }
          .glassCardHeading {
            font-size: 26px;
            text-align: left;
            font-weight: 600;
          }
          .cardGlass {
            position: relative;
            height: auto;
          }
          .cardHeading {
            font-weight: 600;
            font-size: 24px;
            text-align: center;
          }
          .divCard {
            width: 50%;
          }
          .navImg {
            width: 100%;
          }
          .partnersBig {
            width: 290px;
            height: 100px;
            border-radius: 10px;
            padding: 10px;
          }
          .partnersImg {
            height: auto;
          }
          .bottomLinks {
            font-size: 28px;
            font-weight: 600;
          }
          .footerlogos {
            width: 34px;
          }
          .footerArrow {
            width: 50px;
          }
          .aboutPara {
            font-size: 16px;
          }
          .platformsubheading {
            font-size: 18px;
          }
          .ecosystemImage {
            height: auto;
          }
          .ecosystemCardHeading {
            font-size: 24px;
          }
          .ecosystemCardPara {
            font-size: 16px;
          }
          .fileLogo {
            height: 40px;
          }
        }

        @media (min-width: 100px) and (max-width: 374px) {
          .partners {
            margin-left: 40px !important;
            margin-right: 40px !important;
            width: 100% !important;
          }
          .partnersBig {
            margin-left: 40px !important;
            margin-right: 40px !important;
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
};
export default LandingPage;
