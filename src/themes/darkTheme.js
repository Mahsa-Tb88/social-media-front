import { createTheme } from "@mui/material";
import common from "./common";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  ...common,
});

export default darkTheme;
