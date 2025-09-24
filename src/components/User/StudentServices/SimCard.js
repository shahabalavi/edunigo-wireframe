import React from "react";
import { Smartphone, Wifi, Phone, MapPin } from "lucide-react";
import styles from "./StudentServices.module.css";

const SimCard = () => {
  return (
    <div className={styles["sim-card-page"]}>
      <div className={styles["page-header"]}>
        <h1>SIM Card Services</h1>
        <p>Get connected with local mobile services</p>
      </div>

      <div className={styles["sim-cards-grid"]}>
        <div className={styles["sim-card"]}>
          <div className={styles["card-header"]}>
            <Smartphone className={styles["card-icon"]} size={24} />
            <h3>Prepaid SIM</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Flexible prepaid plans with no contract</p>
            <div className={styles["card-meta"]}>
              <span className={styles["data"]}>Unlimited Data</span>
              <span className={styles["price"]}>From $25/month</span>
            </div>
          </div>
        </div>

        <div className={styles["sim-card"]}>
          <div className={styles["card-header"]}>
            <Wifi className={styles["card-icon"]} size={24} />
            <h3>Student Plan</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Special rates for international students</p>
            <div className={styles["card-meta"]}>
              <span className={styles["data"]}>50GB Data</span>
              <span className={styles["price"]}>$15/month</span>
            </div>
          </div>
        </div>

        <div className={styles["sim-card"]}>
          <div className={styles["card-header"]}>
            <Phone className={styles["card-icon"]} size={24} />
            <h3>International Calls</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Affordable rates for calling home</p>
            <div className={styles["card-meta"]}>
              <span className={styles["calls"]}>Unlimited Calls</span>
              <span className={styles["price"]}>$5/month add-on</span>
            </div>
          </div>
        </div>

        <div className={styles["sim-card"]}>
          <div className={styles["card-header"]}>
            <MapPin className={styles["card-icon"]} size={24} />
            <h3>Pickup Service</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get your SIM card delivered to campus</p>
            <div className={styles["card-meta"]}>
              <span className={styles["delivery"]}>Free Delivery</span>
              <span className={styles["setup"]}>Free Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimCard;
