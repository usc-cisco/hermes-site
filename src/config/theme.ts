import { createTheme, rem } from "@mantine/core"

export const theme = createTheme({
  colors: {
    primary: [
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
      "#1752F0",
    ],
    gray: [
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
      "#E9ECEF",
    ],
    darkGray: [
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
      "#ADB5BD",
    ],
    green: [
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
      "#12B886",
    ],
    yellowOrange: [
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
      "#FAB005",
    ],
    red: ["#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252", "#FA5252"],
  },

  shadows: {
    sm: "0 0 15px lightgray",
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
})