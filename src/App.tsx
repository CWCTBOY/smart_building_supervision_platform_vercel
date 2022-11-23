import { Global, ThemeProvider } from "@emotion/react";
import GlobalContainer from "./components/global";
import Router from "./Router";
import { reset } from "./styles/global/reset";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <GlobalContainer>
        <Router />
      </GlobalContainer>
    </ThemeProvider>
  );
}

export default App;
