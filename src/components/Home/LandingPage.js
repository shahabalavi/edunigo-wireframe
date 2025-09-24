import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["landing-page"]}>
      {/* Navigation Header */}
      <nav className={styles["navbar"]}>
        <div className={styles["navbar-container"]}>
          <div className={styles["navbar-brand"]} onClick={() => navigate("/")}>
            <h2>EduniGo</h2>
          </div>
          <div className={styles["navbar-menu"]}>
            <button className={styles["navbar-link"]} onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className={styles["navbar-button"]}
              onClick={() => navigate("/gocheck")}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles["hero-section"]}>
        <div className={styles["hero-container"]}>
          <div className={styles["hero-content"]}>
            <h1 className={styles["hero-title"]}>EduniGo</h1>
            <p className={styles["hero-subtitle"]}>
              Find the best study and visa applications tailored for you
            </p>
            <p className={styles["hero-description"]}>
              Our AI-powered platform helps students discover perfect
              educational opportunities and streamline their visa application
              process with intelligent matching and guidance.
            </p>
            <button
              className={styles["hero-button"]}
              onClick={() => navigate("/gocheck")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className={styles["features-section"]}>
        <div className={styles["features-container"]}>
          <h2 className={styles["features-title"]}>Powered by AI Innovation</h2>
          <div className={styles["features-grid"]}>
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>🧠</div>
              <h3>Go IQ</h3>
              <p>
                Smart matching system that asks the right questions to find your
                perfect educational fit
              </p>
            </div>
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>🎯</div>
              <h3>Go X</h3>
              <p>
                Comprehensive visa guidance that continues your journey from
                application to approval
              </p>
            </div>
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>⚡</div>
              <h3>Smart Tools</h3>
              <p>
                Advanced AI modules working behind the scenes to optimize your
                experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles["cta-section"]}>
        <div className={styles["cta-container"]}>
          <h2 className={styles["cta-title"]}>Ready to Start Your Journey?</h2>
          <p className={styles["cta-description"]}>
            Join thousands of students who have found their perfect educational
            path with EduniGo
          </p>
          <button className={styles["cta-button"]} onClick={() => navigate("/gocheck")}>
            Explore Opportunities
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles["footer"]}>
        <div className={styles["footer-container"]}>
          <div className={styles["footer-content"]}>
            <div className={styles["footer-brand"]}>
              <h3>EduniGo</h3>
              <p>Your gateway to global education</p>
            </div>
            <div className={styles["footer-links"]}>
              <div className={styles["footer-column"]}>
                <h4>Platform</h4>
                <button
                  onClick={() => navigate("/login")}
                  className={styles["footer-link"]}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className={styles["footer-link"]}
                >
                  Profile
                </button>
              </div>
              <div className={styles["footer-column"]}>
                <h4>Support</h4>
                <button
                  onClick={() => navigate("/help")}
                  className={styles["footer-link"]}
                >
                  Help Center
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className={styles["footer-link"]}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
          <div className={styles["footer-bottom"]}>
            <p>&copy; 2024 EduniGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
