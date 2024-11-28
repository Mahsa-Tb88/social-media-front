import { createTheme } from "@mui/material";
import common from "./common";

const lightTheme = createTheme({
  palette: {
    theme: "light",
  },
  ...common,
});

export default lightTheme;
