import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import {
  generateSessionId,
  updateSessionData,
  getCurrentSessionId,
} from "../../utils/gocheckSessionManager";
import styles from "./GoCheckQuestions.module.css";

const GoCheckQuestions = ({
  questions,
  onComplete,
  sessionId: propSessionId,
  showProgress = true,
  showHistory = true,
  showHeader = true,
  title = "Go Check Questions",
  subtitle = "Answer these questions to get personalized recommendations",
  currentStage = 1, // Add stage parameter
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionId, setSessionId] = useState(propSessionId);
  const [answers, setAnswers] = useState({});
  const [animationClass, setAnimationClass] = useState("");
  const [errors, setErrors] = useState({});
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showMicrocopy, setShowMicrocopy] = useState(false);
  const [readinessScore, setReadinessScore] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);

  // Initialize session on component mount
  useEffect(() => {
    let newSessionId = propSessionId;

    if (!newSessionId) {
      newSessionId = getCurrentSessionId() || generateSessionId();
      setSessionId(newSessionId);
      localStorage.setItem("currentGoCheckSession", newSessionId);
    }

    // Initialize session data if it doesn't exist
    const existingData = localStorage.getItem(newSessionId);
    if (!existingData) {
      const sessionData = {
        sessionId: newSessionId,
        startTime: new Date().toISOString(),
        answers: {},
        completed: false,
      };
      localStorage.setItem(newSessionId, JSON.stringify(sessionData));
    } else {
      // Load existing answers
      const parsedData = JSON.parse(existingData);
      if (parsedData.answers) {
        setAnswers(parsedData.answers);
      }
    }
  }, [propSessionId]);

  // Save answers to localStorage whenever answers change
  useEffect(() => {
    if (sessionId && Object.keys(answers).length > 0) {
      updateSessionData(sessionId, { answers });
    }
  }, [answers, sessionId]);

  const handleInputChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));

    // Clear error when user starts typing/selecting
    const error = questions[currentStep].validation(value || "");
    setErrors((prev) => ({
      ...prev,
      [questions[currentStep].id]: error,
    }));

    // Show microcopy feedback
    if (!error && value) {
      setShowMicrocopy(true);

      // Update readiness score and profile completion
      const completedAnswers = Object.values({
        ...answers,
        [questions[currentStep].id]: value,
      }).filter((v) => v).length;
      const newCompletion = (completedAnswers / questions.length) * 100;
      setProfileCompletion(newCompletion);

      // Calculate readiness score based on completeness
      const baseScore = Math.min(newCompletion * 0.8, 80); // Max 80% from completion
      const bonusScore =
        value.includes("Yes") && questions[currentStep].id === "englishTest"
          ? 20
          : 0;
      setReadinessScore(Math.min(baseScore + bonusScore, 100));

      // Keep microcopy visible - removed automatic timeout
    }
  };

  const validateCurrentStep = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    const error = currentQuestion.validation(currentAnswer || "");

    setErrors((prev) => ({
      ...prev,
      [currentQuestion.id]: error,
    }));

    return !error;
  };

  const isCurrentStepValid = () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    return !currentQuestion.validation(currentAnswer || "");
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < questions.length - 1) {
      setAnimationClass("animate-slide-left");
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimationClass("animate-slide-right-in");
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimationClass("animate-slide-right");
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimationClass("animate-slide-left-in");
      }, 150);
    }
  };

  const goToStep = (stepIndex) => {
    // Allow navigation to any valid step (0 to questions.length - 1)
    if (stepIndex >= 0 && stepIndex < questions.length) {
      setCurrentStep(stepIndex);
      setShowHistoryPanel(false);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Mark session as completed
      if (sessionId) {
        updateSessionData(sessionId, {
          answers: answers,
          completed: true,
          completedTime: new Date().toISOString(),
        });

        // Also store in a completed sessions list for easy retrieval
        const completedSessions = JSON.parse(
          localStorage.getItem("completedGoCheckSessions") || "[]"
        );
        if (!completedSessions.includes(sessionId)) {
          completedSessions.push(sessionId);
          localStorage.setItem(
            "completedGoCheckSessions",
            JSON.stringify(completedSessions)
          );
        }
      }

      // Call onComplete callback with results immediately
      if (onComplete) {
        onComplete({
          answers,
          sessionId,
          readinessScore,
          profileCompletion,
        });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimationClass(""), 300);
    return () => clearTimeout(timer);
  }, [animationClass]);

  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showHistoryPanel &&
        !event.target.closest(`.${styles["history-dropdown-minimal"]}`) &&
        !event.target.closest(`.${styles["history-button-minimal"]}`)
      ) {
        setShowHistoryPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHistoryPanel]);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const IconComponent = currentQuestion.icon;

  // Get microcopy for current answer
  const getMicrocopy = () => {
    const currentAnswer = answers[currentQuestion.id];
    if (currentQuestion.microcopy) {
      if (typeof currentQuestion.microcopy === "object") {
        return currentQuestion.microcopy[currentAnswer] || null;
      }
      return currentQuestion.microcopy;
    }
    return null;
  };

  // Get completed questions (all questions that have been answered)
  const completedQuestions = questions.filter((q) => answers[q.id]);

  const renderInput = () => {
    const hasError = errors[currentQuestion.id];
    const hasValue = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case "text":
        return (
          <div className={styles["text-input-container"]}>
            <input
              type="text"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className={[styles["text-input"], hasError ? styles["error"] : ""]
                .filter(Boolean)
                .join(" ")}
              autoFocus
            />
            <div
              className={[
                styles["input-underline"],
                hasError ? styles["error"] : "",
                hasValue ? styles["filled"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            ></div>
            {hasError && <p className={styles["input-error"]}>{hasError}</p>}
          </div>
        );

      case "select":
        return (
          <div className={styles["select-container"]}>
            <select
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleInputChange(e.target.value)}
              className={[
                styles["select-input"],
                hasError ? styles["error"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <option value="">{currentQuestion.placeholder}</option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className={styles["select-chevron"]}>
              <ChevronRight />
            </div>
            <div
              className={[
                styles["input-underline"],
                hasError ? styles["error"] : "",
                hasValue ? styles["filled"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
            ></div>
            {hasError && <p className={styles["input-error"]}>{hasError}</p>}
          </div>
        );

      case "radio":
        return (
          <div className={styles["radio-container"]}>
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={[
                  styles["radio-option"],
                  answers[currentQuestion.id] === option ? "selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles["radio-button"]}>
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={styles["radio-input"]}
                  />
                  <div className={styles["radio-circle"]}>
                    {answers[currentQuestion.id] === option && (
                      <div className={styles["radio-dot"]}></div>
                    )}
                  </div>
                </div>
                <span className={styles["radio-text"]}>{option}</span>
              </label>
            ))}
            {hasError && <p className={styles["input-error"]}>{hasError}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles["gocheck-questions-container"]}>
      {/* Header */}
      {showHeader && (
        <div className={styles["gocheck-questions-header"]}>
          <h2 className={styles["questions-title"]}>{title}</h2>
          <p className={styles["questions-subtitle"]}>{subtitle}</p>
        </div>
      )}

      {/* Minimal Progress Header */}
      {showProgress && (
        <div className={styles["minimal-progress-header"]}>
          <div className={styles["progress-left"]}>
            <div className={styles["step-indicator"]}>
              {currentStep + 1} / {questions.length}
            </div>
            <div className={styles["progress-bar-minimal"]}>
              <div
                className={styles["progress-fill"]}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={styles["progress-right"]}>
            {showHistory && (
              <button
                onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                className={styles["history-button-minimal"]}
              >
                Questions ({completedQuestions.length}/{questions.length})
              </button>
            )}
          </div>

          {/* History Dropdown */}
          {showHistoryPanel && (
            <div className={styles["history-dropdown-minimal"]}>
              <div className={styles["history-header"]}>All Questions</div>
              {questions.map((question, index) => {
                const isAnswered = answers[question.id];
                const isCurrentStep = index === currentStep;
                return (
                  <button
                    key={question.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goToStep(index);
                    }}
                    className={[
                      styles["history-item-minimal"],
                      isCurrentStep ? styles["current-step"] : "",
                      !isAnswered ? styles["unanswered"] : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                  >
                    <div
                      className={[
                        styles["history-icon-minimal"],
                        isAnswered
                          ? styles["answered"]
                          : styles["unanswered-icon"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {isAnswered ? (
                        <Check size={14} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className={styles["history-content"]}>
                      <div className={styles["history-question-minimal"]}>
                        {question.title}
                        {isCurrentStep && (
                          <span className={styles["current-indicator"]}>
                            {" "}
                            (Current)
                          </span>
                        )}
                      </div>
                      {isAnswered && (
                        <div className={styles["history-answer-minimal"]}>
                          {answers[question.id]}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className={styles["main-content"]}>
        <div
          className={[styles["content-wrapper"], animationClass]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Question Header */}
          <div className={styles["question-header"]}>
            <div className={styles["question-icon"]}>
              <IconComponent />
            </div>
            <h1 className={styles["question-title"]}>
              {currentQuestion.title}
            </h1>
            {currentQuestion.subtitle && (
              <p className={styles["question-subtitle"]}>
                {currentQuestion.subtitle}
              </p>
            )}

            {/* Microcopy Feedback */}
            {showMicrocopy && getMicrocopy() && (
              <div className={styles["microcopy-feedback"]}>
                <div className={styles["microcopy-content"]}>
                  <span className={styles["microcopy-text"]}>
                    {getMicrocopy()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={styles["input-area"]}>{renderInput()}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className={styles["navigation"]}>
        <div className={styles["navigation-container"]}>
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={[styles["nav-button"], styles["previous"]]
              .filter(Boolean)
              .join(" ")}
          >
            <ChevronLeft />
          </button>

          {/* Step Indicators */}
          <div className={styles["step-indicators"]}>
            {questions.map((_, index) => (
              <div
                key={index}
                className={[
                  styles["step-indicator"],
                  index < currentStep
                    ? styles["completed"]
                    : index === currentStep
                    ? styles["current"]
                    : styles["upcoming"],
                ]
                  .filter(Boolean)
                  .join(" ")}
              ></div>
            ))}
          </div>

          {/* Next/Submit Button */}
          {currentStep < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className={[styles["nav-button"], styles["next"]]
                .filter(Boolean)
                .join(" ")}
            >
              <ChevronRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isCurrentStepValid()}
              className={styles["submit-button"]}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoCheckQuestions;
