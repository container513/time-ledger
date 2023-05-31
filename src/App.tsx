import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import AppPages from "./pages/AppPages/AppPages";
import LoginPage from "./pages/LoginPage/LoginPage";
import routes from "./shared/routes";
import {
  ControlContext,
  CtrlCtxStateDefaultVal,
} from "./shared/controlContext";

import "./App.css";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redirecting...");
    setTimeout(() => {
      // Redirects to login page, note the `replace: true`
      navigate(routes.login, { replace: true });
    }, 1000);
  }, [navigate]);

  return <div>Redirecting...</div>;
};

function App() {
  const [state, setState] = useState(CtrlCtxStateDefaultVal.state);
  return (
    <ControlContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <div className="App">
        <Routes>
          <Route path={routes.index} element={<Index />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.planner} element={<AppPages />} />
          <Route path={routes.review} element={<AppPages />} />
        </Routes>
      </div>
    </ControlContext.Provider>
  );
}

export default App;
