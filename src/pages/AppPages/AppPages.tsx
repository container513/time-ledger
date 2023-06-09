import { Routes, Route } from "react-router-dom";

import PlannerPage from "../../pages/AppPages/PlannerPage/PlannerPage";
import ReviewPage from "../../pages/AppPages/ReviewPage/ReviewPage";
import PanelView from "../../components/PanelView/PanelView";
import routes from "../../shared/routes";
import "./AppPages.css";

const AppPages = () => {
  return (
    <div className="app-page">
      <PanelView />
      <Routes>
        <Route path={routes.planner} element={<PlannerPage />} />
        <Route path={routes.review} element={<ReviewPage />} />
      </Routes>
    </div>
  );
};

export default AppPages;
