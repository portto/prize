
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    body: 'Work Sans, sans-serif',
  },
  colors: {
    black: '#141414',
    white: '#ffffff',
    primary: {
      100: "#f0f8ff",
      300: "#e0f0ff",
      500: "#a6d9ff",
      700: "#0a94ff",
      900: "#0d36db",
    },
    secondary: {
      500: "#ff5555"
    }
  },
  components: {
    Text: {
      baseStyle: {
        color: 'black',
      },
    },
    variants: {
      secondary: {
        color: '#4D5472',
      },
    },
  },
})

export default theme
