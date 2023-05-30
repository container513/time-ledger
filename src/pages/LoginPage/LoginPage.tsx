import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../../shared/firestore";
import GoogleLogo from "../../assets//images/google-logo.png";
import appRoutes from "../../shared/appRoutes";
import "./LoginPage.css";

interface Props {
  handleLogin:  () => void;
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

  const loginWithGoogle = async () => {
    console.log("Log in With Google");
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate(appRoutes.planner);
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
