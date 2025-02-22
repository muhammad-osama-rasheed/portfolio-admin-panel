import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import { Toaster } from "react-hot-toast";
import Login from "./pages/admin/auth/login/Login";
import Signup from "./pages/admin/auth/signup/Signup";
import ProtectedRoutedForAdmin from "./protectedRoute/ProtectedRouteForAdmin";
import NoPage from "./pages/nopage/NoPage";
import RefreshHandler from "./protectedRoute/RefreshHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckExpiry from "./protectedRoute/CheckExpiry";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <RefreshHandler>
              <Login />
            </RefreshHandler>
          }
        />
        <Route
          path="/signup"
          element={
            <RefreshHandler>
              <Signup />
            </RefreshHandler>
          }
        />
        <Route
          path="/"
          element={
            <>
              <CheckExpiry />
              <ProtectedRoutedForAdmin>
                <Home />
              </ProtectedRoutedForAdmin>
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <>
              <CheckExpiry />
              <ProtectedRoutedForAdmin>
                <Admin />
              </ProtectedRoutedForAdmin>
              <CheckExpiry />
            </>
          }
        />
        <Route path="/*" element={<NoPage />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
