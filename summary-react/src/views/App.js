import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import ListTodos from "./Todos/listTodos";
import ListUsers from "./Users/ListUsers";
import Nav from "./Nav/Nav";
import DetailUser from "./Users/DetailUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route exact path="/" element={<ListTodos />} />
            <Route path="/list-users" exact element={<ListUsers />} />
            <Route path="/list-users/:id" element={<DetailUser />} />
          </Routes>
        </header>
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
      </div>
    </Router>
  );
}

export default App;
