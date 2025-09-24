import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  Trophy,
  FileText,
  Check,
  ArrowRight,
  Users,
  DollarSign,
  Calendar,
  Target,
  BookOpen,
} from "lucide-react";
import GoCheckQuestions from "../Shared/GoCheckQuestions";
import styles from "./GoCheck.module.css";
import {
  generateSessionId,
  getCurrentSessionId,
  getSessionData,
  updateSessionData,
} from "../../utils/gocheckSessionManager";

const GoCheck = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);
  const [currentStage, setCurrentStage] = useState(1); // 1 = initial questions, 2 = additional questions, 3 = university selection
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const questions = useMemo(
    () => [
      {
        id: "countryInterest",
        title: "Where would you love to study? 🌍",
        subtitle: "This helps us find the perfect programs for you",
        type: "select",
        icon: MapPin,
        placeholder: "Choose your dream study destination",
        options: [
          "United States",
          "Canada",
          "United Kingdom",
          "Australia",
          "Germany",
          "France",
          "Spain",
          "Italy",
          "Netherlands",
          "Sweden",
          "Norway",
          "Japan",
          "South Korea",
          "Singapore",
          "New Zealand",
          "Other",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your dream study destination";
          return null;
        },
        microcopy:
          "Great choice! 🎯 This will help us find programs that match your goals.",
      },
      {
        id: "countryOrigin",
        title: "Where are you currently based? 🏠",
        subtitle: "We'll use this to find the best pathway for you",
        type: "select",
        icon: MapPin,
        placeholder: "Select your current location",
        options: [
          "United States",
          "Canada",
          "United Kingdom",
          "Australia",
          "Germany",
          "France",
          "Spain",
          "Italy",
          "Japan",
          "South Korea",
          "China",
          "India",
          "Brazil",
          "Mexico",
          "UAE",
          "Saudi Arabia",
          "Nigeria",
          "Egypt",
          "Pakistan",
          "Bangladesh",
          "Other",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your current location";
          return null;
        },
        microcopy:
          "Perfect! ✨ Now we can tailor the application process for your region.",
      },
      {
        id: "education",
        title: "What's your highest education level? 🎓",
        subtitle: "This determines which programs you're eligible for",
        type: "radio",
        icon: GraduationCap,
        options: [
          "High School Diploma",
          "Associate Degree",
          "Bachelor's Degree",
          "Master's Degree",
          "Doctoral Degree (PhD)",
          "Professional Degree",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your education level";
          return null;
        },
        microcopy:
          "Nice! Got your education level 💬. Now let's check your GPA...",
      },
      {
        id: "gpa",
        title: "What's your final GPA or grade? 📊",
        subtitle: "The more accurate this is, the better we can match you",
        type: "text",
        icon: Trophy,
        placeholder: "e.g., 3.8/4.0 or 85% or A-",
        required: true,
        validation: (value) => {
          if (!value || !value.trim())
            return "GPA helps us find the right programs for you";
          return null;
        },
        microcopy: "☑ Added GPA - your readiness accuracy improved to 75%",
      },
      {
        id: "englishTest",
        title: "Do you have an English test score? 📝",
        subtitle: "This really helps with your application success",
        type: "radio",
        icon: FileText,
        options: [
          "Yes, IELTS",
          "Yes, TOEFL",
          "Yes, other test",
          "No, I don't have any yet",
        ],
        required: true,
        validation: (value) => {
          if (!value)
            return "Please let us know about your English test status";
          return null;
        },
        microcopy: {
          "Yes, IELTS":
            "☑ Great! Having an English test puts you ahead of the competition",
          "Yes, TOEFL":
            "☑ Great! Having an English test puts you ahead of the competition",
          "Yes, other test":
            "☑ Great! Having an English test puts you ahead of the competition",
          "No, I don't have any yet":
            "🔄 No worries - if you don't have a test yet, we'll show you what programs you can still target",
        },
      },
    ],
    []
  );

  // Stage 2 questions (additional questions after login)
  const stage2Questions = useMemo(
    () => [
      {
        id: "programInterest",
        title: "What program are you most interested in? 🎯",
        subtitle: "This helps us find the perfect academic path for you",
        type: "select",
        icon: BookOpen,
        placeholder: "Select your preferred program",
        options: [
          "Computer Science",
          "Data Science",
          "AI & Machine Learning",
          "Software Engineering",
          "Cybersecurity",
          "Business Administration",
          "Finance",
          "Marketing",
          "Engineering",
          "Medicine",
          "Law",
          "Psychology",
          "Other",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your preferred program";
          return null;
        },
        microcopy:
          "Excellent choice! 🎯 This will help us find the best programs for you.",
      },
      {
        id: "budgetRange",
        title: "What's your budget range for tuition? 💰",
        subtitle: "This helps us recommend universities within your budget",
        type: "radio",
        icon: DollarSign,
        options: [
          "$30,000 - $50,000",
          "$50,000 - $80,000",
          "$80,000 - $120,000",
          "$120,000+",
          "I need financial aid/scholarships",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your budget range";
          return null;
        },
        microcopy:
          "Great! 💰 We'll find universities that fit your budget perfectly.",
      },
      {
        id: "intakePreference",
        title: "When would you like to start? 📅",
        subtitle: "This helps us plan your application timeline",
        type: "radio",
        icon: Calendar,
        options: [
          "Fall 2025",
          "Spring 2025",
          "Fall 2026",
          "Spring 2026",
          "I'm flexible",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your preferred intake";
          return null;
        },
        microcopy: "Perfect! 📅 We'll create a timeline that works for you.",
      },
      {
        id: "studyMode",
        title: "How would you prefer to study? 🎓",
        subtitle: "This helps us find the right learning environment",
        type: "radio",
        icon: Users,
        options: [
          "On-campus (full-time)",
          "Online/Distance learning",
          "Hybrid (mix of both)",
          "I'm open to all options",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your preferred study mode";
          return null;
        },
        microcopy:
          "Excellent! 🎓 We'll find programs that match your learning style.",
      },
      {
        id: "careerGoals",
        title: "What are your career goals? 🚀",
        subtitle:
          "This helps us find programs that align with your aspirations",
        type: "select",
        icon: Target,
        placeholder: "Select your primary career goal",
        options: [
          "Get a job in my field",
          "Start my own business",
          "Continue to PhD/Research",
          "Change career direction",
          "Advance in current career",
          "I'm not sure yet",
        ],
        required: true,
        validation: (value) => {
          if (!value) return "Please select your career goal";
          return null;
        },
        microcopy:
          "Amazing! 🚀 We'll find programs that help you achieve your goals.",
      },
    ],
    []
  );

  const programs = [
    {
      id: "harvard-cs-ms",
      university: "Harvard University",
      program: "Master of Science in Computer Science",
      field: "Computer Science",
      duration: "2 years",
      academicYear: "Fall 2025",
      tuition: "$54,269/year",
      ranking: "#1 in National Universities",
      description:
        "Advanced program focusing on artificial intelligence, machine learning, and software engineering. Includes research opportunities and industry partnerships.",
      requirements: "Bachelor's in CS or related field, GRE scores, 3.5+ GPA",
      highlights: [
        "World-class faculty",
        "Research opportunities",
        "Industry connections",
        "Cambridge location",
      ],
    },
    {
      id: "stanford-ai-ms",
      university: "Stanford University",
      program: "Master of Science in Artificial Intelligence",
      field: "AI & Machine Learning",
      duration: "2 years",
      academicYear: "Fall 2025",
      tuition: "$58,197/year",
      ranking: "#2 in National Universities",
      description:
        "Cutting-edge AI program with focus on deep learning, robotics, and natural language processing. Located in Silicon Valley.",
      requirements:
        "Strong math background, programming experience, GRE scores, 3.7+ GPA",
      highlights: [
        "Silicon Valley location",
        "Industry partnerships",
        "Startup opportunities",
        "Leading AI research",
      ],
    },
    {
      id: "mit-data-ms",
      university: "MIT",
      program: "Master of Science in Data Science",
      field: "Data Science",
      duration: "1.5 years",
      academicYear: "Fall 2025",
      tuition: "$57,986/year",
      ranking: "#1 in Engineering",
      description:
        "Intensive data science program covering statistics, machine learning, and big data analytics. Strong focus on practical applications.",
      requirements:
        "Bachelor's in STEM field, strong math background, GRE scores, 3.6+ GPA",
      highlights: [
        "Top engineering school",
        "Practical focus",
        "Industry projects",
        "Boston location",
      ],
    },
    {
      id: "oxford-business-msc",
      university: "University of Oxford",
      program: "MSc in Business Administration",
      field: "Business Administration",
      duration: "1 year",
      academicYear: "Fall 2025",
      tuition: "£32,000/year",
      ranking: "#1 in UK Universities",
      description:
        "Intensive one-year MBA program with focus on global business, entrepreneurship, and leadership. Historic university setting.",
      requirements:
        "Bachelor's degree, GMAT/GRE scores, work experience preferred, 3.5+ GPA",
      highlights: [
        "Historic university",
        "Global perspective",
        "One-year program",
        "Oxford location",
      ],
    },
    {
      id: "cambridge-eng-msc",
      university: "University of Cambridge",
      program: "MSc in Engineering",
      field: "Engineering",
      duration: "1 year",
      academicYear: "Fall 2025",
      tuition: "£30,000/year",
      ranking: "#2 in UK Universities",
      description:
        "Advanced engineering program with specialization options in various fields. Strong research component and industry connections.",
      requirements:
        "Bachelor's in Engineering, strong academic record, IELTS/TOEFL, 3.6+ GPA",
      highlights: [
        "Prestigious university",
        "Research focus",
        "One-year program",
        "Cambridge location",
      ],
    },
  ];

  // Initialize session on component mount
  useEffect(() => {
    let newSessionId = getCurrentSessionId();

    // Check if user has existing session data first
    if (newSessionId) {
      const sessionData = getSessionData(newSessionId);
      if (sessionData) {
        // Check if user has completed GoCheck (selected a program)
        if (sessionData.selectedUniversity && sessionData.completed) {
          setSelectedUniversity(sessionData.selectedUniversity);
          setIsSubmitted(true);
          setCurrentStage(3);
          setSessionId(newSessionId);
          return;
        }

        // Check if stage 1 is complete
        const stage1Answers = sessionData.answers || {};
        const stage1Complete = questions.every((q) => stage1Answers[q.id]);

        // Check if stage 2 is complete
        const stage2Answers = sessionData.additionalAnswers || {};
        const stage2Complete = stage2Questions.every(
          (q) => stage2Answers[q.id]
        );

        // Set current stage based on completion
        if (stage1Complete && stage2Complete) {
          setCurrentStage(3); // Program selection
        } else if (stage1Complete) {
          setCurrentStage(2); // Additional questions
        } else {
          setCurrentStage(1); // Initial questions
        }

        setSessionId(newSessionId);
        return;
      }
    }

    // Check if user is already logged in when starting GoCheck
    // This information is used in handleQuestionsComplete to determine flow

    // Only create new session if no existing session or existing session is invalid
    newSessionId = generateSessionId();
    localStorage.setItem("currentGoCheckSession", newSessionId);
    setSessionId(newSessionId);

    // If user is logged in, they can start from stage 1 and will be automatically
    // moved to stage 2 after completing stage 1 (handled in handleQuestionsComplete)
    setCurrentStage(1);
  }, [questions, stage2Questions]);

  const handleQuestionsComplete = (results) => {
    setReadinessScore(results.readinessScore);

    if (currentStage === 1) {
      // Check if user is already logged in
      const userRole = localStorage.getItem("userRole");
      const userLoginTime = localStorage.getItem("userLoginTime");
      const isLoggedIn = userRole && userLoginTime;

      if (isLoggedIn) {
        // User is already logged in - skip registration and go directly to stage 2
        console.log(
          "User is logged in, skipping registration and moving to stage 2"
        );
        setCurrentStage(2);

        // Save stage 1 answers
        if (sessionId) {
          updateSessionData(sessionId, {
            answers: results.answers,
            stage1Completed: true,
          });
        }
      } else {
        // User is not logged in - show university matches and redirect to registration
        setIsLoading(true);
        localStorage.removeItem("userRegisteredWithoutGoCheck");

        setTimeout(() => {
          setIsLoading(false);
          setIsSubmitted(true);
        }, 2000);
      }
    } else if (currentStage === 2) {
      // Stage 2 complete - move to university selection
      setCurrentStage(3);

      // Save stage 2 answers
      if (sessionId) {
        updateSessionData(sessionId, {
          additionalAnswers: results.answers,
          additionalQuestionsCompleted: true,
        });
      }
    }
  };

  const handleProgramSelection = (program) => {
    setSelectedUniversity(program);

    // Save program selection
    if (sessionId) {
      updateSessionData(sessionId, {
        selectedUniversity: program,
        completed: true,
        completedTime: new Date().toISOString(),
      });
    }

    setIsSubmitted(true);

    // Auto-reset after 5 seconds
    setTimeout(() => {
      // Clear the completed session to start fresh
      if (sessionId) {
        localStorage.removeItem(sessionId);
        localStorage.removeItem("currentGoCheckSession");
        const completedSessions = JSON.parse(
          localStorage.getItem("completedGoCheckSessions") || "[]"
        );
        const updatedSessions = completedSessions.filter(
          (id) => id !== sessionId
        );
        localStorage.setItem(
          "completedGoCheckSessions",
          JSON.stringify(updatedSessions)
        );
      }
      // Reset state and start over
      setSelectedUniversity(null);
      setIsSubmitted(false);
      setCurrentStage(1);
      setReadinessScore(0);
    }, 5000);
  };

  if (isLoading) {
    return (
      <div className={styles["loading-screen"]}>
        <div className={styles["loading-content"]}>
          <div className={styles["loading-spinner"]}></div>
          <h2 className={styles["loading-title"]}>
            Finding Your Perfect Match
          </h2>
          <p className={styles["loading-subtitle"]}>
            Analyzing your profile and matching with universities...
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    if (currentStage === 1) {
      // Stage 1 results - show university matches and redirect to registration
      return (
        <div className={styles["results-screen"]}>
          <div className={styles["results-container"]}>
            <div className={styles["results-header"]}>
              <div className={styles["results-icon"]}>
                <Check />
              </div>
              <h1 className={styles["results-title"]}>Your Top Matches! 🎯</h1>
              <p className={styles["results-subtitle"]}>
                Here are your top 2 university matches. Complete your profile to
                see all available options.
              </p>
              <div className={styles["results-confidence"]}>
                <span className={styles["confidence-label"]}>
                  Match Confidence:
                </span>
                <span className={styles["confidence-value"]}>
                  {Math.round(readinessScore)}%
                </span>
                <span className={styles["confidence-note"]}>
                  {readinessScore >= 80
                    ? "Excellent match quality! More options available after login"
                    : readinessScore >= 60
                    ? "Good matches! Complete your profile to unlock all options"
                    : "Complete your profile to see all available universities"}
                </span>
              </div>
            </div>

            <div className={styles["results-grid"]}>
              {programs.slice(0, 2).map((program, index) => (
                <div
                  key={program.id}
                  className={[
                    styles["university-card"],
                    index >= 2 ? styles["blurred"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["university-ranking"]}>
                    {program.ranking}
                  </div>
                  <h3 className={styles["university-name"]}>
                    {program.university}
                  </h3>
                  <p className={styles["university-description"]}>
                    {program.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles["continue-section"]}>
              <button
                className={styles["continue-to-login-button"]}
                onClick={() => {
                  // Store flag to continue GoCheck after registration
                  localStorage.setItem("continueGoCheckAfterAuth", "true");
                  navigate("/register");
                }}
              >
                Continue to Register
                <ArrowRight />
              </button>
              <p className={styles["continue-note"]}>
                Create your account to see all university matches
              </p>
            </div>
          </div>
        </div>
      );
    } else if (currentStage === 3 && selectedUniversity) {
      // Final results - program selected
      return (
        <div className={styles["results-screen"]}>
          <div className={styles["results-container"]}>
            <div className={styles["results-header"]}>
              <div className={styles["results-icon"]}>
                <Check />
              </div>
              <h1 className={styles["results-title"]}>Congratulations! 🎉</h1>
              <p className={styles["results-subtitle"]}>
                You've successfully completed your GoCheck assessment and
                selected your program.
              </p>
            </div>

            <div
              className={[
                styles["selected-university-card"],
                styles["selected-program-card"],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles["program-header"]}>
                <div className={styles["university-ranking"]}>
                  {selectedUniversity.ranking}
                </div>
                <div className={styles["program-field"]}>
                  {selectedUniversity.field}
                </div>
              </div>

              <h3 className={styles["university-name"]}>
                {selectedUniversity.university}
              </h3>
              <h4 className={styles["program-name"]}>
                {selectedUniversity.program}
              </h4>

              <div className={styles["program-details"]}>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Duration:</span>
                  <span className={styles["detail-value"]}>
                    {selectedUniversity.duration}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Start Date:</span>
                  <span className={styles["detail-value"]}>
                    {selectedUniversity.academicYear}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Tuition:</span>
                  <span className={styles["detail-value"]}>
                    {selectedUniversity.tuition}
                  </span>
                </div>
              </div>

              <p className={styles["university-description"]}>
                {selectedUniversity.description}
              </p>

              <div className={styles["program-highlights"]}>
                {selectedUniversity.highlights.map((highlight, idx) => (
                  <span key={idx} className={styles["highlight-tag"]}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles["continue-section"]}>
              <button
                className={styles["continue-to-login-button"]}
                onClick={() => navigate("/user/dashboard")}
              >
                Go to Dashboard
                <ArrowRight />
              </button>
              <p className={styles["continue-note"]}>
                Your GoCheck assessment is complete! Starting new assessment in
                5 seconds...
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Program selection stage
  if (currentStage === 3) {
    return (
      <div className={styles["gocheck-container"]}>
        <div className={styles["university-selection-screen"]}>
          <div className={styles["selection-header"]}>
            <h1 className={styles["selection-title"]}>
              Choose Your Program 🎯
            </h1>
            <p className={styles["selection-subtitle"]}>
              Based on your answers, here are your top program matches. Select
              the one that best fits your goals and career aspirations.
            </p>
          </div>

          <div className={styles["universities-grid"]}>
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={[
                  styles["university-selection-card"],
                  styles["program-card"],
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleProgramSelection(program)}
              >
                <div className={styles["program-header"]}>
                  <div className={styles["university-ranking"]}>
                    {program.ranking}
                  </div>
                  <div className={styles["program-field"]}>{program.field}</div>
                </div>

                <h3 className={styles["university-name"]}>
                  {program.university}
                </h3>
                <h4 className={styles["program-name"]}>{program.program}</h4>

                <div className={styles["program-details"]}>
                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>Duration:</span>
                    <span className={styles["detail-value"]}>
                      {program.duration}
                    </span>
                  </div>
                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>Start Date:</span>
                    <span className={styles["detail-value"]}>
                      {program.academicYear}
                    </span>
                  </div>
                  <div className={styles["detail-row"]}>
                    <span className={styles["detail-label"]}>Tuition:</span>
                    <span className={styles["detail-value"]}>
                      {program.tuition}
                    </span>
                  </div>
                </div>

                <p className={styles["university-description"]}>
                  {program.description}
                </p>

                <div className={styles["program-highlights"]}>
                  {program.highlights.map((highlight, idx) => (
                    <span key={idx} className={styles["highlight-tag"]}>
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className={styles["selection-button"]}>
                  <span>Select This Program</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Determine which questions to show and header settings
  const currentQuestions = currentStage === 1 ? questions : stage2Questions;

  return (
    <div className={styles["gocheck-container"]}>
      <GoCheckQuestions
        questions={currentQuestions}
        onComplete={handleQuestionsComplete}
        sessionId={sessionId}
        showProgress={true}
        showHistory={true}
        showHeader={false}
        currentStage={currentStage}
      />
    </div>
  );
};

export default GoCheck;
