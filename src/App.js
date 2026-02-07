import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { VisaPagesProvider } from "./context/VisaPagesContext";
import LandingPage from "./components/Home/LandingPage";
import WidgetizedLandingPage from "./components/Widgetize/WidgetizedLandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AgentDashboard from "./components/Agent/AgentDashboard";
import RoleSelection from "./components/Auth/RoleSelection";
import GoCheck from "./components/GoCheck/GoCheck";
import "./App.css";

function App() {
  const handleLogin = () => {
    // Simulate successful login
    console.log("User logged in successfully");
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    console.log("User logged out successfully");
  };

  return (
    <div className="App">
      <Router>
        <VisaPagesProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/visa/:slug" element={<WidgetizedLandingPage />} />
            <Route path="/gocheck" element={<GoCheck />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* User Routes */}
          <Route
            path="/user/*"
            element={<UserDashboard onLogout={handleLogout} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={<AdminDashboard onLogout={handleLogout} />}
          />

          {/* Agent Routes */}
          <Route
            path="/agent/*"
            element={<AgentDashboard onLogout={handleLogout} />}
          />

          {/* Legacy dashboard route - redirect to user dashboard */}
          <Route
            path="/dashboard/*"
            element={<Navigate to="/user/dashboard" replace />}
          />

          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </VisaPagesProvider>
      </Router>
    </div>
  );
}

export default App;
