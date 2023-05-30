import { Component, useEffect } from "react";
// import firestore from "./shared/firestore";
import { Routes, Route, useNavigate } from "react-router-dom";

import AppPages from "./pages/AppPages/AppPages";
import LoginPage from "./pages/LoginPage/LoginPage";
import appRoutes from "./shared/appRoutes";
import "./App.css";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirecting...");
    setTimeout(() => {
      // Redirects to login page, note the `replace: true`
      navigate(appRoutes.login, { replace: true });
    }, 1000);
  }, [navigate]);

  return <div>Redirecting...</div>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path={appRoutes.index} element={<Index />} />
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route path={appRoutes.planner} element={<AppPages />} />
          <Route path={appRoutes.review} element={<AppPages />} />
        </Routes>
      </div>
    );
  }
}

export default App;
