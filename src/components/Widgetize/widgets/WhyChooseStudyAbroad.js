import React from "react";
import { GraduationCap, Briefcase, Home, Award } from "lucide-react";
import styles from "./WhyChooseStudyAbroad.module.css";

const ICONS = { graduation: GraduationCap, briefcase: Briefcase, home: Home, award: Award };

const DEFAULT_CARDS = [
  { title: "Better education quality", icon: "graduation", image: "" },
  { title: "Global job opportunities", icon: "briefcase", image: "" },
  { title: "Residency pathways", icon: "home", image: "" },
  { title: "Scholarships available", icon: "award", image: "" },
];

const WhyChooseStudyAbroad = ({ config = {}, isRtl = false }) => {
  const { columns = 4, cards = DEFAULT_CARDS } = config;

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Choose Study Abroad?</h2>
        <p className={styles.subtitle}>Invest in your future with global education</p>
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${Math.min(columns, 4)}, 1fr)` }}
        >
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon] || GraduationCap;
            return (
              <div key={i} className={styles.card}>
                {card.image ? (
                  <img src={card.image} alt="" className={styles.img} />
                ) : (
                  <div className={styles.iconWrap}>
                    <Icon size={28} className={styles.icon} />
                  </div>
                )}
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseStudyAbroad;
