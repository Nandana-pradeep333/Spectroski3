import { HashRouter, Route, Routes } from "react-router-dom";
import LandingPage from "views/LandingPage.js";
import RegisterPage from "views/RegisterPage.js";
import LoginPage from "views/LoginPage.js";
import Quizzes from "views/QuizzesPage.js";
import ChangePassPage from "views/ChangePassPage.js";
import { useEffect, useState } from "react";

function App() {
  let [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    window.setInterval(() => {
      if (
        window.sessionStorage.getItem("api") &&
        window.sessionStorage.getItem("api") != undefined &&
        window.sessionStorage.getItem("api") != "" &&
        window.sessionStorage.getItem("api") != null
      ) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }, 100);
  });

  return (
    <HashRouter>
      {isLogged ? (
        <Routes>
          <Route path="/*" element={<Quizzes />} exact />
          <Route path="/" element={<Quizzes />} exact />
          <Route path="/change" element={<ChangePassPage />} exact />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </HashRouter>
  );
}

export default App;
