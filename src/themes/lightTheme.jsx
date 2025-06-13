import { createTheme } from "@mui/material";
import common from "./common";
import { blueGrey } from "@mui/material/colors";
const lightTheme = createTheme({
  palette: {
    mode: "light",
    backgroundColor: {
      main: "#f5f5f5",
      light: "#ffffff",
      dark: "#e0e0e0",
    },
    text: {
      primary: blueGrey[700],
    },
  },

  ...common,
});

export default lightTheme;
