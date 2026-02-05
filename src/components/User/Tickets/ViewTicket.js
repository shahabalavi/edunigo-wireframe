import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import styles from "./UserTicketView.module.css";

const ViewUserTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const sampleTicket = {
        id: parseInt(id),
        code: "TCK-2026-1042",
        subject: "Application Status Inquiry",
        status: { name: "in_progress", title: "In Progress" },
        topic: "General",
        target: "Computer Science - Fall 2026",
        supportAdmin: "Admin User",
        createdAt: "2026-02-01T10:18:00Z",
        updatedAt: "2026-02-03T14:12:00Z",
        description:
          "I would like to know the current status of my application for the Computer Science program.",
      };

      const sampleMessages = [
        {
          id: 1,
          sender: "You",
          senderType: "user",
          message:
            "I submitted my application last month and haven't received any updates yet.",
          createdAt: "2026-02-01T10:30:00Z",
          attachments: [],
        },
        {
          id: 2,
          sender: "Admin User",
          senderType: "admin",
          message:
            "Thanks for reaching out. Your application is under review. We'll update you soon.",
          createdAt: "2026-02-01T14:20:00Z",
          attachments: [],
        },
      ];

      setTicket(sampleTicket);
      setMessages(sampleMessages);
      setLoading(false);
    }, 600);
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSendingMessage(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "You",
          senderType: "user",
          message: newMessage,
          createdAt: new Date().toISOString(),
          attachments,
        },
      ]);
      setNewMessage("");
      setAttachments([]);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        label: "Open",
        className: styles["status-open"],
        icon: AlertCircle,
      },
      in_progress: {
        label: "In Progress",
        className: styles["status-in-progress"],
        icon: Clock,
      },
      resolved: {
        label: "Resolved",
        className: styles["status-resolved"],
        icon: CheckCircle,
      },
      closed: {
        label: "Closed",
        className: styles["status-closed"],
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status.name] || statusConfig.open;
    const IconComponent = config.icon;

    return (
      <span className={`${styles["status-badge"]} ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading ticket...</p>
      </div>
    );
  }

  return (
    <div className={styles["view-ticket-container"]}>
      <div className={styles["ticket-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/user/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>{ticket.code}</h1>
            <p className={styles["ticket-subject"]}>
              {ticket.subject} • ID #{ticket.id}
            </p>
          </div>
        </div>
        <div className={styles["header-right"]}>
          {getStatusBadge(ticket.status)}
        </div>
      </div>

      <div className={styles["ticket-content"]}>
        <div className={styles["ticket-info"]}>
          <div className={styles["info-section"]}>
            <h3>Ticket Information</h3>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Support Admin:</span>
              <span className={styles["info-value"]}>{ticket.supportAdmin}</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Topic:</span>
              <span className={styles["info-value"]}>
                {ticket.topic || "General"}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Target:</span>
              <span className={styles["info-value"]}>{ticket.target}</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Created:</span>
              <span className={styles["info-value"]}>
                {formatDate(ticket.createdAt)}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Last Updated:</span>
              <span className={styles["info-value"]}>
                {formatDate(ticket.updatedAt)}
              </span>
            </div>
          </div>

          <div className={styles["info-section"]}>
            <h3>Description</h3>
            <p className={styles["ticket-description"]}>{ticket.description}</p>
          </div>
        </div>

        <div className={styles["messages-container"]}>
          <div className={styles["messages-header"]}>
            <h3>
              <MessageSquare size={20} />
              Conversation ({messages.length} messages)
            </h3>
          </div>

          <div className={styles["messages-list"]}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles["message"]} ${
                  message.senderType === "user"
                    ? styles["user-message"]
                    : styles["admin-message"]
                }`}
              >
                <div className={styles["message-header"]}>
                  <div className={styles["sender-name"]}>{message.sender}</div>
                  <div className={styles["message-time"]}>
                    {formatDate(message.createdAt)}
                  </div>
                </div>
                <div className={styles["message-content"]}>
                  <p>{message.message}</p>
                  {message.attachments?.length > 0 && (
                    <div className={styles["message-attachments"]}>
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className={styles["attachment-item"]}>
                          <Paperclip size={14} />
                          <span>{attachment.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className={styles["reply-form"]}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your reply..."
              className={styles["reply-input"]}
              rows={3}
            />
            {attachments.length > 0 && (
              <div className={styles["attachments-preview"]}>
                {attachments.map((file, index) => (
                  <div key={index} className={styles["attachment-preview"]}>
                    <Paperclip size={14} />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className={styles["remove-attachment"]}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={styles["reply-actions"]}>
              <input
                type="file"
                id="user-file-upload"
                multiple
                onChange={handleFileUpload}
                className={styles["file-input"]}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              <label
                htmlFor="user-file-upload"
                className={styles["file-upload-btn"]}
              >
                <Paperclip size={16} />
                Attach Files
              </label>
              <button
                type="submit"
                className={styles["send-btn"]}
                disabled={!newMessage.trim() || sendingMessage}
              >
                {sendingMessage ? "Sending..." : "Send Reply"}
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewUserTicket;
