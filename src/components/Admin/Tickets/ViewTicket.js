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
  Folder,
} from "lucide-react";
import styles from "./ViewTicket.module.css";

const ViewTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("public");
  const [internalTarget, setInternalTarget] = useState("Finance Support");
  const [attachments, setAttachments] = useState([]);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [savingManagement, setSavingManagement] = useState(false);

  const currentUser = { id: 4, name: "Admin User" };
  const internalTargets = [
    "Finance Support",
    "Technical Support",
    "Applications Team",
    "Operations Team",
  ];
  const mentionEntities = [
    {
      id: 124,
      type: "Application",
      label: "Canada Application",
    },
    {
      id: 219,
      type: "Application",
      label: "UK Transfer Request",
    },
    {
      id: 567,
      type: "Payment",
      label: "Visa Fee",
    },
    {
      id: 642,
      type: "Payment",
      label: "Deposit Invoice",
    },
    {
      id: 88,
      type: "Service",
      label: "Priority Review",
    },
    {
      id: 302,
      type: "Subscription",
      label: "Premium Support",
    },
  ];

  useEffect(() => {
    const fetchTicketData = async () => {
      // Simulate API call
      setTimeout(() => {
        const parsedId = Number.parseInt(id, 10);
        const safeId = Number.isNaN(parsedId) ? 1042 : parsedId;
        const sampleTicket = {
          id: safeId,
          code: "TCK-2026-1042",
          subject: "Application Status Inquiry",
          user: { id: 12, name: "John Doe" },
          assignedAdmin: { id: 4, name: "Admin User" },
          organization: "Edunigo Global",
          project: "Computer Science - Fall 2026",
          topic: null,
          status: { id: 4, name: "resolved", title: "Resolved" },
          priority: { id: 2, name: "medium", title: "Medium" },
          description:
            "I would like to know the current status of my application for the Computer Science program. I submitted my application last month and haven't received any updates yet.",
          lastResponse: {
            by: "Admin User",
            at: "2026-02-03T14:12:00Z",
            type: "admin",
          },
          createdByType: "user",
          createdByAdmin: null,
          userRating: { score: 5, comment: "Very helpful and clear." },
          createdAt: "2026-02-01T10:30:00Z",
          updatedAt: "2026-02-03T14:45:00Z",
        };

        const sampleMessages = [
          {
            id: 1,
            ticketId: parseInt(id),
            sender: "John Doe",
            senderType: "user",
            message:
              "I submitted my application last month and haven't received any updates yet. Could you please check the status?",
            attachments: [],
            createdAt: "2026-02-01T10:30:00Z",
          },
          {
            id: 2,
            ticketId: parseInt(id),
            sender: "Admin User",
            senderType: "admin",
            message:
              "Thank you for contacting us. I've checked your application and it's currently under review. Our admissions team is working on it and you should receive an update within the next 5-7 business days.",
            attachments: [],
            createdAt: "2026-02-01T14:20:00Z",
            authorId: 4,
          },
          {
            id: 3,
            ticketId: parseInt(id),
            sender: "Finance Support",
            senderType: "internal",
            internalTarget: "Finance Support",
            message:
              "Finance review complete. No outstanding balance found for this application.",
            attachments: [],
            createdAt: "2026-02-01T16:10:00Z",
            authorId: 7,
          },
          {
            id: 4,
            ticketId: parseInt(id),
            sender: "John Doe",
            senderType: "user",
            message:
              "Thank you for the update. I appreciate the quick response. I'll wait for the update from the admissions team.",
            attachments: [],
            createdAt: "2026-02-02T09:15:00Z",
          },
          {
            id: 5,
            ticketId: parseInt(id),
            sender: "Admin User",
            senderType: "admin",
            message:
              "You're welcome! I've also attached your application timeline document for your reference. If you have any other questions, feel free to ask.",
            attachments: [{ name: "application_timeline.pdf", size: "245KB" }],
            createdAt: "2026-02-02T11:30:00Z",
            authorId: 4,
          },
        ];

        setTicket(sampleTicket);
        setStatusValue(sampleTicket.status.name);
        setPriorityValue(sampleTicket.priority.name);
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
        sender: currentUser.name,
        senderType: messageType === "internal" ? "internal" : "admin",
        internalTarget: messageType === "internal" ? internalTarget : null,
        message: newMessage,
        attachments: attachments,
        createdAt: new Date().toISOString(),
        authorId: currentUser.id,
        replyTo: replyToMessage
          ? {
              id: replyToMessage.id,
              sender: replyToMessage.sender,
              createdAt: replyToMessage.createdAt,
              preview: replyToMessage.message.slice(0, 80),
            }
          : null,
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setMentionQuery("");
      setShowMentions(false);
      setAttachments([]);
      setReplyToMessage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleStartEdit = (message) => {
    setEditingMessageId(message.id);
    setEditedMessage(message.message);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditedMessage("");
  };

  const handleSaveEdit = (messageId) => {
    if (!editedMessage.trim()) return;
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, message: editedMessage }
          : message
      )
    );
    handleCancelEdit();
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  const isOwnMessage = (message) => message.authorId === currentUser.id;

  const handleReplySelect = (message) => {
    const replyContext = {
      id: message.id,
      sender: message.sender,
      createdAt: message.createdAt,
      message: message.message,
      senderType: message.senderType,
    };
    setReplyToMessage(replyContext);
    if (message.senderType === "internal") {
      setMessageType("internal");
    }
  };

  const handleReplyCancel = () => {
    setReplyToMessage(null);
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

  const formatStatus = (value) =>
    value
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const handleSaveManagement = async () => {
    if (!ticket) return;
    setSavingManagement(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setTicket((prev) => ({
        ...prev,
        status: { ...prev.status, name: statusValue, title: formatStatus(statusValue) },
        priority: { ...prev.priority, name: priorityValue, title: formatStatus(priorityValue) },
        updatedAt: new Date().toISOString(),
      }));
    } finally {
      setSavingManagement(false);
    }
  };

  const getMessageTypeLabel = (type) => {
    if (type === "internal") return "Internal";
    if (type === "admin") return "Support";
    return "User";
  };

  const handleMessageInputChange = (value) => {
    setNewMessage(value);
    const atIndex = value.lastIndexOf("@");
    if (atIndex !== -1) {
      const query = value.slice(atIndex + 1).trimStart();
      if (query.length <= 30) {
        setMentionQuery(query.toLowerCase());
        setShowMentions(true);
        return;
      }
    }
    setShowMentions(false);
    setMentionQuery("");
  };

  const handleMentionSelect = (entity) => {
    const atIndex = newMessage.lastIndexOf("@");
    if (atIndex === -1) return;
    const before = newMessage.slice(0, atIndex);
    const after = newMessage.slice(atIndex + 1);
    const trimmedAfter = after.replace(/^\S*/, "");
    const structured = `@${entity.type} #${entity.id} – ${entity.label}`;
    const nextValue = `${before}${structured} ${trimmedAfter}`.replace(
      /\s+/g,
      " "
    );
    setNewMessage(nextValue);
    setShowMentions(false);
    setMentionQuery("");
  };

  const filteredMentions = mentionEntities.filter((entity) => {
    const searchable = `${entity.type} #${entity.id} ${entity.label}`.toLowerCase();
    return searchable.includes(mentionQuery);
  });

  const renderMentions = (text) => {
    const pattern = /@([A-Za-z]+)\s#(\d+)\s–\s([^@]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <span key={`${match.index}-${match[2]}`} className={styles["mention-pill"]}>
          @{match[1]} #{match[2]} – {match[3].trim()}
        </span>
      );
      lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
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
            <h1>{ticket.code}</h1>
            <p className={styles["ticket-subject"]}>
              {ticket.subject} • ID #{ticket.id}
            </p>
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
            {ticket.createdByType === "user" && (
              <div className={styles["lock-note"]}>
                User-submitted content is read-only. Manage status and priority
                below.
              </div>
            )}
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>User:</span>
              <div className={styles["user-info"]}>
                <div className={styles["user-avatar"]}>
                  <span>{getInitials(ticket.user.name)}</span>
                </div>
                <span className={styles["user-name"]}>{ticket.user.name}</span>
              </div>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>
                Assigned Support Admin:
              </span>
              <div className={styles["user-info"]}>
                <div className={styles["user-avatar"]}>
                  <span>{getInitials(ticket.assignedAdmin.name)}</span>
                </div>
                <span className={styles["user-name"]}>
                  {ticket.assignedAdmin.name}
                </span>
              </div>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Target:</span>
              <span className={styles["info-value"]}>
                <Folder size={16} />
                {ticket.project}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>Topic:</span>
              <span className={styles["info-value"]}>
                <Folder size={16} />
                {ticket.topic?.title || "General"}
              </span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["info-label"]}>User Rating:</span>
              <span className={styles["info-value"]}>
                {ticket.userRating ? (
                  <span className={styles["rating-pill"]}>
                    {ticket.userRating.score} / 5
                  </span>
                ) : (
                  <span className={styles["rating-empty"]}>No rating yet</span>
                )}
              </span>
            </div>
            {ticket.userRating?.comment && (
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Rating Comment:</span>
                <span className={styles["info-value"]}>
                  {ticket.userRating.comment}
                </span>
              </div>
            )}
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

          <div className={styles["info-section"]}>
            <h3>Management Actions</h3>
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>Status</label>
                <select
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className={styles["form-select"]}
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_for_response">Waiting for Response</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>Priority</label>
                <select
                  value={priorityValue}
                  onChange={(e) => setPriorityValue(e.target.value)}
                  className={styles["form-select"]}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className={styles["save-btn"]}
              onClick={handleSaveManagement}
              disabled={savingManagement}
            >
              {savingManagement ? "Saving..." : "Save Changes"}
            </button>
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
                    : message.senderType === "internal"
                      ? styles["internal-message"]
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
                  <span
                    className={`${styles["message-badge"]} ${
                      styles[`message-${message.senderType}`]
                    }`}
                  >
                    {getMessageTypeLabel(message.senderType)}
                  </span>
                </div>
                <div
                  className={styles["message-content"]}
                  id={`message-${message.id}`}
                >
                  {message.replyTo && (
                    <button
                      type="button"
                      className={styles["reply-context"]}
                      onClick={() => {
                        const target = document.getElementById(
                          `message-${message.replyTo.id}`
                        );
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      <span className={styles["reply-context-meta"]}>
                        Replying to {message.replyTo.sender} •{" "}
                        {formatDate(message.replyTo.createdAt)}
                      </span>
                      <span className={styles["reply-context-preview"]}>
                        {message.replyTo.preview}
                      </span>
                    </button>
                  )}
                  {message.senderType === "internal" &&
                    message.internalTarget && (
                      <div className={styles["internal-target"]}>
                        Target: {message.internalTarget}
                      </div>
                    )}
                  {editingMessageId === message.id ? (
                    <div className={styles["message-edit"]}>
                      <textarea
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className={styles["message-edit-input"]}
                        rows={3}
                      />
                      <div className={styles["message-edit-actions"]}>
                        <button
                          type="button"
                          className={styles["edit-save-btn"]}
                          onClick={() => handleSaveEdit(message.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className={styles["edit-cancel-btn"]}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{renderMentions(message.message)}</p>
                  )}
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
                {editingMessageId !== message.id && (
                  <div className={styles["message-actions"]}>
                    {isOwnMessage(message) && (
                      <button
                        type="button"
                        className={styles["message-action-btn"]}
                        onClick={() => handleStartEdit(message)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles["message-action-btn"]}
                      onClick={() => handleReplySelect(message)}
                    >
                      Reply
                    </button>
                    {isOwnMessage(message) && (
                      <button
                        type="button"
                        className={styles["message-action-btn"]}
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className={styles["reply-form"]}>
            <div className={styles["reply-options"]}>
              <span className={styles["reply-label"]}>Message Type</span>
              <div className={styles["reply-toggle"]}>
                <button
                  type="button"
                  className={`${styles["toggle-btn"]} ${
                    messageType === "public" ? styles["active"] : ""
                  }`}
                  onClick={() => setMessageType("public")}
                  disabled={replyToMessage?.senderType === "internal"}
                >
                  Public Reply
                </button>
                <button
                  type="button"
                  className={`${styles["toggle-btn"]} ${
                    messageType === "internal" ? styles["active"] : ""
                  }`}
                  onClick={() => setMessageType("internal")}
                >
                  Internal Message
                </button>
              </div>
              <p className={styles["reply-hint"]}>
                Internal messages are only visible to admins and departments.
              </p>
              {replyToMessage && (
                <div className={styles["replying-banner"]}>
                  <div>
                    Replying to {replyToMessage.sender} •{" "}
                    {formatDate(replyToMessage.createdAt)}
                  </div>
                  <button
                    type="button"
                    className={styles["reply-cancel-btn"]}
                    onClick={handleReplyCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {messageType === "internal" && (
                <div className={styles["internal-target-row"]}>
                  <label className={styles["internal-target-label"]}>
                    Target Department
                  </label>
                  <select
                    value={internalTarget}
                    onChange={(e) => setInternalTarget(e.target.value)}
                    className={styles["internal-target-select"]}
                  >
                    {internalTargets.map((target) => (
                      <option key={target} value={target}>
                        {target}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className={styles["reply-input-container"]}>
              <textarea
                value={newMessage}
                onChange={(e) => handleMessageInputChange(e.target.value)}
                placeholder={
                  messageType === "internal"
                    ? "Write an internal note..."
                    : "Type your reply..."
                }
                className={styles["reply-input"]}
                rows={3}
              />
              {showMentions && filteredMentions.length > 0 && (
                <div className={styles["mentions-panel"]}>
                  {filteredMentions.map((entity) => (
                    <button
                      key={`${entity.type}-${entity.id}`}
                      type="button"
                      className={styles["mention-item"]}
                      onClick={() => handleMentionSelect(entity)}
                    >
                      @{entity.type} #{entity.id} – {entity.label}
                    </button>
                  ))}
                </div>
              )}
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
                    {messageType === "internal"
                      ? "Send Internal"
                      : "Send Reply"}
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
