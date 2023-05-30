import { Component, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import PlannerPage from "../../pages/AppPages/PlannerPage/PlannerPage";
import ReviewPage from "../../pages/AppPages/ReviewPage/ReviewPage";
import PanelView from "../../components/PanelView/PanelView";
import appRoutes from "../../shared/appRoutes";

const AppPages = () => {
  return (
    <div className="App">
      <PanelView />
      <Routes>
        <Route path={appRoutes.planner} element={<PlannerPage />} />
        <Route path={appRoutes.review} element={<ReviewPage />} />
      </Routes>
    </div>
  );
}

export default AppPages;
