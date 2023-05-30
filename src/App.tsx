import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import PlannerPage from "./pages/AppPages/PlannerPage/PlannerPage";
import ReviewPage from "./pages/AppPages/ReviewPage/ReviewPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import appRoutes from "./shared/appRoutes";
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
      navigate(appRoutes.login, { replace: true });
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
          <Route path={appRoutes.index} element={<Index />} />
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route path={appRoutes.planner} element={<PlannerPage />} />
          <Route path={appRoutes.review} element={<ReviewPage />} />
        </Routes>
      </div>
    </ControlContext.Provider>
  );
}

export default App;
