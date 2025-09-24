import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Dashboard from "../Dashboard/Dashboard";

const Auth = () => {
  const [currentView, setCurrentView] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials) => {
    console.log("Login attempt:", credentials);
    // Simulate successful login
    setIsAuthenticated(true);
  };

  const handleRegister = (userData) => {
    console.log("Registration attempt:", userData);
    // Simulate successful registration
    setIsAuthenticated(true);
  };

  const handleSendResetEmail = (email) => {
    console.log("Password reset email sent to:", email);
  };

  const handleResetPassword = (passwordData) => {
    console.log("Password reset:", passwordData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
  };

  // If user is authenticated, show the dashboard
  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  // Render the appropriate auth view
  switch (currentView) {
    case "login":
      return (
        <Login
          onSwitchToRegister={() => setCurrentView("register")}
          onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
          onLogin={handleLogin}
        />
      );
    case "register":
      return (
        <Register
          onSwitchToLogin={() => setCurrentView("login")}
          onRegister={handleRegister}
        />
      );
    case "forgot-password":
      return (
        <ForgotPassword
          onSwitchToLogin={() => setCurrentView("login")}
          onSendResetEmail={handleSendResetEmail}
        />
      );
    case "reset-password":
      return (
        <ResetPassword
          onSwitchToLogin={() => setCurrentView("login")}
          onResetPassword={handleResetPassword}
        />
      );
    default:
      return (
        <Login
          onSwitchToRegister={() => setCurrentView("register")}
          onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
          onLogin={handleLogin}
        />
      );
  }
};

export default Auth;
