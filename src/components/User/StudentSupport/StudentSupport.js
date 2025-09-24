import React from "react";
import { HelpCircle, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import styles from "../StudentServices/StudentServices.module.css";

const StudentSupport = () => {
  return (
    <div className={styles["student-support-page"]}>
      <div className={styles["page-header"]}>
        <h1>Student Support</h1>
        <p>Get help when you need it most</p>
      </div>

      <div className={styles["support-options"]}>
        <div className={styles["support-card"]}>
          <div className={styles["card-header"]}>
            <MessageCircle className={styles["card-icon"]} size={24} />
            <h3>Live Chat</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Chat with our support team in real-time</p>
            <div className={styles["card-meta"]}>
              <span className={styles["availability"]}>Available 24/7</span>
              <span className={styles["response"]}>Instant response</span>
            </div>
          </div>
        </div>

        <div className={styles["support-card"]}>
          <div className={styles["card-header"]}>
            <Phone className={styles["card-icon"]} size={24} />
            <h3>Phone Support</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Speak directly with our support specialists</p>
            <div className={styles["card-meta"]}>
              <span className={styles["hours"]}>Mon-Fri 9AM-6PM</span>
              <span className={styles["number"]}>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        <div className={styles["support-card"]}>
          <div className={styles["card-header"]}>
            <Mail className={styles["card-icon"]} size={24} />
            <h3>Email Support</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Send us your questions and get detailed responses</p>
            <div className={styles["card-meta"]}>
              <span className={styles["response"]}>Within 24 hours</span>
              <span className={styles["email"]}>support@edunigo.com</span>
            </div>
          </div>
        </div>

        <div className={styles["support-card"]}>
          <div className={styles["card-header"]}>
            <HelpCircle className={styles["card-icon"]} size={24} />
            <h3>FAQ & Help Center</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Find answers to common questions</p>
            <div className={styles["card-meta"]}>
              <span className={styles["articles"]}>500+ articles</span>
              <span className={styles["search"]}>Searchable</span>
            </div>
          </div>
        </div>

        <div className={styles["support-card"]}>
          <div className={styles["card-header"]}>
            <Clock className={styles["card-icon"]} size={24} />
            <h3>Schedule a Call</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Book a time that works for you</p>
            <div className={styles["card-meta"]}>
              <span className={styles["booking"]}>Free booking</span>
              <span className={styles["duration"]}>30-60 min slots</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSupport;
