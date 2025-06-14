import { createTheme } from "@mui/material";
import common from "./common";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    backgroundColor: {
      main: "#121212",
      light: "#616161",
      dark: "#212121",
      text: "#eeeeee",
    },
  },
  ...common,
});

export default darkTheme;
