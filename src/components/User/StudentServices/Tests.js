import React from "react";
import { TestTube, Calendar, Award, BookOpen } from "lucide-react";
import styles from "./StudentServices.module.css";

const Tests = () => {
  return (
    <div className={styles["tests-page"]}>
      <div className={styles["page-header"]}>
        <h1>Test Preparation & Booking</h1>
        <p>Prepare for and book your standardized tests</p>
      </div>

      <div className={styles["tests-grid"]}>
        <div className={styles["test-card"]}>
          <div className={styles["card-header"]}>
            <TestTube className={styles["card-icon"]} size={24} />
            <h3>IELTS</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>International English Language Testing System</p>
            <div className={styles["card-meta"]}>
              <span className={styles["duration"]}>2h 45min</span>
              <span className={styles["validity"]}>Valid 2 years</span>
            </div>
          </div>
        </div>

        <div className={styles["test-card"]}>
          <div className={styles["card-header"]}>
            <BookOpen className={styles["card-icon"]} size={24} />
            <h3>TOEFL</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Test of English as a Foreign Language</p>
            <div className={styles["card-meta"]}>
              <span className={styles["duration"]}>3h 30min</span>
              <span className={styles["validity"]}>Valid 2 years</span>
            </div>
          </div>
        </div>

        <div className={styles["test-card"]}>
          <div className={styles["card-header"]}>
            <Award className={styles["card-icon"]} size={24} />
            <h3>GRE</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Graduate Record Examinations</p>
            <div className={styles["card-meta"]}>
              <span className={styles["duration"]}>3h 45min</span>
              <span className={styles["validity"]}>Valid 5 years</span>
            </div>
          </div>
        </div>

        <div className={styles["test-card"]}>
          <div className={styles["card-header"]}>
            <Calendar className={styles["card-icon"]} size={24} />
            <h3>GMAT</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Graduate Management Admission Test</p>
            <div className={styles["card-meta"]}>
              <span className={styles["duration"]}>3h 7min</span>
              <span className={styles["validity"]}>Valid 5 years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
