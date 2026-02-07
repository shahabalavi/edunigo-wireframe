import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroVisaBanner.module.css";

const HeroVisaBanner = ({ config = {}, isRtl = false }) => {
  const navigate = useNavigate();
  const {
    headline = "Get Your Student Visa Faster",
    subtitle = "Study abroad with full support from our experts",
    ctaText = "Book Free Consultation",
    ctaLink = "#consultation",
    alignment = "center",
    backgroundType = "gradient",
    backgroundImage,
    backgroundGradient,
  } = config;

  const handleCta = () => {
    if (ctaLink.startsWith("#")) return;
    navigate(ctaLink);
  };

  const bgStyle =
    backgroundType === "image" && backgroundImage
      ? { backgroundImage: `url(${backgroundImage})` }
      : { background: backgroundGradient || "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" };

  return (
    <section
      className={`${styles.hero} ${styles[`align-${alignment}`]} ${isRtl ? styles.rtl : ""}`}
      style={bgStyle}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button
          type="button"
          className={styles.cta}
          onClick={handleCta}
          aria-label={ctaText}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroVisaBanner;
