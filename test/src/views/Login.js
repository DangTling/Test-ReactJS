import { useEffect, useState } from "react";
import "../assets/styles/Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/UserAction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Email or Password isn't confirm");
      return;
    }
    await dispatch(handleLoginRedux(email, password));
    setLoading(false);
  };
  useEffect(() => {
    if (user && user.auth === true) {
      navigate("/");
      toast.success("Login Successfully");
    }
  }, [user]);

  return (
    <div className="login-container col-12">
      <h1 className="title">Fastroware</h1>
      <div className="card">
        <form>
          <input
            type="text"
            placeholder="Email or Username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="pass-div">
            <input
              className="input-password"
              type={isShowPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password ? (
              isShowPass ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-eye"
                  className="icon"
                  onClick={() => setIsShowPass(!isShowPass)}
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-eye-slash"
                  className="icon"
                  onClick={() => setIsShowPass(!isShowPass)}
                />
              )
            ) : (
              <span></span>
            )}
          </div>
          <div className="buttons">
            <a href="#" className="register-link">
              Register
            </a>
            <button
              type="submit"
              className={
                email && password ? "active login-button" : "login-button"
              }
              disabled={email && password ? false : true}
              onClick={(e) => handleLogin(e)}
              onKeyDown={(e) => handlePressKey(e)}
            >
              {loading ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-notch"
                  className="spinner"
                />
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
        </form>
      </div>
      <Button
        variant="danger"
        className="mt-5"
        size="lg"
        style={{ width: 300 }}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon="fa-solid fa-circle-left" className="mx-3" />
        Go Back
      </Button>
    </div>
  );
}

export default Login;
