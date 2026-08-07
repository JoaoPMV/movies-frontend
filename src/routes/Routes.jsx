import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Movies from "../pages/movies/Movies";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import List from "../pages/list/List";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/list"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        />

        <Route
          path="/movies/:slug"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
