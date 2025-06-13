import { createTheme } from "@mui/material";
import common from "./common";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    backgroundColor: {
      main: "#121212",
      light: "#1e1e1e",
      dark: "#263238",
    },
  },
  ...common,
});

export default darkTheme;
