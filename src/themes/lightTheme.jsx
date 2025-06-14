import { createTheme } from "@mui/material";
import common from "./common";
import { blueGrey } from "@mui/material/colors";
const lightTheme = createTheme({
  palette: {
    mode: "light",
    backgroundColor: {
      main: "#e0e0e0",
      light: "#eeeeee",
      dark: "#e0e0e0",
      text: "#424242",
    },
    text: {
      primary: blueGrey[700],
    },
  },

  ...common,
});

export default lightTheme;
