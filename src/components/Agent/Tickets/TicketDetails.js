import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Send,
  FileText,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  Trash2,
  Plus,
} from "lucide-react";
import DeleteConfirmationModal from "../../Admin/Tickets/DeleteConfirmationModal";
import styles from "./TicketDetails.module.css";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replying, setReplying] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchTicketDetails = async () => {
      // Simulate API call delay
      setTimeout(() => {
        // Sample ticket data
        const sampleTicket = {
          id: parseInt(id),
          subject: "Application Status Inquiry",
          department: {
            id: 1,
            name: "Admissions",
            title: "Admissions Department",
          },
          status: { id: 1, name: "open", title: "Open" },
          priority: { id: 2, name: "medium", title: "Medium" },
          description:
            "I would like to know the current status of my application for the Computer Science program. I submitted all required documents last week but haven't received any updates yet. Could you please check and provide me with the current status?",
          attachments: [
            { id: 1, name: "transcript.pdf", size: "2.1 MB", type: "pdf" },
            {
              id: 2,
              name: "recommendation_letter.pdf",
              size: "1.8 MB",
              type: "pdf",
            },
          ],
          createdBy: "John Doe",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-20T14:20:00Z",
        };

        // Sample replies data
        const sampleReplies = [
          {
            id: 1,
            message:
              "Thank you for contacting us regarding your application status. I have checked our system and your application is currently under review by our admissions committee.",
            sender: "Admin User",
            senderType: "admin",
            createdAt: "2024-01-16T09:15:00Z",
            attachments: [],
          },
          {
            id: 2,
            message:
              "Thank you for the update. When can I expect to receive the final decision?",
            sender: "John Doe",
            senderType: "user",
            createdAt: "2024-01-16T14:30:00Z",
            attachments: [],
          },
          {
            id: 3,
            message:
              "The admissions committee typically reviews applications within 2-3 weeks of receiving all required documents. Since your application was submitted on January 15th, you should expect to hear back by February 5th. I'll send you an email as soon as the decision is made.",
            sender: "Admin User",
            senderType: "admin",
            createdAt: "2024-01-17T11:20:00Z",
            attachments: [
              {
                id: 1,
                name: "application_guidelines.pdf",
                size: "1.2 MB",
                type: "pdf",
              },
            ],
          },
        ];

        setTicket(sampleTicket);
        setReplies(sampleReplies);
        setLoading(false);
      }, 1000);
    };

    fetchTicketDetails();
  }, [id]);

  const handleSendReply = async () => {
    if (!newReply.trim()) return;

    setReplying(true);

    // Simulate API call
    setTimeout(() => {
      const newReplyObj = {
        id: replies.length + 1,
        message: newReply,
        sender: "Current Agent", // This would be the actual logged-in agent
        senderType: "agent",
        createdAt: new Date().toISOString(),
        attachments: attachments,
      };

      setReplies([...replies, newReplyObj]);
      setNewReply("");
      setAttachments([]);
      setReplying(false);
    }, 500);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file, index) => ({
      id: attachments.length + index + 1,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + " MB",
      type: file.type.split("/")[1] || "file",
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(attachments.filter((att) => att.id !== attachmentId));
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteTicket = () => {
    // Handle delete logic here
    setShowDeleteModal(false);
    navigate("/agent/tickets");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading ticket details...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className={styles["error-container"]}>
        <h3>Ticket not found</h3>
        <p>The ticket you're looking for doesn't exist or has been deleted.</p>
        <button onClick={() => navigate("/agent/tickets")}>
          Back to Tickets
        </button>
      </div>
    );
  }

  return (
    <div className={styles["ticket-details-container"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/agent/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["ticket-info"]}>
            <div className={styles["ticket-title"]}>
              <span className={styles["ticket-id"]}>T#{ticket.id}</span>
              <h1>{ticket.subject}</h1>
            </div>
            <div className={styles["ticket-meta"]}>
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
              <span className={styles["department-badge"]}>
                {ticket.department.title}
              </span>
            </div>
          </div>
        </div>
        <div className={styles["header-actions"]}>
          <button className={styles["delete-btn"]} onClick={openDeleteModal}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Ticket Details Card */}
      <div className={styles["ticket-details-card"]}>
        <div className={styles["card-header"]}>
          <h3>Ticket Details</h3>
        </div>
        <div className={styles["card-content"]}>
          <div className={styles["details-grid"]}>
            <div className={styles["detail-item"]}>
              <div className={styles["detail-label"]}>
                <User size={16} />
                Created By
              </div>
              <div className={styles["detail-value"]}>
                <div className={styles["user-info"]}>
                  <div className={styles["user-avatar"]}>
                    {getInitials(ticket.createdBy)}
                  </div>
                  <span>{ticket.createdBy}</span>
                </div>
              </div>
            </div>
            <div className={styles["detail-item"]}>
              <div className={styles["detail-label"]}>
                <Calendar size={16} />
                Created
              </div>
              <div className={styles["detail-value"]}>
                {formatDateTime(ticket.createdAt).date} at{" "}
                {formatDateTime(ticket.createdAt).time}
              </div>
            </div>
            <div className={styles["detail-item"]}>
              <div className={styles["detail-label"]}>
                <Clock size={16} />
                Last Updated
              </div>
              <div className={styles["detail-value"]}>
                {formatDateTime(ticket.updatedAt).date} at{" "}
                {formatDateTime(ticket.updatedAt).time}
              </div>
            </div>
          </div>
          <div className={styles["description-section"]}>
            <div className={styles["detail-label"]}>
              <FileText size={16} />
              Description
            </div>
            <div className={styles["description-text"]}>
              {ticket.description}
            </div>
          </div>
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className={styles["attachments-section"]}>
              <div className={styles["detail-label"]}>
                <Paperclip size={16} />
                Attachments ({ticket.attachments.length})
              </div>
              <div className={styles["attachments-list"]}>
                {ticket.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={styles["attachment-item"]}
                  >
                    <div className={styles["attachment-info"]}>
                      <div className={styles["attachment-name"]}>
                        {attachment.name}
                      </div>
                      <div className={styles["attachment-size"]}>
                        {attachment.size}
                      </div>
                    </div>
                    <button className={styles["download-btn"]}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conversation Thread */}
      <div className={styles["conversation-section"]}>
        <div className={styles["section-header"]}>
          <h3>
            <MessageSquare size={20} />
            Conversation ({replies.length} replies)
          </h3>
        </div>

        <div className={styles["replies-container"]}>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className={`${styles["reply-item"]} ${
                styles[`reply-${reply.senderType}`]
              }`}
            >
              <div className={styles["reply-header"]}>
                <div className={styles["reply-sender"]}>
                  <div className={styles["sender-avatar"]}>
                    {getInitials(reply.sender)}
                  </div>
                  <div className={styles["sender-info"]}>
                    <div className={styles["sender-name"]}>{reply.sender}</div>
                    <div className={styles["sender-role"]}>
                      {reply.senderType === "admin"
                        ? "Admin"
                        : reply.senderType === "agent"
                        ? "Agent"
                        : "User"}
                    </div>
                  </div>
                </div>
                <div className={styles["reply-time"]}>
                  {formatDateTime(reply.createdAt).date} at{" "}
                  {formatDateTime(reply.createdAt).time}
                </div>
              </div>
              <div className={styles["reply-content"]}>
                <div className={styles["reply-message"]}>{reply.message}</div>
                {reply.attachments && reply.attachments.length > 0 && (
                  <div className={styles["reply-attachments"]}>
                    {reply.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className={styles["reply-attachment"]}
                      >
                        <Paperclip size={12} />
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
        <div className={styles["reply-form"]}>
          <div className={styles["form-header"]}>
            <h4>Add Reply</h4>
          </div>
          <div className={styles["form-content"]}>
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Type your reply here..."
              className={styles["reply-textarea"]}
              rows={4}
            />
            {attachments.length > 0 && (
              <div className={styles["new-attachments"]}>
                {attachments.map((attachment) => (
                  <div key={attachment.id} className={styles["new-attachment"]}>
                    <Paperclip size={12} />
                    <span>{attachment.name}</span>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className={styles["remove-attachment"]}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={styles["form-actions"]}>
              <label className={styles["file-upload-btn"]}>
                <Plus size={16} />
                Add Attachments
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              <button
                className={styles["send-btn"]}
                onClick={handleSendReply}
                disabled={!newReply.trim() || replying}
              >
                {replying ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteTicket}
          itemName={`Ticket #${ticket.id} - ${ticket.subject}`}
          itemType="ticket"
        />
      )}
    </div>
  );
};

export default TicketDetails;
