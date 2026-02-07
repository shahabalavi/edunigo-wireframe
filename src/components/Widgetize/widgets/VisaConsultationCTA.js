import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import styles from "./VisaConsultationCTA.module.css";

const VisaConsultationCTA = ({ config = {}, isRtl = false }) => {
  const navigate = useNavigate();
  const {
    headline = "Not sure where to start?",
    buttonText = "Talk to a Visa Advisor",
    buttonLink = "#consultation",
    backgroundColor = "#0f172a",
    backgroundImage = "",
    buttonStyle = "primary",
  } = config;

  const handleClick = () => {
    if (buttonLink.startsWith("#")) return;
    navigate(buttonLink);
  };

  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor };

  return (
    <section
      className={`${styles.section} ${isRtl ? styles.rtl : ""}`}
      style={bgStyle}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.headline}>{headline}</h2>
        <button
          type="button"
          className={`${styles.cta} ${styles[buttonStyle]}`}
          onClick={handleClick}
        >
          <MessageCircle size={20} className={styles.ctaIcon} />
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default VisaConsultationCTA;
