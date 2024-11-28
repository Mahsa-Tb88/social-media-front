export default {
  cssVariables: { cssVarPrefix: "" },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },

  typography: {
    fontFamily: "Vazirmatn",
  },
};
