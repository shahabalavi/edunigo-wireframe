import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield, Users } from "lucide-react";
import styles from "./Auth.module.css";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    {
      id: "user",
      name: "Student/User",
      description: "Manage your applications, documents, and profile",
      icon: User,
      path: "/user/dashboard",
      color: "blue",
    },
    {
      id: "agent",
      name: "Agent",
      description: "Help students with their applications and manage clients",
      icon: Users,
      path: "/agent/dashboard",
      color: "green",
    },
    {
      id: "admin",
      name: "Administrator",
      description:
        "Manage the platform, review applications, and oversee operations",
      icon: Shield,
      path: "/admin/dashboard",
      color: "purple",
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
  };

  const handleContinue = () => {
    if (selectedRole) {
      const role = roles.find((r) => r.id === selectedRole);
      if (role) {
        // Store role in localStorage for session management
        localStorage.setItem("userRole", selectedRole);
        navigate(role.path);
      }
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <div className={styles["auth-header"]}>
          <h1>Select Your Role</h1>
          <p>Choose your role to access the appropriate dashboard</p>
        </div>

        <div className={styles["role-selection"]}>
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className={[
                  styles["role-card"],
                  styles[role.color],
                  selectedRole === role.id ? styles["selected"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleRoleSelect(role)}
              >
                <div className={styles["role-icon"]}>
                  <IconComponent size={32} />
                </div>
                <div className={styles["role-content"]}>
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>
                </div>
                <div className={styles["role-radio"]}>
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={() => handleRoleSelect(role)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles["auth-actions"]}>
          <button
            className={[styles["auth-button"], styles["primary"]]
              .filter(Boolean)
              .join(" ")}
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            Continue to Dashboard
          </button>
          <button className={styles["link-button"]} onClick={handleBackToLogin}>
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
