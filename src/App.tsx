import { useEffect, Component } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppPages from "./pages/AppPages/AppPages";
import LoginPage from "./pages/LoginPage/LoginPage";
import routes from "./shared/routes";
import {
  ControlContext,
  CtrlCtxStateDefaultVal,
} from "./shared/controlContext";

import "bootstrap/dist/css/bootstrap.min.css";
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

class App extends Component {
  state = CtrlCtxStateDefaultVal.state;
  render() {
    return (
      <ControlContext.Provider
        value={{
          state: this.state,
          setState: (newState) => {
            this.setState(newState);
          },
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <Routes>
              <Route path={routes.index} element={<Index />} />
              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.appPage} element={<AppPages />} />
            </Routes>
          </div>
        </DndProvider>
      </ControlContext.Provider>
    );
  }
}

export default App;
