import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building2,
} from "lucide-react";
import styles from "./ViewTicket.module.css";

const ViewTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    const fetchTicketData = async () => {
      // Simulate API call
      setTimeout(() => {
        const sampleTicket = {
          id: parseInt(id),
          subject: "Application Status Inquiry",
          department: {
            id: 1,
            name: "Admissions",
            title: "Admissions Department",
          },
          status: { id: 2, name: "in_progress", title: "In Progress" },
          priority: { id: 2, name: "medium", title: "Medium" },
          description:
            "I would like to know the current status of my application for the Computer Science program. I submitted my application last month and haven't received any updates yet.",
          createdBy: "John Doe",
          assignedTo: "Admin User",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-20T14:45:00Z",
        };

        const sampleMessages = [
          {
            id: 1,
            ticketId: parseInt(id),
            sender: "John Doe",
            senderType: "customer",
            message:
              "I submitted my application last month and haven't received any updates yet. Could you please check the status?",
            attachments: [],
            createdAt: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            ticketId: parseInt(id),
            sender: "Admin User",
            senderType: "admin",
            message:
              "Thank you for contacting us. I've checked your application and it's currently under review. Our admissions team is working on it and you should receive an update within the next 5-7 business days.",
            attachments: [],
            createdAt: "2024-01-15T14:20:00Z",
          },
          {
            id: 3,
            ticketId: parseInt(id),
            sender: "John Doe",
            senderType: "customer",
            message:
              "Thank you for the update. I appreciate the quick response. I'll wait for the update from the admissions team.",
            attachments: [],
            createdAt: "2024-01-16T09:15:00Z",
          },
          {
            id: 4,
            ticketId: parseInt(id),
            sender: "Admin User",
            senderType: "admin",
            message:
              "You're welcome! I've also attached your application timeline document for your reference. If you have any other questions, feel free to ask.",
            attachments: [{ name: "application_timeline.pdf", size: "245KB" }],
            createdAt: "2024-01-16T11:30:00Z",
          },
        ];

        setTicket(sampleTicket);
        setMessages(sampleMessages);
        setLoading(false);
      }, 1000);
    };

    fetchTicketData();
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setSendingMessage(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const message = {
        id: messages.length + 1,
        ticketId: parseInt(id),
        sender: "Admin User",
        senderType: "admin",
        message: newMessage,
        attachments: attachments,
        createdAt: new Date().toISOString(),
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setAttachments([]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
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

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: {
        label: "Low",
        className: styles["priority-low"],
      },
      medium: {
        label: "Medium",
        className: styles["priority-medium"],
      },
      high: {
        label: "High",
        className: styles["priority-high"],
      },
    };

    const config = priorityConfig[priority.name] || priorityConfig.medium;

    return (
      <span className={`${styles["priority-badge"]} ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading ticket...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className={styles["error-container"]}>
        <h3>Ticket not found</h3>
        <p>The ticket you're looking for doesn't exist.</p>
        <button
          className={styles["back-btn"]}
          onClick={() => navigate("/admin/tickets")}
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </button>
      </div>
    );
  }

  return (
    <div className={styles["view-ticket-container"]}>
      {/* Header */}
      <div className={styles["ticket-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Ticket #{ticket.id}</h1>
            <p className={styles["ticket-subject"]}>{ticket.subject}</p>
          </div>
        </div>
        <div className={styles["header-right"]}>
          {getStatusBadge(ticket.status)}
          {getPriorityBadge(ticket.priority)}
        </div>
      </div>

      <div className={styles["ticket-content"]}>
        {/* Ticket Info Sidebar */}
        <div className={styles["ticket-info"]}>
          <div className={styles["info-section"]}>
            <h3>Ticket Information</h3>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Department:</span>
              <span className={styles["info-value"]}>
                <Building2 size={16} />
                {ticket.department.title}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Created By:</span>
              <div className={styles["user-info"]}>
                <div className={styles["user-avatar"]}>
                  <span>{getInitials(ticket.createdBy)}</span>
                </div>
                <span className={styles["user-name"]}>{ticket.createdBy}</span>
              </div>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Assigned To:</span>
              <div className={styles["user-info"]}>
                <div className={styles["user-avatar"]}>
                  <span>{getInitials(ticket.assignedTo)}</span>
                </div>
                <span className={styles["user-name"]}>{ticket.assignedTo}</span>
              </div>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Created:</span>
              <span className={styles["info-value"]}>
                <Clock size={16} />
                {formatDate(ticket.createdAt)}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Last Updated:</span>
              <span className={styles["info-value"]}>
                <Clock size={16} />
                {formatDate(ticket.updatedAt)}
              </span>
            </div>
          </div>

          <div className={styles["info-section"]}>
            <h3>Description</h3>
            <p className={styles["ticket-description"]}>{ticket.description}</p>
          </div>
        </div>

        {/* Messages */}
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
                  message.senderType === "admin"
                    ? styles["admin-message"]
                    : styles["customer-message"]
                }`}
              >
                <div className={styles["message-header"]}>
                  <div className={styles["message-sender"]}>
                    <div className={styles["sender-avatar"]}>
                      <span>{getInitials(message.sender)}</span>
                    </div>
                    <div>
                      <div className={styles["sender-name"]}>
                        {message.sender}
                      </div>
                      <div className={styles["message-time"]}>
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["message-content"]}>
                  <p>{message.message}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className={styles["message-attachments"]}>
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className={styles["attachment-item"]}>
                          <Paperclip size={16} />
                          <span>{attachment.name}</span>
                          <span className={styles["attachment-size"]}>
                            ({attachment.size})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className={styles["reply-form"]}>
            <div className={styles["reply-input-container"]}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                className={styles["reply-input"]}
                rows={3}
              />
            </div>

            {attachments.length > 0 && (
              <div className={styles["attachments-preview"]}>
                <h4>Attachments:</h4>
                {attachments.map((file, index) => (
                  <div key={index} className={styles["attachment-preview"]}>
                    <Paperclip size={16} />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className={styles["remove-attachment"]}
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={styles["reply-actions"]}>
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className={styles["file-input"]}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              <label
                htmlFor="file-upload"
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
                {sendingMessage ? (
                  <>
                    <div className={styles["loading-spinner"]}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
