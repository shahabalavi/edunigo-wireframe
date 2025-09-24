import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 80,
    right: 24,
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Application Status Update",
      message: "Your application to University of Toronto has been reviewed",
      type: "info",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Document Required",
      message: "Please upload your IELTS certificate for your application",
      type: "warning",
      time: "1 day ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Application Approved",
      message:
        "Congratulations! Your application to McGill University has been approved",
      type: "success",
      time: "3 days ago",
      isRead: true,
    },
    {
      id: 4,
      title: "Deadline Reminder",
      message:
        "Application deadline for University of British Columbia is approaching",
      type: "warning",
      time: "5 days ago",
      isRead: true,
    },
    {
      id: 5,
      title: "Profile Update Required",
      message: "Please complete your profile information to continue",
      type: "info",
      time: "1 week ago",
      isRead: true,
    },
  ]);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Calculate dropdown position
  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <CheckCircle
            size={16}
            className={[styles["notification-icon"], styles["success"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "warning":
        return (
          <AlertCircle
            size={16}
            className={[styles["notification-icon"], styles["warning"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "info":
      default:
        return (
          <Info
            size={16}
            className={[styles["notification-icon"], styles["info"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
    }
  };

  const handleNotificationClick = (notificationId) => {
    // Mark as read when clicked
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    // For now, no action is performed as requested
    console.log("Notification clicked:", notificationId);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className={styles["notifications-container"]}>
      <button
        ref={buttonRef}
        className={styles["notification-button"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles["notification-badge"]}>{unreadCount}</span>
        )}
      </button>

      {isOpen &&
        createPortal(
          <>
            <div
              className={styles["notifications-backdrop"]}
              onClick={() => setIsOpen(false)}
            />
            <div
              className={styles["notifications-dropdown"]}
              ref={dropdownRef}
              style={{
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`,
              }}
            >
              <div className={styles["notifications-header"]}>
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    className={styles["mark-all-read"]}
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className={styles["notifications-list"]}>
                {notifications.length === 0 ? (
                  <div className={styles["no-notifications"]}>
                    <Bell size={24} />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={[
                        styles["notification-item"],
                        !notification.isRead ? styles["unread"] : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className={styles["notification-content"]}>
                        <div className={styles["notification-header"]}>
                          {getNotificationIcon(notification.type)}
                          <span className={styles["notification-title"]}>
                            {notification.title}
                          </span>
                          {!notification.isRead && (
                            <div className={styles["unread-indicator"]}></div>
                          )}
                        </div>
                        <p className={styles["notification-message"]}>
                          {notification.message}
                        </p>
                        <div className={styles["notification-time"]}>
                          <Clock size={12} />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};

export default Notifications;
