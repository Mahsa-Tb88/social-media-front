import { createTheme } from "@mui/material";
import common from "./common";
import { blueGrey } from "@mui/material/colors";
const lightTheme = createTheme({
  palette: {
    theme: "light",
    // primary: {
    //   light: "#757ce8",
    // },

    text: {
      primary: blueGrey[700],
    },
  },
  ...common,
});

export default lightTheme;
