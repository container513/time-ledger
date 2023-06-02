import { useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { fetchOngoingGoals, firebaseApp } from "../../shared/firestore";
import routes from "../../shared/routes";
import { ControlContext } from "../../shared/controlContext";
import GoogleLogo from "../../assets//images/google-logo.png";

import "./LoginPage.css";

interface Props {
  handleLogin: () => void;
}

const LoginBtn = ({ handleLogin }: Props) => {
  return (
    <div className="login-btn" onClick={handleLogin}>
      <img src={GoogleLogo} alt="Google Logo" />
      Log in with Google
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setState } = useContext(ControlContext);

  const loginWithGoogle = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const ongoingGoals = await fetchOngoingGoals(result.user.uid);
        setState({
          user: {
            uid: result.user.uid,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
          },
          ongoingGoals: ongoingGoals,
        });
        navigate(routes.planner);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-title">TimeLedger</div>
      <LoginBtn handleLogin={loginWithGoogle} />
    </div>
  );
};

export default LoginPage;
