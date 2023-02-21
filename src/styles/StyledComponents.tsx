import { style } from "./StyledConstants";
import styled from "styled-components";

export const StyledWindow = styled.div`
  position: fixed;
  width: 100vw;

  .left {
  }

  .right {
    width: calc(100vw - ${style.nav.width});
    position: fixed;
    left: ${style.nav.width};
    display: flex !important;
  }
`;

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

export const RowHover = styled(Row)`
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: ${style.button.bg.default};
    cursor: pointer;
  }
  &.selected {
    background-color: ${style.button.bg.default};
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

//////////////////////////////// Card ////////////////////////////////

export const StyledCard = styled.div`
  border-radius: ${style.card.borderRadius};
  border: ${style.card.border.default};
  background: ${style.card.bg.default};
  padding: ${style.card.padding.default};
  box-shadow: ${style.card.shadow.default};
  cursor: pointer;
  width: 100%;

  .card-body {
    padding: 0px 20px;
  }
  .card-footer {
    padding: 0px 20px;
    padding-top: 10px;
    border-top: 1px solid rgba(247, 248, 248, 0.1);
  }

  &.border {
    border: ${style.card.border.default};
  }

  &.border-with-hover {
    border: ${style.card.border.default};
    &:hover {
      border: ${style.card.border.hover};
    }
  }

  &.locked {
    opacity: 0.4 !important;
  }

  &.state_hover {
    &:hover {
      background: ${style.card.bg.hover};
      border: 1px solid ${style.card.border.hover};
      box-shadow: ${style.card.shadow.hover};
    }
  }
`;

export const StyledCardPannel = styled.div`
  border-radius: ${style.card.borderRadius};
  border: ${style.card.border.default};
  background: ${style.card.bg.default};
  box-shadow: ${style.card.shadow.default};
  cursor: pointer;
  width: 100%;

  .header {
    border-bottom: ${style.card.border.default};
    padding: ${style.paddingCard};
  }

  .body {
  }
  .footer {
    border-top: ${style.card.border.default};
    padding: ${style.paddingCard};
  }
`;

export const StyledNFTCard = styled(StyledCard)`
  width: 250px;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  padding: 2px;

  .content {
    padding: 1rem;
  }
`;

export const StyledFileCard = styled(StyledCard)`
  margin: 5px 0 5px 0;
  padding: 10px;
  border: 1px;
  background: ${style.card.bg.default};
  opacity: 0.8;
  border-radius: 5px;
  width: 50vh;

  .name {
    width: 40vh;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const StyledMessageCard = styled(StyledCard)`
  margin-bottom: 0.5rem;
`;

export const StyledTransactionCard = styled(StyledCard)`
  width: 400px;
  padding: 10px 0px;
  cursor: pointer;
`;

export const StyledPostCard = styled(StyledCard)`
  cursor: pointer;
  padding: 10px 0px;
  img {
    border-radius: ${style.borderRadius};
  }

  .actions {
    width: 100%;

    .buttonCol {
      background: transparent;
    }
  }
`;
export const StyledOptionsCard = styled(StyledCard)`
  padding: 0px;
  .item {
    padding: 10px;
    &:hover {
      background: ${style.button.bg.hover};
    }
  }
`;

//////////////////////////////// Input ////////////////////////////////
export const StyledInput = styled.div`
  width: 100%;
  border-radius: 5px;
  background: ${style.card.bg.default};
  border: ${style.card.border.default};
  margin-bottom: 5px;
  padding: 0.5rem;
`;

//

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
  box-shadow: ${style.pannel.shadow.default};
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
export const StyledIcon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  background: ${style.icon.bg.default};
  border-radius: ${style.icon.borderRadius};
  box-shadow: ${style.icon.shadow.default};

  &.state_hover {
    background: ${style.icon.bg.hover};
    &:hover {
      box-shadow: ${style.icon.shadow.hover};
    }
  }
  &.state_active {
    background: ${style.icon.bg.active};
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
  width: ${style.nav.width};
  height: 100vh;
  background: ${style.nav.bg.default};
  position: fixed;
  left: 0;
  border-right: ${style.nav.border.default};

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

//////////////////////////////// Chat ////////////////////////////////

// export const StyledUl = styled.ul`
//   border:"1px solid red";
// `

export const StyledChatList = styled.div`
  width: 25%;
  height: 100vh;
  background: ${style.bgMain};
  border-right: ${style.header.border.default};

  .body {
    height: calc(100vh - 55px);
    width: 100%;
    margin: auto;
    padding: ${style.body.padding}
    background: ${style.card.bg.default};

    .menu-heading {
      padding-left: 10px;
      padding-right: 10px;
    }

    .menu-item {
      text-align: start;
      padding: 10px;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .footer {
    border-right: 1px solid rgba(247, 248, 248, 0.1);
    padding: 20px 10px;
    width: 100%;
    background: ${style.card.bg.default};
  }

  .header {
    height: 55px;
    padding: 0px 10px;
    background: ${style.header.bg.default};
    border-bottom: ${style.header.border.default};
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledChat = styled.div`
  width: 75vw;
  height: 100vh;
  background: ${style.body.bg.default};
  position: relative;

  &.full {
    width: calc(75% + 20px);
  }

  &.expand {
    width: 95%;
    left: 5%;
  }

  .padded-content {
    padding: 0px 10px;
    padding-bottom: 50px;
    height: -webkit-fill-available;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .header {
    height: 55px;
    padding: 0px 10px;
    background: ${style.header.bg.default};
    border-bottom: ${style.header.border.default};
  }

  .body {
    overflow: inherit;
    padding: 20px 0px;
    height: calc(100vh - 55px);
  }
`;
export const StyledChatItem = styled(Row)`
  text-align: start;
  align-items: center;
  justify-content: flex-start;  
  .settingsIcon {
    display: none;
  }

  &:hover {
    .settingsIcon {
      display: inline;
    }
  }
`;

export const ChatPreviewCard = styled(StyledCard)`
  margin-bottom: 0.5rem;
  height: 200px;

  .template-body {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const StyledChatPreview = styled.div`
  background: ${style.card.bg.default};
  border: ${style.card.border.default};
  border-radius: 2px 2px 0px 0px;
  padding: 0.5rem 0.5rem;

  .attachment {
    display: hidden;
    padding: 10px;

    &.show {
      display: block;
    }
  }

  .reply {
    padding: 10px 5px 10px 5px;
    font-size: 10px;
  }
`;
export const StyledChatInputContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 5px 10px;
`;

export const StyledChatInput = styled(Row)`
  width: 100%;
  border-radius: 5px;
  background: ${style.card.bg.default};
  border: ${style.card.border.default};
  margin-bottom: 5px;
  padding: 0.3rem;
  min-height: 55px;

  .inputElement {
    resize: none;
    width: 100%;
    border: none !important;
    max-height: 100px;
    background-color: transparent;
    outline: none;
  }

  .sideIcons {
    padding: 0px 8px;
  }
`;

export const StyledChatPreviewCard = styled(StyledCard)`
  margin-bottom: 0.5rem;
  height: 200px;

  .template-body {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledConversationView = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 3rem;

  <<<<<<< HEAD ::-webkit-scrollbar {
    display: none;
  }
  .emogiPicker {
    background-color: black;
  }
`;

export const StyledConversationContainer = styled.div`
  height: -webkit-fill-available;
  position: absolute;
  width: 100%;
`;

export const StyledConversation = styled(Col)`
  cursor: pointer;
  padding: 15px 15px;
  position: relative;
  opacity: 0.75;
  cursor: pointer;

  &:hover {
    opacity: 1;
    .action {
      display: block;
      color: red;
    }
  }

  .replyTo {
    margin-left: 60px;
    margin-bottom: 0.5rem;
  }

  .action {
    display: none;
    position: absolute;
    top: -10px;
    right: 0;
    padding: 5px;
    border: ${style.borderInput};
    background: #01041f;
    border-radius: 5px;
    width: fit-content;
  }

  &:hover {
    .action {
      display: flex;
    }
  }

  .message {
    color: ${style.message.color.default};
    background: ${style.message.bg.default};
    width: fit-content;
    min-width: 40%;
    max-width: 70%;
    border-radius: 10px;
    padding: 10px;
    box-shadow: ${style.message.shadow.default};

    .heading {
      color: ${style.message.color.heading.color.default};
      font-weight: 700;
    }
    .inputElement {
      resize: none;
      width: 100%;
      border: none !important;
      background-color: transparent;
      outline: none;
    }

    &.active {
      background: ${style.message.bg.active};

      .heading {
        color: ${style.message.color.heading.color.active};
      }
    }

    &:hover {
      box-shadow: ${style.message.shadow.hover};
    }
  }
`;

//
export const StyledPageList = styled.div`
  width: 25%;
  height: 100vh;
  background: ${style.bgMain};
  border-right: ${style.header.border.default};

  .body {
    height: calc(100vh - 55px);
    width: 100%;
    margin: auto;
    padding: 20px 10px;
    background: ${style.card.bg.default};

    .menu-heading {
      padding-left: 10px;
      padding-right: 10px;
    }

    .menu-item {
      text-align: start;
      padding: 10px;
      align-items: center;
      justify-content: flex-start;
    }
  }

  .footer {
    border-right: 1px solid rgba(247, 248, 248, 0.1);
    padding: 20px 10px;
    width: 100%;
    background: ${style.card.bg.default};
  }

  .header {
    height: 55px;
    padding: 0px 10px;
    background: ${style.header.bg.default};
    border-bottom: ${style.header.border.default};
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledPageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  background: ${style.body.bg.default};
  position: relative;

  &.full {
    width: calc(75% + 20px);
  }

  &.expand {
    width: 95%;
    left: 5%;
  }

  .padded-content {
    padding: 0px 10px;
    padding-bottom: 50px;
    height: -webkit-fill-available;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .header {
    height: 55px;
    padding: 0px 10px;
    background: ${style.header.bg.default};
    border-bottom: ${style.header.border.default};
    display: flex;
    align-items: center;
  }

  .body {
    overflow: inherit;
    padding: 20px 0px;
    height: calc(100vh - 55px);
    padding: 25px 10%;
  }
`;

//

export const TextareaDiv = styled.div`
  padding: 5px;
`;

// Profile
export const StyledProfileBanner = styled.div`
  position: relative;
  margin-bottom: 3rem;

  .bannerImage {
    background-color: #121533;
    border-radius: 10px;
    height: 150px;
    width: 100%;
    text-align: center;
  }

  .bannerAvatar {
    position: absolute;
    top: 5rem;
    left: 45%;
  }

  .bioText {
    font-weight: 500;
    color: #6f767e;
  }
`;
