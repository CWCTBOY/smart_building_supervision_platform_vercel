import { Global, ThemeProvider } from "@emotion/react";
import Router from "./Router";
import { reset } from "./styles/global/reset";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <Router />
    </ThemeProvider>
  );
}

export default App;
