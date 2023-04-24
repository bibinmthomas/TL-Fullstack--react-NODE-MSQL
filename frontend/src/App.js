import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginScreen from "./screens/loginScreen/loginScreen";
import LandingPage from "./screens/landingPage/landingPage";
import ErrorPage from "./screens/errorPage/errorPage";
function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<LoginScreen />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
