import { createTheme } from "@mui/material";
import common from "./common";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    backgroundColor: {
      main: "#121212",
      default: "#212121",
      light: "#424242",
      dark: "#212121",
      text: "#eeeeee",
    },
  },
  ...common,
});

export default darkTheme;
