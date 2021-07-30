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
  },
};

export default customTheme;
