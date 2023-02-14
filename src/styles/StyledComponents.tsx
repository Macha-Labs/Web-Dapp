import { style } from "./StyledConstants";
import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;

  &.vr-start {
    align-items: start;
  }

  &.vr-center {
    align-items: center;
  }

  &.hr-center {
    justify-content: center;
  }

  &.hr-between {
    justify-content: space-between;
  }

  &.hr-end {
    justify-content: end;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  &.hr-center {
    align-items: center;
  }

  &.vr-between {
    justify-content: space-between;
  }

  &.vr-center {
    justify-content: center;
  }

  &.vr-end {
    justify-content: flex-end;
  }
`;

export const Main = styled.div`
  min-height: 100vh;
  width: ${style.widthMain};
  margin-left: ${style.marginMain};
  margin-top: ${style.marginMainTop};
  // padding: ${style.paddingMain};
  background: ${style.bgLayout.secondry};

  .link-style-none {
    text-decoration: none;
  }

  @media screen and (max-width: 480px) {
    width: ${style.mob.widthMain};
    margin-left: ${style.mob.marginMain};
    // padding: ${style.mob.paddingMain};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${style.colorH};
  }
  p {
    color: ${style.colorP};
  }
`;

export const Section = styled.div`
  width: ${style.widthSection};
  margin: auto;
  margin-bottom: 5rem;
  text-align: left;

  &.md {
    width: 60%;
  }

  @media screen and (max-width: 480px) {
    width: ${style.mob.widthSection};
    margin-bottom: 3rem;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  .list-item {
    width: ${style.widthCardList};
    list-style: none;

    &.fit-content {
      width: fit-content;
    }
    &.fit-full {
      width: 100%;
    }
    &::first-child {
      margin-left: -5px;
    }
    @media screen and (max-width: 480px) {
      width: ${style.mob.widthCardList};
    }
  }
  &.span-1 {
    .list-item {
      width: calc(100% / 1);
    }
  }
  &.span-2 {
    .list-item {
      width: calc(100% / 2);
    }
  }
  &.span-3 {
    .list-item {
      width: calc(100% / 3);
    }
  }
  &.span-4 {
    .list-item {
      width: calc(100% / 4);
    }
  }
  &.span-5 {
    .list-item {
      width: calc(100% / 5);
    }
  }
  &.span-6 {
    .list-item {
      width: calc(100% / 6);
    }
  }
`;
export const Nav = styled.div`
  width: 5%;
  height: 100vh;
  background: #00042c;
  position: fixed;
  left: 0;
  border-right: 1px solid rgba(247, 248, 248, 0.1);

  .header {
    height: 55px;
    padding: 0px;
  }

  .body {
    padding: 10px 0px;
    height: calc(100% - 55px);
  }

  .footer {
    padding: 10px 0px;
  }
`;
export const Placeholder = styled.div`
  border: ${style.borderPlaceholder};
  border-radius: ${style.borderRadius};
  background: ${style.bgPlaceholder};
  padding: ${style.paddingCard};
  min-height: ${style.heightPlaceholder};
`;

export const Pallet = styled.div`
  width: 100%;
  border: ${style.borderPallet};
  border-radius: ${style.borderRadius};
  background: none;
  padding: ${style.paddingCard};
`;

export const Pannel = styled.div`
  border: ${style.borderPannel};
  border-radius: ${style.borderRadiusCard};
  box-shadow: ${style.shadowPannel};
  .header {
    background: ${style.bgPannelHeader};
    padding: ${style.paddingPannel};
    border-radius: ${style.borderRadiusCard};
  }

  .body {
    padding: ${style.paddingPannelBody};
    min-height: 200px;
  }
`;

export const Banner = styled.div`
    padding: ${style.paddingBanner};
    border-radius: 5px;
    height: ${style.heightCover};
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position relative;

    @media screen and (max-width: 480px) {
        padding: ${style.mob.paddingBanner};
        height: ${style.mob.heightBanner};
    }
`;

export const Logo = styled.img`
  width: ${style.sizeLogo};
  height: ${style.sizeLogo};
  border: ${style.border};
  border-radius: 50% !important;
  cursor: pointer;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;

  @media screen and (max-width: 480px) {
    width: ${style.mob.sizeLogo};
    height: ${style.mob.sizeLogo};
  }

  &.sm {
    width: ${style.sizeLogoSmall};
    height: ${style.sizeLogoSmall};

    @media screen and (max-width: 480px) {
      width: ${style.mob.sizeLogoSmall};
      height: ${style.mob.sizeLogoSmall};
    }
  }

  &.lg {
    width: ${style.sizeLogoLarge};
    height: ${style.sizeLogoLarge};

    @media screen and (max-width: 480px) {
      width: ${style.mob.sizeLogoLarge};
      height: ${style.mob.sizeLogoLarge};
    }
  }
`;

export const Cover = styled.div`
  background: #f0f4fa;
  padding: ${style.paddingCover};
  border-radius: 5px;
  height: ${style.heightCover};
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    height: ${style.mob.heightCover};
  }

  .intro {
    align-items: center;
    .intro-main {
      align-items: center;
      @media (max-width: 767px) {
        flex-direction: column;
      }
      .info {
        display: flex;
        margin-left: 20px;
        text-align: center;
        justify-content: center;
        @media (max-width: 767px) {
          margin: auto;
        }

        h2 {
          @media (max-width: 480px) {
            margin: auto;
          }
        }
      }
    }

    .intro-cta {
      justify-content: end;
      display: flex;
      align-items: center;
    }
  }
`;
export const Icon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  width: fit-content;
  background: ${style.bgIcon.default};
  border-radius: ${style.borderRadiusIcon};

  &:hover {
    background: ${style.bgIcon.hover};
  }
  &.active {
    background: ${style.bgIcon.active};
  }

  &.scale {
    &:hover {
      transform: scale(1.1);
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      transition: all 0.5s;
    }
  }

  &.squared {
    border-radius: 5px;
    padding: 10px;
  }

  &.circled {
    border-radius: 50%;
  }

  &.sm {
    width: ${style.sizeIconSmall};
    height: ${style.sizeIconSmall};
  }
`;

export const LinkContainer = styled.div`
  width: -webkit-fill-available;

  .link {
    text-decoration: none;
    color: #333;
  }
`;


export const StyledNav = styled.div`
  width: 5%;
  height: 100vh;
  background: #00042c;
  position: fixed;
  left: 0;
  border-right: 1px solid rgba(247, 248, 248, 0.1);

  .header {
    height: 55px;
    padding: 0px;
  }

  .body {
    padding: 10px 0px;
    height: calc(100% - 55px);
  }

  .footer {
    padding: 10px 0px;
  }
`;

//
export const ConversationView = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 3rem;

    ::-webkit-scrollbar {
        display: none;
    }
    .emogiPicker {
        background-color: black;
    }
`

export const StyledConversationContainer = styled.div`
    height: -webkit-fill-available;
    position: absolute;
    width: 100%;
`

export const StyledConversation = styled(Col)`
    cursor: pointer;
    padding: 15px 15px;
    position: relative;
    opacity: 0.75;
    cursor: pointer;

    &:hover {
        opacity: 1;
        background: ${style.bg4};
        .action {
            display: block;
            color: red;
        }
    }
    
    .replyTo {
        margin-left: 60px;
        margin-bottom: 0.5rem;
    }

    .message {
        .action {
            display: none;
            position: absolute;
            top: -10px;
            right: 0;
            padding: 5px;
            border: ${style.borderInput};
            background: #01041f;
            border-radius: 5px;
        }

        // &:hover {
        //     .action {
        //         display: block;
        //     }
        // }

        .inputElement {
            resize: none;
            width: 100%;
            border: none !important;
            background-color: transparent;
            outline: none;
        }
        
    }
`