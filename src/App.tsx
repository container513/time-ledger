import { Component } from "react";
// import firestore from "./shared/firestore";
import { Routes, Route } from "react-router-dom";

import PlannerPage from "./pages/AppPages/PlannerPage/PlannerPage";
import ReviewPage from "./pages/AppPages/ReviewPage/ReviewPage";
import LogginPage from "./pages/LogginPage/LogginPage";
import appRoutes from "./shared/appRoutes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path={appRoutes.loggin} element={<LogginPage />} />
          <Route path={appRoutes.planner} element={<PlannerPage />} />
          <Route path={appRoutes.review} element={<ReviewPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
