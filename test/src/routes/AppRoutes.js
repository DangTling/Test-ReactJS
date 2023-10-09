import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import TableUser from "../components/TableUser";
import Login from "../views/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../views/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/users" element={<TableUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
