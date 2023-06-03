import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineSchedule,
  AiOutlineLogout,
  AiOutlineDashboard,
} from "react-icons/ai";

import { ControlContext } from "../../shared/controlContext";
import GoalView from "./GoalView";
import routes from "../../shared/routes";
import "./PanelView.css";

const PanelView = () => {
  const { state, setState } = useContext(ControlContext);
  const [nav, setNav] = useState(false);
  const goals = state.ongoingGoals;
  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ user: undefined, ongoingGoals: {} });
    navigate(routes.login, { replace: true });
  };

  return (
    <div className="panel">
      <div className="panel-logo">TimeLedger</div>
      <div className="panel-title">GOALS</div>
      <div className="panel-goals">
        {Object.values(goals).map((goal, index) => {
          return <GoalView key={index} {...goal} />;
        })}
      </div>
      <div className="user-interface">
        <div className="user-photo">
          {state.user?.photoURL ? (
            <img src={state.user.photoURL} alt="username" />
          ) : (
            <div></div>
          )}
        </div>
        <div className="user-name">
          {state.user ? state.user.name : "Shao-Yu Chu"}
        </div>
        {nav ? (
          <button
            className="panel-button"
            onClick={() => {
              setNav(!nav);
              navigate(routes.planner);
            }}
          >
            <AiOutlineSchedule className="planner-icon" />
          </button>
        ) : (
          <button
            className="panel-button"
            onClick={() => {
              setNav(!nav);
              navigate(routes.review);
            }}
          >
            <AiOutlineDashboard className="review-icon" />
          </button>
        )}
        <button className="panel-button">
          <AiOutlineLogout
            className="logout-icon"
            onClick={() => handleLogout()}
          />
        </button>
      </div>
    </div>
  );
};

export default PanelView;
