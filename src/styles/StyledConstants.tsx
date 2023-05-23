export const commonStyle: any = {
  borderRadius: "5px",
  borderRadiusButton: "5px",
  borderRadiusTag: "5px",
  borderRadiusInput: "5px",
  borderRadiusPallet: "5px",
  fontInput: "1.6rem",
  fontSubHeading: "1.3rem",
  fontTag: "1.4rem",
  fontH1: "4.2rem",
  fontH2: "3.6rem",
  fontH3: "2.8rem",
  fontH4: "1.8rem",
  fontH5: "1.4rem",
  fontH6: "1rem",
  fontP: "1.6rem",
  fontPSmall: "1.6rem",
  fontPLarge: "2rem",
  sizeLogo: "50px",
  sizeLogoSmall: "40px",
  sizeLogoLarge: "80px",
  paddingMain: "50px 0px 50px 0px",
  paddingInput: "0 1rem",
  paddingPallet: "1rem",
  paddingButton: "1rem 1.3rem",
  paddingButtonSmall: "0.8rem 1rem",
  paddingButtonXSmall: "0.5rem",
  paddingButtonLarge: "1rem 1.3rem",

  paddingCover: "25px",
  paddingBanner: "0 35px",

  marginMain: "0px",
  marginMainTop: "0px",
  heightInput: "5rem",
  heightCover: "20rem",
  heightHeader: "75px",
  heightPlaceholder: "150px",
  widthSidebar: "300px",
  widthSidebarControl: "65px",
  widthMain: "calc(100%)",
  widthSection: "85%",
  widthCardList: "calc(20% - 10px)",

  mob: {
    fontH1: "2.6rem",
    fontH2: "2.2rem",
    fontH3: "2.1rem",
    fontP: "1.4rem",
    fontPSmall: "1.1rem",
    fontPLarge: "1.6rem",
    sizeLogo: "60px",
    sizeLogoSmall: "30px",
    sizeLogoLarge: "70px",

    marginMain: "0px",
    paddingBanner: "0px 35px",
    paddingMain: "30px 0px 30px 0px",
    heightBanner: "15rem",
    heightCover: "10rem",
    widthMain: "100%",
    widthSection: "90%",
    widthCardList: "calc(50% - 10px)",
  },
  margin: {
    "xs": "1rem",
    "sm": "",
    "md": "1rem",
    "lg": "",
    "xl": "",
  },
  padding: {
    "xs": "1rem",
    "sm": "",
    "md": "1rem",
    "lg": "",
    "xl": "",
  },
};

export const darkStyle = {
  bg1: "#00042C",
  bg2: "#181A20",
  bg3: "#16191B",
  bg4: "#111315",
  bg: "#00040d",
  bgLayout: { primary: "#181A20", secondry: "#111315" },
  //
  brCard: {
    transparent: "#262A34",
    default: "#333",
    hover: "#555",
    active: "",
  },
  brButton: { active: "#2A85FF" },
  //
  color5: "#3182CE",
  bgMain: "#00040d",

  bgOverlay:
    "linear-gradient(90deg, rgba(246,246,246,0.6) 0%, rgba(234,238,246,0.8) 44%, rgba(231,235,242,0.8) 100%)",
  bgSidebar: "#232323",
  bgSidebarMenu: "#232323",

  bgPannelHeader: "#00042C",
  bgPlaceholder: "#1D224A",
  border: "1px solid #0F172E",
  borderDark: "1px solid #232323",
  borderInput: "1px solid rgba(247,248,248,0.1)",
  borderCard: "1px solid RGBA(0, 0, 0, 0.20)",
  borderButton: "none",
  borderTag: "1px solid #333233",
  borderTagActive: "1px solid #50A7EA",
  borderLoaderLeft: "#3182ce",

  borderPannel: "1px solid rgba(247,248,248,0.1)",

  borderPallet: "1px solid rgba(247,248,248,0.1)",
  borderPlaceholder: "1px solid rgba(247,248,248,0.1)",
  blurOverlay: "3px",
  colorH: "#FFF",
  colorHAlt: "#FFF",
  colorP: "#EFEFEF",
  colorText: "#EFEFEF",
  colorSubHeading: "rgb(var(--neutral700-rgb,102,102,102))",
  colorPlaceholder: "#babdbe",

  colorButtonActive: "#333",
  colorButtonLight: "#F5F5F5",
  colorButtonLightHover: "#F5F5F5",
  colorButtonLightActive: "#333",
  colorInput: "#FFF",
  focusInput: "0",
  flex: {
    justifyContent: {
      hrCenter: "center",
      hrBetween: "space-between",
    },
  },
  header: {
    bg: { default: "#00040d" },
    border: { default: "1px solid #0F172E" },
  },
  window: {},
  body: { bg: { default: "#00040d" }, padding: "3% 6%" },
  nav: {
    width: "5%",
    height: "100vH",
    bg: { default: "#00040d" },
    border: { default: "2px solid #0F172E" },
    padding: "1% 2%",
  },
  list: {
    padding: "5px",
    bg: {
      default: "transparent",
      hover:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
    },
    shadow: {
      default: "",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
  },
  card: {
    bg: {
      default:
        " linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%);",
      highlight:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(141.09deg, rgba(13, 25, 65, 0.5) 11.08%, rgba(0, 20, 60, 0.38) 89.68%)",
      meta: "#020A21",
    },
    border: {
      default: "1px solid #0a1020",
      hover: "2px solid rgba(15,23,46,1)",
      meta: "1px solid #197cec",
    },
    borderRadius: {
      default: "16px",
    },
    shadow: {
      default: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    padding: { default: "10px" },
    margin: { default: "20px" },
    width: {
      meta: "30%",
    },
  },
  pannel: { bg: { default: "" }, shadow: { default: "" } },
  input: {
    bg: {
      default: "#000511",
      active:
        "linear-gradient(141.09deg, rgba(10, 19, 51, 0.5) 11.08%, rgba(0, 15, 44, 0.38) 89.68%);",
    },
    shadow: {
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    border: {
      default: "1px solid #14244B",
      active: "1px solid rgba(15,23,46,1)",
    },
  },
  message: {
    bg: {
      default:
        "linear-gradient(141.09deg, rgba(10, 19, 51, 0.5) 11.08%, rgba(0, 15, 44, 0.38) 89.68%);",
      active: "#246BFD",
    },
    color: {
      default: "rgb(255, 255, 255)",
      heading: {
        color: {
          default: "#246bfd",
          active: "#FFF",
        },
      },
    },
    shadow: {
      default:
        "0px -2px 8px rgba(19, 112, 231, 0.05), 0px 2px 8px rgba(19, 112, 231, 0.05)",
      hover:
        "0px -2px 8px rgba(19, 112, 231, 0.15), 0px 2px 8px rgba(19, 112, 231, 0.15)",
    },
  },
  modal: {
    bg: { default: "#00040d" },
    border: { default: "1px solid #0F172E" },
    shadow: { default: "" },
    borderRadius: ".8rem",
    padding: "2rem",
    margin: "75px auto",
    width: "80%",
    bgOverlay: "#000320",
  },
  popover: { bg: { default: "#000416" } },
  sidebar: {},
  dropdown: {
    bg: {
      transparent: "transparent",
      default: "#00040d",
      hover: "#000C29",
      active: "linear-gradient(100.07deg, #2A85FF 0.39%, #2448C7 73.45%)",
      activeTranslucent:
        "linear-gradient(99.21deg, rgba(55, 121, 249, 0.66) 2.04%, rgba(28, 76, 244, 0.2) 95.15%);",
      disabled: "",
    },
    border: "1px solid rgba(247,248,248,0.1)",
    padding: "1.3rem",
    shadowDropdown:
      "rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px",
  },
  avatar: {
    border: "2px solid #246bfd",
  },
  icon: {
    bg: {
      transparent: "transparent",
      default:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      active: "",
    },
    borderRadius: "12px",
    shadow: {
      default: "inset 0 1px 0 0 hsl(0deg 0% 100% / 5%)",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    sizes: {
      default: "20",
      "3xs": "10",
      "2xs": "12",
      xs: "16",
      sm: "18",
      md: "20",
      lg: "25",
      xl: "35",
      "2xl": "50",
      "3xl": "75",
      "4xl": "100",
    },
  },
  button: {
    bg: {
      transparent: "transparent",
      default: "#00040d",
      hover: "#000C29",
      active: "linear-gradient(100.07deg, #2A85FF 0.39%, #2448C7 73.45%)",
      activeTranslucent:
        "linear-gradient(99.21deg, rgba(55, 121, 249, 0.66) 2.04%, rgba(28, 76, 244, 0.2) 95.15%);",
      disabled: "",
    },
    color: "#EFEFEF",
    margin: { default: "5px" },
  },
  loader: {
    bg: {
      start: "#000416",
      end: "#001E57",
    },
  },
};

export const style = { ...commonStyle, ...darkStyle };
