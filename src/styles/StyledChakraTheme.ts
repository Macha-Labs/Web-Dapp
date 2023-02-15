import { extendTheme } from '@chakra-ui/react'
import { style } from './StyledConstants';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
        'html': {
            background: `${style.bgMain}`
        },
        'h1, h2, h3, h4, h5, h6': {
            color: `${style.colorH}`
        },
        'div, p, span': {
            color: `${style.colorP}`
        },
        '*::placeholder': {
            color: `${style.colorPlaceholder}`,
        },
        'input, textarea': {
            border: `${style.borderInput} !important`,
            color: `${style.colorInput} !important`,
            background: `${style.bgInput.default} !important`,
            paddingLeft: '0.5rem !important',
            paddingRight: '0.5rem !important',
        },
        '.chakra-modal__body': {
            background: `${style.bgModal}`,
            paddingTop: '1rem !importannt',
        },
        '.chakra-modal__header': {
            background: `${style.bgModal}`,
            borderBottom: `${style.borderModal} !important`
        },
        '.chakra-modal__footer': {
            background: `${style.bgModal}`,
            borderTop: `${style.borderModal} !important`
        },
        'chakra-modal__overlay': {
            background: `${style.bgModal} !important`,
        },
        '.alert': {
            background: `${style.bgPannelHeader}`
        }
    }
  },
  textStyles: {
  },
  components: {
    Input: {
        baseStyle: {
            field: {
            }
        },
        variants: {
            normal: {
                field: {
                    bg: `${style.bgInput}`
                }
            }
        },
        defaultProps: {
            size: "md",
            variant: "normal",
        }
    },
    TextArea: {
        variants: {
            normal: {
                field: {
                    bg: `${style.bgInput}`
                }
            }
        },
    },
    Button: {
        baseStyle: {
            background: `${style.bgButton.default}`
        },
        variants: {
            transparent: {
                background: 'transparent',
                opacity: '0.5',
                _hover: {
                    background: `${style.bgButton}`,
                    opacity: '1',
                }
            },
            state_default_to_brand: {
                background: `${style.bgButton.default}`,
                _hover: {
                    background: `${style.bgButton.active}`,
                    color: '#FF'
                }
            },
            state_brand: {
                background: `${style.bgButton.active}`,
                color: '#FF'
            },
            state_transparent_to_brand_hover: {
                background: 'transparent',
                border: `1px solid transparent`,
                cursor: 'pointer',
                _hover: {
                    background: `${style.bgButton.activeTranslucent}`,
                    border: `1px solid ${style.brButton.active}`,
                    color: '#FFF'
                }
            },
            state_brand_hover: {
                background: `${style.bgButton.activeTranslucent}`,
                border: `1px solid ${style.brButton.active}`,
                color: '#FFF'
            },
            state_lens: {
                opacity: '0.95',
                background: '#ABFD2C',
                color: '#1A202C',
                _hover: {
                    opacity: '1',
                }
            },
            state_lens_unfollow: {
                opacity: '0.95',
                background: '#C22D3F',
                color: '#FFFFFF',
                _hover: {
                    opacity: '1',
                }
            },
        },
        defaultProps: {
            colorScheme: 'whiteAlpha'
          },
    },
    Tag: {
        baseStyle: {
            background: `${style.bgButton}`,
            cursor: 'pointer'
        },
        defaultProps: {
            colorScheme: 'whiteAlpha'
          },
    },
    Menu: {
        baseStyle: {
            list: {
                bg: `${style.bgDropdown}`,
                border: `${style.borderDropdown}`,
                minW: "5xs",
                zIndex: 1000,
            },
            item: {
                _focus: {
                    bg: `${style.bgButton}`
                },
            }
        }
    },
    Modal: {
        sizes: {
            
        }
    },
    Toast: {
        defaultProps: {
            colorScheme: 'whiteAlpha'
          },
    },
    Popover: {
        baseStyle: {
            content: {
                width: "3xs",
                bg: `#1c1c23`,
                border: "1px solid",
                borderColor: "gray.800",
            }
        }
    }
  }
});

export default theme