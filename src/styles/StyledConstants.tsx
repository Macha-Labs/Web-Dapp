export const commonStyle: any = {
  font: {
    h1: "2.2rem",
    h2: "2rem",
    h3: "1.6rem",
    h4: "1.4rem",
    h5: "1.2rem",
    h6: "1rem",
    p: "1rem",
  },
  margin: {
    xxs: "0.5rem",
    xs: "1rem",
    sm: "1.2rem",
    md: "1.5rem",
    lg: "1.8rem",
    xl: "2.4rem",
    xxl: "3.2rem",
    nav: "70px",
    subnav: "60px",
  },
  padding: {
    xxs: "0.5rem",
    xs: "1rem",
    sm: "1.2rem",
    md: "1.5rem",
    lg: "1.8rem",
    xl: "2.4rem",
    xxl: "3.2rem",
    xxxl: "4rem",
  },
  color: {
    p: "#fff",
    h: "#fff",
  },
};

export const darkStyle = {
  bgLayout: { primary: "#181A20", secondry: "#111315" },
  brButton: { active: "#2A85FF" },

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
  body: {
    bg: { default: "#00040d" },
    padding: "1% 6%",
    margin: { top: "50px" },
    paddingTop: "80px",
  },
  nav: {
    width: "100%",
    height: "75px",
    bg: { default: "#00040d" },
    border: { default: "2px solid #0F172E" },
    padding: "1% 6%",
    margin: "75px",
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
        " linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      highlight:
        "linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)",
      hover:
        "linear-gradient(141.09deg, rgba(13, 25, 65, 0.5) 11.08%, rgba(0, 20, 60, 0.38) 89.68%)",
      meta: "#020A21",
      overview: "#020a21",
    },
    border: {
      default: "1px solid #0a1020",
      hover: "2px solid rgba(15,23,46,1)",
      meta: "1px solid #197cec",
      mcard: "1px solid #353c54",
    },
    borderRadius: {
      default: "20px",
      image: "14px",
      button: "10px",
    },
    shadow: {
      default: "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      hover:
        "-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)",
    },
    padding: { default: "16px", overview: "26px" },
    margin: { default: "2.1rem", right: "3rem" },
    width: {
      meta: "30%",
    },
    cursor: { default: "pointer"}
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
      default: "1px solid  #0F172E",
      active: "1px solid rgba(15,23,46,1)",
    },
    placeholder: {
      color: "#132041",
    },
    borderRadius: {
      default: "10px",
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
      active: "red",
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
      sm: "18px",
      md: "20px",
      lg: "25px",
      xl: "35px",
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
    borderRadius: {
      default: "10px",
    },
  },
  loader: {
    bg: {
      start: "#000416",
      end: "#001E57",
    },
  },
  table: {
    bg: {
      default: " linear-gradient(129.54deg, rgba(13, 33, 71, 0.66) 9.17%, rgba(11, 32, 73, 0.15) 94.25%)"
    },
    borderColor: {
      default: "#14244b"
    },
    Th: {
      borderBottomColor: "#14244b",
      borderRightColor: "#14244b",
      borderWidth: "1px",
      paddingTop: "20px",
      paddingBottom: "20px",
      textAlign: "start",
      color: "white",
      fontWeight: "600",
      fontSize: "1rem",
      borderCollapse: "separate",
      borderSpacing: "0 1rem",
    },
    Td: {
      borderColor: "#14244b",
      borderWidth: "1px",
      borderRadius: "30px",
      textAlign: "start",
      color: "white",
      padding: "10px 24px",
    },
    cursor: {
      default: "",
      pointer: "pointer"
    }
  }
};

export const style = { ...commonStyle, ...darkStyle };
