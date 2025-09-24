import React from "react";
import { Coins, TrendingUp, Globe, Calculator } from "lucide-react";
import styles from "./StudentServices.module.css";

const MoneyExchange = () => {
  return (
    <div className={styles["money-exchange-page"]}>
      <div className={styles["page-header"]}>
        <h1>Money Exchange Services</h1>
        <p>Get the best exchange rates for your currency needs</p>
      </div>

      <div className={styles["exchange-cards-grid"]}>
        <div className={styles["exchange-card"]}>
          <div className={styles["card-header"]}>
            <Coins className={styles["card-icon"]} size={24} />
            <h3>Cash Exchange</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Exchange physical currency at our locations</p>
            <div className={styles["card-meta"]}>
              <span className={styles["rate"]}>Best rates</span>
              <span className={styles["fee"]}>No commission</span>
            </div>
          </div>
        </div>

        <div className={styles["exchange-card"]}>
          <div className={styles["card-header"]}>
            <TrendingUp className={styles["card-icon"]} size={24} />
            <h3>Rate Alerts</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get notified when rates reach your target</p>
            <div className={styles["card-meta"]}>
              <span className={styles["alerts"]}>Free alerts</span>
              <span className={styles["currencies"]}>All currencies</span>
            </div>
          </div>
        </div>

        <div className={styles["exchange-card"]}>
          <div className={styles["card-header"]}>
            <Globe className={styles["card-icon"]} size={24} />
            <h3>International Transfer</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Send money worldwide with competitive rates</p>
            <div className={styles["card-meta"]}>
              <span className={styles["speed"]}>Same day</span>
              <span className={styles["fee"]}>Low fees</span>
            </div>
          </div>
        </div>

        <div className={styles["exchange-card"]}>
          <div className={styles["card-header"]}>
            <Calculator className={styles["card-icon"]} size={24} />
            <h3>Rate Calculator</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Calculate your exchange before you commit</p>
            <div className={styles["card-meta"]}>
              <span className={styles["tool"]}>Free tool</span>
              <span className={styles["accuracy"]}>Live rates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyExchange;
