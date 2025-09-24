import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  Upload,
  Circle,
  MessageSquare,
  X,
  Send,
  Bell,
  Bot,
} from "lucide-react";
import styles from "./ApplicationDetails.module.css";

// Sample application data - in real app, this would come from API
const sampleApplications = [
  {
    id: 1,
    university: "Stanford University",
    program: "Master of Computer Science",
    status: "action-required",
    statusLabel: "Action Required",
    nextAction: "Upload Your Statement of Purpose",
    deadline: "2024-12-15",
    appliedDate: "2024-10-15",
    progress: 75,
    logo: "🏛️",
    priority: "high",
    goIQMatch: 87,
    estimatedCompletion: "2-3 weeks",
    // Additional details for the details page
    description:
      "A comprehensive program covering advanced computer science topics including artificial intelligence, machine learning, and software engineering.",
    duration: "2 years",
    startDate: "Fall 2025",
    tuition: "$58,000/year",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "GRE scores (recommended)",
      "Statement of Purpose",
      "3 Letters of Recommendation",
      "Official transcripts",
      "English proficiency test (TOEFL/IELTS)",
    ],
    documents: [
      {
        name: "Statement of Purpose",
        status: "pending",
        dueDate: "2024-12-10",
      },
      { name: "GRE Scores", status: "submitted", dueDate: "2024-12-15" },
      {
        name: "Letters of Recommendation",
        status: "submitted",
        dueDate: "2024-12-15",
      },
      {
        name: "Official Transcripts",
        status: "submitted",
        dueDate: "2024-12-15",
      },
      { name: "TOEFL Scores", status: "submitted", dueDate: "2024-12-15" },
    ],
    timeline: [
      {
        stage: "Application Submitted",
        date: "2024-10-15",
        status: "completed",
      },
      { stage: "Documents Review", date: "2024-11-01", status: "completed" },
      {
        stage: "Interview Scheduled",
        date: "2024-12-20",
        status: "upcoming",
      },
      {
        stage: "Decision Notification",
        date: "2025-03-15",
        status: "pending",
      },
    ],
    contact: {
      email: "admissions@stanford.edu",
      phone: "+1 (650) 723-2300",
      address: "450 Serra Mall, Stanford, CA 94305, USA",
      website: "https://www.stanford.edu",
    },
  },
  {
    id: 2,
    university: "MIT",
    program: "Master of Science in AI",
    status: "under-review",
    statusLabel: "Under Review",
    nextAction: "Interview scheduled for Dec 10",
    deadline: "2024-12-20",
    appliedDate: "2024-11-01",
    progress: 100,
    logo: "🎓",
    priority: "high",
    goIQMatch: 92,
    estimatedCompletion: "1-2 weeks",
    // Additional details
    description:
      "Cutting-edge program in artificial intelligence focusing on machine learning, robotics, and cognitive science.",
    duration: "2 years",
    startDate: "Fall 2025",
    tuition: "$53,790/year",
    requirements: [
      "Bachelor's degree in Computer Science, Engineering, or related field",
      "Strong mathematical background",
      "Research experience preferred",
      "Statement of Purpose",
      "3 Letters of Recommendation",
      "Official transcripts",
    ],
    documents: [
      {
        name: "Statement of Purpose",
        status: "submitted",
        dueDate: "2024-12-20",
      },
      {
        name: "Letters of Recommendation",
        status: "submitted",
        dueDate: "2024-12-20",
      },
      {
        name: "Official Transcripts",
        status: "submitted",
        dueDate: "2024-12-20",
      },
      {
        name: "Research Portfolio",
        status: "submitted",
        dueDate: "2024-12-20",
      },
    ],
    timeline: [
      {
        stage: "Application Submitted",
        date: "2024-11-01",
        status: "completed",
      },
      { stage: "Documents Review", date: "2024-11-15", status: "completed" },
      {
        stage: "Interview Completed",
        date: "2024-12-10",
        status: "completed",
      },
      {
        stage: "Decision Notification",
        date: "2025-02-28",
        status: "upcoming",
      },
    ],
    contact: {
      email: "grad-admissions@mit.edu",
      phone: "+1 (617) 253-2917",
      address: "77 Massachusetts Ave, Cambridge, MA 02139, USA",
      website: "https://www.mit.edu",
    },
  },
  {
    id: 3,
    university: "Harvard University",
    program: "MBA",
    status: "submitted",
    statusLabel: "Submitted",
    nextAction: "Submit GMAT scores",
    deadline: "2024-12-30",
    appliedDate: "2024-11-15",
    progress: 60,
    logo: "🎯",
    priority: "medium",
    goIQMatch: 78,
    estimatedCompletion: "3-4 weeks",
    // Additional details
    description:
      "World-renowned MBA program focusing on leadership, strategy, and global business management.",
    duration: "2 years",
    startDate: "Fall 2025",
    tuition: "$73,440/year",
    requirements: [
      "Bachelor's degree from accredited institution",
      "GMAT or GRE scores",
      "Work experience (2+ years recommended)",
      "Essays",
      "2 Letters of Recommendation",
      "Official transcripts",
    ],
    documents: [
      { name: "GMAT Scores", status: "pending", dueDate: "2024-12-25" },
      { name: "Essays", status: "submitted", dueDate: "2024-12-30" },
      {
        name: "Letters of Recommendation",
        status: "submitted",
        dueDate: "2024-12-30",
      },
      {
        name: "Official Transcripts",
        status: "submitted",
        dueDate: "2024-12-30",
      },
    ],
    timeline: [
      {
        stage: "Application Submitted",
        date: "2024-11-15",
        status: "completed",
      },
      {
        stage: "Documents Review",
        date: "2024-12-01",
        status: "in-progress",
      },
      { stage: "Interview", date: "2025-01-15", status: "pending" },
      {
        stage: "Decision Notification",
        date: "2025-03-20",
        status: "pending",
      },
    ],
    contact: {
      email: "mbaadmissions@hbs.edu",
      phone: "+1 (617) 495-6127",
      address: "Soldiers Field, Boston, MA 02163, USA",
      website: "https://www.hbs.edu",
    },
  },
];

// Sample GoIQ questions - in real app, this would come from API
const sampleGoIQQuestions = [
  {
    id: 1,
    question: "What is your primary field of study or research interest?",
    type: "text",
    placeholder: "e.g., Computer Science, Artificial Intelligence",
  },
  {
    id: 2,
    question: "What is your current academic level?",
    type: "select",
    options: ["Undergraduate", "Graduate", "PhD", "Postdoc"],
  },
  {
    id: 3,
    question: "What is your GPA or equivalent academic performance?",
    type: "text",
    placeholder: "e.g., 3.8/4.0, First Class Honours",
  },
  {
    id: 4,
    question: "Do you have any research publications or papers?",
    type: "select",
    options: [
      "Yes, multiple",
      "Yes, one or two",
      "No, but working on it",
      "No",
    ],
  },
  {
    id: 5,
    question: "What is your preferred study destination?",
    type: "text",
    placeholder: "e.g., United States, United Kingdom, Canada",
  },
];

// Sample chat data - in real app, this would come from API
const sampleChatMessages = [
  {
    id: 1,
    sender: "admin",
    senderName: "Sarah Johnson",
    role: "Admissions Officer",
    message:
      "Welcome to Stanford's application support! I'm here to help with any questions about your Master of Computer Science application.",
    timestamp: "2024-10-15T09:00:00Z",
    avatar: "👩‍💼",
  },
  {
    id: 2,
    sender: "user",
    senderName: "You",
    message:
      "Thank you! I have a question about the Statement of Purpose requirements. What should be the ideal length?",
    timestamp: "2024-10-15T09:15:00Z",
    avatar: "👤",
  },
  {
    id: 3,
    sender: "admin",
    senderName: "Sarah Johnson",
    role: "Admissions Officer",
    message:
      "Great question! We recommend 1-2 pages (500-1000 words). Focus on your research interests, relevant experience, and why Stanford is the right fit for your goals.",
    timestamp: "2024-10-15T09:18:00Z",
    avatar: "👩‍💼",
  },
  {
    id: 4,
    sender: "student",
    senderName: "Alex Chen",
    role: "Current Student",
    message:
      "Hi! I'm a current MS student here. Happy to share my experience! The SOP should definitely highlight any research experience you have.",
    timestamp: "2024-10-15T14:30:00Z",
    avatar: "🎓",
  },
  {
    id: 5,
    sender: "user",
    senderName: "You",
    message:
      "That's really helpful, Alex! What research areas are most popular in the program?",
    timestamp: "2024-10-15T14:35:00Z",
    avatar: "👤",
  },
  {
    id: 6,
    sender: "student",
    senderName: "Alex Chen",
    role: "Current Student",
    message:
      "AI/ML is huge here, but we also have strong groups in systems, HCI, and security. The faculty are amazing and very accessible.",
    timestamp: "2024-10-15T14:40:00Z",
    avatar: "🎓",
  },
  {
    id: 7,
    sender: "snap",
    senderName: "Snap Assistant",
    role: "AI Assistant",
    message:
      "📋 Reminder: Your Statement of Purpose is due in 3 days (December 12, 2024). Would you like me to send you our SOP writing guide?",
    timestamp: "2024-12-09T10:00:00Z",
    avatar: "🤖",
  },
  {
    id: 8,
    sender: "user",
    senderName: "You",
    message:
      "Yes, please send the guide! Also, do I need to submit my GRE scores separately?",
    timestamp: "2024-12-09T10:05:00Z",
    avatar: "👤",
  },
  {
    id: 9,
    sender: "snap",
    senderName: "Snap Assistant",
    role: "AI Assistant",
    message:
      "✅ SOP guide sent to your email! For GRE scores, they should be sent directly from ETS to Stanford (code 4704). Self-reported scores in your application are fine for initial review.",
    timestamp: "2024-12-09T10:06:00Z",
    avatar: "🤖",
  },
  {
    id: 10,
    sender: "admin",
    senderName: "Michael Rodriguez",
    role: "Admissions Coordinator",
    message:
      "I see you have questions about GRE scores. Just to clarify - we received your official scores yesterday, so you're all set on that front!",
    timestamp: "2024-12-09T11:30:00Z",
    avatar: "👨‍💼",
  },
  {
    id: 11,
    sender: "user",
    senderName: "You",
    message:
      "Perfect! Thank you for confirming. One more question - can I submit additional research papers as supplementary materials?",
    timestamp: "2024-12-09T11:45:00Z",
    avatar: "👤",
  },
  {
    id: 12,
    sender: "admin",
    senderName: "Michael Rodriguez",
    role: "Admissions Coordinator",
    message:
      "Yes, you can include up to 2 research papers. Please upload them in the 'Additional Materials' section of your application portal.",
    timestamp: "2024-12-09T12:00:00Z",
    avatar: "👨‍💼",
  },
  {
    id: 13,
    sender: "snap",
    senderName: "Snap Assistant",
    role: "AI Assistant",
    message:
      "💡 Tip: When uploading research papers, make sure they're in PDF format and clearly labeled with your name and the paper title.",
    timestamp: "2024-12-09T12:01:00Z",
    avatar: "🤖",
  },
  {
    id: 14,
    sender: "student",
    senderName: "Maria Santos",
    role: "Alumni",
    message:
      "Hey! I graduated from the program last year. If you have any questions about courses or career outcomes, feel free to ask!",
    timestamp: "2024-12-10T09:00:00Z",
    avatar: "👩‍🎓",
  },
  {
    id: 15,
    sender: "user",
    senderName: "You",
    message: "Thanks Maria! What was your favorite course in the program?",
    timestamp: "2024-12-10T09:15:00Z",
    avatar: "👤",
  },
];

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages] = useState(sampleChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isGoIQModalOpen, setIsGoIQModalOpen] = useState(false);
  const [goIQAnswers, setGoIQAnswers] = useState({});
  const [notifications] = useState([
    {
      id: 1,
      type: "info",
      message: "Your Statement of Purpose is due in 3 days",
      timestamp: "2024-12-09T10:00:00Z",
    },
    {
      id: 2,
      type: "success",
      message: "GRE scores have been received and verified",
      timestamp: "2024-12-08T14:30:00Z",
    },
  ]);

  useEffect(() => {
    console.log("ApplicationDetails useEffect - ID from params:", id);
    console.log(
      "Available applications:",
      sampleApplications.map((app) => ({ id: app.id, name: app.university }))
    );

    // Find the application by ID
    const foundApplication = sampleApplications.find(
      (app) => app.id === parseInt(id)
    );
    console.log("Found application:", foundApplication);

    if (foundApplication) {
      setApplication(foundApplication);
    } else {
      console.log("Application not found, redirecting to applications list");
      // If application not found, redirect to applications
      navigate("/user/applications");
    }
  }, [id, navigate]);

  const formatChatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getSenderStyle = (sender) => {
    switch (sender) {
      case "user":
        return {
          backgroundColor: "#0037ff",
          color: "white",
          alignSelf: "flex-end",
          marginLeft: "auto",
        };
      case "admin":
        return {
          backgroundColor: "#f1f5f9",
          color: "#1a202c",
          border: "1px solid #e2e8f0",
        };
      case "student":
        return {
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          border: "1px solid #bae6fd",
        };
      case "snap":
        return {
          backgroundColor: "#f0fdf4",
          color: "#059669",
          border: "1px solid #bbf7d0",
        };
      default:
        return {
          backgroundColor: "#f8fafc",
          color: "#64748b",
          border: "1px solid #e2e8f0",
        };
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleGoIQAnswerChange = (questionId, value) => {
    setGoIQAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleGoIQSubmit = () => {
    // In a real app, this would perform the search and mapping
    console.log("GoIQ Answers:", goIQAnswers);
    // Simulate search and pre-fill
    alert("GoIQ search completed! Relevant fields have been pre-filled.");
    setIsGoIQModalOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "action-required":
        return (
          <ArrowUpRight
            size={16}
            className={[styles["status-icon"], styles["action-required"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "under-review":
        return (
          <Clock
            size={16}
            className={[styles["status-icon"], styles["under-review"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "submitted":
        return (
          <CheckCircle2
            size={16}
            className={[styles["status-icon"], styles["submitted"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "offer-received":
        return (
          <CheckCircle2
            size={16}
            className={[styles["status-icon"], styles["offer-received"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      case "unsuccessful":
        return (
          <X
            size={16}
            className={[styles["status-icon"], styles["unsuccessful"]]
              .filter(Boolean)
              .join(" ")}
          />
        );
      default:
        return <Circle size={16} className={styles["status-icon"]} />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "action-required":
        return {
          background: "#e0f2fe",
          border: "#bae6fd",
          color: "#0369a1",
          iconColor: "#0369a1",
        };
      case "under-review":
        return {
          background: "#fef3c7",
          border: "#fde68a",
          color: "#d97706",
          iconColor: "#d97706",
        };
      case "submitted":
        return {
          background: "#f0fdf4",
          border: "#bbf7d0",
          color: "#059669",
          iconColor: "#059669",
        };
      case "offer-received":
        return {
          background: "#f0fdf4",
          border: "#bbf7d0",
          color: "#059669",
          iconColor: "#059669",
        };
      case "unsuccessful":
        return {
          background: "#fef2f2",
          border: "#fecaca",
          color: "#dc2626",
          iconColor: "#dc2626",
        };
      default:
        return {
          background: "#f8fafc",
          border: "#e2e8f0",
          color: "#64748b",
          iconColor: "#94a3b8",
        };
    }
  };

  const getDocumentStatusConfig = (status) => {
    switch (status) {
      case "submitted":
        return {
          color: "#10b981",
          background: "#f0fdf4",
          border: "#bbf7d0",
        };
      case "pending":
        return {
          color: "#0369a1",
          background: "#e0f2fe",
          border: "#bae6fd",
        };
      case "overdue":
        return {
          color: "#1e40af",
          background: "#dbeafe",
          border: "#bfdbfe",
        };
      default:
        return {
          color: "#64748b",
          background: "#f8fafc",
          border: "#e2e8f0",
        };
    }
  };

  if (!application) {
    return (
      <div className={styles["application-details"]}>
        <div className={styles["loading-container"]}>
          <div className={styles["loading-spinner"]}></div>
          <p>Loading application details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["application-details"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <button
          className={styles["back-button"]}
          onClick={() => navigate("/user/applications")}
        >
          <ArrowLeft size={20} />
          Back to Applications
        </button>
        <div className={styles["header-content"]}>
          <div className={styles["university-info"]}>
            <div className={styles["university-logo"]}>{application.logo}</div>
            <div className={styles["university-details"]}>
              <h1>{application.university}</h1>
              <p>{application.program}</p>
            </div>
          </div>
          <div
            className={styles["status-badge"]}
            style={getStatusConfig(application.status)}
          >
            <span
              className={styles["status-icon-wrapper"]}
              style={{ color: getStatusConfig(application.status).iconColor }}
            >
              {getStatusIcon(application.status)}
            </span>
            <span className={styles["status-text"]}>
              {application.statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className={styles["notifications"]}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles["notification"]}>
              <Bell size={16} />
              <span>{notification.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Application Tracker */}
      <div className={styles["application-tracker"]}>
        <h3>Application Tracker</h3>
        <div className={styles["tracker-steps"]}>
          {application.timeline.map((step, index) => (
            <div key={index} className={styles["tracker-step"]}>
              <div
                className={[styles["step-indicator"], styles[step.status]].join(
                  " "
                )}
              >
                {step.status === "completed" && <CheckCircle2 size={16} />}
                {step.status === "in-progress" && <Clock size={16} />}
                {step.status === "upcoming" && <Circle size={16} />}
                {step.status === "pending" && <Circle size={16} />}
              </div>
              <div className={styles["step-content"]}>
                <h5>{step.stage}</h5>
                <p>{new Date(step.date).toLocaleDateString()}</p>
              </div>
              {index < application.timeline.length - 1 && (
                <div className={styles["step-connector"]}></div>
              )}
            </div>
          ))}
        </div>
        <div className={styles["tracker-footer"]}>
          <div className={styles["completion-info"]}>
            <span>Estimated completion: {application.estimatedCompletion}</span>
          </div>
          <div className={styles["goiq-match"]}>
            <span>GoIQ Match: {application.goIQMatch}%</span>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className={styles["next-action"]}>
        <div className={styles["action-header"]}>
          <Target size={20} />
          <h3>Next Action / Steps</h3>
        </div>
        <p className={styles["action-description"]}>{application.nextAction}</p>
        <button className={styles["action-button"]}>
          <Upload size={16} />
          Take Action
        </button>
      </div>

      {/* Smart List - Required Documents */}
      <div className={styles["smart-list"]}>
        <h3>Required Documents</h3>
        <div className={styles["documents-grid"]}>
          {application.documents.map((doc, index) => (
            <div key={index} className={styles["document-card"]}>
              <div className={styles["document-info"]}>
                <FileText size={20} />
                <div>
                  <h5>{doc.name}</h5>
                  <p>Due: {new Date(doc.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className={styles["document-actions"]}>
                <span
                  className={styles["document-status"]}
                  style={getDocumentStatusConfig(doc.status)}
                >
                  {doc.status}
                </span>
                {doc.status === "submitted" ? (
                  <button className={styles["download-btn"]}>
                    <Download size={16} />
                  </button>
                ) : (
                  <button className={styles["upload-btn"]}>
                    <Upload size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message to Advisor */}
      <div className={styles["advisor-section"]}>
        <button
          className={styles["advisor-button"]}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageSquare size={20} />
          Message to Advisor
        </button>
      </div>

      {/* AI GoIQ Button */}
      <div className={styles["goiq-section"]}>
        <button
          className={styles["goiq-button"]}
          onClick={() => setIsGoIQModalOpen(true)}
        >
          <Bot size={20} />
          AI GoIQ
        </button>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className={styles["chat-panel"]}>
          <div className={styles["chat-header"]}>
            <h4>Message to Advisor</h4>
            <button
              className={styles["chat-close"]}
              onClick={() => setIsChatOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className={styles["chat-messages"]}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={[styles["chat-message"], styles[message.sender]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles["message-header"]}>
                  <div className={styles["message-avatar"]}>
                    {message.avatar}
                  </div>
                  <div className={styles["message-info"]}>
                    <span className={styles["message-sender"]}>
                      {message.senderName}
                    </span>
                    {message.role && (
                      <span className={styles["message-role"]}>
                        {message.role}
                      </span>
                    )}
                  </div>
                  <span className={styles["message-time"]}>
                    {formatChatTime(message.timestamp)}
                  </span>
                </div>
                <div
                  className={styles["message-content"]}
                  style={getSenderStyle(message.sender)}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          <form
            className={styles["chat-input-form"]}
            onSubmit={handleSendMessage}
          >
            <div className={styles["chat-input-container"]}>
              <input
                type="text"
                className={styles["chat-input"]}
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className={styles["chat-send-button"]}>
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* GoIQ Modal */}
      {isGoIQModalOpen && (
        <div className={styles["goiq-modal"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <h3>AI GoIQ Questions</h3>
              <button
                className={styles["modal-close"]}
                onClick={() => setIsGoIQModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles["questions-form"]}>
              {sampleGoIQQuestions.map((question) => (
                <div key={question.id} className={styles["question-field"]}>
                  <label>{question.question}</label>
                  {question.type === "text" ? (
                    <input
                      type="text"
                      placeholder={question.placeholder}
                      value={goIQAnswers[question.id] || ""}
                      onChange={(e) =>
                        handleGoIQAnswerChange(question.id, e.target.value)
                      }
                    />
                  ) : (
                    <select
                      value={goIQAnswers[question.id] || ""}
                      onChange={(e) =>
                        handleGoIQAnswerChange(question.id, e.target.value)
                      }
                    >
                      <option value="">Select an option</option>
                      {question.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
            <button
              className={styles["goiq-submit-button"]}
              onClick={handleGoIQSubmit}
            >
              <Bot size={20} />
              Execute GoIQ Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
