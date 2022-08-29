import { createMuiTheme, adaptV4Theme } from "@mui/material/styles";

const customTheme = (darkMode) =>
  createMuiTheme(adaptV4Theme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#ffb28a" : "#FF5700",
      },
      secondary: {
        main: darkMode ? "#f3b9bb" : "#941a1c",
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: "break-word",
        },
      },
    },
  }));

export default customTheme;
