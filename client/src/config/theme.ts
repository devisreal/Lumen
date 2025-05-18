import { createTheme } from "@mantine/core";

import themeClasses from "./theme.module.css";

export const mantineTheme = createTheme({
  primaryColor: "butter-yellow",
  primaryShade: 3,
  headings: {
    // properties for all headings
    fontWeight: "700",
    fontFamily: "RoundoVariable",
  },
  autoContrast: true,
  activeClassName: themeClasses.active,
  colors: {
    "butter-yellow": [
      "#fff8db",
      "#ffeead",
      "#ffde61",
      "#ffc200",
      "#e6a400",
      "#d68705",
      "#c06602",
      "#a84b06",
      "#8e3b0b",
      "#73300c",
      "#4a1c02",
    ],
    "sky-blue": [
      "#f2f7fd",
      "#e4f0fc",
      "#c8e3f8",
      "#a4d2f4",
      "#74b6ec",
      "#579be5",
      "#3f7fd9",
      "#2e64c2",
      "#2b519c",
      "#264478",
      "#1a2947",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
  },
});
