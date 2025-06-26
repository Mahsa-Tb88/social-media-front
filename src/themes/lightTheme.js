import { createTheme } from "@mui/material";
import common from "./common";
import { blueGrey } from "@mui/material/colors";
const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
    backgroundColor: {
      main: "#eeeeee",
      light: "#f5f5f5",
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
