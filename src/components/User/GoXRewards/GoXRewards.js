import React from "react";
import { Gift, Star, Trophy, Target } from "lucide-react";
import styles from "../StudentServices/StudentServices.module.css";

const GoXRewards = () => {
  return (
    <div className={styles["gox-rewards-page"]}>
      <div className={styles["page-header"]}>
        <h1>GoX Rewards</h1>
        <p>Earn points and unlock exclusive benefits</p>
      </div>

      <div className={styles["rewards-overview"]}>
        <div className={styles["points-display"]}>
          <div className={styles["points-circle"]}>
            <span className={styles["points-number"]}>1,250</span>
            <span className={styles["points-label"]}>Points</span>
          </div>
          <div className={styles["points-info"]}>
            <h3>Your Rewards Balance</h3>
            <p>Keep earning to unlock more benefits!</p>
          </div>
        </div>
      </div>

      <div className={styles["rewards-grid"]}>
        <div className={styles["reward-card"]}>
          <div className={styles["card-header"]}>
            <Gift className={styles["card-icon"]} size={24} />
            <h3>Application Fee Waiver</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get your next application fee waived</p>
            <div className={styles["card-meta"]}>
              <span className={styles["cost"]}>500 points</span>
              <span className={styles["value"]}>$100 value</span>
            </div>
          </div>
        </div>

        <div className={styles["reward-card"]}>
          <div className={styles["card-header"]}>
            <Star className={styles["card-icon"]} size={24} />
            <h3>Priority Support</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get faster response times from our team</p>
            <div className={styles["card-meta"]}>
              <span className={styles["cost"]}>300 points</span>
              <span className={styles["value"]}>1 month</span>
            </div>
          </div>
        </div>

        <div className={styles["reward-card"]}>
          <div className={styles["card-header"]}>
            <Trophy className={styles["card-icon"]} size={24} />
            <h3>Exclusive Webinar Access</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Join premium webinars with university representatives</p>
            <div className={styles["card-meta"]}>
              <span className={styles["cost"]}>200 points</span>
              <span className={styles["value"]}>Lifetime access</span>
            </div>
          </div>
        </div>

        <div className={styles["reward-card"]}>
          <div className={styles["card-header"]}>
            <Target className={styles["card-icon"]} size={24} />
            <h3>Study Abroad Guide</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get our comprehensive study abroad guide</p>
            <div className={styles["card-meta"]}>
              <span className={styles["cost"]}>150 points</span>
              <span className={styles["value"]}>Digital copy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoXRewards;
