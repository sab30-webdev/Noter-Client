import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    red: {
      400: "#F56565",
      500: "#E53E3E",
    },
    cyan: {
      200: "#9DECF9",
      300: "#76E4F7",
      400: "#0BC5EA",
      500: "#00B5D8",
      600: "#00A3C4",
      700: "#0987A0",
    },
  },
};

export default customTheme;
