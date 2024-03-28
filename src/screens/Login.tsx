import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigator = useNavigate();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigator("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };
  return (
    <button className="btn btn-primary" onClick={handleSignIn}>
      Login
    </button>
  );
};

export default Login;
