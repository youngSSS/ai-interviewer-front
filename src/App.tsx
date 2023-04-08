import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import WelcomePage from "./page/welcome_page";
import InterviewPage from "./page/interview_main_page";
import { observer } from "mobx-react-lite";
import SignInPage from "./page/sign_in_page";

const App = observer(() => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
});

export default App;
