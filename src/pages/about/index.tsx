import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {Landing} from "../../components/icons/IconImage";

function about() {
  return (
    <>
      <div className="d-flex flex-column h-100 text-center bodyBackground">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top py-3 navBar pt-md-4 pb-md-2">
          <div className="container-fluid d-flex flex-column flex-md-row align-items-center">
            <div className=" d-flex flex-column flex-md-row">
              <div className="col">
                <Link href="/landing">
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
              <ul className="navbar-nav d-flex justify-content-center align-items-center flex-row mt-2 mt-md-0">
                <li className="nav-item">
                  <Link
                    className="nav-link  d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 navigationBold"
                    href="/landing"
                  >
                    Platform
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link hiring d-flex flex-column justify-content-center align-items-center mt-1 mt-md-0 ms-md-3 mx-2 navigationBold"
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
                  <Link className="text-muted" href="#">
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
        <div className="row justify-content-center sectionSpacing paddingBox">
          <div className="col mt-5">
            <h1 className="subHeading mt-5">Building Web3 At</h1>
          </div>
        </div>

        <div className="mb-md-5 mb-2 paddingBox">
          <h1 className="m-0 display-3 heading">
            <strong>
              <span className="highlight">MetaWork Labs</span>
            </strong>
          </h1>
        </div>
        <div className="pt-md-3 d-flex justify-content-center">
          {/* <Image
            // className="asdf"
            height={123}
            width={1121}
            src="/assets/docs.png"
            alt="metawork_chat"
          /> */}
          <Landing path="aboutUs.png" className="px-3 px-md-0 mb-2 mb-md-0" />
          {/* <img
            className="backedByImg"
            src="/assets/docs.png"
            alt="protocolLabs"
          /> */}
        </div>
        <div className="row d-flex justify-content-center mt-md-5 paddingBox">
          <p className="aboutPara">
            <strong>MetaWork Labs</strong> began with the simple idea of
            empowering people and society, and thus we have come together to
            co-create products and infras with Web3 technology. As Link part of our
            journey, we have built Link web3 native workspace suit and made its
            first product live. Stay tuned, for other interesting projects to be
            released this year.
          </p>
        </div>
        <div className="mt-5 d-flex  flex-column align-items-center align-items-md-start paddingBox">
          <div className="d-flex flex-column align-items-center align-items-md-start mb-3">
            <h1 className="h4 ">Backed By</h1>
            <h3 className="h4 ">Leading Accelerator & Protocol</h3>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className=" d-flex justify-content-center backgroundDarkCard px-3 borderBox me-md-5">
              <img
                className="backedByImg"
                src="./assets/protocolLabs.png"
                alt="protocolLabs"
              />
            </div>
            <div className=" d-flex justify-content-center backgroundDarkCard px-3 borderBox mt-3 mt-md-0">
              <img
                className="backedByImg"
                src="./assets/Longhash.png"
                alt="longhash"
              />
            </div>
          </div>
        </div>
        <div className="sectionSpacing paddingBox d-flex flex-column align-items-center align-items-md-start">
          <h3
            className="subSectionHeading d-flex mb-md-5"
            style={{ fontWeight: "600" }}
          >
            Build By Team
          </h3>
          <div>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/avatar_saksham.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Saksham Jain </h4>
                  <h5 className="teamMembersSubHeading">Founder & CEO</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/mukesh.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Mukesh Godara </h4>
                  <h5 className="teamMembersSubHeading">Marketing</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/aditya.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Aditya Singh </h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers mt-3 me-md-3 ">
                <img src="./assets/shubhra.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Shubhra Agarwal</h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>

              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/sneha.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Sneha Biradar</h4>
                  <h5 className="teamMembersSubHeading">Partnership</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/nikita.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Nikita Saboo</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-md-3  mt-3 ">
                <img src="./assets/surbhi.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Surbhi Singh</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers mt-3 me-md-3 ">
                <img src="./assets/nishika.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Nishika Jain</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>

              <div className="d-flex align-items-center teamMembers me-md-3 mt-3 ">
                <img src="./assets/aakash.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Aakash Taneja</h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers  mt-3 me-md-3 ">
                <img src="./assets/harshil.png" alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Harshil Airen</h4>
                  <h5 className="teamMembersSubHeading">Business</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sectionSpacing paddingBox">
          <h3
            className="subSectionHeading alignLeftText mb-5"
            style={{ fontWeight: "600" }}
          >
            Build By Team
          </h3>
          <div>
            <div className="d-flex flex-wrap">
              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Saksham Jain </h4>
                  <h5 className="teamMembersSubHeading">Founder & CEO</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Mukesh Godara </h4>
                  <h5 className="teamMembersSubHeading">Marketing</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-5">
                <img alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Aditya Singh </h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Shubhra Agarwal</h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>
            </div>
            <div className="d-flex mt-4 flex-wrap">
              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Sneha Biradar</h4>
                  <h5 className="teamMembersSubHeading">Partnership</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Nikita Saboo</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>

              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Surbhi Singh</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Nishika Jain</h4>
                  <h5 className="teamMembersSubHeading">Design</h5>
                </div>
              </div>
            </div>
            <div className="d-flex mt-4 flex-wrap">
              <div className="d-flex align-items-center teamMembers me-5">
                <img  alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Aakash Taneja</h4>
                  <h5 className="teamMembersSubHeading">Engineering</h5>
                </div>
              </div>
              <div className="d-flex align-items-center teamMembers me-5">
                <img alt="avatar" />
                <div className="d-flex flex-column ms-3 align-items-start">
                  <h4 className="teamMembersHeading mb-1">Harshil Airen</h4>
                  <h5 className="teamMembersSubHeading">Business</h5>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="paddingBox">
          <h1 className="mb-1 sectionSpacing display-3 heading alignLeftText">
            <strong>
              <span className="highlight ">We are Hiring</span>
            </strong>
          </h1>
          <h2 className="platformsubheading">
            Be Link part of our team and lets build together
          </h2>
          <img
            src="./assets/ecosystem bottom img.png"
            className="mt-5 ecosystemImage"
            alt="Ecosystem"
          />
        </div>
        <div className="d-flex flex-column flex-md-row mt-5 justify-content-between paddingBox">
          <div className="borderBox d-flex flex-column align-items-start py-3 px-5 backgroundDarkCard ecosystemCard">
            <img
              src="./assets/dark-file.svg"
              className="fileLogo my-3"
              alt="File Icon"
            />
            <h3 className="highlight ecosystemCardHeading">
              Dive Deeper Into MetaWork Labs.
            </h3>
            <p className="ecosystemCardPara my-3 alignLeftText">
              Explore our developer and other community technologies, programs
              and other things that we are building at MetaWork Labs
            </p>
          </div>

          <div className="borderBox d-flex flex-column align-items-start py-3 px-5 backgroundDarkCard ecosystemCard mt-3 mt-md-0">
            <img
              src="./assets/dark-laptop.svg"
              className="fileLogo my-3"
              alt="File Icon"
            />
            <h3 className="highlight ecosystemCardHeading">Open Positions</h3>
            <p className="ecosystemCardPara my-3 alignLeftText">
              Be Link part of Web3 Ecosystem Let’s come together and create an
              Enterprise Grade Decentralized Workspace suit.
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between  flex-column flex-md-row paddingBox">
          <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5 bottomSocialLinks">
            <div className="d-flex align-items-center ">
              <img
                src="./assets/base-twitter.svg"
                className="footerlogoos"
                alt="twitterlogo"
              />
              <h2 className="bottomLinks mt-1 ps-4">Twitter</h2>
            </div>
            <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
          </div>
          <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5 bottomSocialLinks">
            <div className="d-flex align-items-center ">
              <img
                src="./assets/base-medium.svg"
                className="footerlogoos"
                alt="twitterlogo"
              />
              <h2 className="bottomLinks mt-1 ps-4">Medium</h2>
            </div>
            <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
          </div>
          <div className="d-flex justify-content-between borderBox py-4  px-4 backgroundDarkCard mt-3 mt-md-5 bottomSocialLinks">
            <div className="d-flex align-items-center ">
              <img
                src="./assets/base-github.svg"
                className="footerlogoos"
                alt="twitterlogo"
              />
              <h2 className="bottomLinks mt-1 ps-4">Github</h2>
            </div>
            <img src="./assets/base-blue-ArrowRight.svg" alt="arrow" />
          </div>
        </div>
        <footer className="d-flex justify-content-between align-items-center sectionSpacing paddingBox">
          <img
            src="./assets/metawork-image-text logo.svg"
            alt="MetaworkImg"
            className="footerLogoMetaworks"
          />
          <h4 className="footerText">Copyright Metawork Labs PTE LTD</h4>
        </footer>
      </div>
      <style jsx>{`
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
          font-size: 34px;
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
          border: 1px solid #246bfd;
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
          border-radius: 14px;
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
          font-size: 116px;
          font-weight: 600;
          line-height: 100px;
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
          padding: 25px 20px;
          width: 300px;
        }
        .partnersImg {
          height: 62px;
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
          width: 300px;
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
          width: 60%;
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
          text-align: left;
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
            width: 200px;
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
          .partners1stContainer {
            width: 320px;
          }
          .heroHeading {
            font-size: 40px;
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
            width: 150px;
            height: 60px;
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
            text-align: center;
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
}
export default about;
