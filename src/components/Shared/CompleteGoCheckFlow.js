import React, { useState, useEffect } from "react";
import {
  MapPin,
  GraduationCap,
  Trophy,
  FileText,
  Target,
  Clock,
  DollarSign,
  Brain,
  Check,
  Star,
  Building,
} from "lucide-react";
import GoCheckQuestions from "./GoCheckQuestions";
import {
  generateSessionId,
  updateSessionData,
  getCurrentSessionId,
} from "../../utils/gocheckSessionManager";
import styles from "./CompleteGoCheckFlow.module.css";

const CompleteGoCheckFlow = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState("initial"); // "initial", "additional", "results"
  const [sessionId, setSessionId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [topMatches, setTopMatches] = useState([]);

  // Initial GoCheck questions (same as landing page)
  const initialQuestions = [
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
        if (!value) return "Please let us know about your English test status";
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
  ];

  // Additional questions (dashboard questions)
  const additionalQuestions = [
    {
      id: "studyGoals",
      title: "What are your primary study goals? 🎯",
      subtitle: "This helps us understand your academic aspirations",
      type: "radio",
      icon: Target,
      options: [
        "Career advancement in current field",
        "Career change to new field",
        "Research and academic pursuit",
        "Personal interest and knowledge",
        "Immigration and permanent residency",
        "Networking and connections",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your primary study goal";
        return null;
      },
      microcopy:
        "Great choice! This will help us find programs that align with your goals.",
    },
    {
      id: "timeCommitment",
      title: "How much time can you commit to studies? ⏰",
      subtitle: "This affects program recommendations and scheduling",
      type: "radio",
      icon: Clock,
      options: [
        "Full-time (40+ hours per week)",
        "Part-time (20-40 hours per week)",
        "Flexible/Evening studies",
        "Weekend studies only",
        "Online/Remote learning preferred",
        "Intensive short-term programs",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your time commitment preference";
        return null;
      },
      microcopy:
        "Perfect! This helps us match you with programs that fit your schedule.",
    },
    {
      id: "budgetRange",
      title: "What's your budget range for studies? 💰",
      subtitle: "This helps us find programs within your financial capacity",
      type: "radio",
      icon: DollarSign,
      options: [
        "Under $10,000 per year",
        "$10,000 - $25,000 per year",
        "$25,000 - $50,000 per year",
        "$50,000 - $100,000 per year",
        "Over $100,000 per year",
        "Scholarship/funding dependent",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your budget range";
        return null;
      },
      microcopy:
        "Excellent! This ensures we recommend programs that are financially viable for you.",
    },
    {
      id: "learningStyle",
      title: "What's your preferred learning style? 🧠",
      subtitle: "This helps us match you with the right teaching approach",
      type: "radio",
      icon: Brain,
      options: [
        "Hands-on practical learning",
        "Theoretical and research-based",
        "Group projects and collaboration",
        "Independent study and self-paced",
        "Interactive and discussion-based",
        "Technology-enhanced learning",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your preferred learning style";
        return null;
      },
      microcopy:
        "Perfect! This helps us find programs that match your learning preferences.",
    },
  ];

  // Sample top-matched programs
  const samplePrograms = [
    {
      id: 1,
      name: "Master of Computer Science",
      university: "Stanford University",
      location: "Stanford, CA",
      duration: "2 years",
      tuition: "$58,000/year",
      ranking: "#1 in Computer Science",
      matchScore: 95,
      description:
        "Advanced program focusing on AI, machine learning, and software engineering with cutting-edge research opportunities.",
      highlights: [
        "Top-ranked program",
        "Industry connections",
        "Research opportunities",
        "Silicon Valley location",
      ],
    },
    {
      id: 2,
      name: "MBA in Technology Management",
      university: "MIT Sloan",
      location: "Cambridge, MA",
      duration: "2 years",
      tuition: "$77,000/year",
      ranking: "#1 in Business",
      matchScore: 92,
      description:
        "Combines business leadership with technology innovation, perfect for tech entrepreneurs and managers.",
      highlights: [
        "Entrepreneurship focus",
        "Tech industry network",
        "Innovation labs",
        "Startup ecosystem",
      ],
    },
    {
      id: 3,
      name: "Master of Data Science",
      university: "Carnegie Mellon University",
      location: "Pittsburgh, PA",
      duration: "1.5 years",
      tuition: "$52,000/year",
      ranking: "#2 in Data Science",
      matchScore: 88,
      description:
        "Comprehensive program covering statistics, machine learning, and big data analytics with industry projects.",
      highlights: [
        "Industry projects",
        "High job placement",
        "Cutting-edge curriculum",
        "Research opportunities",
      ],
    },
    {
      id: 4,
      name: "Master of Engineering Management",
      university: "Duke University",
      location: "Durham, NC",
      duration: "1 year",
      tuition: "$65,000/year",
      ranking: "#5 in Engineering Management",
      matchScore: 85,
      description:
        "Bridge between engineering and business, designed for technical professionals seeking leadership roles.",
      highlights: [
        "Leadership focus",
        "Technical + Business",
        "Accelerated program",
        "Strong alumni network",
      ],
    },
  ];

  // Initialize session
  useEffect(() => {
    const newSessionId = getCurrentSessionId() || generateSessionId();
    setSessionId(newSessionId);
    localStorage.setItem("currentGoCheckSession", newSessionId);
  }, []);

  const handleInitialQuestionsComplete = async (results) => {
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Move to additional questions phase
    setCurrentPhase("additional");
    setIsProcessing(false);
  };

  const handleAdditionalQuestionsComplete = async (results) => {
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Move directly to results phase
    setCurrentPhase("results");
    setTopMatches(samplePrograms);
    setIsProcessing(false);
  };

  const handleApplyToProgram = (program) => {
    // Handle applying to a specific program
    console.log("Applying to program:", program);

    // Here you would typically:
    // 1. Create a new application based on the selected program
    // 2. Add it to the user's applications
    // 3. Show success message
    // 4. Redirect to applications page or show confirmation

    // For now, we'll call the onComplete callback with the selected program
    if (onComplete) {
      onComplete({
        sessionId: sessionId,
        completed: true,
        additionalQuestionsCompleted: true,
        topMatches: topMatches,
        selectedProgram: program,
        completedTime: new Date().toISOString(),
      });
    }
  };

  const handleFinish = () => {
    // Clear the flag that user registered without GoCheck
    localStorage.removeItem("userRegisteredWithoutGoCheck");

    // Mark GoCheck as completed
    if (sessionId) {
      updateSessionData(sessionId, {
        answers: {}, // Will be populated by the individual question components
        additionalAnswers: {},
        completed: true,
        additionalQuestionsCompleted: true,
        topMatches: topMatches,
        completedTime: new Date().toISOString(),
      });
    }

    if (onComplete) {
      onComplete();
    }
  };

  if (isProcessing) {
    return (
      <div className={styles["complete-gocheck-flow"]}>
        <div className={styles["processing-content"]}>
          <div className={styles["processing-spinner"]}></div>
          <h3>Processing Your Answers</h3>
          <p>Analyzing your responses and preparing the next step...</p>
        </div>
      </div>
    );
  }

  if (currentPhase === "initial") {
    return (
      <div className={styles["complete-gocheck-flow"]}>
        <GoCheckQuestions
          questions={initialQuestions}
          onComplete={handleInitialQuestionsComplete}
          sessionId={sessionId}
          showProgress={true}
          showHistory={true}
          showHeader={true}
          title="Welcome to EduniGo!"
          subtitle="Let's get to know you better to find your perfect study programs"
        />
      </div>
    );
  }

  if (currentPhase === "additional") {
    return (
      <div className={styles["complete-gocheck-flow"]}>
        <GoCheckQuestions
          questions={additionalQuestions}
          onComplete={handleAdditionalQuestionsComplete}
          sessionId={sessionId}
          showProgress={true}
          showHistory={false}
          showHeader={true}
          title="Additional Questions"
          subtitle="Help us understand you better"
        />
      </div>
    );
  }

  if (currentPhase === "results") {
    return (
      <div className={styles["complete-gocheck-flow"]}>
        <div className={styles["results-container"]}>
          <div className={styles["results-header"]}>
            <div className={styles["results-icon"]}>
              <Star />
            </div>
            <h2>Your Perfect Matches! 🎯</h2>
            <p>Based on your profile, here are your top-matched programs.</p>
          </div>

          <div className={styles["programs-grid"]}>
            {topMatches.slice(0, 2).map((program) => (
              <div key={program.id} className={styles["program-card"]}>
                <div className={styles["program-header"]}>
                  <div className={styles["program-ranking"]}>{program.ranking}</div>
                  <div className={styles["program-match-score"]}>
                    <Star size={16} />
                    {program.matchScore}% match
                  </div>
                </div>
                <h3 className={styles["program-name"]}>{program.name}</h3>
                <div className={styles["program-university"]}>
                  <Building size={16} />
                  {program.university}
                </div>
                <div className={styles["program-details"]}>
                  <div className={styles["program-detail"]}>
                    <GraduationCap size={14} />
                    {program.duration}
                  </div>
                  <div className={styles["program-detail"]}>
                    <DollarSign size={14} />
                    {program.tuition}
                  </div>
                </div>
                <p className={styles["program-description"]}>{program.description}</p>
                <div className={styles["program-highlights"]}>
                  {program.highlights.slice(0, 2).map((highlight, index) => (
                    <span key={index} className={styles["highlight-tag"]}>
                      {highlight}
                    </span>
                  ))}
                </div>
                <button
                  className={styles["apply-button"]}
                  onClick={() => handleApplyToProgram(program)}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>

          <div className={styles["results-footer"]}>
            <button className={styles["finish-button"]} onClick={handleFinish}>
              <Check size={20} />
              Complete Setup & Go to Dashboard
            </button>
            <p className={styles["results-note"]}>
              Your profile is now complete! You can explore more programs in
              your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CompleteGoCheckFlow;
