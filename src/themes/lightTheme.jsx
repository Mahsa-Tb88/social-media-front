import { createTheme } from "@mui/material";
import common from "./common";
import { blueGrey } from "@mui/material/colors";
const lightTheme = createTheme({
  palette: {
    theme: "light",
    // primary: {
    //   dark: "#757575",
    // },

    text: {
      primary: blueGrey[700],
    },
  },
  ...common,
});

export default lightTheme;
