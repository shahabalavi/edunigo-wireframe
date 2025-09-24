import React from "react";
import {
  User,
  MapPin,
  GraduationCap,
  Trophy,
  FileText,
  Building,
} from "lucide-react";
import {
  getUserGoCheckAnswers,
  getUserSelectedUniversity,
  getUserAdditionalAnswers,
  getUserTopMatches,
} from "../../utils/gocheckSessionManager";
import styles from "./GoCheckDataDisplay.module.css";

const GoCheckDataDisplay = () => {
  const answers = getUserGoCheckAnswers();
  const selectedUniversity = getUserSelectedUniversity();
  const additionalAnswers = getUserAdditionalAnswers();
  const topMatches = getUserTopMatches();

  if (!answers) {
    return (
      <div className={styles["gocheck-data-display"]}>
        <h3>GoCheck Questionnaire</h3>
        <p>
          No questionnaire data available. Complete the GoCheck questionnaire to
          see your results here.
        </p>
      </div>
    );
  }

  const getIconForField = (field) => {
    const icons = {
      countryInterest: MapPin,
      countryOrigin: MapPin,
      education: GraduationCap,
      gpa: Trophy,
      englishTest: FileText,
    };
    return icons[field] || User;
  };

  const getLabelForField = (field) => {
    const labels = {
      countryInterest: "Dream Study Destination",
      countryOrigin: "Current Location",
      education: "Education Level",
      gpa: "GPA/Grade",
      englishTest: "English Test Score",
      studyGoals: "Study Goals",
      timeCommitment: "Time Commitment",
      budgetRange: "Budget Range",
      learningStyle: "Learning Style",
    };
    return labels[field] || field;
  };

  return (
    <div className={styles["gocheck-data-display"]}>
      <h3>EduniGo Questionnaire Results</h3>

      <div className={styles["gocheck-answers-section"]}>
        <h4>Your Answers</h4>
        <div className={styles["answers-grid"]}>
          {Object.entries(answers).map(([field, value]) => {
            if (!value) return null;
            const IconComponent = getIconForField(field);
            return (
              <div key={field} className={styles["answer-item"]}>
                <div className={styles["answer-icon"]}>
                  <IconComponent size={20} />
                </div>
                <div className={styles["answer-content"]}>
                  <span className={styles["answer-label"]}>
                    {getLabelForField(field)}
                  </span>
                  <span className={styles["answer-value"]}>{value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {additionalAnswers && (
        <div className={styles["gocheck-additional-section"]}>
          <h4>Additional Profile Information</h4>
          <div className={styles["answers-grid"]}>
            {Object.entries(additionalAnswers).map(([field, value]) => {
              if (!value) return null;
              const IconComponent = getIconForField(field);
              return (
                <div key={field} className={styles["answer-item"]}>
                  <div className={styles["answer-icon"]}>
                    <IconComponent size={20} />
                  </div>
                  <div className={styles["answer-content"]}>
                    <span className={styles["answer-label"]}>
                      {getLabelForField(field)}
                    </span>
                    <span className={styles["answer-value"]}>{value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {topMatches && topMatches.length > 0 && (
        <div className={styles["gocheck-matches-section"]}>
          <h4>Top Program Matches</h4>
          <div className={styles["matches-grid"]}>
            {topMatches.slice(0, 2).map((match, index) => (
              <div key={index} className={styles["match-item"]}>
                <div className={styles["match-header"]}>
                  <span className={styles["match-name"]}>{match.name}</span>
                  <span className={styles["match-score"]}>{match.matchScore}% match</span>
                </div>
                <div className={styles["match-university"]}>{match.university}</div>
                <div className={styles["match-details"]}>
                  <span>{match.duration}</span> • <span>{match.tuition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedUniversity && (
        <div className={styles["gocheck-university-section"]}>
          <h4>Selected University</h4>
          <div className={styles["university-item"]}>
            <div className={styles["university-icon"]}>
              <Building size={20} />
            </div>
            <div className={styles["university-content"]}>
              <span className={styles["university-name"]}>{selectedUniversity.name}</span>
              <span className={styles["university-ranking"]}>
                {selectedUniversity.ranking}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoCheckDataDisplay;
