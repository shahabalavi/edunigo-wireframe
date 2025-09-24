import React from "react";
import { Building, MapPin, DollarSign, Star } from "lucide-react";
import styles from "./StudentServices.module.css";

const Accommodation = () => {
  return (
    <div className={styles["accommodation-page"]}>
      <div className={styles["page-header"]}>
        <h1>Accommodation Services</h1>
        <p>Find the perfect place to stay during your studies</p>
      </div>

      <div className={styles["accommodation-grid"]}>
        <div className={styles["accommodation-card"]}>
          <div className={styles["card-header"]}>
            <Building className={styles["card-icon"]} size={24} />
            <h3>University Housing</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>On-campus accommodation options</p>
            <div className={styles["card-meta"]}>
              <span className={styles["price"]}>From $800/month</span>
              <span className={styles["rating"]}>
                <Star size={16} fill="currentColor" />
                4.5
              </span>
            </div>
          </div>
        </div>

        <div className={styles["accommodation-card"]}>
          <div className={styles["card-header"]}>
            <MapPin className={styles["card-icon"]} size={24} />
            <h3>Off-Campus Housing</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Private apartments and shared housing</p>
            <div className={styles["card-meta"]}>
              <span className={styles["price"]}>From $600/month</span>
              <span className={styles["rating"]}>
                <Star size={16} fill="currentColor" />
                4.2
              </span>
            </div>
          </div>
        </div>

        <div className={styles["accommodation-card"]}>
          <div className={styles["card-header"]}>
            <DollarSign className={styles["card-icon"]} size={24} />
            <h3>Housing Assistance</h3>
          </div>
          <div className={styles["card-content"]}>
            <p>Get help with housing applications and paperwork</p>
            <div className={styles["card-meta"]}>
              <span className={styles["service"]}>Free Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
