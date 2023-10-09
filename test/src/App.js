import Header from "./components/Header";
import "./App.scss";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "./redux/actions/UserAction";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUserRedux = useSelector((state) => state.user.user);
  console.log(dataUserRedux);

  useEffect(() => {
    if (dataUserRedux && dataUserRedux.auth === false) {
      navigate("/login");
    }
    if (localStorage.getItem("token")) {
      dispatch(
        handleLoginRedux(
          localStorage.getItem("email"),
          localStorage.getItem("token")
        )
      );
    }
  }, []);

  return (
    <>
      <div className="App">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
