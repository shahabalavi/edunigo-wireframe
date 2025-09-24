import React from "react";
import { CreditCard, Shield, DollarSign, Clock } from "lucide-react";
import styles from "./StudentServices.module.css";

const BankAccount = () => {
  return (
    <div className={styles["bank-account-page"]}>
      <div className={styles["page-header"]}>
        <h1>Bank Account Services</h1>
        <p>Open a student bank account with ease</p>
      </div>

      <div className={styles["bank-cards-grid"]}>
        <div className={styles["bank-card"]}>
          <div className={styles["card-header"]}>
            <CreditCard className={styles["card-icon"]} size={24} />
            <h3>Student Checking</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>No monthly fees for students</p>
            <div className={styles["card-meta"]}>
              <span className={styles["fee"]}>$0/month</span>
              <span className={styles["minimum"]}>No minimum balance</span>
            </div>
          </div>
        </div>

        <div className={styles["bank-card"]}>
          <div className={styles["card-header"]}>
            <Shield className={styles["card-icon"]} size={24} />
            <h3>International Transfer</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Send money home with low fees</p>
            <div className={styles["card-meta"]}>
              <span className={styles["fee"]}>$5/transfer</span>
              <span className={styles["limit"]}>Up to $10,000</span>
            </div>
          </div>
        </div>

        <div className={styles["bank-card"]}>
          <div className={styles["card-header"]}>
            <DollarSign className={styles["card-icon"]} size={24} />
            <h3>Currency Exchange</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Competitive exchange rates</p>
            <div className={styles["card-meta"]}>
              <span className={styles["rate"]}>Best rates</span>
              <span className={styles["fee"]}>No hidden fees</span>
            </div>
          </div>
        </div>

        <div className={styles["bank-card"]}>
          <div className={styles["card-header"]}>
            <Clock className={styles["card-icon"]} size={24} />
            <h3>Quick Setup</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get your account ready in 24 hours</p>
            <div className={styles["card-meta"]}>
              <span className={styles["time"]}>24h setup</span>
              <span className={styles["documents"]}>Minimal docs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;
